/* global process */
import { createHash } from "node:crypto";

const PIXEL_ID = process.env.META_PIXEL_ID || "1661608979301245";
const GRAPH_API_VERSION = process.env.META_GRAPH_API_VERSION || "v23.0";

const hash = (value) =>
  value
    ? createHash("sha256").update(String(value).trim().toLowerCase()).digest("hex")
    : undefined;

const normalizePhone = (value) => {
  const digits = String(value || "").replace(/\D/g, "");
  return digits.length === 10 && digits.startsWith("0") ? `38${digits}` : digits;
};

const compact = (object) => Object.fromEntries(Object.entries(object).filter(([, value]) => value !== undefined));

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Method not allowed" });
  }

  const accessToken = process.env.META_CAPI_ACCESS_TOKEN;
  if (!accessToken) {
    return response.status(503).json({ error: "Conversions API is not configured" });
  }

  const { eventId, eventSourceUrl, userData = {}, customData = {} } = request.body || {};
  if (!eventId || !eventSourceUrl) {
    return response.status(400).json({ error: "Missing event data" });
  }

  const forwardedFor = request.headers["x-forwarded-for"];
  const clientIp = Array.isArray(forwardedFor) ? forwardedFor[0] : forwardedFor?.split(",")[0]?.trim();
  const phone = normalizePhone(userData.phone);

  const event = {
    event_name: "Lead",
    event_time: Math.floor(Date.now() / 1000),
    event_id: eventId,
    event_source_url: eventSourceUrl,
    action_source: "website",
    user_data: compact({
      client_ip_address: clientIp,
      client_user_agent: request.headers["user-agent"],
      fn: userData.firstName ? [hash(userData.firstName)] : undefined,
      ln: userData.lastName ? [hash(userData.lastName)] : undefined,
      ph: phone ? [hash(phone)] : undefined,
      fbp: userData.fbp,
      fbc: userData.fbc,
    }),
    custom_data: customData,
  };

  const payload = { data: [event] };
  if (process.env.META_CAPI_TEST_EVENT_CODE) {
    payload.test_event_code = process.env.META_CAPI_TEST_EVENT_CODE;
  }

  const url = new URL(`https://graph.facebook.com/${GRAPH_API_VERSION}/${PIXEL_ID}/events`);
  url.searchParams.set("access_token", accessToken);

  try {
    const metaResponse = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const result = await metaResponse.json();

    if (!metaResponse.ok) {
      return response.status(502).json({ error: "Meta rejected the event", details: result });
    }

    return response.status(200).json({ success: true, eventsReceived: result.events_received });
  } catch {
    return response.status(502).json({ error: "Could not reach Meta" });
  }
}

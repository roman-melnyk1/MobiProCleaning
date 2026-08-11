const getCookie = (name) => {
  if (typeof document === "undefined") return undefined;

  const prefix = `${name}=`;
  const cookie = document.cookie.split("; ").find((item) => item.startsWith(prefix));
  return cookie ? decodeURIComponent(cookie.slice(prefix.length)) : undefined;
};

const track = (eventName, parameters = {}, options) => {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;

  window.fbq("track", eventName, parameters, options);
};

export const trackPageView = () => {
  track("PageView");
};

export const trackViewContent = ({ contentName, contentCategory }) => {
  track("ViewContent", {
    content_name: contentName,
    content_category: contentCategory,
  });
};

export const trackLead = ({ firstName, lastName, phone, propertyType }) => {
  const eventId = window.crypto?.randomUUID?.() || `lead-${Date.now()}`;
  const customData = {
    content_name: "Форма заявки",
    content_category: propertyType || "Клінінгові послуги",
  };

  track("Lead", customData, { eventID: eventId });

  void fetch("/api/meta-conversions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    keepalive: true,
    body: JSON.stringify({
      eventId,
      eventSourceUrl: window.location.href,
      userData: {
        firstName,
        lastName,
        phone,
        fbp: getCookie("_fbp"),
        fbc: getCookie("_fbc"),
      },
      customData,
    }),
  }).catch(() => {
    // Browser Pixel remains the fallback when Conversions API is unavailable.
  });
};

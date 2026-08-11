const track = (eventName, parameters = {}) => {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;

  window.fbq("track", eventName, parameters);
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

export const trackLead = ({ propertyType }) => {
  track("Lead", {
    content_name: "Форма заявки",
    content_category: propertyType || "Клінінгові послуги",
  });
};

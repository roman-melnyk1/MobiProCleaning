import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView, trackViewContent } from "../../utils/metaPixel";

export default function MetaPixelTracker() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    trackPageView();

    if (pathname === "/prices") {
      trackViewContent({
        contentName: "Ціни та послуги",
        contentCategory: "Клінінгові послуги",
      });
    }
  }, [pathname, search]);

  return null;
}

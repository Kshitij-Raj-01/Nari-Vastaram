import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const usePageView = () => {
  const location = useLocation();

  useEffect(() => {
    if (window.gtag) {
      window.gtag('config', 'G-WB0QCV8W1G', {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);
};

export default usePageView;

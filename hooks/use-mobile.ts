import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(false);

  React.useEffect(() => {
    const query = `(max-width: ${MOBILE_BREAKPOINT - 1}px)`;
    const mql = window.matchMedia(query);

    const updateMatch = () => setIsMobile(mql.matches);

    // Initial check
    updateMatch();

    // Handle modern + legacy browsers
    if (mql.addEventListener) {
      mql.addEventListener("change", updateMatch);
      return () => mql.removeEventListener("change", updateMatch);
    } else {
      mql.addListener(updateMatch);
      return () => mql.removeListener(updateMatch);
    }
  }, []);

  return isMobile;
}

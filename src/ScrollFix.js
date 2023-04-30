import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// react router dom 페이지 전환시 스크롤 최상단 0,0 좌표
export default function ScrollFix() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
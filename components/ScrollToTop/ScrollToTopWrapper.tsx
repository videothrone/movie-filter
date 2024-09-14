"use client";

import { useState, useEffect } from "react";
import ScrollToTop from "./ScrollToTop";
import { scrollToTop } from "@/lib/helpers";

export default function ScrollToTopWrapper() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return <>{isVisible && <ScrollToTop scrollToTop={scrollToTop} />}</>;
}

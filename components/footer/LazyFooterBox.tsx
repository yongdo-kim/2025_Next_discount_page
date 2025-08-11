"use client";

import { useEffect, useRef, useState } from "react";
import FooterBox from "./FooterBox";

export default function LazyFooterBox() {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // 한 번 로딩되면 observer 해제
        }
      },
      {
        rootMargin: "100px", // 100px 전에 미리 로딩
        threshold: 0.1,
      }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={footerRef}
      style={{
        minHeight: '180px', // CLS 방지를 위한 예약 공간
      }}
    >
      {isVisible ? (
        <FooterBox />
      ) : (
        // 스켈레톤 또는 빈 공간
        <div 
          className="mx-auto container"
          style={{ height: '180px' }}
          role="status"
          aria-label="Footer loading..."
        />
      )}
    </div>
  );
}
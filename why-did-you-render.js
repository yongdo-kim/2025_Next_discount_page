import React from "react";

if (process.env.NODE_ENV === "development") {
  // why-did-you-render 동적 import로 SSR 에러 방지
  import("@welldone-software/why-did-you-render").then((wdr) => {
    wdr.default(React, {
      trackAllPureComponents: true,
    });
  });
}

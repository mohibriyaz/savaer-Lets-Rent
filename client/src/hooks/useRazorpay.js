import React from "react";
import { createOrderApi } from "../http/http";

export default async function useRazorpay() {
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  React.useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  });
}

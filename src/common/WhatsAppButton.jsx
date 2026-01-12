import React from "react";
import "./WhatsAppButton.css";

const WhatsAppButton = ({
  phone = "919037009645", // countrycode + number
  message = "Hello, I’m interested in your products.",
  showOnMobileOnly = false,
  position = "right", // "right" | "left"
  themeColor = "#25D366",
}) => {
  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(
    message
  )}`;

  const handleClick = () => {
    // 🔹 Google Analytics / GTM hook (optional)
    if (window.gtag) {
      window.gtag("event", "whatsapp_click", {
        event_category: "engagement",
        event_label: "WhatsApp Floating Button",
      });
    }
  };

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className={`whatsapp-float ${position} ${
        showOnMobileOnly ? "mobile-only" : ""
      }`}
      style={{ backgroundColor: themeColor }}
      onClick={handleClick}
    >
      <span className="whatsapp-tooltip">Chat with us</span>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
        alt="WhatsApp"
      />
    </a>
  );
};

export default WhatsAppButton;

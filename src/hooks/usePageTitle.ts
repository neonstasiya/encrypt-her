import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const pageTitles: Record<string, string> = {
  "/": "EncryptHer - Women's Digital Safety & Privacy Education",
  "/about": "About Us - EncryptHer",
  "/donate": "Donate - Support Women's Safety | EncryptHer",
  "/online-privacy": "Online Privacy Course - EncryptHer",
  "/travel-safety": "Travel Safety Course - EncryptHer",
  "/digital-advocacy": "Digital Advocacy - EncryptHer",
  "/safety-guides": "Safety Guides - EncryptHer",
  "/newsletter": "Newsletter - EncryptHer",
  "/public-safety": "Public Safety Course - EncryptHer",
  "/blog": "Blog - EncryptHer",
  "/contact": "Contact Us - EncryptHer",
  "/resources": "Safety Resources by State - EncryptHer",
};

export const usePageTitle = (customTitle?: string) => {
  const location = useLocation();

  useEffect(() => {
    const title = customTitle || pageTitles[location.pathname] || "EncryptHer - Women's Digital Safety";
    document.title = title;
  }, [location.pathname, customTitle]);
};

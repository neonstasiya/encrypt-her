import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface PageMeta {
  title: string;
  description: string;
}

const BASE_URL = "https://encrypt-her.lovable.app";

const pageMeta: Record<string, PageMeta> = {
  "/": {
    title: "EncryptHer - Women's Digital Safety & Privacy Education",
    description: "EncryptHer empowers women through comprehensive digital safety education, online privacy courses, travel safety training, and advocacy for women's digital rights.",
  },
  "/about": {
    title: "About Us - EncryptHer",
    description: "Learn about EncryptHer's mission to empower women through digital safety education, our team, and our commitment to women's online security.",
  },
  "/donate": {
    title: "Donate - Support Women's Safety | EncryptHer",
    description: "Support EncryptHer's mission to empower women with digital safety education. Your donation helps provide free resources, courses, and advocacy programs.",
  },
  "/online-privacy": {
    title: "Online Privacy Course - EncryptHer",
    description: "Learn essential online privacy and security skills to protect yourself in the digital world. Free course by EncryptHer for women's digital safety.",
  },
  "/travel-safety": {
    title: "Travel Safety Course - EncryptHer",
    description: "Comprehensive travel safety training for women. Learn essential tips, strategies, and tools to stay safe while traveling domestically and internationally.",
  },
  "/digital-advocacy": {
    title: "Digital Advocacy - EncryptHer",
    description: "Join EncryptHer's digital advocacy efforts to promote women's online safety, digital rights, and privacy protections through education and community action.",
  },
  "/safety-guides": {
    title: "Safety Guides - EncryptHer",
    description: "Access EncryptHer's comprehensive safety guides covering personal safety, digital security, travel safety, and more for women.",
  },
  "/newsletter": {
    title: "Newsletter - EncryptHer",
    description: "Subscribe to EncryptHer's newsletter for the latest digital safety tips, resources, and updates on women's online security.",
  },
  "/public-safety": {
    title: "Public Safety Course - EncryptHer",
    description: "Learn essential public safety skills and strategies for women. EncryptHer's free course covers awareness, prevention, and response techniques.",
  },
  "/blog": {
    title: "Blog - EncryptHer",
    description: "Read the latest articles on women's digital safety, online privacy, cybersecurity tips, and advocacy from EncryptHer's expert team.",
  },
  "/contact": {
    title: "Contact Us - EncryptHer",
    description: "Get in touch with the EncryptHer team. We're here to help with questions about digital safety, partnerships, and community involvement.",
  },
  "/resources": {
    title: "Safety Resources by State - EncryptHer",
    description: "Find safety resources and support services available in your state. EncryptHer provides a comprehensive directory of women's safety organizations.",
  },
  "/privacy-policy": {
    title: "Privacy Policy - EncryptHer",
    description: "Read EncryptHer's privacy policy to understand how we collect, use, and protect your personal information on our platform.",
  },
  "/terms": {
    title: "Terms & Conditions - EncryptHer",
    description: "Review the terms and conditions for using the EncryptHer website and services, including content usage, intellectual property, and liability.",
  },
  "/accessibility": {
    title: "Accessibility Statement - EncryptHer",
    description: "EncryptHer is committed to digital accessibility. Learn about our efforts to ensure our website is usable by everyone.",
  },
};

// Exported for the edge function to use the same data
export { pageMeta, BASE_URL };
export type { PageMeta };

function updateMetaTag(property: string, content: string) {
  let element = document.querySelector(`meta[property="${property}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute("property", property);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function updateNameMetaTag(name: string, content: string) {
  let element = document.querySelector(`meta[name="${name}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute("name", name);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

export const usePageMeta = (customTitle?: string, customDescription?: string) => {
  const location = useLocation();

  useEffect(() => {
    const meta = pageMeta[location.pathname];
    const title = customTitle || meta?.title || "EncryptHer - Women's Digital Safety";
    const description = customDescription || meta?.description || "EncryptHer empowers women through digital safety education and resources.";
    const url = `${BASE_URL}${location.pathname}`;

    // Update document title
    document.title = title;

    // Update meta description
    updateNameMetaTag("description", description);

    // Update Open Graph tags
    updateMetaTag("og:title", title);
    updateMetaTag("og:description", description);
    updateMetaTag("og:url", url);
    updateMetaTag("og:type", "website");
    updateMetaTag("og:image", `${BASE_URL}/og-image.jpg`);

    // Update Twitter Card tags
    updateNameMetaTag("twitter:card", "summary");
    updateNameMetaTag("twitter:title", title);
    updateNameMetaTag("twitter:description", description);
  }, [location.pathname, customTitle, customDescription]);
};

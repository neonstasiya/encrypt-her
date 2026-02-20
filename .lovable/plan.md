

## Recreate Cloudflare Worker for Link Previews

### Step 1: Create the Worker

1. Go to **Cloudflare Dashboard** > **Workers & Pages** > **Create**
2. Name it `og-proxy`
3. Click **Deploy** (this creates it with placeholder code)
4. Click **Edit Code** and replace everything with the code below:

```javascript
const BOT_UAS = [
  'facebookexternalhit','Facebot','Twitterbot','WhatsApp','LinkedInBot',
  'Slackbot','TelegramBot','Discordbot','iMessageBot','Applebot','Googlebot','bingbot'
];

const ORIGIN = "https://encrypt-her.lovable.app";

const META = {
  "/": { title: "EncryptHer - Women's Digital Safety & Privacy Education", description: "EncryptHer empowers women through comprehensive digital safety education, online privacy courses, travel safety training, and advocacy for women's digital rights." },
  "/about": { title: "About Us - EncryptHer", description: "Learn about EncryptHer's mission to empower women through digital safety education, our team, and our commitment to women's online security." },
  "/donate": { title: "Donate - Support Women's Safety | EncryptHer", description: "Support EncryptHer's mission to empower women with digital safety education. Your donation helps provide free resources, courses, and advocacy programs." },
  "/online-privacy": { title: "Online Privacy Course - EncryptHer", description: "Learn essential online privacy and security skills to protect yourself in the digital world. Free course by EncryptHer for women's digital safety." },
  "/travel-safety": { title: "Travel Safety Course - EncryptHer", description: "Comprehensive travel safety training for women. Learn essential tips, strategies, and tools to stay safe while traveling domestically and internationally." },
  "/digital-advocacy": { title: "Digital Advocacy - EncryptHer", description: "Join EncryptHer's digital advocacy efforts to promote women's online safety, digital rights, and privacy protections through education and community action." },
  "/safety-guides": { title: "Safety Guides - EncryptHer", description: "Access EncryptHer's comprehensive safety guides covering personal safety, digital security, travel safety, and more for women." },
  "/newsletter": { title: "Newsletter - EncryptHer", description: "Subscribe to EncryptHer's newsletter for the latest digital safety tips, resources, and updates on women's online security." },
  "/public-safety": { title: "Public Safety Course - EncryptHer", description: "Learn essential public safety skills and strategies for women. EncryptHer's free course covers awareness, prevention, and response techniques." },
  "/blog": { title: "Blog - EncryptHer", description: "Read the latest articles on women's digital safety, online privacy, cybersecurity tips, and advocacy from EncryptHer's expert team." },
  "/contact": { title: "Contact Us - EncryptHer", description: "Get in touch with the EncryptHer team. We're here to help with questions about digital safety, partnerships, and community involvement." },
  "/resources": { title: "Safety Resources by State - EncryptHer", description: "Find safety resources and support services available in your state. EncryptHer provides a comprehensive directory of women's safety organizations." },
  "/privacy-policy": { title: "Privacy Policy - EncryptHer", description: "Read EncryptHer's privacy policy to understand how we collect, use, and protect your personal information on our platform." },
  "/terms": { title: "Terms & Conditions - EncryptHer", description: "Review the terms and conditions for using the EncryptHer website and services, including content usage, intellectual property, and liability." },
  "/accessibility": { title: "Accessibility Statement - EncryptHer", description: "EncryptHer is committed to digital accessibility. Learn about our efforts to ensure our website is usable by everyone." }
};

function isBot(ua) {
  const lower = ua.toLowerCase();
  return BOT_UAS.some(b => lower.includes(b.toLowerCase()));
}

export default {
  async fetch(request) {
    const ua = request.headers.get('user-agent') || '';

    // Non-bot traffic: proxy to the Lovable origin (not back to itself)
    if (!isBot(ua)) {
      const url = new URL(request.url);
      const originUrl = ORIGIN + url.pathname + url.search;
      return fetch(originUrl, {
        method: request.method,
        headers: request.headers
      });
    }

    // Bot traffic: return custom HTML with correct meta tags
    const url = new URL(request.url);
    const m = META[url.pathname] || META['/'];
    const pageUrl = `https://encrypther.org${url.pathname}`;
    const imageUrl = 'https://encrypther.org/og-image.jpg';

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>${m.title}</title>
  <meta name="description" content="${m.description}"/>
  <meta property="og:title" content="${m.title}"/>
  <meta property="og:description" content="${m.description}"/>
  <meta property="og:type" content="website"/>
  <meta property="og:url" content="${pageUrl}"/>
  <meta property="og:image" content="${imageUrl}"/>
  <meta name="twitter:card" content="summary"/>
  <meta name="twitter:title" content="${m.title}"/>
  <meta name="twitter:description" content="${m.description}"/>
  <link rel="canonical" href="${pageUrl}"/>
</head>
<body><h1>${m.title}</h1><p>${m.description}</p></body>
</html>`;

    return new Response(html, {
      headers: {
        'Content-Type': 'text/html;charset=utf-8',
        'Cache-Control': 'public, max-age=3600'
      }
    });
  }
};
```

5. Click **Deploy**

---

### Step 2: Add the Route (from the Zone side)

This is the key step that was failing before. Do it from the **website side**, not the Worker side:

1. Go to **Cloudflare Dashboard** > **Websites** > **encrypther.org**
2. In the left sidebar, go to **Workers Routes**
3. Click **Add Route**
4. Set:
   - **Route:** `encrypther.org/*`
   - **Worker:** select `og-proxy`
5. Click **Save**
6. Add a second route:
   - **Route:** `www.encrypther.org/*`
   - **Worker:** select `og-proxy`
7. Click **Save**

---

### Step 3: Verify SSL Settings

1. Still on **encrypther.org** in Cloudflare
2. Go to **SSL/TLS** in the left sidebar
3. Make sure the mode is set to **Full**

---

### Step 4: Make sure DNS proxy is ON

1. Go to **DNS** > **Records** for encrypther.org
2. The A record pointing to `185.158.133.1` must have the **orange cloud (Proxied)** enabled -- not "DNS only"
3. If it says "DNS only", click to toggle it to **Proxied**

---

### Step 5: Test

Run this in your terminal:

```bash
curl -A "facebookexternalhit/1.1" https://encrypther.org/privacy-policy
```

You should see the custom HTML with "Privacy Policy - EncryptHer" as the title. If you still see the Lovable index.html, wait 1-2 minutes for the route to propagate and try again.


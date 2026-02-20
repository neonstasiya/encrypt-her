const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const BASE_URL = "https://encrypt-her.lovable.app";

const pageMeta: Record<string, { title: string; description: string }> = {
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

const BOT_USER_AGENTS = [
  'facebookexternalhit',
  'Facebot',
  'Twitterbot',
  'WhatsApp',
  'LinkedInBot',
  'Slackbot',
  'TelegramBot',
  'Discordbot',
  'iMessageBot',
  'Applebot',
  'Googlebot',
  'bingbot',
];

function isBot(userAgent: string): boolean {
  const ua = userAgent.toLowerCase();
  return BOT_USER_AGENTS.some(bot => ua.includes(bot.toLowerCase()));
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const path = url.searchParams.get('path') || '/';
    const userAgent = req.headers.get('user-agent') || '';

    // Only serve OG HTML to bots
    if (!isBot(userAgent)) {
      return new Response(JSON.stringify({ redirect: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const meta = pageMeta[path] || pageMeta['/']!;
    const pageUrl = `${BASE_URL}${path}`;
    const imageUrl = `${BASE_URL}/og-image.jpg`;

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${meta.title}</title>
  <meta name="description" content="${meta.description}" />
  <meta property="og:title" content="${meta.title}" />
  <meta property="og:description" content="${meta.description}" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="${pageUrl}" />
  <meta property="og:image" content="${imageUrl}" />
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content="${meta.title}" />
  <meta name="twitter:description" content="${meta.description}" />
  <link rel="canonical" href="${pageUrl}" />
</head>
<body>
  <h1>${meta.title}</h1>
  <p>${meta.description}</p>
  <a href="${pageUrl}">Visit ${meta.title}</a>
</body>
</html>`;

    return new Response(html, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

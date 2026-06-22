## Goal
Create a downloadable LinkedIn profile banner image that visually matches the EncryptHer homepage hero — pink/purple gradient header style — featuring the tagline **"Your Safety, Your Privacy, Your Power."**

## Output
- Single PNG image at LinkedIn's recommended banner size: **1584 × 396 px**
- Saved to `/mnt/documents/encrypther-linkedin-banner.png` for download
- No logo, no URL — just styled tagline (per your answer)

## Visual direction (matches site hero)
- Background: gradient from `--primary` (deep purple/magenta `hsl(280 70% 40%)`) through soft pink to `--accent` (`hsl(320 65% 45%)`), mirroring the homepage hero's `from-primary/40 via-background/80 to-accent/40` feel but more saturated for banner impact
- Subtle abstract overlay (soft glow, faint geometric/network texture) for depth, no busy imagery
- Typography: bold modern sans-serif, large, centered
  - "Your Safety, Your Privacy," in white
  - "Your Power" highlighted in a brighter pink/magenta accent (matches the site's `text-primary` treatment of "Your Power")
- Safe margins so text isn't clipped by LinkedIn's profile photo circle (left ~280px on desktop)

## Steps
1. Generate the banner with the premium image model (text legibility matters)
2. View the result and verify the tagline is rendered correctly, spacing is clean, and it reads well at LinkedIn banner dimensions
3. If text is misrendered or layout is off, regenerate with a tightened prompt

No code changes — this is a one-off design asset.

# Recreate Privacy Policy and Terms & Conditions Pages

## Overview
Recreate the two legal pages that were previously built but lost from the codebase: a **Privacy Policy** page and a **Terms & Conditions** page. Both will follow the same styling pattern used by the existing Accessibility Statement page.

## What will be created

### 1. Privacy Policy Page (`/privacy-policy`)
A comprehensive privacy policy tailored to EncryptHer as a nonprofit focused on women's digital safety, covering:
- What information is collected (newsletter signups, contact forms, donations, blog contributions)
- How information is used
- Data sharing and third-party services
- Cookies and analytics
- Data security measures
- Children's privacy
- Your rights (access, correction, deletion)
- Contact information (info@encrypther.org)

### 2. Terms & Conditions Page (`/terms`)
Standard terms covering:
- Acceptance of terms
- Use of educational content and resources
- User-submitted content (blog contributions)
- Intellectual property
- Disclaimer of warranties (educational content is informational, not professional advice)
- Limitation of liability
- Donation terms (noting pending 501(c)(3) status)
- Changes to terms
- Contact information

### 3. Navigation Updates
- Add "Privacy Policy" and "Terms & Conditions" links to the **footer** in the "Connect" column
- Add routes in **App.tsx** for `/privacy-policy` and `/terms`

## Technical Details

### New files
- `src/pages/PrivacyPolicy.tsx` -- follows the same layout as `AccessibilityStatement.tsx` (SkipLink, AccessibleHeader, hero section, content sections, AccessibleFooter)
- `src/pages/TermsAndConditions.tsx` -- same layout pattern

### Modified files
- `src/App.tsx` -- add two new Route entries
- `src/components/AccessibleFooter.tsx` -- add footer links for both pages

### Also fixes
- The edge function build error (`send-contact-email`) referencing `npm:resend@2.0.0` will be addressed by updating the import to use a bare `resend` specifier compatible with Deno.

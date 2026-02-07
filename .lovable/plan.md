

## Plan: Forward Blog Contributions via Email + Add Email Contact

### What This Does
1. When someone submits a blog contribution through the form, an email with their submission details will automatically be sent to **socialmedia@encrypther.org**
2. The blog contribution section will also display the email address so people can submit directly via email if they prefer

### Setup Required From You
This feature needs an email sending service called **Resend** to forward submissions. You will need to:
1. Go to [resend.com](https://resend.com) and create a free account (if you don't have one)
2. Verify the **encrypther.org** domain at [resend.com/domains](https://resend.com/domains) so emails can be sent from your domain
3. Create an API key at [resend.com/api-keys](https://resend.com/api-keys)
4. Provide the API key when prompted

### Changes

**1. Add the email address to the contribution form UI**
- In `BlogContributionForm.tsx`, add a line below the description text: "You can also email your contribution directly to socialmedia@encrypther.org"
- The email will be a clickable mailto link

**2. Create a backend function to send emails**
- New file: `supabase/functions/send-contribution-email/index.ts`
- Receives contribution details (name, email, topic, story) and sends a formatted email to socialmedia@encrypther.org via Resend
- Includes the submitter's name, email, topic, and story in the email body

**3. Update the contribution form to trigger the email**
- After successfully inserting into the database, call the backend function to send the notification email
- Email sending is fire-and-forget -- if it fails, the submission still succeeds (the database entry is the source of truth)

**4. Update config**
- Add the new function to `supabase/config.toml` with `verify_jwt = false` (the function validates input server-side)

### Technical Details

The backend function will:
- Accept POST requests with contribution data
- Use Resend SDK to send an HTML-formatted email to socialmedia@encrypther.org
- Include CORS headers for browser requests
- Log activity for debugging
- The "from" address will use your verified encrypther.org domain (e.g., `noreply@encrypther.org`)

The frontend change in `BlogContributionForm.tsx`:
- Call `supabase.functions.invoke('send-contribution-email', { body: { ... } })` after the database insert succeeds
- Wrap in try/catch so email failure doesn't affect the user experience


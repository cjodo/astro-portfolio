# Contact Form Setup

## How to enable the contact form:

1. **Sign up for Formspree**
   - Go to [Formspree.io](https://formspree.io/)
   - Create a free account

2. **Create a new form**
   - Click "New Form"
   - Enter your form name (e.g., "Portfolio Contact")
   - Add your email address where you want to receive messages
   - Get your form ID (looks like: `f/abcdefg`)

3. **Update the form action**
   - Open `src/components/Contact.astro`
   - Replace `your-form-id` on line 7 with your actual Formspree form ID
   - Example: `const formAction = "https://formspree.io/f/abcdefg";`

4. **Update your email**
   - Update the email in the mailto link (line 125) to your actual email address

5. **Test the form**
   - Build and deploy your site
   - Test the form to make sure it works

## Alternative Options:

### Netlify Forms (if deploying to Netlify)
- Remove the Formspree action
- Add `data-netlify="true"` to the form element
- Netlify will handle form submissions automatically

### FormSubmit.co
- Replace the form action with `https://formsubmit.co/your-email@example.com`

### Custom backend
- Create an API route in `src/pages/api/contact.ts`
- Implement your own email sending logic
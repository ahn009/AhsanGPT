# ✅ Authentication Testing Checklist

Use this checklist to verify all authentication features work correctly.

---

## 🧪 Pre-Testing Setup

- [ ] Firebase project configured
- [ ] Email/Password authentication enabled in Firebase
- [ ] Google OAuth enabled in Firebase
- [ ] Environment variables set in `.env`
- [ ] Dev server running (`npm run dev`)
- [ ] Browser console open (F12) for debugging

---

## 📧 Email/Password Signup

### Basic Signup
- [ ] Navigate to `/auth`
- [ ] Click "Don't have an account? Sign up"
- [ ] Enter valid email (use real email to receive verification)
- [ ] Enter password (min 6 characters)
- [ ] Verify terms checkbox is unchecked by default
- [ ] Try to submit without checking terms → Should show error
- [ ] Check "I agree to Terms and Privacy Policy"
- [ ] Click links to `/terms` and `/privacy` → Should open pages
- [ ] Click "Sign Up"
- [ ] Verify success toast: "Account created! Please check your email to verify."
- [ ] Verify redirect to `/verify-email`

### Validation Tests
- [ ] Try signup with empty email → Error shown
- [ ] Try signup with invalid email format → Error shown
- [ ] Try signup with password < 6 chars → Error shown
- [ ] Try signup with existing email → "Email already in use" error
- [ ] Try signup without terms checkbox → Error shown

---

## 📬 Email Verification

### Verification Screen
- [ ] On `/verify-email` screen
- [ ] Verify user email is displayed
- [ ] Verify "Check your inbox" message shown
- [ ] Verify 3 buttons present:
  - [ ] "I've verified my email"
  - [ ] "Resend verification email"
  - [ ] "Sign out"

### Email Received
- [ ] Check email inbox (within 1-2 minutes)
- [ ] If not received, check spam/junk folder
- [ ] Verify email is from Firebase (noreply@...)
- [ ] Verify email contains verification link
- [ ] Click verification link
- [ ] Verify Firebase confirmation page shown

### Verification Actions
- [ ] Return to app (still on `/verify-email`)
- [ ] Click "I've verified my email" button
- [ ] Verify page reloads
- [ ] Verify redirect to `/` (main app)
- [ ] Verify access granted to chat interface

### Resend Email
- [ ] Sign up with new email
- [ ] On `/verify-email` screen
- [ ] Click "Resend verification email"
- [ ] Verify success toast: "Verification email sent!"
- [ ] Check inbox for new email
- [ ] Verify new email received

### Sign Out
- [ ] On `/verify-email` screen
- [ ] Click "Sign out"
- [ ] Verify redirect to `/auth`
- [ ] Verify success toast: "Signed out successfully"

---

## 🔑 Email/Password Login

### Successful Login (Verified User)
- [ ] Navigate to `/auth`
- [ ] Enter email of verified account
- [ ] Enter correct password
- [ ] Click "Sign In"
- [ ] Verify success toast: "Welcome back!"
- [ ] Verify redirect to `/` (main app)

### Login with Unverified Account
- [ ] Sign up with new email (don't verify)
- [ ] Sign out
- [ ] Try to login with unverified account
- [ ] Verify redirect to `/verify-email`
- [ ] Verify blocked from accessing main app

### Login Errors
- [ ] Try login with wrong password → "Invalid email or password"
- [ ] Try login with non-existent email → "Invalid email or password"
- [ ] Try login with empty fields → "Please fill in all fields"

---

## 🔐 Forgot Password

### Reset Flow
- [ ] Navigate to `/auth`
- [ ] Click "Forgot password?"
- [ ] Verify redirect to forgot password screen
- [ ] Verify "Reset Password" heading shown
- [ ] Enter email address
- [ ] Click "Send Reset Link"
- [ ] Verify success toast: "Password reset email sent!"
- [ ] Verify redirect back to login screen

### Email Received
- [ ] Check email inbox
- [ ] Verify password reset email received
- [ ] Click reset link in email
- [ ] Verify Firebase password reset page opens
- [ ] Enter new password
- [ ] Confirm new password
- [ ] Click "Save"
- [ ] Verify success message

### Login with New Password
- [ ] Return to `/auth`
- [ ] Enter email
- [ ] Enter NEW password
- [ ] Click "Sign In"
- [ ] Verify successful login

### Reset Errors
- [ ] Try reset with empty email → "Please enter your email"
- [ ] Try reset with non-existent email → "No account found with this email"

### Back Button
- [ ] On forgot password screen
- [ ] Click "Back to sign in"
- [ ] Verify return to login screen

---

## 🔵 Google OAuth

### Google Signup/Login
- [ ] Navigate to `/auth`
- [ ] Click "Google" button
- [ ] Verify Google OAuth popup opens
- [ ] Select Google account
- [ ] Complete Google authentication
- [ ] Verify success toast: "Welcome to Ahsan GPT!"
- [ ] Verify redirect to `/` (main app)
- [ ] Verify NO redirect to `/verify-email` (Google users auto-verified)

### Google OAuth Errors
- [ ] Click "Google" button
- [ ] Close popup without selecting account
- [ ] Verify error toast shown
- [ ] Verify user remains on `/auth`

---

## 🛡️ Route Protection

### Protected Route Access
- [ ] Sign out (if logged in)
- [ ] Try to access `/` directly
- [ ] Verify redirect to `/auth`
- [ ] Login with verified account
- [ ] Verify access granted to `/`

### Unverified User Access
- [ ] Sign up with new email (don't verify)
- [ ] Try to access `/` directly
- [ ] Verify redirect to `/verify-email`
- [ ] Verify blocked from main app

### Public Routes
- [ ] Access `/terms` without login → Should work
- [ ] Access `/privacy` without login → Should work
- [ ] Access `/docs` without login → Should work
- [ ] Access `/auth` while logged in → Should redirect to `/`

---

## 🔄 Edge Cases

### Expired Verification Link
- [ ] Sign up with new email
- [ ] Wait 3+ days (or manually expire in Firebase)
- [ ] Click verification link
- [ ] Verify "Link expired" error
- [ ] Return to app
- [ ] Click "Resend verification email"
- [ ] Verify new email sent

### Multiple Resend Attempts
- [ ] Sign up with new email
- [ ] Click "Resend verification email" 3 times
- [ ] Verify all 3 emails sent successfully
- [ ] Verify no rate limiting errors

### Verification Status Not Updating
- [ ] Sign up and verify email
- [ ] Return to app (still shows unverified)
- [ ] Click "I've verified my email"
- [ ] Verify page reloads
- [ ] Verify status updates

### Password Reset Without Verification
- [ ] Sign up with new email (don't verify)
- [ ] Sign out
- [ ] Click "Forgot password?"
- [ ] Reset password
- [ ] Login with new password
- [ ] Verify still redirected to `/verify-email`
- [ ] Verify must verify email before accessing app

### Google User Tries Password Reset
- [ ] Sign in with Google
- [ ] Sign out
- [ ] Try "Forgot password?" with Google email
- [ ] Verify Firebase handles this (no password exists)

---

## 📱 UI/UX Testing

### Loading States
- [ ] During signup → Button shows spinner
- [ ] During login → Button shows spinner
- [ ] During password reset → Button shows spinner
- [ ] During resend email → Button shows spinner
- [ ] Verify buttons disabled during loading

### Toast Notifications
- [ ] Success toasts are green
- [ ] Error toasts are red
- [ ] Toasts auto-dismiss after 3-5 seconds
- [ ] Toasts don't overlap
- [ ] No browser alert() popups used

### Form Validation
- [ ] Email field validates format
- [ ] Password field shows character count
- [ ] Terms checkbox is clickable
- [ ] Links open in same tab
- [ ] Form doesn't reset on error

### Responsive Design
- [ ] Test on mobile (Chrome DevTools)
- [ ] Test on tablet
- [ ] Test on desktop
- [ ] Verify all buttons are touch-friendly
- [ ] Verify text is readable on all sizes

---

## 🚀 Production Testing (Vercel)

### Deployment
- [ ] Deploy to Vercel
- [ ] Add environment variables in Vercel dashboard
- [ ] Update Firebase authorized domains
- [ ] Update Google OAuth redirect URIs

### Production Flows
- [ ] Test signup on production URL
- [ ] Verify verification email received
- [ ] Verify email links point to production URL
- [ ] Test login on production
- [ ] Test forgot password on production
- [ ] Test Google OAuth on production

### Production Issues
- [ ] Check browser console for errors
- [ ] Verify no CORS errors
- [ ] Verify no 404 errors
- [ ] Verify Firebase connection works
- [ ] Verify environment variables loaded

---

## 🔍 Browser Compatibility

### Chrome
- [ ] All features work
- [ ] No console errors
- [ ] Smooth animations

### Firefox
- [ ] All features work
- [ ] No console errors
- [ ] Smooth animations

### Safari
- [ ] All features work
- [ ] No console errors
- [ ] Smooth animations

### Edge
- [ ] All features work
- [ ] No console errors
- [ ] Smooth animations

---

## 📊 Performance Testing

### Load Times
- [ ] Auth page loads < 2 seconds
- [ ] Verify email page loads < 1 second
- [ ] No unnecessary re-renders
- [ ] Images load quickly

### Network
- [ ] Test on slow 3G
- [ ] Verify loading states shown
- [ ] Verify no timeout errors

---

## 🔒 Security Testing

### Input Sanitization
- [ ] Try XSS in email field: `<script>alert('xss')</script>`
- [ ] Verify script doesn't execute
- [ ] Try SQL injection: `' OR '1'='1`
- [ ] Verify handled safely

### Password Security
- [ ] Verify password not visible in network tab
- [ ] Verify password not logged to console
- [ ] Verify password hashed by Firebase

### Session Management
- [ ] Login and close browser
- [ ] Reopen browser
- [ ] Verify still logged in (session persists)
- [ ] Sign out
- [ ] Verify session cleared

---

## ✅ Final Checklist

- [ ] All signup flows work
- [ ] All login flows work
- [ ] Email verification enforced
- [ ] Password reset works
- [ ] Terms acceptance required
- [ ] Route protection works
- [ ] Google OAuth works
- [ ] All error states handled
- [ ] All success states shown
- [ ] UI is responsive
- [ ] No console errors
- [ ] Production deployment works
- [ ] Documentation is clear

---

## 🐛 Bug Reporting Template

If you find issues, document them:

```
**Issue:** [Brief description]
**Steps to Reproduce:**
1. 
2. 
3. 

**Expected Behavior:**
[What should happen]

**Actual Behavior:**
[What actually happens]

**Browser:** [Chrome/Firefox/Safari/Edge]
**Environment:** [Localhost/Production]
**Console Errors:** [Copy any errors]
**Screenshots:** [If applicable]
```

---

## 📝 Testing Notes

- Use real email addresses for testing (Gmail, Outlook, etc.)
- Check spam folders if emails not received
- Wait 1-2 minutes for emails to arrive
- Clear browser cache if issues persist
- Test in incognito mode to avoid cached data
- Use different email addresses for different test scenarios

---

**Happy Testing! 🎉**

If all items are checked, your authentication system is production-ready!

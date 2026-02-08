# 🚀 Quick Start Guide - Authentication System

## What Was Added

### ✅ Email Verification
- Automatic verification email after signup
- Blocks unverified users from app access
- Resend email option
- Verification status screen

### ✅ Terms & Privacy Acceptance
- Required checkbox on signup
- Links to Terms and Privacy pages
- Prevents signup without acceptance

### ✅ Forgot Password
- Password reset via email
- Clear success/error messages
- Handles edge cases

---

## Files Changed

```
src/
├── hooks/
│   └── useAuth.ts                 ← Email verification + password reset
├── pages/
│   ├── Auth.tsx                   ← Terms checkbox + forgot password
│   └── VerifyEmail.tsx            ← NEW: Email verification screen
└── App.tsx                        ← Route protection with email verification
```

---

## How It Works

### 1. Signup Flow
```
User signs up → Email sent → Redirected to /verify-email → 
User clicks link → Refreshes page → Access granted
```

### 2. Login Flow
```
User logs in → Check if verified → 
If YES: Access app
If NO: Redirect to /verify-email
```

### 3. Forgot Password
```
Click "Forgot password?" → Enter email → 
Receive reset link → Set new password → Login
```

---

## Testing Locally

```bash
# 1. Start dev server
npm run dev

# 2. Visit http://localhost:5173/auth

# 3. Test signup:
- Enter email and password
- Check "I agree to Terms and Privacy"
- Click "Sign Up"
- Check your email inbox
- Click verification link
- Return to app and click "I've verified my email"

# 4. Test forgot password:
- Click "Forgot password?"
- Enter email
- Check inbox for reset link
```

---

## Common Issues

### Email Not Received
- Check spam folder
- Click "Resend verification email"
- Wait 1-2 minutes

### Still Shows Unverified
- Click "I've verified my email" button
- Or sign out and sign in again

### Google OAuth Users
- Automatically verified (skip email verification)

---

## Customization

### Change Password Length
**File:** `src/pages/Auth.tsx`
```typescript
// Line ~70
if (password.length < 8) { // Change from 6 to 8
  toast.error('Password must be at least 8 characters');
  return;
}
```

### Customize Verification Email
1. Go to Firebase Console
2. Authentication → Templates
3. Edit "Email address verification"

### Store Terms Acceptance Date
**File:** `src/hooks/useAuth.ts`
```typescript
// Add to signUpWithEmail function
await updateProfile(result.user, {
  displayName: JSON.stringify({
    termsAcceptedAt: new Date().toISOString()
  })
});
```

---

## Security Features

✅ Email verification prevents fake accounts  
✅ Terms acceptance for legal compliance  
✅ Password reset for account recovery  
✅ Route protection blocks unverified users  
✅ Clear error messages (no sensitive info leaked)  

---

## Deployment

### Firebase Setup
1. Enable Email/Password authentication
2. Enable Google OAuth
3. Add authorized domains (localhost + Vercel domain)

### Vercel Setup
1. Add environment variables
2. Deploy
3. Test all flows in production

---

## Need Help?

- Full documentation: `AUTH_SYSTEM.md`
- Firebase docs: https://firebase.google.com/docs/auth
- Google OAuth fix: `GOOGLE_OAUTH_FIX.md`

---

**Ready to use! 🎉**

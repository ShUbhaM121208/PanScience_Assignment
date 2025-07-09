# Troubleshooting 403 Forbidden Error

## Quick Debug Steps

### 1. Check Frontend Token
Open browser console and run:
```javascript
console.log("Token:", localStorage.getItem("token"));
```

### 2. Check Backend Logs
Look for these debug messages in your backend console:
- `🔍 Auth Check:` - Shows if token is being received
- `✅ JWT verified successfully:` - Shows if token is valid
- `✅ User authenticated:` - Shows user details
- `🔍 getTaskById called:` - Shows task request details
- `🔍 User ID Comparison:` - Shows authorization check

### 3. Test Token Manually
```bash
# Copy your token from browser console and test it
node debug-auth.js <your_token_here>
```

## Common Issues & Solutions

### Issue 1: Token Not Being Sent
**Symptoms:** Backend logs show "No valid authorization header"

**Solution:**
1. Check if token exists in localStorage
2. Verify axios interceptor is working
3. Check browser network tab for Authorization header

### Issue 2: Invalid Token
**Symptoms:** Backend logs show "JWT verification failed"

**Solution:**
1. Token might be expired
2. JWT_SECRET might be different
3. Token format might be corrupted

### Issue 3: User Not Found
**Symptoms:** Backend logs show "User not found in database"

**Solution:**
1. User might have been deleted
2. Database connection issues
3. User ID mismatch

### Issue 4: Task Ownership Mismatch
**Symptoms:** Backend logs show "Access denied - User not authorized"

**Solution:**
1. Task was created by different user
2. User ID comparison failing
3. Database data inconsistency

## Debug Commands

### Test Database Connection
```bash
cd backend
node debug-auth.js
```

### Test Specific Token
```bash
cd backend
node debug-auth.js <your_token>
```

### Check Environment Variables
```bash
cd backend
node -e "console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'Set' : 'Not set')"
```

## Frontend Debug Code

Add this to your component to debug:
```javascript
useEffect(() => {
  const token = localStorage.getItem("token");
  console.log("🔍 Debug Info:", {
    hasToken: !!token,
    tokenLength: token?.length,
    tokenStart: token?.substring(0, 20)
  });
}, []);
```

## Backend Debug Code

The authMiddleware and getTaskById now include comprehensive logging. Check your server console for:
- Authentication flow
- User ID comparisons
- Authorization decisions

## Quick Fixes

### 1. Clear and Re-login
```javascript
// In browser console
localStorage.clear();
// Then re-login
```

### 2. Check User Role
Make sure your user has the correct role in the database.

### 3. Verify Task Ownership
Check if the task actually belongs to the logged-in user.

## Still Having Issues?

1. Share the backend console logs
2. Share the frontend console logs
3. Share the network tab details
4. Run the debug script and share results 
# Setup Instructions - Fix API Key Error

## Issue
You're getting a 403 Forbidden error because the `.env` file doesn't exist or the server hasn't been restarted after creating it.

## Steps to Fix

1. **Create the `.env` file** in the root directory (same level as `package.json`):
   - Copy `env.example` to `.env`
   - Or create `.env` manually with this content:

```
PORT=5000
MONGODB_URI=mongodb+srv://abhishekpal28:ABHI%4028pal@abhishek.ldfgwxh.mongodb.net/image_search_db?retryWrites=true&w=majority&appName=image-search-cluster

GEMINI_API_KEY=AIzaSyAABDrLsna7IglnOJjTuEnqIg7hk8TeQb0
```

2. **Restart your server** after creating/updating `.env`:
   - Stop the server (Ctrl+C)
   - Start it again: `npm run dev`

3. **Verify the API key is loaded**:
   - When the server starts, you should see: `✅ GEMINI_API_KEY is loaded (length: 39)`
   - If you see a warning instead, the `.env` file isn't being read correctly

## Important Notes

- The `.env` file must be in the root directory (where `server.js` is located)
- Never commit `.env` to git (it's already in `.gitignore`)
- Make sure there are no spaces around the `=` sign in `.env`
- The API key should not have quotes around it

## If Still Not Working

1. Check that your Gemini API key is valid and enabled in Google Cloud Console
2. Verify the API key has the necessary permissions for Gemini API
3. Check the server console logs for specific error messages


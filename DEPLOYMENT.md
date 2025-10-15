# SU'UD Frontend Deployment Guide

## Vercel Deployment

### Environment Variables

When deploying to Vercel, make sure to set the following environment variables in your Vercel dashboard:

```bash
# Required
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app

# API Configuration
NEXT_PUBLIC_API_URL=https://your-backend-api.com

# Optional Analytics
GOOGLE_SITE_VERIFICATION=your_google_verification_code
YANDEX_VERIFICATION=your_yandex_verification_code
YAHOO_VERIFICATION=your_yahoo_verification_code
```

**Important:** The `NEXT_PUBLIC_APP_URL` must include the protocol (`https://`). The application will automatically add `https://` if missing, but it's better to set it correctly.

### Deployment Steps

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Fix deployment configuration"
   git push origin main
   ```

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Set environment variables in Project Settings

3. **Environment Variables in Vercel Dashboard:**
   - Go to Project Settings > Environment Variables
   - Add each variable for Production, Preview, and Development

### Common Issues and Solutions

#### 1. Invalid URL Error
**Error:** `TypeError: Invalid URL`
**Solution:** Ensure `NEXT_PUBLIC_APP_URL` includes the protocol:
- ✅ Correct: `https://suud-frontend.vercel.app`
- ❌ Incorrect: `suud-frontend.vercel.app`

#### 2. API Connection Issues
**Error:** Network errors or 404 on API calls
**Solution:** 
- Set `NEXT_PUBLIC_API_URL` to your backend URL
- Ensure backend is deployed and accessible
- Check CORS configuration in Laravel backend

#### 3. Build Failures
**Error:** Build fails with TypeScript or ESLint errors
**Solution:** 
- The project is configured to ignore these during builds
- Check `next.config.ts` settings
- Run `npm run build` locally to test

### Backend Integration

Make sure your Laravel backend is deployed and accessible. Common platforms:

- **Railway:** Easy Laravel deployment
- **DigitalOcean App Platform:** Full-stack hosting
- **AWS/Google Cloud:** More complex but scalable

Update the `NEXT_PUBLIC_API_URL` environment variable to point to your deployed backend.

### Post-Deployment Checklist

- [ ] Site loads correctly
- [ ] API calls work (check Network tab)
- [ ] Authentication flow works
- [ ] Environment-specific features work
- [ ] Meta tags and SEO data load correctly
- [ ] Responsive design works on mobile

### Monitoring

- Use Vercel Analytics for performance monitoring
- Check Vercel Function logs for server-side errors  
- Monitor API response times and errors

### Support

If you encounter issues:

1. Check Vercel deployment logs
2. Verify all environment variables are set
3. Test API endpoints independently
4. Check browser console for client-side errors
5. Review this deployment guide

For more help, contact the development team or check the Vercel documentation.
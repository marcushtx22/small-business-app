# Deployment Checklist

## Pre-deployment Setup

### 1. MongoDB Atlas Setup ✅
- [ ] Create MongoDB Atlas account
- [ ] Create a free cluster (M0)
- [ ] Create database user with read/write permissions
- [ ] Configure network access (allow 0.0.0.0/0)
- [ ] Get connection string

### 2. Environment Variables ✅
- [ ] Create `.env` file locally
- [ ] Add MongoDB connection string
- [ ] Add OpenAI API key
- [ ] Add Builder.io credentials

### 3. Local Testing ✅
- [ ] Run `npm install` in root directory
- [ ] Run `npm install` in `src/backend` directory
- [ ] Test locally with `npm run dev`
- [ ] Verify database connection

## Vercel Deployment

### 1. Install Vercel CLI
```bash
npm i -g vercel
```

### 2. Login to Vercel
```bash
vercel login
```

### 3. Deploy to Vercel
```bash
vercel
```

### 4. Configure Environment Variables in Vercel Dashboard
Go to your Vercel project → Settings → Environment Variables

Add these variables:
- `MONGODB_URI`: Your MongoDB connection string
- `OPENAI_API_KEY`: Your OpenAI API key
- `BUILDER_API_KEY`: Your Builder.io API key
- `BUILDER_MODEL_ID`: Your Builder.io model ID

### 5. Production Deployment
```bash
vercel --prod
```

## Post-deployment Verification

### 1. Check Application Health
- [ ] Visit your deployed URL
- [ ] Test the health endpoint: `https://your-app.vercel.app/health`
- [ ] Verify database connection works

### 2. Test Core Functionality
- [ ] Create a new session
- [ ] Send a message to an agent
- [ ] Generate a strategy report
- [ ] Verify data is being saved to MongoDB

### 3. Monitor Logs
- [ ] Check Vercel function logs
- [ ] Monitor MongoDB Atlas for connections
- [ ] Verify no errors in browser console

## Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Check MongoDB URI format
   - Verify network access settings
   - Ensure username/password are correct

2. **Environment Variables Not Found**
   - Verify variables are set in Vercel dashboard
   - Check variable names match exactly
   - Redeploy after adding variables

3. **Build Errors**
   - Check TypeScript compilation
   - Verify all dependencies are installed
   - Check Node.js version compatibility

### Useful Commands

```bash
# Check Vercel deployment status
vercel ls

# View deployment logs
vercel logs

# Redeploy to production
vercel --prod

# Check environment variables
vercel env ls
```

## Security Notes

- Never commit `.env` files to version control
- Use strong passwords for MongoDB users
- Regularly rotate API keys
- Monitor MongoDB Atlas for unusual activity
- Consider using MongoDB Atlas IP whitelist for production 
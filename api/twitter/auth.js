// Twitter OAuth authentication endpoint
// This will start the Twitter OAuth flow

const { TwitterApi } = require('twitter-api-v2');

// Get callback URL based on deployment
const getCallbackURL = (req) => {
  // For local development
  if (req.headers.host && req.headers.host.includes('localhost')) {
    console.log('Local development detected - using localhost URL');
    return `http://${req.headers.host}/api/twitter/callback`;
  }

  // For Vercel deployment
  const host = req.headers['x-forwarded-host'] || req.headers.host || 'movly-web.vercel.app';
  console.log('Using host for callback:', host);
  return `https://${host}/api/twitter/callback`;
};

// CORS headers for custom domain
const enableCors = (req, res) => {
  const origin = req.headers.origin;
  // Allow localhost for development
  if (origin && (origin.includes('localhost') || origin === 'https://movly.run')) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else {
    res.setHeader('Access-Control-Allow-Origin', 'https://movly.run');
  }

  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');
};

// Set cookie based on environment
const setCookieHeader = (req, res, tokenSecret) => {
  // For local development
  if (req.headers.host && req.headers.host.includes('localhost')) {
    res.setHeader('Set-Cookie', `oauth_token_secret=${tokenSecret}; HttpOnly; Path=/; Max-Age=3600; SameSite=Lax`);
  } else {
    // For production
    res.setHeader('Set-Cookie', `oauth_token_secret=${tokenSecret}; HttpOnly; Path=/; Max-Age=3600; SameSite=None; Secure`);
  }
};

module.exports = async (req, res) => {
  try {
    // Enable CORS
    enableCors(req, res);

    // Handle preflight OPTIONS request
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }

    // Debug keys
    console.log('Twitter API Keys available:', {
      apiKey: process.env.TWITTER_API_KEY ? 'Yes' : 'No',
      apiSecret: process.env.TWITTER_API_SECRET ? 'Yes' : 'No'
    });

    // Validate required environment variables
    if (!process.env.TWITTER_API_KEY || !process.env.TWITTER_API_SECRET) {
      console.error('Missing Twitter API credentials');
      return res.status(500).json({
        success: false,
        message: 'Server configuration error: Twitter API credentials not found'
      });
    }

    // Initialize Twitter client
    const client = new TwitterApi({
      appKey: process.env.TWITTER_API_KEY,
      appSecret: process.env.TWITTER_API_SECRET
    });

    // Get callback URL
    const callbackURL = getCallbackURL(req);
    console.log('Using callback URL:', callbackURL);

    // Generate auth link
    const authLink = await client.generateAuthLink(callbackURL, { linkMode: 'authorize' });
    console.log('Generated Twitter auth link successfully');

    // Set appropriate cookie based on environment
    setCookieHeader(req, res, authLink.oauth_token_secret);

    // Redirect to Twitter auth page
    console.log('Redirecting to Twitter auth URL');
    return res.redirect(307, authLink.url);
  } catch (error) {
    console.error('Twitter auth error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to start Twitter authentication',
      error: error.message
    });
  }
}; 
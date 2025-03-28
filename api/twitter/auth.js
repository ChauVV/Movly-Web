// Twitter OAuth authentication endpoint
// This will start the Twitter OAuth flow

const { TwitterApi } = require('twitter-api-v2');

// Get callback URL based on deployment
const getCallbackURL = (req) => {
  // For Vercel deployment, use the x-forwarded-host header
  const host = req.headers['x-forwarded-host'] || req.headers.host || 'movly-web.vercel.app';
  return `https://${host}/api/twitter/callback`;
};

// CORS headers for custom domain
const enableCors = (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', 'https://movly.run');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');
};

module.exports = async (req, res) => {
  // Enable CORS
  enableCors(req, res);

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
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

    // Store oauth token secret in cookie
    res.setHeader('Set-Cookie', `oauth_token_secret=${authLink.oauth_token_secret}; HttpOnly; Path=/; Max-Age=3600; SameSite=None; Secure`);

    // Redirect to Twitter auth page
    res.redirect(307, authLink.url);
  } catch (error) {
    console.error('Twitter auth error:', error);
    res.status(500).json({ success: false, message: 'Failed to start Twitter authentication', error: error.message });
  }
}; 
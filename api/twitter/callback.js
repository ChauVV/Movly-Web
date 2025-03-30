// Twitter OAuth callback endpoint
// This handles the callback from Twitter after user authenticates

const { TwitterApi } = require('twitter-api-v2');

// Main website URL with custom domain
const WEBSITE_URL = 'https://movly.run';

// Enable CORS headers
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

// Get redirect URL based on environment
const getRedirectURL = (req) => {
  // For local development
  if (req.headers.host && req.headers.host.includes('localhost')) {
    return 'http://localhost:3000';
  }
  return WEBSITE_URL;
};

// Clear cookie based on environment
const clearCookie = (req, res) => {
  if (req.headers.host && req.headers.host.includes('localhost')) {
    res.setHeader('Set-Cookie', 'oauth_token_secret=; HttpOnly; Path=/; Max-Age=0');
  } else {
    res.setHeader('Set-Cookie', 'oauth_token_secret=; HttpOnly; Path=/; Max-Age=0; SameSite=None; Secure');
  }
};

module.exports = async (req, res) => {
  // Enable CORS
  enableCors(req, res);

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Get oauth tokens
    const { oauth_token, oauth_verifier } = req.query;

    // Get oauth token secret from cookie
    const cookies = req.headers.cookie?.split(';').reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split('=');
      acc[key] = value;
      return acc;
    }, {});

    const oauth_token_secret = cookies?.oauth_token_secret;
    const redirectBaseUrl = getRedirectURL(req);

    console.log('OAuth tokens:', {
      oauth_token: oauth_token ? 'present' : 'missing',
      oauth_verifier: oauth_verifier ? 'present' : 'missing',
      oauth_token_secret: oauth_token_secret ? 'present' : 'missing',
      redirectBaseUrl
    });

    if (!oauth_token || !oauth_verifier || !oauth_token_secret) {
      return res.redirect(`${redirectBaseUrl}/airdrop?error=Invalid+Twitter+callback`);
    }

    // Initialize Twitter client
    const client = new TwitterApi({
      appKey: process.env.TWITTER_API_KEY,
      appSecret: process.env.TWITTER_API_SECRET,
      accessToken: oauth_token,
      accessSecret: oauth_token_secret
    });

    // Login with Twitter
    const { client: loggedClient, accessToken, accessSecret, screenName, userId } = await client.login(oauth_verifier);

    // Clear the oauth token secret cookie
    clearCookie(req, res);

    // Redirect to main website airdrop page with success parameter
    res.redirect(`${redirectBaseUrl}/airdrop?twitter_auth=success&twitter_username=${screenName}&twitter_id=${userId}`);

  } catch (error) {
    console.error('Twitter callback error:', error);
    const redirectBaseUrl = getRedirectURL(req);
    res.redirect(`${redirectBaseUrl}/airdrop?error=Failed+to+authenticate+with+Twitter&message=${encodeURIComponent(error.message)}`);
  }
}; 
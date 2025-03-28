// Twitter OAuth authentication endpoint
// This will start the Twitter OAuth flow

const { TwitterApi } = require('twitter-api-v2');

// Get callback URL based on deployment
const getCallbackURL = (req) => {
  const host = req.headers.host || 'localhost:3000';
  const protocol = host.includes('localhost') ? 'http' : 'https';
  return `${protocol}://${host}/api/twitter/callback`;
};

module.exports = async (req, res) => {
  try {
    // Initialize Twitter client
    const client = new TwitterApi({
      appKey: process.env.TWITTER_API_KEY,
      appSecret: process.env.TWITTER_API_SECRET
    });

    // Get callback URL
    const callbackURL = getCallbackURL(req);

    // Generate auth link
    const authLink = await client.generateAuthLink(callbackURL, { linkMode: 'authorize' });

    // Store oauth token secret in cookie
    res.setHeader('Set-Cookie', `oauth_token_secret=${authLink.oauth_token_secret}; HttpOnly; Path=/; Max-Age=3600; SameSite=Lax`);

    // Redirect to Twitter auth page
    res.redirect(307, authLink.url);
  } catch (error) {
    console.error('Twitter auth error:', error);
    res.status(500).json({ success: false, message: 'Failed to start Twitter authentication' });
  }
}; 
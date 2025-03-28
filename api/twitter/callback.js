// Twitter OAuth callback endpoint
// This handles the callback from Twitter after user authenticates

const { TwitterApi } = require('twitter-api-v2');

// Main website URL with custom domain
const WEBSITE_URL = 'https://movly.run';

module.exports = async (req, res) => {
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

    console.log('OAuth tokens:', {
      oauth_token: oauth_token ? 'present' : 'missing',
      oauth_verifier: oauth_verifier ? 'present' : 'missing',
      oauth_token_secret: oauth_token_secret ? 'present' : 'missing'
    });

    if (!oauth_token || !oauth_verifier || !oauth_token_secret) {
      return res.redirect(`${WEBSITE_URL}/airdrop?error=Invalid+Twitter+callback`);
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
    res.setHeader('Set-Cookie', 'oauth_token_secret=; HttpOnly; Path=/; Max-Age=0');

    // Redirect to main website airdrop page with success parameter
    res.redirect(`${WEBSITE_URL}/airdrop?twitter_auth=success&twitter_username=${screenName}&twitter_id=${userId}`);

  } catch (error) {
    console.error('Twitter callback error:', error);
    res.redirect(`${WEBSITE_URL}/airdrop?error=Failed+to+authenticate+with+Twitter&message=${encodeURIComponent(error.message)}`);
  }
}; 
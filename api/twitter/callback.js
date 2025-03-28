// Twitter OAuth callback endpoint
// This handles the callback from Twitter after user authenticates

const { TwitterApi } = require('twitter-api-v2');

module.exports = async (req, res) => {
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

    if (!oauth_token || !oauth_verifier || !oauth_token_secret) {
      return res.status(400).redirect('/airdrop?error=Invalid+Twitter+callback');
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

    // Redirect to airdrop page with success parameter
    res.redirect(`/airdrop?twitter_auth=success&twitter_username=${screenName}&twitter_id=${userId}`);

  } catch (error) {
    console.error('Twitter callback error:', error);
    res.redirect('/airdrop?error=Failed+to+authenticate+with+Twitter');
  }
}; 
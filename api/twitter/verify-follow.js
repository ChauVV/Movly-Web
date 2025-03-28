// Twitter Follow Verification endpoint
// Checks if a user follows the specified Twitter account

const { TwitterApi } = require('twitter-api-v2');

// The Twitter ID of the account users should follow
const TWITTER_ACCOUNT_ID = process.env.TWITTER_ACCOUNT_ID || '1903442246353215488';

// Enable CORS headers
const enableCors = (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', 'https://movly.run'); // Custom domain
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');
};

module.exports = async (req, res) => {
  // Enable CORS headers
  enableCors(req, res);

  // Handle OPTIONS request (preflight)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    console.log('Verify-follow request body:', req.body);
    const { twitterUsername } = req.body;

    if (!twitterUsername) {
      return res.status(400).json({ success: false, message: 'Twitter username is required' });
    }

    console.log(`Verifying if ${twitterUsername} follows account ID ${TWITTER_ACCOUNT_ID}`);

    // Initialize Twitter client with bearer token for app-only auth
    const client = new TwitterApi(process.env.TWITTER_BEARER_TOKEN);

    // Get user info by username
    const userResponse = await client.v2.userByUsername(twitterUsername, {
      'user.fields': 'id,name,username,profile_image_url,description'
    });

    if (!userResponse.data) {
      return res.status(404).json({ success: false, message: 'Twitter user not found' });
    }

    const userId = userResponse.data.id;
    console.log(`Found Twitter user ID: ${userId} for username: ${twitterUsername}`);

    // Check if the user follows the Movly account
    try {
      const followResponse = await client.v2.follows(userId, TWITTER_ACCOUNT_ID);
      const isFollowing = followResponse.data.length > 0;
      console.log(`User follow status: ${isFollowing ? 'Following' : 'Not following'}`);

      return res.status(200).json({
        success: true,
        isFollowing,
        user: {
          id: userId,
          username: twitterUsername,
          name: userResponse.data.name,
          profileImage: userResponse.data.profile_image_url
        }
      });
    } catch (followError) {
      console.error('Error checking follow status:', followError);
      return res.status(200).json({
        success: true,
        isFollowing: false,
        error: 'Could not verify follow status',
        user: {
          id: userId,
          username: twitterUsername,
          name: userResponse.data.name,
          profileImage: userResponse.data.profile_image_url
        }
      });
    }
  } catch (error) {
    console.error('Twitter verification error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to verify Twitter follow status',
      error: error.message
    });
  }
}; 
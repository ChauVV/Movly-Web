// Twitter Follow Verification endpoint
// Checks if a user follows the specified Twitter account

const { TwitterApi } = require('twitter-api-v2');

// The Twitter ID of the account users should follow
const TWITTER_ACCOUNT_ID = process.env.TWITTER_ACCOUNT_ID || '1903442246353215488';

module.exports = async (req, res) => {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { twitterUsername } = req.body;

    if (!twitterUsername) {
      return res.status(400).json({ success: false, message: 'Twitter username is required' });
    }

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

    // Check if the user follows the Movly account
    try {
      const followResponse = await client.v2.follows(userId, TWITTER_ACCOUNT_ID);
      const isFollowing = followResponse.data.length > 0;

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
    return res.status(500).json({ success: false, message: 'Failed to verify Twitter follow status' });
  }
}; 
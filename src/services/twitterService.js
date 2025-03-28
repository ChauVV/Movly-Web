/**
 * Service for Twitter API related operations
 */

// Twitter API endpoints with relative paths
const TWITTER_AUTH_URL = '/api/twitter/auth';
const TWITTER_CHECK_FOLLOW_URL = '/api/twitter/verify-follow';

/**
 * Redirects user to Twitter for authentication
 */
export const redirectToTwitterAuth = () => {
  // Store the current page URL so we can redirect back after auth
  localStorage.setItem('twitterAuthRedirect', window.location.href);

  // Redirect to Twitter auth
  window.location.href = TWITTER_AUTH_URL;
};

/**
 * Checks if user is authenticated with Twitter
 */
export const isTwitterAuthenticated = () => {
  return localStorage.getItem('twitterToken') !== null ||
    localStorage.getItem('twitterUsername') !== null;
};

/**
 * Checks if user follows the Movly Twitter account
 * @returns {Promise<Object>} Result with follow status
 */
export const checkTwitterFollow = async () => {
  try {
    // If we have a stored username, use it
    const twitterUsername = localStorage.getItem('twitterUsername');

    if (!twitterUsername) {
      // If no stored username, user needs to authenticate
      return { success: false, message: 'Twitter authentication required' };
    }

    const response = await fetch(TWITTER_CHECK_FOLLOW_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ twitterUsername }),
    });

    const data = await response.json();

    if (data.success && data.isFollowing) {
      // Store the follow status
      localStorage.setItem('twitterFollowing', 'true');
      return { success: true, isFollowing: true };
    } else {
      localStorage.removeItem('twitterFollowing');
      return { success: true, isFollowing: false };
    }
  } catch (error) {
    console.error('Error checking Twitter follow status:', error);
    return { success: false, message: 'Failed to verify Twitter follow status' };
  }
};

/**
 * Handles Twitter authentication callback from URL parameters
 * @param {Object} urlParams - URLSearchParams object from current URL
 */
export const handleTwitterAuthFromURL = (urlParams) => {
  const twitterAuth = urlParams.get('twitter_auth');
  const twitterUsername = urlParams.get('twitter_username');
  const twitterId = urlParams.get('twitter_id');

  if (twitterAuth === 'success' && twitterUsername && twitterId) {
    // Store Twitter info in localStorage
    localStorage.setItem('twitterUsername', twitterUsername);
    localStorage.setItem('twitterId', twitterId);
    localStorage.setItem('twitterToken', 'true'); // Just a flag that auth happened

    // Remove params from URL for cleaner UX
    const url = new URL(window.location.href);
    url.searchParams.delete('twitter_auth');
    url.searchParams.delete('twitter_username');
    url.searchParams.delete('twitter_id');
    window.history.replaceState({}, document.title, url.toString());

    return true;
  }

  return false;
}; 
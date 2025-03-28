import { db } from '../firebase/config';
import { doc, getDoc, setDoc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';

/**
 * Lưu thông tin user khi họ kết nối ví
 * @param {string} walletAddress - Địa chỉ ví của user
 * @returns {Promise<Object>} Thông tin user
 */
export const saveUserWallet = async (walletAddress) => {
  try {
    if (!walletAddress) return null;

    // Chuyển địa chỉ ví thành chữ thường để tránh trùng lặp do viết hoa/thường
    const normalizedAddress = walletAddress.toLowerCase();

    // Tham chiếu đến document của user
    const userRef = doc(db, 'users', normalizedAddress);

    // Kiểm tra xem user đã tồn tại chưa
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      // Cập nhật thời gian truy cập gần nhất
      await updateDoc(userRef, {
        lastLogin: new Date().toISOString()
      });
      return { ...userSnap.data(), id: normalizedAddress };
    } else {
      // Tạo user mới
      const userData = {
        walletAddress: normalizedAddress,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        tasks: {
          twitterFollow: false,
          twitterLikeRetweet: false,
          telegramFollow: false,
          discordFollow: false
        },
        hasClaimed: false
      };

      await setDoc(userRef, userData);
      return { ...userData, id: normalizedAddress };
    }
  } catch (error) {
    console.error('Error saving user wallet:', error);
    return null;
  }
};

/**
 * Kiểm tra thông tin hoàn thành nhiệm vụ của user
 * @param {string} walletAddress - Địa chỉ ví của user
 * @returns {Promise<Object>} Thông tin hoàn thành nhiệm vụ
 */
export const getUserTasks = async (walletAddress) => {
  try {
    if (!walletAddress) return null;

    const normalizedAddress = walletAddress.toLowerCase();
    const userRef = doc(db, 'users', normalizedAddress);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const userData = userSnap.data();
      return userData.tasks || {
        twitterFollow: false,
        twitterLikeRetweet: false,
        telegramFollow: false,
        discordFollow: false
      };
    }

    return null;
  } catch (error) {
    console.error('Error getting user tasks:', error);
    return null;
  }
};

/**
 * Cập nhật trạng thái hoàn thành nhiệm vụ
 * @param {string} walletAddress - Địa chỉ ví của user
 * @param {string} task - Tên nhiệm vụ (twitterFollow, twitterLikeRetweet, telegramFollow, discordFollow)
 * @param {boolean} completed - Trạng thái hoàn thành (true/false)
 * @returns {Promise<boolean>} Kết quả cập nhật
 */
export const updateTaskStatus = async (walletAddress, task, completed) => {
  try {
    if (!walletAddress || !task) return false;

    const normalizedAddress = walletAddress.toLowerCase();
    const userRef = doc(db, 'users', normalizedAddress);

    // Cập nhật trạng thái nhiệm vụ
    await updateDoc(userRef, {
      [`tasks.${task}`]: completed,
      lastUpdated: new Date().toISOString()
    });

    return true;
  } catch (error) {
    console.error(`Error updating task ${task}:`, error);
    return false;
  }
};

/**
 * Cập nhật trạng thái đã claim token
 * @param {string} walletAddress - Địa chỉ ví của user
 * @returns {Promise<boolean>} Kết quả cập nhật
 */
export const updateClaimStatus = async (walletAddress) => {
  try {
    if (!walletAddress) return false;

    const normalizedAddress = walletAddress.toLowerCase();
    const userRef = doc(db, 'users', normalizedAddress);

    await updateDoc(userRef, {
      hasClaimed: true,
      claimedAt: new Date().toISOString()
    });

    return true;
  } catch (error) {
    console.error('Error updating claim status:', error);
    return false;
  }
};

/**
 * Kiểm tra xem user đã claim token chưa
 * @param {string} walletAddress - Địa chỉ ví của user
 * @returns {Promise<boolean>} true nếu đã claim, false nếu chưa
 */
export const hasUserClaimed = async (walletAddress) => {
  try {
    if (!walletAddress) return false;

    const normalizedAddress = walletAddress.toLowerCase();
    const userRef = doc(db, 'users', normalizedAddress);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return userSnap.data().hasClaimed || false;
    }

    return false;
  } catch (error) {
    console.error('Error checking claim status:', error);
    return false;
  }
};

/**
 * Liên kết tài khoản Twitter với ví
 * @param {string} walletAddress - Địa chỉ ví của user
 * @param {Object} twitterInfo - Thông tin Twitter của user
 * @returns {Promise<boolean>} Kết quả cập nhật
 */
export const linkTwitterToWallet = async (walletAddress, twitterInfo) => {
  try {
    if (!walletAddress || !twitterInfo?.username) return false;

    const normalizedAddress = walletAddress.toLowerCase();
    const userRef = doc(db, 'users', normalizedAddress);

    // Kiểm tra xem Twitter ID đã được sử dụng bởi ví khác chưa
    if (twitterInfo.id) {
      const twitterQuery = query(
        collection(db, 'users'),
        where('twitterInfo.id', '==', twitterInfo.id)
      );

      const twitterSnap = await getDocs(twitterQuery);

      if (!twitterSnap.empty) {
        // Có ví khác đã sử dụng Twitter ID này
        const existingUser = twitterSnap.docs[0];
        if (existingUser.id !== normalizedAddress) {
          console.warn('Twitter account already linked to another wallet');
          return false;
        }
      }
    }

    // Cập nhật thông tin Twitter
    await updateDoc(userRef, {
      twitterInfo: twitterInfo,
      lastUpdated: new Date().toISOString()
    });

    return true;
  } catch (error) {
    console.error('Error linking Twitter to wallet:', error);
    return false;
  }
}; 
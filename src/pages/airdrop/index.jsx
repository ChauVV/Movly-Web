import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FaTwitter, FaTelegram, FaDiscord, FaCheck, FaGift } from "react-icons/fa";
import styles from "./Airdrop.module.css";
import s3 from "@assets/images/s3.jpg";
import logo from "@assets/icons/logo2.jpeg";
import tokenImage from "@assets/tokens/m200.png";
import gift1 from "@assets/images/gifts/gift1.png";
import gift2 from "@assets/images/gifts/gift2.png";
import Footer from '@/components/Footer';
import ConnectWallet from '../sale/ConnectWallet';
import {
  redirectToTwitterAuth,
  checkTwitterFollow,
  isTwitterAuthenticated,
  handleTwitterAuthFromURL
} from '@/services/twitterService';
import {
  saveUserWallet,
  getUserTasks,
  updateTaskStatus,
  hasUserClaimed,
  updateClaimStatus,
  linkTwitterToWallet
} from '@/services/userService';
import { toast } from "react-hot-toast";

const Airdrop = () => {
  const [tasks, setTasks] = useState({
    twitterFollow: false,
    twitterLikeRetweet: false,
    telegramFollow: false,
    discordFollow: false,
  });
  const [account, setAccount] = useState(null);
  const [eligible, setEligible] = useState(false);
  const [loading, setLoading] = useState({});
  const [alreadyClaimed, setAlreadyClaimed] = useState(false);
  const [claimLoading, setClaimLoading] = useState(false);
  const [searchParams] = useSearchParams();

  // Khi account thay đổi, lấy thông tin user và task từ Firebase
  useEffect(() => {
    const loadUserData = async () => {
      if (!account) return;

      try {
        // Lưu thông tin ví
        await saveUserWallet(account);

        // Kiểm tra nếu đã claim
        const claimed = await hasUserClaimed(account);
        setAlreadyClaimed(claimed);

        // Lấy thông tin nhiệm vụ đã hoàn thành
        const userTasks = await getUserTasks(account);
        if (userTasks) {
          setTasks(userTasks);
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };

    loadUserData();
  }, [account]);

  // Handle Twitter auth params if they exist
  useEffect(() => {
    // Handle Twitter auth from URL params
    if (handleTwitterAuthFromURL(searchParams) && account) {
      // Lưu thông tin Twitter vào Firebase
      const twitterUsername = localStorage.getItem('twitterUsername');
      const twitterId = localStorage.getItem('twitterId');

      if (twitterUsername && twitterId) {
        linkTwitterToWallet(account, {
          username: twitterUsername,
          id: twitterId
        });
      }

      // After successful Twitter auth, check follow status
      checkTaskStatus('twitterFollow');
    } else {
      // Check if Twitter follow is already completed
      const checkTwitterAuth = async () => {
        if (isTwitterAuthenticated() && localStorage.getItem('twitterFollowing') === 'true') {
          setTasks(prev => ({ ...prev, twitterFollow: true }));
        }
      };

      checkTwitterAuth();
    }

    // Check for error message
    const error = searchParams.get('error');
    if (error) {
      toast.error(decodeURIComponent(error).replace(/\+/g, ' '));
    }
  }, [searchParams, account]);

  useEffect(() => {
    setEligible(Object.values(tasks).every(Boolean) && !alreadyClaimed);
  }, [tasks, alreadyClaimed]);

  const checkTaskStatus = async (task) => {
    if (!account) {
      toast.error('Please connect your wallet first');
      return;
    }

    setLoading(prev => ({ ...prev, [task]: true }));

    try {
      switch (task) {
        case 'twitterFollow':
          if (!isTwitterAuthenticated()) {
            // Redirect to Twitter auth if not authenticated
            redirectToTwitterAuth();
            return;
          }

          const result = await checkTwitterFollow();

          if (result.success && result.isFollowing) {
            // Cập nhật task trong state và Firebase
            setTasks(prev => ({ ...prev, [task]: true }));
            await updateTaskStatus(account, task, true);
            toast.success('Twitter follow verified successfully!');
          } else if (result.success && !result.isFollowing) {
            toast.error('Please follow Movly on Twitter to complete this task.');
            window.open('https://twitter.com/movly_official', '_blank');
          } else {
            toast.error(result.message || 'Failed to verify Twitter follow status');
          }
          break;

        case 'twitterLikeRetweet':
          // Open the specific tweet for like/retweet
          window.open('https://twitter.com/movly_official/status/1750555132519371181', '_blank');

          // For now, just mark as completed when they click the button
          // In a real implementation, you'd verify this with an API call
          setTasks(prev => ({ ...prev, [task]: true }));
          await updateTaskStatus(account, task, true);
          toast.success('Like & Retweet task completed!');
          break;

        case 'telegramFollow':
          window.open('https://t.me/movly_official', '_blank');
          setTasks(prev => ({ ...prev, [task]: true }));
          await updateTaskStatus(account, task, true);
          toast.success('Telegram follow task completed!');
          break;

        case 'discordFollow':
          window.open('https://discord.gg/movly', '_blank');
          setTasks(prev => ({ ...prev, [task]: true }));
          await updateTaskStatus(account, task, true);
          toast.success('Discord join task completed!');
          break;

        default:
          break;
      }
    } catch (error) {
      console.error(`Error checking task ${task}:`, error);
      toast.error(`Failed to verify ${task}. Please try again.`);
    } finally {
      setLoading(prev => ({ ...prev, [task]: false }));
    }
  };

  const handleClaim = async () => {
    if (!account) {
      toast.error('Please connect your wallet first');
      return;
    }

    if (!eligible) {
      toast.error('Please complete all tasks first');
      return;
    }

    if (alreadyClaimed) {
      toast.error('You have already claimed tokens');
      return;
    }

    setClaimLoading(true);

    try {
      // Cập nhật trạng thái đã claim
      await updateClaimStatus(account);
      setAlreadyClaimed(true);

      // Thông báo thành công
      toast.success('Congratulations! Your tokens will be sent to your wallet soon.');
    } catch (error) {
      console.error('Error claiming tokens:', error);
      toast.error('Failed to claim tokens. Please try again.');
    } finally {
      setClaimLoading(false);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.airdropContainer}>
        <div className={styles.contentContainer}>
          {/* Header with Background */}
          <div className={styles.headerSection}>
            <img src={s3} alt="Header" className={styles.headerBackground} />
            <div className={styles.headerOverlay}></div>
            <header className={styles.airdropHeader}>
              <Link to="/" className={styles.logoContainer}>
                <img src={logo} alt="Movly Logo" className={styles.logo} />
                <span className={styles.logoText}>Movly</span>
              </Link>
              <h1 className={styles.headerTitle}>Join our community to get more rewards</h1>
            </header>
          </div>

          {/* Breadcrumb */}
          <div className={styles.breadcrumb}>
            <Link to="/" className={styles.breadcrumbLink}>MOVLY</Link>
            <span className={styles.breadcrumbSeparator}>/</span>
            <span className={styles.breadcrumbCurrent}>Airdrop</span>
          </div>

          <div className={styles.wrapper}>
            {/* Left Decorations - Tokens and Gift */}
            <div className={styles.leftDecoration}>
              <img src={tokenImage} alt="Movly Token" className={styles.tokenImageLarge1} />
              <img src={gift1} alt="Gift Box" className={styles.giftImage1} />
              <img src={tokenImage} alt="Movly Token" className={styles.tokenImageSmall} />
            </div>

            {/* Right Decorations - Tokens and Gift */}
            <div className={styles.rightDecoration}>
              <img src={gift2} alt="Gift Box" className={styles.giftImage2} />
              <img src={tokenImage} alt="Movly Token" className={styles.tokenImageLarge2} />
              <img src={tokenImage} alt="Movly Token" className={styles.tokenImageSmall} />
            </div>

            {/* Content Header */}
            <div className={styles.contentHeader}>
              <h1 className={styles.title}>Token Airdrop</h1>
              <p className={styles.subtitle}>Complete tasks to claim your tokens</p>

              {/* Add ConnectWallet component */}
              <ConnectWallet account={account} setAccount={setAccount} />
            </div>

            {/* Main Card */}
            <div className={styles.card}>
              {/* Progress Bar */}
              <div className={styles.progressSection}>
                <div className={styles.progressHeader}>
                  <span className={styles.progressLabel}>Progress</span>
                  <span className={styles.progressCount}>
                    {Object.values(tasks).filter(Boolean).length}/4 Tasks
                  </span>
                </div>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progressFill}
                    style={{ width: `${(Object.values(tasks).filter(Boolean).length / 4) * 100}%` }}
                  />
                </div>
              </div>

              {/* Tasks List */}
              <div className={styles.tasksList}>
                <div className={`${styles.taskItem} ${tasks.twitterFollow ? styles.completed : ''}`}>
                  <div className={styles.taskInfo}>
                    <FaTwitter className={`${styles.taskIcon} ${styles.twitter}`} />
                    <span className={styles.taskText}>Follow Twitter</span>
                  </div>
                  <button
                    onClick={() => checkTaskStatus("twitterFollow")}
                    disabled={tasks.twitterFollow || loading.twitterFollow || !account}
                    className={`${styles.button} ${tasks.twitterFollow ? styles.completedTask : ''}`}
                  >
                    {loading.twitterFollow ? "Loading..." : tasks.twitterFollow ? <FaCheck className={styles.checkIcon} /> : "Check"}
                  </button>
                </div>

                <div className={`${styles.taskItem} ${tasks.twitterLikeRetweet ? styles.completed : ''}`}>
                  <div className={styles.taskInfo}>
                    <FaTwitter className={`${styles.taskIcon} ${styles.twitter}`} />
                    <span className={styles.taskText}>Like & Retweet</span>
                  </div>
                  <button
                    onClick={() => checkTaskStatus("twitterLikeRetweet")}
                    disabled={tasks.twitterLikeRetweet || loading.twitterLikeRetweet || !account}
                    className={`${styles.button} ${tasks.twitterLikeRetweet ? styles.completedTask : ''}`}
                  >
                    {loading.twitterLikeRetweet ? "Loading..." : tasks.twitterLikeRetweet ? <FaCheck className={styles.checkIcon} /> : "Check"}
                  </button>
                </div>

                <div className={`${styles.taskItem} ${tasks.telegramFollow ? styles.completed : ''}`}>
                  <div className={styles.taskInfo}>
                    <FaTelegram className={`${styles.taskIcon} ${styles.telegram}`} />
                    <span className={styles.taskText}>Join Telegram</span>
                  </div>
                  <button
                    onClick={() => checkTaskStatus("telegramFollow")}
                    disabled={tasks.telegramFollow || loading.telegramFollow || !account}
                    className={`${styles.button} ${tasks.telegramFollow ? styles.completedTask : ''}`}
                  >
                    {loading.telegramFollow ? "Loading..." : tasks.telegramFollow ? <FaCheck className={styles.checkIcon} /> : "Check"}
                  </button>
                </div>

                <div className={`${styles.taskItem} ${tasks.discordFollow ? styles.completed : ''}`}>
                  <div className={styles.taskInfo}>
                    <FaDiscord className={`${styles.taskIcon} ${styles.discord}`} />
                    <span className={styles.taskText}>Join Discord</span>
                  </div>
                  <button
                    onClick={() => checkTaskStatus("discordFollow")}
                    disabled={tasks.discordFollow || loading.discordFollow || !account}
                    className={`${styles.button} ${tasks.discordFollow ? styles.completedTask : ''}`}
                  >
                    {loading.discordFollow ? "Loading..." : tasks.discordFollow ? <FaCheck className={styles.checkIcon} /> : "Check"}
                  </button>
                </div>
              </div>

              {/* Wallet Section */}
              <div className={styles.walletSection}>
                {alreadyClaimed ? (
                  <div className={styles.claimedMessage}>
                    <FaCheck className={styles.claimedIcon} />
                    <span>Tokens Claimed</span>
                  </div>
                ) : (
                  <button
                    className={styles.claimButton}
                    disabled={!account || !eligible || claimLoading}
                    onClick={handleClaim}
                  >
                    <FaGift className={styles.giftIcon} />
                    {claimLoading ? "Processing..." : "Claim Tokens"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.airdropFooter}>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Airdrop;

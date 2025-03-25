import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaTwitter, FaTelegram, FaDiscord, FaCheck, FaGift } from "react-icons/fa";
import Web3 from "web3";
import styles from "./Airdrop.module.css";
import s3 from "@assets/images/s3.jpg";
import logo from "@assets/icons/logo2.jpeg";
import tokenImage from "@assets/tokens/m200.png";
import gift1 from "@assets/images/gifts/gift1.png";
import gift2 from "@assets/images/gifts/gift2.png";
import Footer from '@/components/Footer';
import ConnectWallet from '../sale/ConnectWallet';

const Airdrop = () => {
  const [tasks, setTasks] = useState({
    twitterFollow: false,
    twitterLikeRetweet: false,
    telegramFollow: false,
    discordFollow: false,
  });
  const [account, setAccount] = useState(null);
  const [eligible, setEligible] = useState(false);

  useEffect(() => {
    setEligible(Object.values(tasks).every(Boolean));
  }, [tasks]);

  const checkTask = (task) => {
    setTasks((prev) => ({ ...prev, [task]: true }));
  };

  const handleClaim = () => {
    // Implementation of handleClaim function
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
                    onClick={() => checkTask("twitterFollow")}
                    disabled={tasks.twitterFollow}
                    className={`${styles.button} ${tasks.twitterFollow ? styles.completedTask : ''}`}
                  >
                    {tasks.twitterFollow ? <FaCheck className={styles.checkIcon} /> : "Check"}
                  </button>
                </div>

                <div className={`${styles.taskItem} ${tasks.twitterLikeRetweet ? styles.completed : ''}`}>
                  <div className={styles.taskInfo}>
                    <FaTwitter className={`${styles.taskIcon} ${styles.twitter}`} />
                    <span className={styles.taskText}>Like & Retweet</span>
                  </div>
                  <button
                    onClick={() => checkTask("twitterLikeRetweet")}
                    disabled={tasks.twitterLikeRetweet}
                    className={`${styles.button} ${tasks.twitterLikeRetweet ? styles.completedTask : ''}`}
                  >
                    {tasks.twitterLikeRetweet ? <FaCheck className={styles.checkIcon} /> : "Check"}
                  </button>
                </div>

                <div className={`${styles.taskItem} ${tasks.telegramFollow ? styles.completed : ''}`}>
                  <div className={styles.taskInfo}>
                    <FaTelegram className={`${styles.taskIcon} ${styles.telegram}`} />
                    <span className={styles.taskText}>Join Telegram</span>
                  </div>
                  <button
                    onClick={() => checkTask("telegramFollow")}
                    disabled={tasks.telegramFollow}
                    className={`${styles.button} ${tasks.telegramFollow ? styles.completedTask : ''}`}
                  >
                    {tasks.telegramFollow ? <FaCheck className={styles.checkIcon} /> : "Check"}
                  </button>
                </div>

                <div className={`${styles.taskItem} ${tasks.discordFollow ? styles.completed : ''}`}>
                  <div className={styles.taskInfo}>
                    <FaDiscord className={`${styles.taskIcon} ${styles.discord}`} />
                    <span className={styles.taskText}>Join Discord</span>
                  </div>
                  <button
                    onClick={() => checkTask("discordFollow")}
                    disabled={tasks.discordFollow}
                    className={`${styles.button} ${tasks.discordFollow ? styles.completedTask : ''}`}
                  >
                    {tasks.discordFollow ? <FaCheck className={styles.checkIcon} /> : "Check"}
                  </button>
                </div>
              </div>

              {/* Wallet Section */}
              <div className={styles.walletSection}>
                <button
                  className={styles.claimButton}
                  disabled={!account || !eligible}
                  onClick={handleClaim}
                >
                  <FaGift className={styles.giftIcon} />
                  Claim Tokens
                </button>
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

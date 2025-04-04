import React from 'react';
import styles from './Privacy.module.css';

const Privacy = () => {
  return (
    <div className={styles.privacyContainer}>
      <div className={styles.privacyContent}>
        <h1>Privacy Policy</h1>
        <p className={styles.lastUpdated}>Last updated: 04/04/2025</p>

        <div>
          <h2>Introduction</h2>
          <p>
            MOVLY TECHNOLOGY LIMITED (referred to as "we," "our," or "us") understands and respects your desire to maintain your privacy. This Privacy Policy explains how your information is collected, used, and disclosed through your use of the Movly move-to-earn smartwatch app ("App").
          </p>
        </div>

        <div>
          <h2>Information We Collect</h2>
          <h3>1. Information You Provide to Us</h3>
          <ul>
            <li>Name and username</li>
            <li>Email address (optional, for support purposes)</li>
            <li>Wallet address</li>
            <li>Device information for anti-cheating verification</li>
            <li>Smart watch pairing information</li>
            <li>Profile information (optional)</li>
          </ul>

          <h3>2. Information Automatically Collected</h3>
          <ul>
            <li>GPS location data (only while using the move-to-earn feature)</li>
            <li>Device information (type, model, operating system)</li>
            <li>Activity data (steps, distance, speed)</li>
            <li>Smart watch connection status and data</li>
            <li>Heart rate and other fitness metrics</li>
            <li>App usage statistics</li>
          </ul>

          <h3>3. Sensitive Information</h3>
          <p>
            We may collect health-related information such as heart rate data, movement patterns,
            exercise intensity, and other fitness metrics. This information is collected only with
            your consent and is necessary for the core functionality of our move-to-earn features.
          </p>
        </div>

        <div>
          <h2>How We Use Your Information</h2>
          <ul>
            <li>To provide and maintain the move-to-earn functionality</li>
            <li>To verify your physical activity and prevent cheating through our Machine Learning System</li>
            <li>To calculate and distribute Movly tokens</li>
            <li>To create leaderboards and social features</li>
            <li>To operate the Movly Marketplace</li>
            <li>To investigate disputes between users</li>
            <li>To provide customer support</li>
            <li>To improve our services</li>
            <li>To send important updates about the service</li>
            <li>To prevent fraud and ensure security</li>
          </ul>
        </div>

        <div>
          <h2>Data Storage and Security</h2>
          <p>
            We implement industry-standard security measures to protect your data. However, no method
            of transmission over the internet is 100% secure.
          </p>
          <ul>
            <li>All data is encrypted in transit and at rest</li>
            <li>We maintain secure server storage with regular security audits</li>
            <li>We implement limited employee access controls</li>
            <li>We do not store your private keys or wallet passwords</li>
            <li>GPS data is only stored temporarily for activity verification</li>
            <li>We use secure protocols for all data transfers</li>
          </ul>
        </div>

        <div>
          <h2>Your Rights</h2>
          <p>Under applicable privacy laws, you have the right to:</p>
          <ul>
            <li>Access your personal data</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Opt-out of non-essential data collection</li>
            <li>Export your data</li>
            <li>Lodge complaints with relevant authorities</li>
          </ul>
        </div>

        <div>
          <h2>International Data Transfers</h2>
          <p>
            Your data may be processed in various countries where we operate. We ensure appropriate
            safeguards are in place for international transfers, including standard contractual clauses
            and other legal mechanisms to protect your data.
          </p>
        </div>

        <div>
          <h2>Data Retention</h2>
          <p>We retain your data only as long as necessary for:</p>
          <ul>
            <li>Providing our services</li>
            <li>Meeting legal requirements</li>
            <li>Resolving disputes</li>
            <li>Preventing fraud</li>
            <li>Enforcing agreements</li>
          </ul>
        </div>

        <div>
          <h2>Special Provisions for EU Users</h2>
          <p>
            For users in the European Economic Area (EEA), we comply with GDPR requirements including:
          </p>
          <ul>
            <li>Legal basis for processing</li>
            <li>Data subject rights</li>
            <li>Data protection impact assessments</li>
            <li>Breach notifications</li>
            <li>Cross-border transfer safeguards</li>
          </ul>
        </div>

        <div>
          <h2>Cookie Policy</h2>
          <p>
            Our App and website use cookies and similar technologies to:
          </p>
          <ul>
            <li>Remember your preferences</li>
            <li>Analyze usage patterns</li>
            <li>Enhance security</li>
            <li>Provide social media features</li>
            <li>Deliver relevant advertising</li>
          </ul>
        </div>

        <div>
          <h2>Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any significant
            changes through the App and our website. Continued use of our services after changes
            constitutes acceptance of the updated policy.
          </p>
        </div>

        <div>
          <h2>Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy or our privacy practices, please contact us at:{' '}
            <a href="mailto:support@movly.run">support@movly.run</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Privacy; 
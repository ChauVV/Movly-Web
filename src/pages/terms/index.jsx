import React from 'react';
import styles from './Terms.module.css';

const Terms = () => {
  return (
    <div className={styles.termsContainer}>
      <div className={styles.termsContent}>
        <h1>Movly Terms of Use</h1>
        <p className={styles.lastUpdated}>Last updated: 04/04/2025</p>

        <div className={styles.termsIntro}>
          <p>
            <strong>Movly</strong> is a Web3 lifestyle app (<strong style={{ display: 'inline' }}>"App"</strong>) launched by MOVLY TECHNOLOGY LIMITED (<strong style={{ display: 'inline' }}>"Company"</strong>).
            Users of the App can accumulate tokens by walking, jogging, or running outdoors with their smartwatch.
          </p>
          <p>
            Access to, and use of, the App and the services available through the App (<strong style={{ display: 'inline' }}>"Services"</strong>) are subject to the following
            terms, conditions and notices (<strong style={{ display: 'inline' }}>"Terms of Use"</strong>). By using the Services, you are agreeing to all of the Terms of Use,
            as may be updated by us from time to time. You should check this page regularly to take notice of any changes we may have made to the Terms of Use.
          </p>
        </div>

        <div>
          <h2>1. Amendments to Terms of Use</h2>
          <p>
            The Company reserves the right to amend these Terms of Use from time to time. Amendments will be effective immediately upon notification
            on the App or through the Services. Your continued use of the App and the Services following such notification will represent an agreement
            by you to be bound by the Terms of Use as amended.
          </p>
        </div>

        <div>
          <h2>2. Who may use the App?</h2>
          <p>
            You must be at least 18 years old, or the age of legal majority in your jurisdiction of residence, to access the App and the Services.
            As a user you should abide by all safety precautions, including resting, hydrating and modifying as needed.
          </p>
          <p>
            The App and the Services are offered only for your personal, non-commercial use. When interacting with the App or the Services,
            you should exercise caution and common sense to protect your personal safety and health. You agree that the Company is not responsible
            or liable for any loss, damage, injury, or other matters of any sort incurred as the result of interacting with the App or the Services.
          </p>
          <p>By using the App or the Services you represent and warrant that your access to and use of the App and Services is lawful in your
            country of residence in the manner in which you access and use them.</p>
        </div>

        <div>
          <h2>3. App</h2>
          <p>
            Access to the App is permitted on a temporary basis, and we reserve the right to withdraw or amend the Services without notice.
            We will not be liable if for any reason the App is unavailable at any time or for any period. From time to time, we may restrict
            access to some parts or all of the App.
          </p>
          <p>
            We may from time to time change the rate at which users accumulate tokens using the App. We may reverse benefits allocated to you
            if we reasonably consider the circumstances justify a reversal, for example if they are allocated to you by mistake or if you
            accumulated them by misusing the App or the Services or in a way that is fraudulent, dishonest or otherwise unacceptable.
          </p>
          <p>
            You are responsible for ensuring your security of access to any digital wallet used by you in connection with the App or the Services.
          </p>
          <p>
            We make no representation and give no warranty that tokens accumulated through the App or the Services will have any particular value
            or any monetary value at all. You are liable for any loss or diminution value of tokens.
          </p>
        </div>

        <div>
          <h2>4. Safety Warnings</h2>
          <p className={styles.warning}>
            THE COMPANY OFFERS HEALTH AND FITNESS INFORMATION AND IS DESIGNED FOR EDUCATIONAL AND ENTERTAINMENT PURPOSES ONLY. YOU SHOULD CONSULT
            YOUR PHYSICIAN OR GENERAL PRACTITIONER BEFORE BEGINNING A NEW FITNESS PROGRAM USING THE APP OR THE SERVICES. YOU SHOULD NOT RELY ON
            THIS INFORMATION AS A SUBSTITUTE FOR, NOR DOES IT REPLACE, PROFESSIONAL MEDICAL ADVICE, DIAGNOSIS, OR TREATMENT.
          </p>
          <p>
            IF YOU HAVE ANY CONCERNS OR QUESTIONS ABOUT YOUR HEALTH, YOU SHOULD ALWAYS CONSULT WITH A PHYSICIAN, GENERAL PRACTITIONER OR OTHER
            HEALTHCARE PROFESSIONAL. DO NOT DISREGARD, AVOID OR DELAY OBTAINING MEDICAL OR HEALTH RELATED ADVICE FROM YOUR HEALTHCARE PROFESSIONAL
            BECAUSE OF YOUR QUEST TO ACCUMULATE TOKENS ON THE MOVE USING THE APP OR THE SERVICES. THE USE OF ANY INFORMATION PROVIDED THROUGH THE
            APP AND THE SERVICES IS SOLELY AT YOUR OWN RISK AND IS NOT MEDICAL OR HEALTHCARE ADVICE.
          </p>
        </div>

        <div>
          <h2>5. Anti-Cheating</h2>
          <p>
            After each activity session, our Machine Learning Anti-Cheating System (<strong style={{ display: 'inline' }}>"System"</strong>) will evaluate if users have
            exploited the Movly move-to-earn mechanics. The System will add or deduct users' Trust Score at the end of each session. Users
            cannot start a new session before the System completes the analysis.
          </p>
          <p>
            A user starts with a 100/100 Trust Score (TS). When a user's Trust Score is below 100, the user cannot interact with the NFT
            marketplace, or transfer between spending and wallet accounts. If a user is moving outdoor without cheating, the Trust Score will
            gradually return to 100/100.
          </p>
          <p>The following activities are considered cheating and will result in Trust Score reduction and no earnings:</p>
          <ul>
            <li>GPS spoofing or location hacking</li>
            <li>Motion simulation or movement data manipulation</li>
            <li>Using multiple devices simultaneously</li>
            <li>Using automated movement or devices</li>
            <li>Any other form of system manipulation</li>
          </ul>
        </div>

        <div>
          <h2>6. User Representations and Warranties</h2>
          <p>In becoming a user of the App and the Services, you represent and warrant that all of the following statements are true:</p>
          <ul>
            <li>No physician has ever informed you that you have a heart condition or that you should only do physical activities recommended by a physician</li>
            <li>You have never felt chest pain when engaging in physical activity</li>
            <li>You have not experienced chest pain when not engaged in physical activity at any time within the past month</li>
            <li>You have never lost your balance because of dizziness and you have never lost consciousness</li>
            <li>You do not have a bone or joint problem that could be made worse by a change in your physical activity</li>
            <li>Your physician is not currently prescribing medication for your blood pressure or heart condition</li>
            <li>You do not know of any other reason you should not exercise</li>
          </ul>
        </div>

        <div>
          <h2>7. Intellectual Property</h2>
          <p>
            The App and all content, including but not limited to text, graphics, logos, button icons, images, audio clips, digital downloads,
            data compilations, and software, are the property of the Company or its content suppliers and protected by international copyright laws.
          </p>
          <p>
            The Company's trademarks and trade dress may not be used in connection with any product or service that is not the Company's,
            in any manner that is likely to cause confusion among customers, or in any manner that disparages or discredits the Company.
          </p>
        </div>

        <div>
          <h2>8. Disclaimer of Liability</h2>
          <p>
            To the fullest extent permitted by applicable law, the Company shall not be liable for any indirect, incidental, special,
            consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss
            of data, use, goodwill, or other intangible losses, resulting from:
          </p>
          <ul>
            <li>Your use or inability to use the App or Services</li>
            <li>Any unauthorized access to or use of our servers and/or any personal information stored therein</li>
            <li>Any interruption or cessation of transmission to or from the App</li>
            <li>Any bugs, viruses, trojan horses, or the like that may be transmitted to or through the App</li>
            <li>Any errors or omissions in any content or for any loss or damage incurred as a result of the use of any content posted,
              emailed, transmitted, or otherwise made available through the App</li>
          </ul>
        </div>

        <div>
          <h2>9. Governing Law</h2>
          <p>
            These Terms of Use are governed by and construed in accordance with the laws of British Virgin Islands. You agree to submit to
            the exclusive jurisdiction of the courts of British Virgin Islands.
          </p>
        </div>

        <div>
          <h2>10. Contact Us</h2>
          <p>
            If you have any questions about these Terms of Use, please contact us at:{' '}
            <a href="mailto:support@movly.run">support@movly.run</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Terms; 
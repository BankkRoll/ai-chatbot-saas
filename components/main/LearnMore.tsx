import React from 'react';
import styles from './LearnMore.module.css';

const infoData = [
  {
    title: 'Highly Customizable',
    description:
      'Tailor your chatbot to perfectly match your brand and business needs with our user-friendly customization options.',
  },
  {
    title: 'Cutting-Edge AI',
    description:
      'Leverage advanced AI technology to empower your chatbot with a deep understanding of user queries and deliver accurate, context-aware responses.',
  },
  {
    title: '24/7 Availability',
    description:
      'Ensure uninterrupted support for your users with our always-available chatbot, providing assistance and answers whenever they need it.',
  }
];

export function LearnMore() {
  return (
    <div className={styles.container}>
      {infoData.map((card, index) => (
        <div key={index} className={`${styles.box} ${styles['box-' + (index + 1)]}`}>
          <span></span>
          <div className={styles.content}>
            <h2>{card.title}</h2>
            <p>{card.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

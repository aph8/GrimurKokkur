import React, { ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styles from '@/styles/vorur/TextSection.module.scss';

interface TextSectionProps {
  title: string;
  text?: string;
  isMarkdown?: boolean;
  children?: ReactNode;
}

const TextSection: React.FC<TextSectionProps> = ({
  title,
  text = '',
  isMarkdown = false,
  children,
}) => (
  <section className={styles.textSection}>
    <h2 className={styles.textSection__title}>{title}</h2>
    <div className={styles.textSection__content}>
      {children ? (
        children
      ) : isMarkdown ? (
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {text}
        </ReactMarkdown>
      ) : (
        text.split('\n').map((line, i) => <p key={i}>{line}</p>)
      )}
    </div>
  </section>
);

export default TextSection;

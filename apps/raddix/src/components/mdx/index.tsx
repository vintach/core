import Highlight, { defaultProps, PrismTheme } from 'prism-react-renderer';
import { ReactNode, useState } from 'react';
import theme from 'prism-react-renderer/themes/dracula';
import classNames from 'classnames';
import styles from './mdx.module.scss';
import { componentsDemo } from '@/demo';

interface Children {
  children?: ReactNode;
}

interface TextProps extends Children {
  as: keyof JSX.IntrinsicElements;
  className: string;
  isTitle?: boolean;
  id?: string;
}

const Text = ({ as: Comp, className, children, isTitle, id }: TextProps) => {
  return (
    <Comp className={className} data-title={isTitle} id={id}>
      {children}
    </Comp>
  );
};

export const TextPre = (props: Children) => {
  const [isCopied, setIsCopied] = useState(false);

  const children: any = props.children;

  const className = children?.props.className || '';
  const code = children?.props.children.trim();
  const language = className.replace(/language-/, '');
  const btnClass = classNames(styles.textPreBtn, {
    [styles.textPreBtnSuccess]: isCopied
  });

  const handleCopy = (str: any) => {
    if (isCopied) return;

    navigator.clipboard.writeText(str).then(() => setIsCopied(true));
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className={styles.textPre}>
      <button className={btnClass} onClick={() => handleCopy(code)}>
        {isCopied ? '🎉 Copied!' : 'Copy'}
      </button>
      <Highlight
        {...defaultProps}
        code={code}
        language={language}
        theme={theme as PrismTheme}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={className}
            style={{
              ...style,
              backgroundColor: 'transparent'
            }}
            translate='no'
          >
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })} translate='no'>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} translate='no' />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
};

const MDXComponents = {
  h1: ({ children, ...props }: Children) => (
    <Text as='h1' className={styles.title} {...props}>
      {children}
    </Text>
  ),
  h2: ({ children, ...props }: Children) => (
    <Text as='h2' className={styles.subTitle} isTitle {...props}>
      {children}
    </Text>
  ),
  h3: ({ children, ...props }: Children) => (
    <Text as='h3' className={styles.h3} isTitle {...props}>
      {children}
    </Text>
  ),
  p: ({ children }: Children) => (
    <Text as='p' className={styles.paragraph}>
      {children}
    </Text>
  ),
  pre: TextPre,
  ...componentsDemo
};

export default MDXComponents;
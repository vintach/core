import type { ReactNode } from 'react';
import type { Language } from 'prism-react-renderer';
import { useState } from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/dracula';
import { componentsDemo } from '@/demo';
import { Card, CardGroup } from '../card';
import { ApiTable } from '../api-table/api-table';

export interface Children {
  children?: ReactNode;
}

export interface TextProps extends Children {
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

export interface TextPreProps {
  props: {
    children: string;
    className: string;
  };
}

export const TextPre = (props: Children) => {
  const [isCopied, setIsCopied] = useState(false);

  const children = props.children as TextPreProps;

  const classNameRo = children.props.className || '';
  const code = children.props.children.trim();
  const language = classNameRo.replace(/language-/, '');
  const copyButtonStyles = isCopied
    ? 'bg-blue-60 text-white'
    : 'bg-white/60 text-gray-80';
  const handleCopy = (str: string) => {
    if (isCopied) {
      return;
    }

    navigator.clipboard
      .writeText(str)
      .then(() => setIsCopied(true))
      .catch(err => console.log(err));

    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className='group relative my-6 overflow-auto rounded-lg border border-solid border-white/10 bg-white/5 px-8 py-5 text-[1.05rem] scrollbar-thumb-gray-40 scrollbar-track-rounded-xl'>
      <button
        className={`absolute right-8 top-4 cursor-pointer rounded-lg border-0 px-2 py-1 text-sm opacity-0 transition-all duration-200 ease-in group-hover:opacity-100 active:scale-95 ${copyButtonStyles}`}
        onClick={() => handleCopy(code)}
      >
        {isCopied ? '🎉 Copied!' : 'Copy'}
      </button>
      <Highlight
        {...defaultProps}
        code={code}
        language={language as Language}
        theme={theme}
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
              <div {...getLineProps({ line })} key={i} translate='no'>
                {line.map((token, key) => (
                  <span
                    {...getTokenProps({ token })}
                    key={key}
                    translate='no'
                  />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
};

export const MDXComponents = {
  h1: ({ children, ...props }: Children) => (
    <Text
      as='h1'
      className='mb-md text-[clamp(38px,_45vw,_42px)] font-bold'
      {...props}
    >
      {children}
    </Text>
  ),
  h2: ({ children, ...props }: Children) => (
    <Text
      as='h2'
      className='mb-sm mt-3xl text-[clamp(28px,_32vw,_32px)] font-bold'
      isTitle
      {...props}
    >
      {children}
    </Text>
  ),
  h3: ({ children, ...props }: Children) => (
    <Text
      as='h3'
      className='mb-sm mt-xl text-[clamp(19px,_32vw,_23px)] font-semibold'
      isTitle
      {...props}
    >
      {children}
    </Text>
  ),
  p: ({ children }: Children) => (
    <Text
      as='p'
      className='text-[clamp(16px,_18vw,_18px)] leading-8 opacity-75'
    >
      {children}
    </Text>
  ),
  pre: TextPre,
  ul: ({ children }: Children) => <ul className='my-md pl-lg'>{children}</ul>,
  li: ({ children }: Children) => (
    <li className='mb-xs list-disc text-[clamp(16px,_18vw,_18px)] opacity-75'>
      {children}
    </li>
  ),
  Card,
  CardGroup,
  ApiTable,
  ...componentsDemo
};

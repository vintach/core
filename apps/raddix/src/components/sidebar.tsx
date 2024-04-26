'use client';

import { defaultLocale, useLocale } from '@/i18n';
import type { SidebarItem } from '@/types/content';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarProps {
  content: SidebarItem[];
}

export interface TreeItem {
  title: string;
  path?: string;
  heading?: boolean;
  children?: TreeItem[];
}

export interface TreeProps {
  items: TreeItem[];
  root?: boolean;
  lang?: string;
  defaultLang?: string;
  showLine?: boolean;
}

export const Tree = ({
  items,
  root,
  lang,
  defaultLang,
  showLine = true
}: TreeProps) => {
  const currentPath = usePathname();

  return (
    <ul
      className={
        root
          ? ''
          : `mb-sm pl-[15px] ${showLine ? 'border-l-[1px] border-gray-100' : ''}`.trim()
      }
    >
      {items.map(({ title, path, heading, children }) => {
        const slug = lang === defaultLang ? path : `/${lang}${path}`;
        const isActive = slug === currentPath;
        return (
          <li
            key={`${title}-${path}`}
            className={`${heading ? 'pb-sm pt-xs' : ''}`}
          >
            {!path ? (
              <span
                className={`${heading ? 'mb-3 font-semibold text-white' : 'py-xs text-gray-50 hover:text-gray-100 dark:text-gray-30 dark:hover:text-gray-10'} block text-sm font-medium leading-5`}
              >
                {title}
              </span>
            ) : (
              <Link
                className={`${isActive ? 'text-purple-40' : 'text-gray-50 hover:text-gray-100 dark:text-gray-30 dark:hover:text-gray-10'} block py-xs text-sm leading-5 tracking-[-0.12px] `}
                href={`${slug}`}
              >
                {title}
              </Link>
            )}
            {children ? (
              <Tree
                items={children}
                root={heading}
                lang={lang}
                defaultLang={defaultLang}
                showLine={showLine}
              />
            ) : null}
          </li>
        );
      })}
    </ul>
  );
};

export const Sidebar = ({ content }: SidebarProps) => {
  const currentLang = useLocale();

  return (
    <aside className='sticky top-[125px] h-[calc(100vh-125px)] w-64 overflow-y-auto scrollbar-thin scrollbar-track-gray-20/10 scrollbar-thumb-gray-40/50 scrollbar-track-rounded scrollbar-thumb-rounded-lg'>
      <Tree
        items={content}
        root
        lang={currentLang}
        defaultLang={defaultLocale}
        showLine={false}
      />
    </aside>
  );
};
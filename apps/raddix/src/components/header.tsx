import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { Menu } from './menu';
import { Language } from './language';
import { useIsMobile } from '@/hooks/useIsMobile';
import { MenuMobile } from './menu-mobile';
import { Message } from './message';

export const Header = () => {
  const [scrollY, setScrollY] = useState<number>(0);
  const [isMenuMobile, setIsMenuMobile] = useState<boolean>(false);
  const { locale } = useRouter();

  const isMobile = useIsMobile('640px');

  const updateScroll = () => {
    if (window.scrollY < 10) {
      setScrollY(window.scrollY);
    }
  };

  const onScrollHeaderStyles =
    scrollY > 2 && !isMenuMobile
      ? 'bg-black/80 backdrop-saturate-100 backdrop-blur shadow-sm shadow-white/10'
      : '';

  useEffect(() => {
    window.addEventListener('scroll', updateScroll);
    return () => window.removeEventListener('scroll', updateScroll);
  }, []);

  return (
    <header
      className={`sticky left-0 top-0 z-20 w-full bg-black transition-all duration-100 ${onScrollHeaderStyles}`}
    >
      <div className='mx-auto flex h-20 w-full max-w-std justify-between px-sm py-4 '>
        <Link className='flex items-center gap-1.5' href='/' locale={locale}>
          <Image src='/raddix.svg' alt='Raddix logo' width={24} height={36} />
          <h1 className='text-[1.8rem] font-semibold'>raddix</h1>
        </Link>

        {!isMobile && (
          <div className='flex items-center'>
            <Message text='This site is under construction' />
            <Menu />
            <Language />
          </div>
        )}

        {isMobile && (
          <MenuMobile isActive={isMenuMobile} setIsActive={setIsMenuMobile} />
        )}
      </div>
    </header>
  );
};
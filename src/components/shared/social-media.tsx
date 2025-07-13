'use client';
import React from 'react';
import { Instagram, Send, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import useSWR from 'swr';
import { BRAND_NAME } from '@/constants/name';

interface SocialMediaConfig {
  id: string;
  key: string;
  value: string;
  createdAt: string;
  updatedAt: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const SocialMediaCard: React.FC = () => {
  const t = useTranslations('SocialMediaCard');
  const { data, error, isLoading } = useSWR<SocialMediaConfig[]>(
    '/api/admin/settings/social-urls',
    fetcher
  );

  // Extract social media URLs from the fetched data
  const instagramUrl =
    data?.find((config: SocialMediaConfig) => config.key === 'instagram_url')
      ?.value || 'https://www.instagram.com/vizamaster.uz/';
  const telegramUrl =
    data?.find((config: SocialMediaConfig) => config.key === 'telegram_url')
      ?.value || 'https://t.me/VIZAMASTERXBA';

  return (
    <div className="relative flex flex-col items-center justify-center p-8 bg-white rounded-lg transform transition-transform hover:scale-105">
      <div className="absolute top-0 -z-10 h-full w-full bg-white">
        <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[80px]"></div>
      </div>
      <div className="w-24 h-24 mb-4">
        <Image
          src="/logos/dark_logo_nobg.gif"
          alt="Profile Picture"
          width={96}
          height={96}
          className="rounded-full"
        />
      </div>
      <h2 className="text-2xl font-bold mb-2 textGradient" translate="no">
        {BRAND_NAME}
      </h2>
      <p className="text-lg mb-6 text-center text-gray-600">
        {t('description')}
      </p>

      {isLoading ? (
        <div className="flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
          <span className="ml-2 text-gray-500">Loading...</span>
        </div>
      ) : error ? (
        <div className="text-red-500">Failed to load social media links</div>
      ) : (
        <div className="flex space-x-4">
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'flex items-center space-x-2 bg-pink-500 px-4 py-2 rounded-full text-white transition-colors hover:bg-pink-600'
            )}
          >
            <Instagram className="w-6 h-6" />
            <span>{t('instagram')}</span>
          </a>
          <a
            href={telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'flex items-center space-x-2 bg-blue-500 px-4 py-2 rounded-full text-white transition-colors hover:bg-blue-600'
            )}
          >
            <Send className="w-6 h-6" />
            <span>{t('telegram')}</span>
          </a>
        </div>
      )}
    </div>
  );
};

export default SocialMediaCard;

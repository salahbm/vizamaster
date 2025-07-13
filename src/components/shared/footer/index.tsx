import { DB } from '@/lib/db';
import FooterContent from './footer-content';

const Footer = async () => {
  // Server-side data fetching
  const data = await DB.config.findMany({
    where: {
      key: {
        in: ['instagram_url', 'telegram_url'],
      },
    },
  });

  const instagramUrl =
    data.find((config) => config.key === 'instagram_url')?.value ??
    'https://www.instagram.com/vizamaster.uz/';
  const telegramUrl =
    data.find((config) => config.key === 'telegram_url')?.value ??
    'https://t.me/VIZAMASTERXBA';

  // Pass the fetched data to the client component
  return (
    <FooterContent instagramUrl={instagramUrl} telegramUrl={telegramUrl} />
  );
};

export default Footer;

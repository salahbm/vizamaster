import { DB } from '@/lib/db';
import FooterContent from './footer-content';

const Footer = async () => {
  // Server-side data fetching
  let instagramUrl = '';
  let telegramUrl = '';

  try {
    const data = await DB.config.findMany({
      where: {
        key: {
          in: ['instagram_url', 'telegram_url'],
        },
      },
    });

    // Only update URLs if we successfully got data
    instagramUrl =
      data.find((config) => config.key === 'instagram_url')?.value ??
      instagramUrl;
    telegramUrl =
      data.find((config) => config.key === 'telegram_url')?.value ??
      telegramUrl;
  } catch (error) {
    // If there's an error (like table doesn't exist), we'll use the default values
    console.error('Error fetching social media config:', error);
  }

  // Pass the fetched data to the client component
  return (
    <FooterContent instagramUrl={instagramUrl} telegramUrl={telegramUrl} />
  );
};

export default Footer;

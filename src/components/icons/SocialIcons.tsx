import { FaWhatsapp, FaFacebookF, FaInstagram, FaXTwitter, FaTiktok, FaEnvelope } from 'react-icons/fa6';

export const WhatsAppIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <FaWhatsapp className={className} aria-hidden />
);

export const FacebookIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <FaFacebookF className={className} aria-hidden />
);

export const InstagramIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <FaInstagram className={className} aria-hidden />
);

export const XIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <FaXTwitter className={className} aria-hidden />
);

export const TikTokIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <FaTiktok className={className} aria-hidden />
);

export const MailIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <FaEnvelope className={className} aria-hidden />
);

export default {
  WhatsAppIcon,
  FacebookIcon,
  InstagramIcon,
  XIcon,
  TikTokIcon,
  MailIcon,
};

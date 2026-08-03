import { Link } from 'react-router-dom';
import { useCMS } from '../../context/CMSContext';

export default function BannerRenderer({ position }: { position: 'top' | 'middle' | 'bottom' }) {
  const { homeSettings } = useCMS();
  
  if (!homeSettings.banners) return null;

  const now = new Date();
  const activeBanners = homeSettings.banners.filter((banner: any) => {
    if (!banner.enabled) return false;
    if (banner.position !== position) return false;
    if (banner.startDate && new Date(banner.startDate) > now) return false;
    if (banner.endDate && new Date(banner.endDate) < now) return false;
    return true;
  });

  if (activeBanners.length === 0) return null;

  return (
    <>
      {activeBanners.map((banner: any) => (
        <section key={banner.id} className="w-full relative bg-gray-900 text-white overflow-hidden py-16 md:py-24">
          {banner.image && (
            <div className="absolute inset-0 z-0">
              <img src={banner.image} alt={banner.heading} className="w-full h-full object-cover opacity-40" />
            </div>
          )}
          
          <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex flex-col items-center text-center">
            {banner.type && (
              <span className="font-ui text-xs tracking-[0.2em] uppercase text-brand-pink mb-4">
                {banner.type}
              </span>
            )}
            
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl mb-6">
              {banner.heading}
            </h2>
            
            {banner.description && (
              <p className="font-body text-base md:text-lg text-gray-300 max-w-2xl mb-8">
                {banner.description}
              </p>
            )}
            
            {banner.buttonText && (
              <Link
                to={banner.buttonLink || '/shop'}
                className="inline-block bg-white text-black px-8 py-4 font-ui text-sm uppercase tracking-widest hover:bg-brand-pink hover:text-white transition-colors"
              >
                {banner.buttonText}
              </Link>
            )}
          </div>
        </section>
      ))}
    </>
  );
}

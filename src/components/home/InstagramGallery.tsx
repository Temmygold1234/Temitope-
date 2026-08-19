import { Instagram } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export default function InstagramGallery() {
  const { homeSettings } = useCMS();
  const images = homeSettings?.instagram || [];

  return (
    <section className="py-24 bg-white">
      <div className="text-center mb-12">
        <a href="#" className="inline-flex items-center gap-2 hover:text-brand-pink transition-colors">
          <Instagram size={24} />
          <h2 className="text-2xl font-ui tracking-wide">@TemmyLuxury</h2>
        </a>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-1">
        {images.map((img: string, i: number) => (
          <a key={i} href="#" className="group relative aspect-square block overflow-hidden bg-gray-100">
            <img src={img} alt="Instagram Post" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-brand-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
              <Instagram size={32} />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

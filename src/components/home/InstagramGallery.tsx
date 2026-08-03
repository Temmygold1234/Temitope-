import { Instagram } from 'lucide-react';

const IMAGES = [
  "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&q=80",
  "https://images.unsplash.com/photo-1599643478524-fb66f70a0066?w=500&q=80",
  "https://images.unsplash.com/photo-1618218168350-6e7c81151b64?w=500&q=80",
  "https://images.unsplash.com/photo-1582588677317-046649f8546b?w=500&q=80",
  "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=500&q=80",
];

export default function InstagramGallery() {
  return (
    <section className="py-24 bg-white">
      <div className="text-center mb-12">
        <a href="#" className="inline-flex items-center gap-2 hover:text-brand-pink transition-colors">
          <Instagram size={24} />
          <h2 className="text-2xl font-ui tracking-wide">@TemmyLuxury</h2>
        </a>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-1">
        {IMAGES.map((img, i) => (
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

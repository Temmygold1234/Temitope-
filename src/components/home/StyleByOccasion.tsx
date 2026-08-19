import { Link } from 'react-router-dom';

const OCCASIONS = [
  { name: "Office Style", subtitle: "Refined Professional", image: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=800&q=80" },
  { name: "Evening Luxury", subtitle: "Gala & Red Carpet", image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=800&q=80" },
  { name: "Weekend Collection", subtitle: "Casual Luxe", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80" },
  { name: "Wedding Guest", subtitle: "Elegant Jetsetter", image: "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?w=800&q=80" },
];

export default function StyleByOccasion() {
  return (
    <section className="bg-white">
      {/* Editorial Navigation Grid */}
      <div className="bg-white border-t border-b border-gray-100 grid grid-cols-2 md:grid-cols-4 px-4 md:px-12 py-8 gap-8 items-center max-w-7xl mx-auto">
        {OCCASIONS.map((occasion, index) => (
          <div key={index} className={`flex flex-col gap-2 ${index < OCCASIONS.length - 1 ? 'md:border-r md:border-gray-100 md:pr-4' : ''}`}>
            <div className="font-heading italic text-xl text-brand-black">{occasion.name}</div>
            <div className="font-ui text-[10px] text-gray-400 uppercase tracking-widest">{occasion.subtitle}</div>
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {OCCASIONS.map((occasion, index) => (
            <Link
              key={occasion.name}
              to={`/collections?occasion=${occasion.name.toLowerCase().replace(' ', '-')}`}
              className={`group relative overflow-hidden rounded-sm block ${index === 0 || index === 3 ? 'md:aspect-[16/9]' : 'md:aspect-[4/3]'} aspect-[4/3]`}
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-500 z-10" />
              <img
                src={occasion.image || undefined}
                alt={occasion.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center">
                <span className="text-white font-heading text-2xl md:text-3xl tracking-wide mb-4">
                  {occasion.name}
                </span>
                <span className="text-white border-b border-white pb-1 font-ui text-sm uppercase tracking-widest opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                  Shop Now
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

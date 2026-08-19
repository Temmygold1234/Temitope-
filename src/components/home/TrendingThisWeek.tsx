import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Heart, Eye } from 'lucide-react';
import { motion } from 'motion/react';
import { useCart } from '../../context/CartContext';
import { useCMS } from '../../context/CMSContext';

export default function TrendingThisWeek() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { products } = useCMS();
  const trendingProducts = products.filter(p => p.isTrending);
  const { addToCart } = useCart();

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-heading text-brand-black mb-4">Trending This Week</h2>
            <div className="w-16 h-0.5 bg-brand-pink"></div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => scroll('left')} className="p-2 border border-gray-300 rounded-full hover:border-brand-pink hover:text-brand-pink transition-colors">
              <ChevronLeft size={20} />
            </button>
            <button onClick={() => scroll('right')} className="p-2 border border-gray-300 rounded-full hover:border-brand-pink hover:text-brand-pink transition-colors">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {trendingProducts.map((product) => (
            <div key={product.id} className="min-w-[280px] md:min-w-[320px] snap-start group">
              <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-4 rounded-sm">
                <img
                  src={product.image || undefined}
                  alt={product.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.isNewArrival && (
                    <span className="bg-white text-brand-black text-xs font-ui uppercase tracking-wider px-3 py-1">New</span>
                  )}
                  {product.isOnSale && (
                    <span className="bg-brand-pink text-white text-xs font-ui uppercase tracking-wider px-3 py-1">Sale</span>
                  )}
                </div>

                {/* Hover Actions */}
                <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0 flex flex-col gap-2 z-20">
                  <div className="flex gap-2 justify-center">
                    <button className="bg-white p-3 rounded-full hover:bg-brand-pink hover:text-white transition-colors shadow-sm">
                      <Heart size={18} />
                    </button>
                    <button className="bg-white p-3 rounded-full hover:bg-brand-pink hover:text-white transition-colors shadow-sm">
                      <Eye size={18} />
                    </button>
                  </div>
                  <button 
                    onClick={() => addToCart(product)}
                    className="w-full bg-brand-black text-white font-ui text-sm uppercase tracking-wider py-3 hover:bg-gray-800 transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>
              
              <div className="text-center">
                <p className="text-xs text-gray-500 font-ui uppercase tracking-widest mb-1">{product.category}</p>
                <h3 className="font-heading text-lg text-brand-black mb-2">{product.name}</h3>
                <p className="font-ui text-brand-black">${product.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

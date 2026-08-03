import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useCMS } from '../../context/CMSContext';

export default function ShopByCategory() {
  const { categories } = useCMS();
  
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading text-brand-black mb-4">Shop by Category</h2>
          <div className="w-16 h-0.5 bg-brand-pink mx-auto"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {categories.map((category, index) => (
            <Link key={category.name} to={`/shop?category=${category.name.toLowerCase()}`} className="group relative overflow-hidden rounded-sm aspect-[4/5] block">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500 z-10" />
              <motion.img
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 z-20 flex items-center justify-center">
                <span className="text-white font-heading text-xl md:text-2xl tracking-wide opacity-90 group-hover:opacity-100 transition-opacity">
                  {category.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useCMS } from '../../context/CMSContext';

export default function EditorsPicks() {
  const { products } = useCMS();
  const pick = products[0];
  const related = products.slice(1, 4);
  const { addToCart, setIsCartOpen } = useCart();

  const handleShopLook = () => {
    [pick, ...related].forEach(item => addToCart(item));
    setIsCartOpen(true);
  };

  if (!pick) return null;

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row gap-16 items-center">
          
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-heading text-brand-black mb-4">Editor's Pick</h2>
            <div className="w-16 h-0.5 bg-brand-pink mb-8"></div>
            <p className="font-body text-gray-500 mb-8 max-w-md">
              Hand-selected by our top stylists, this season's absolute must-have piece combines effortless elegance with everyday practicality.
            </p>
            
            <Link to={`/shop?product=${pick.id}`} className="group block mb-12">
              <div className="aspect-[4/5] overflow-hidden mb-6 rounded-sm relative">
                <img 
                  src={pick.image || 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80'} 
                  alt={pick.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>
              <h3 className="font-heading text-2xl text-brand-black mb-2">{pick.name}</h3>
              <p className="font-ui text-brand-black">${pick.price.toFixed(2)}</p>
            </Link>
          </div>

          <div className="flex-1 w-full bg-gray-50 p-8 md:p-12 rounded-sm">
            <h3 className="text-2xl font-heading text-brand-black mb-8">Complete The Look</h3>
            
            <div className="space-y-6">
              {related.map((item, index) => (
                <div key={item.id} className="flex gap-6 items-center group">
                  <div className="w-24 h-32 overflow-hidden rounded-sm shrink-0">
                    <img 
                      src={item.image || 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80'} 
                      alt={item.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 font-ui uppercase tracking-widest mb-1">Step {index + 1}: {item.category}</p>
                    <h4 className="font-heading text-lg text-brand-black mb-2">{item.name}</h4>
                    <p className="font-ui text-brand-black mb-4">${item.price.toFixed(2)}</p>
                    <button onClick={() => addToCart(item)} className="text-xs font-ui uppercase tracking-widest border-b border-brand-black pb-1 hover:text-brand-pink hover:border-brand-pink transition-colors">
                      Add to Look
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button onClick={handleShopLook} className="w-full bg-brand-black text-white font-ui text-sm uppercase tracking-widest py-4 hover:bg-gray-800 transition-colors mt-10">
              Shop Entire Look
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}

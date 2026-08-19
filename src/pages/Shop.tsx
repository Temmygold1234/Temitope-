import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, Heart, Eye } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useCMS } from '../context/CMSContext';

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const { addToCart } = useCart();
  const { products, categories } = useCMS();
  
  const [category, setCategory] = useState(initialCategory);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  
  const filteredProducts = useMemo(() => {
    let result = [...products];
    if (category !== 'All') {
      result = result.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }
    if (search) {
      result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    }
    if (sortBy === 'price-low') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') result.sort((a, b) => b.price - a.price);
    return result;
  }, [category, search, sortBy]);

  return (
    <div className="pt-24 pb-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16 pt-8">
          <h1 className="text-4xl md:text-5xl font-heading text-brand-black mb-4">The Collection</h1>
          <p className="font-body text-gray-500 max-w-2xl mx-auto">
            Discover our curated selection of premium luxury pieces designed for the modern connoisseur.
          </p>
        </div>

        {/* Filters and Controls */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12 border-b border-gray-100 pb-8">
          
          <div className="flex items-center gap-4 overflow-x-auto w-full lg:w-auto scrollbar-hide pb-2 lg:pb-0">
            <button 
              onClick={() => setCategory('All')}
              className={`whitespace-nowrap px-4 py-2 text-sm font-ui uppercase tracking-widest transition-colors ${category === 'All' ? 'text-brand-black border-b-2 border-brand-black' : 'text-gray-400 hover:text-brand-black'}`}
            >
              All
            </button>
            {categories.map(c => (
              <button 
                key={c.name}
                onClick={() => setCategory(c.name)}
                className={`whitespace-nowrap px-4 py-2 text-sm font-ui uppercase tracking-widest transition-colors ${category.toLowerCase() === c.name.toLowerCase() ? 'text-brand-black border-b-2 border-brand-black' : 'text-gray-400 hover:text-brand-black'}`}
              >
                {c.name}
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
            <div className="relative w-full sm:w-64">
              <input 
                type="text" 
                placeholder="Search products..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-sm text-sm font-ui focus:ring-1 focus:ring-brand-pink outline-none transition-all"
              />
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
            
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <SlidersHorizontal size={18} className="text-gray-400" />
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-sm font-ui uppercase tracking-widest text-brand-black border-none focus:ring-0 cursor-pointer outline-none"
              >
                <option value="newest">Newest</option>
                <option value="popular">Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group">
              <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-4 rounded-sm">
                <img
                  src={product.image || undefined}
                  alt={product.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.isNewArrival && (
                    <span className="bg-white text-brand-black text-xs font-ui uppercase tracking-wider px-3 py-1">New</span>
                  )}
                  {product.isOnSale && (
                    <span className="bg-brand-pink text-white text-xs font-ui uppercase tracking-wider px-3 py-1">Sale</span>
                  )}
                </div>

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
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-20 text-gray-500 font-ui">
            No products found matching your criteria.
          </div>
        )}

      </div>
    </div>
  );
}

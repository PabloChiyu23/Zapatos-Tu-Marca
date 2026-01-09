import React from 'react';
import { Plus } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="group relative flex flex-col bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 ease-out border border-aurelio-100">
      <div className="relative aspect-[3/4] bg-aurelio-100 overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
        
        {/* Quick Add Button - Slide up on hover */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
          className="absolute bottom-4 right-4 translate-y-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 bg-white text-aurelio-900 p-3 shadow-lg hover:bg-aurelio-900 hover:text-white"
          aria-label="Add to cart"
        >
          <Plus size={20} />
        </button>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <p className="text-xs text-aurelio-600 uppercase tracking-widest mb-1">{product.category}</p>
        <h3 className="text-lg font-serif font-medium text-aurelio-900 mb-2">
          {product.name}
        </h3>
        <p className="text-sm text-slate-500 line-clamp-2 mb-4 flex-grow font-light">
          {product.description}
        </p>
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-aurelio-100">
          <span className="text-lg font-serif text-aurelio-900">${product.price.toLocaleString()}</span>
          <button 
            onClick={() => onAddToCart(product)}
            className="text-xs font-bold uppercase tracking-widest text-aurelio-900 border-b border-transparent hover:border-aurelio-900 transition-all"
          >
            Ver Detalles
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
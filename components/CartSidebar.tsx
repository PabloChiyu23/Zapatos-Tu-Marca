import React from 'react';
import { X, Trash2, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (id: string) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ 
  isOpen, 
  onClose, 
  items, 
  onRemoveItem, 
  onUpdateQuantity 
}) => {
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className={`fixed inset-0 z-[60] overflow-hidden pointer-events-none ${isOpen ? 'pointer-events-auto' : ''}`}>
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`} 
        onClick={onClose}
      />

      {/* Sidebar Panel */}
      <div className={`absolute inset-y-0 right-0 max-w-md w-full flex transition-transform duration-500 ease-in-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex-1 flex flex-col bg-white shadow-2xl">
          
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-6 border-b border-aurelio-100">
            <h2 className="text-xl font-serif text-aurelio-900">Tu Compra</h2>
            <button onClick={onClose} className="text-slate-400 hover:text-aurelio-900 transition-colors">
              <X size={24} />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                <span className="text-6xl">👞</span>
                <p className="text-slate-500 font-light text-lg">Tu carrito está vacío.</p>
                <button onClick={onClose} className="text-aurelio-700 underline underline-offset-4 hover:text-aurelio-900">
                  Explorar la colección
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-24 h-24 flex-shrink-0 bg-aurelio-50 overflow-hidden border border-aurelio-100">
                    <img 
                      src={item.imageUrl} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="font-serif text-aurelio-900">{item.name}</h3>
                        <p className="font-medium text-slate-900">${(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                      <p className="text-xs text-slate-500 uppercase tracking-wide mt-1">{item.category}</p>
                    </div>
                    
                    <div className="flex justify-between items-end">
                      <div className="flex items-center border border-aurelio-200">
                        <button 
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="px-2 py-1 text-slate-600 hover:bg-aurelio-50"
                        >
                          -
                        </button>
                        <span className="px-2 py-1 text-sm font-medium text-aurelio-900">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="px-2 py-1 text-slate-600 hover:bg-aurelio-50"
                        >
                          +
                        </button>
                      </div>
                      <button 
                        onClick={() => onRemoveItem(item.id)}
                        className="text-slate-400 hover:text-red-500 transition-colors p-1"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer / Checkout */}
          {items.length > 0 && (
            <div className="border-t border-aurelio-100 bg-aurelio-50 px-6 py-6 space-y-4">
              <div className="flex justify-between text-base font-serif text-aurelio-900">
                <p>Subtotal</p>
                <p>${subtotal.toLocaleString()}</p>
              </div>
              <p className="text-xs text-slate-500">Impuestos y envío calculados al finalizar la compra.</p>
              <button className="w-full flex items-center justify-center gap-2 bg-aurelio-900 text-white px-6 py-4 hover:bg-aurelio-800 transition-colors uppercase tracking-widest text-sm">
                Finalizar Compra <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;
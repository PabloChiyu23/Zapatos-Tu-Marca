import React from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { ViewState } from '../types';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  cartCount, 
  onOpenCart, 
  currentView, 
  onChangeView,
  isMobileMenuOpen,
  setIsMobileMenuOpen
}) => {
  return (
    <nav className="sticky top-0 z-50 bg-aurelio-50/90 backdrop-blur-md border-b border-aurelio-200 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-aurelio-900 hover:text-aurelio-600 p-2"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center justify-center flex-1 md:flex-none md:justify-start cursor-pointer" onClick={() => onChangeView('home')}>
            <span className="font-serif text-3xl font-bold tracking-tighter text-aurelio-900">
              AURELIO
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
            <button 
              onClick={() => onChangeView('home')}
              className={`text-sm tracking-widest uppercase transition-colors ${currentView === 'home' ? 'text-aurelio-800 font-bold' : 'text-slate-500 hover:text-aurelio-700'}`}
            >
              Inicio
            </button>
            <button 
              onClick={() => onChangeView('shop')}
              className={`text-sm tracking-widest uppercase transition-colors ${currentView === 'shop' ? 'text-aurelio-800 font-bold' : 'text-slate-500 hover:text-aurelio-700'}`}
            >
              Colección
            </button>
          </div>

          {/* Cart Icon */}
          <div className="flex items-center">
            <button 
              onClick={onOpenCart}
              className="group relative p-2 text-aurelio-900 hover:text-aurelio-600 transition-colors"
            >
              <ShoppingBag size={24} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-aurelio-700 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute w-full bg-aurelio-50 border-b border-aurelio-200 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-center">
             <button 
              onClick={() => { onChangeView('home'); setIsMobileMenuOpen(false); }}
              className="block w-full text-center px-3 py-4 text-base font-medium text-aurelio-900 hover:bg-aurelio-100 uppercase tracking-widest"
            >
              Inicio
            </button>
            <button 
              onClick={() => { onChangeView('shop'); setIsMobileMenuOpen(false); }}
              className="block w-full text-center px-3 py-4 text-base font-medium text-aurelio-900 hover:bg-aurelio-100 uppercase tracking-widest"
            >
              Colección
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
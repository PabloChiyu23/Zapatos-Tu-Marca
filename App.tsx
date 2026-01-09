import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import CartSidebar from './components/CartSidebar';
import { Product, CartItem, ViewState } from './types';
import { ArrowDown, Star, ShieldCheck, Truck } from 'lucide-react';

// --- MOCK DATA ---
const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'The Milano Oxford',
    price: 450,
    category: 'Oxford',
    description: 'Cuero de becerro de grano completo, cosido Goodyear a mano. La definición de elegancia atemporal en negro profundo.',
    imageUrl: 'https://images.unsplash.com/photo-1560343076-ec342d67ffc9?q=80&w=800&auto=format&fit=crop', 
    features: ['Cuero Italiano', 'Suela de Cuero', 'Hecho a Mano']
  },
  {
    id: '4',
    name: 'Torino Monk Strap',
    price: 480,
    category: 'Monk Strap',
    description: 'Doble hebilla para una declaración de estilo audaz. Acabado en coñac añejo con pátina manual.',
    imageUrl: 'https://images.unsplash.com/photo-1478186111890-6eb322cbca1d?q=80&w=800&auto=format&fit=crop',
    features: ['Hebillas de latón', 'Puntera pulida', 'Forro de piel']
  }
];

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('home');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Cart Logic
  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Components for Views
  const HeroSection = () => (
    <div className="relative h-[90vh] w-full bg-stone-900 overflow-hidden">
      <div className="absolute inset-0">
         <img 
            src="https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1920&auto=format&fit=crop" 
            alt="Artisan Shoemaker" 
            className="w-full h-full object-cover opacity-60"
         />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent opacity-80" />
      
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-start text-white">
        <span className="text-aurelio-300 tracking-[0.3em] uppercase text-sm mb-4 animate-fade-in-up">Excelencia Italiana</span>
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-tight mb-8">
          Pasos que <br/> <span className="text-aurelio-200 italic">Definen</span> Legados.
        </h1>
        <p className="max-w-xl text-lg text-gray-300 font-light mb-10 leading-relaxed">
          Cada par es una obra maestra, esculpida a mano con cuero de la más alta calidad. 
          Descubre la fusión perfecta entre la tradición centenaria y el confort moderno.
        </p>
        <div className="flex flex-col sm:flex-row gap-6">
          <button 
            onClick={() => setView('shop')}
            className="px-8 py-4 bg-aurelio-200 text-aurelio-900 font-bold uppercase tracking-widest hover:bg-white transition-colors"
          >
            Ver Colección
          </button>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white animate-bounce">
        <ArrowDown size={32} strokeWidth={1} />
      </div>
    </div>
  );

  const FeaturesSection = () => (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="flex flex-col items-center">
             <div className="w-16 h-16 rounded-full bg-aurelio-50 flex items-center justify-center mb-6 text-aurelio-800">
                <ShieldCheck size={32} strokeWidth={1} />
             </div>
             <h3 className="text-xl font-serif text-aurelio-900 mb-3">Garantía de Por Vida</h3>
             <p className="text-slate-500 font-light">Reparamos cualquier defecto de fabricación. Su inversión está asegurada.</p>
          </div>
          <div className="flex flex-col items-center">
             <div className="w-16 h-16 rounded-full bg-aurelio-50 flex items-center justify-center mb-6 text-aurelio-800">
                <Star size={32} strokeWidth={1} />
             </div>
             <h3 className="text-xl font-serif text-aurelio-900 mb-3">Artesanía Maestra</h3>
             <p className="text-slate-500 font-light">Más de 200 pasos manuales por par, ejecutados por maestros artesanos en Florencia.</p>
          </div>
          <div className="flex flex-col items-center">
             <div className="w-16 h-16 rounded-full bg-aurelio-50 flex items-center justify-center mb-6 text-aurelio-800">
                <Truck size={32} strokeWidth={1} />
             </div>
             <h3 className="text-xl font-serif text-aurelio-900 mb-3">Envío Global</h3>
             <p className="text-slate-500 font-light">Entrega express asegurada a cualquier parte del mundo en embalaje de lujo.</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-stone-50 text-slate-900">
      <Navbar 
        cartCount={cartCount} 
        onOpenCart={() => setIsCartOpen(true)}
        currentView={view}
        onChangeView={setView}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      <CartSidebar 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={removeFromCart}
        onUpdateQuantity={updateQuantity}
      />

      <main>
        {view === 'home' && (
          <>
            <HeroSection />
            <FeaturesSection />
            <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <span className="text-aurelio-600 tracking-widest uppercase text-sm font-bold">Favoritos de la Temporada</span>
                <h2 className="text-4xl font-serif text-aurelio-900 mt-3">Lo Más Exclusivo</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-x-8 gap-y-12 max-w-4xl mx-auto">
                {PRODUCTS.slice(0, 2).map(product => (
                  <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
                ))}
              </div>
              <div className="mt-16 text-center">
                <button 
                  onClick={() => setView('shop')}
                  className="inline-block border-b border-aurelio-900 text-aurelio-900 pb-1 uppercase tracking-widest hover:text-aurelio-600 hover:border-aurelio-600 transition-colors"
                >
                  Ver Todo el Catálogo
                </button>
              </div>
            </div>
          </>
        )}

        {view === 'shop' && (
          <div className="pt-12 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-baseline mb-12 border-b border-aurelio-200 pb-6">
              <h1 className="text-4xl font-serif text-aurelio-900">Colección Maestra</h1>
              <p className="text-slate-500 mt-2 md:mt-0">{PRODUCTS.length} Productos exclusivos</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-x-8 gap-y-12 max-w-4xl mx-auto">
              {PRODUCTS.map(product => (
                <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-aurelio-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <span className="font-serif text-2xl font-bold text-aurelio-900">AURELIO</span>
            <p className="mt-4 text-slate-500 font-light max-w-xs">
              Redefiniendo el lujo a través de la artesanía tradicional y la innovación digital. Hecho a mano en Italia, para el mundo.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-aurelio-900 uppercase tracking-widest text-sm mb-4">Cliente</h4>
            <ul className="space-y-2 text-slate-500 text-sm font-light">
              <li><a href="#" className="hover:text-aurelio-700">Envíos y Devoluciones</a></li>
              <li><a href="#" className="hover:text-aurelio-700">Guía de Tallas</a></li>
              <li><a href="#" className="hover:text-aurelio-700">Cuidado del Cuero</a></li>
              <li><a href="#" className="hover:text-aurelio-700">Contactar Concierge</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-aurelio-900 uppercase tracking-widest text-sm mb-4">Legal</h4>
            <ul className="space-y-2 text-slate-500 text-sm font-light">
              <li><a href="#" className="hover:text-aurelio-700">Términos de Servicio</a></li>
              <li><a href="#" className="hover:text-aurelio-700">Política de Privacidad</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-aurelio-100 text-center text-xs text-slate-400 uppercase tracking-widest">
          &copy; {new Date().getFullYear()} Aurelio Footwear. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
};

export default App;
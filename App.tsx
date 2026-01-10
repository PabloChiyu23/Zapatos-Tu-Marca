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
    id: '2',
    name: 'Venetian Loafer',
    price: 395,
    category: 'Loafer',
    description: 'Comodidad sin esfuerzo con ante cepillado a mano. Perfecto para el caballero moderno en movimiento.',
    imageUrl: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=800&auto=format&fit=crop',
    features: ['Ante Premium', 'Flexible', 'Diseño Slip-on']
  },
  {
    id: '3',
    name: 'Roma Chelsea Boot',
    price: 520,
    category: 'Boots',
    description: 'Silueta esbelta con elásticos reforzados. Construcción robusta para afrontar la ciudad con estilo.',
    imageUrl: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?q=80&w=800&auto=format&fit=crop',
    features: ['Suela Vibram', 'Resistente al agua', 'Cosido Blake']
  },
  {
    id: '4',
    name: 'Torino Monk Strap',
    price: 480,
    category: 'Monk Strap',
    description: 'Doble hebilla para una declaración de estilo audaz. Acabado en coñac añejo con pátina manual.',
    imageUrl: 'https://images.unsplash.com/photo-1478186111890-6eb322cbca1d?q=80&w=800&auto=format&fit=crop',
    features: ['Hebillas de latón', 'Puntera pulida', 'Forro de piel']
  },
  {
    id: '5',
    name: 'Napoli Suede Driver',
    price: 325,
    category: 'Driver',
    description: 'El compañero perfecto para el fin de semana. Ante suave con gomminos icónicos para un agarre superior.',
    imageUrl: 'https://images.unsplash.com/photo-1617606002779-51d866ead1d1?q=80&w=800&auto=format&fit=crop',
    features: ['Suela de goma', 'Ante repelente al agua', 'Hecho a mano']
  },
  {
    id: '6',
    name: 'Siena Wholecut',
    price: 550,
    category: 'Oxford',
    description: 'La prueba definitiva de la habilidad del zapatero. Una sola pieza de cuero impecable, sin costuras visibles.',
    imageUrl: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800&auto=format&fit=crop',
    features: ['Corte entero', 'Pátina museo', 'Suela de cuero cerrada']
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
      <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent opacity-90" />
      
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-start text-white">
        <span className="text-aurelio-300 tracking-[0.3em] uppercase text-sm mb-6 animate-fade-in-up font-bold">Excelencia Italiana</span>
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-none mb-8 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
          Pasos que <br/> <span className="text-aurelio-300 italic">Definen</span> Legados.
        </h1>
        <p className="max-w-xl text-lg text-gray-200 font-light mb-10 leading-relaxed animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          Cada par es una obra maestra, esculpida a mano con cuero de la más alta calidad. 
          Descubre la fusión perfecta entre la tradición centenaria y el confort moderno.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <button 
            onClick={() => setView('shop')}
            className="px-10 py-4 bg-aurelio-300 text-aurelio-950 font-bold uppercase tracking-widest hover:bg-white transition-all duration-300 transform hover:scale-105"
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
          <div className="flex flex-col items-center group">
             <div className="w-20 h-20 rounded-full bg-aurelio-50 flex items-center justify-center mb-6 text-aurelio-800 transition-colors group-hover:bg-aurelio-100">
                <ShieldCheck size={36} strokeWidth={1} />
             </div>
             <h3 className="text-xl font-serif text-aurelio-900 mb-3">Garantía de Por Vida</h3>
             <p className="text-slate-500 font-light leading-relaxed">Reparamos cualquier defecto de fabricación. Su inversión está asegurada.</p>
          </div>
          <div className="flex flex-col items-center group">
             <div className="w-20 h-20 rounded-full bg-aurelio-50 flex items-center justify-center mb-6 text-aurelio-800 transition-colors group-hover:bg-aurelio-100">
                <Star size={36} strokeWidth={1} />
             </div>
             <h3 className="text-xl font-serif text-aurelio-900 mb-3">Artesanía Maestra</h3>
             <p className="text-slate-500 font-light leading-relaxed">Más de 200 pasos manuales por par, ejecutados por maestros artesanos en Florencia.</p>
          </div>
          <div className="flex flex-col items-center group">
             <div className="w-20 h-20 rounded-full bg-aurelio-50 flex items-center justify-center mb-6 text-aurelio-800 transition-colors group-hover:bg-aurelio-100">
                <Truck size={36} strokeWidth={1} />
             </div>
             <h3 className="text-xl font-serif text-aurelio-900 mb-3">Envío Global</h3>
             <p className="text-slate-500 font-light leading-relaxed">Entrega express asegurada a cualquier parte del mundo en embalaje de lujo.</p>
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
                <h2 className="text-4xl font-serif text-aurelio-900 mt-3 italic">Lo Más Exclusivo</h2>
                <div className="w-24 h-1 bg-aurelio-200 mx-auto mt-6"></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-x-8 gap-y-12 max-w-4xl mx-auto">
                {PRODUCTS.slice(0, 2).map(product => (
                  <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
                ))}
              </div>
              <div className="mt-20 text-center">
                <button 
                  onClick={() => setView('shop')}
                  className="inline-block border-b-2 border-aurelio-900 text-aurelio-900 pb-2 text-lg uppercase tracking-widest hover:text-aurelio-600 hover:border-aurelio-600 transition-colors"
                >
                  Ver Todo el Catálogo
                </button>
              </div>
            </div>
          </>
        )}

        {view === 'shop' && (
          <div className="pt-12 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 border-b border-aurelio-200 pb-8">
              <div>
                <h1 className="text-5xl font-serif text-aurelio-900 mb-2">Colección Maestra</h1>
                <p className="text-aurelio-600 uppercase tracking-widest text-sm font-bold">Edición Limitada 2024</p>
              </div>
              <p className="text-slate-500 mt-4 md:mt-0 font-light text-lg">{PRODUCTS.length} Productos exclusivos</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 max-w-6xl mx-auto">
              {PRODUCTS.map(product => (
                <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-aurelio-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <span className="font-serif text-3xl font-bold text-aurelio-900 tracking-tight">AURELIO</span>
            <p className="mt-6 text-slate-500 font-light max-w-sm leading-relaxed text-lg">
              Redefiniendo el lujo a través de la artesanía tradicional y la innovación. Hecho a mano en Italia, para el caballero moderno del mundo.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-aurelio-900 uppercase tracking-widest text-sm mb-6">Cliente</h4>
            <ul className="space-y-4 text-slate-500 text-sm font-light">
              <li><a href="#" className="hover:text-aurelio-700 hover:underline underline-offset-4 decoration-aurelio-300">Envíos y Devoluciones</a></li>
              <li><a href="#" className="hover:text-aurelio-700 hover:underline underline-offset-4 decoration-aurelio-300">Guía de Tallas</a></li>
              <li><a href="#" className="hover:text-aurelio-700 hover:underline underline-offset-4 decoration-aurelio-300">Cuidado del Cuero</a></li>
              <li><a href="#" className="hover:text-aurelio-700 hover:underline underline-offset-4 decoration-aurelio-300">Contactar Concierge</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-aurelio-900 uppercase tracking-widest text-sm mb-6">Legal</h4>
            <ul className="space-y-4 text-slate-500 text-sm font-light">
              <li><a href="#" className="hover:text-aurelio-700 hover:underline underline-offset-4 decoration-aurelio-300">Términos de Servicio</a></li>
              <li><a href="#" className="hover:text-aurelio-700 hover:underline underline-offset-4 decoration-aurelio-300">Política de Privacidad</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-aurelio-100 text-center text-xs text-slate-400 uppercase tracking-widest">
          &copy; {new Date().getFullYear()} Aurelio Footwear. Artesanía Italiana.
        </div>
      </footer>
    </div>
  );
};

export default App;
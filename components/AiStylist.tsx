import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, User, Bot, Loader2 } from 'lucide-react';
import { ChatMessage, Product } from '../types';
import { generateStylingAdvice } from '../services/geminiService';

interface AiStylistProps {
  products: Product[];
}

const AiStylist: React.FC<AiStylistProps> = ({ products }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'model',
      text: 'Bienvenido a Aurelio. Soy su asistente personal de estilo. ¿Busca algo para una ocasión especial o desea mejorar su guardarropa diario?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const history = messages.map(m => `${m.role === 'user' ? 'Cliente' : 'Aurelio'}: ${m.text}`);
    
    const responseText = await generateStylingAdvice(userMessage.text, products, history);

    const botMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText
    };

    setMessages(prev => [...prev, botMessage]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[600px] w-full max-w-4xl mx-auto bg-white shadow-2xl overflow-hidden border border-aurelio-200 rounded-sm">
      {/* Header */}
      <div className="bg-aurelio-900 p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-aurelio-800 rounded-full">
            <Sparkles className="text-aurelio-100" size={20} />
          </div>
          <div>
            <h2 className="text-xl font-serif text-white tracking-wide">Concierge Aurelio</h2>
            <p className="text-xs text-aurelio-300 uppercase tracking-widest">Asesoría de Estilo IA</p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-aurelio-50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex max-w-[80%] gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${msg.role === 'user' ? 'bg-slate-200' : 'bg-aurelio-200'}`}>
                {msg.role === 'user' ? <User size={16} className="text-slate-600" /> : <Bot size={16} className="text-aurelio-800" />}
              </div>
              <div
                className={`p-4 text-sm leading-relaxed rounded-md shadow-sm ${
                  msg.role === 'user'
                    ? 'bg-white text-slate-800 border border-aurelio-100'
                    : 'bg-aurelio-900 text-aurelio-50'
                }`}
              >
                 {/* Simple formatting for bold text */}
                {msg.text.split('**').map((part, i) => 
                  i % 2 === 1 ? <strong key={i} className={msg.role === 'model' ? "text-aurelio-200" : ""}>{part}</strong> : part
                )}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
             <div className="flex max-w-[80%] gap-3">
               <div className="flex-shrink-0 w-8 h-8 rounded-full bg-aurelio-200 flex items-center justify-center">
                  <Bot size={16} className="text-aurelio-800" />
               </div>
               <div className="p-4 bg-aurelio-900 rounded-md shadow-sm flex items-center gap-2">
                 <Loader2 size={16} className="animate-spin text-aurelio-200" />
                 <span className="text-aurelio-200 text-xs tracking-widest uppercase">Pensando...</span>
               </div>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-aurelio-100">
        <div className="flex items-center gap-2 relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ej: Necesito zapatos negros para una boda formal..."
            className="flex-1 p-4 pr-12 bg-aurelio-50 border border-aurelio-200 focus:outline-none focus:border-aurelio-500 text-slate-800 placeholder-slate-400 font-light"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="absolute right-2 p-2 bg-aurelio-900 text-white hover:bg-aurelio-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={18} />
          </button>
        </div>
        <p className="text-center text-[10px] text-slate-400 mt-2 tracking-wide uppercase">
          Aurelio utiliza IA avanzada para recomendar productos de nuestra colección.
        </p>
      </div>
    </div>
  );
};

export default AiStylist;
"use client";

import { useState } from 'react';
import { useCarrinho } from '../contexto/ContextoCarrinho';
import { motion, AnimatePresence } from 'framer-motion';
import ItemCarrinho from '@/app/components/ItemCarrinho';

export default function NavBar() {
  const { carrinho, removerDoCarrinho, atualizarQuantidade } = useCarrinho();
  const [isCarrinhoAberto, setIsCarrinhoAberto] = useState(false);

  const toggleCarrinho = () => {
    setIsCarrinhoAberto(!isCarrinhoAberto);
  };

  const fecharCarrinho = () => {
    setIsCarrinhoAberto(false);
  };

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        {/* Logo ou Nome da Loja */}
        <div className="text-xl font-bold text-black">Minha Loja</div>

        {/* Barra de Pesquisa (menor) */}
        <div className="flex-grow mx-4 relative max-w-md">
          <input
            type="text"
            placeholder="Pesquisar..."
            className="w-full px-4 py-1 rounded-full border border-gray-300 focus:outline-none focus:border-orange-500 text-black"
          />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {/* Contêiner para os botões de Login e Carrinho */}
        <div className="flex items-center gap-2">
          {/* Ícone de Login */}
          <button className="p-2 text-black hover:text-orange-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {/* Ícone do Carrinho */}
          <button
            onClick={toggleCarrinho}
            className="relative p-2 text-black hover:text-orange-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg>
            {/* Contador de Itens no Carrinho */}
            {carrinho.length > 0 && (
              <span className="absolute top-0 right-0 bg-orange-500 text-white text-xs rounded-full px-1">
                {carrinho.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Aba Lateral do Carrinho com Animação */}
      <AnimatePresence>
        {isCarrinhoAberto && (
          <motion.div
            initial={{ x: '100%' }} // Começa fora da tela (à direita)
            animate={{ x: 0 }} // Move para a posição inicial (0)
            exit={{ x: '100%' }} // Sai da tela (à direita)
            transition={{ type: 'tween', duration: 0.3 }} // Animação suave
            className="fixed top-0 right-0 h-full w-80 bg-white shadow-lg"
          >
            <div className="p-4">
              {/* Botão de Fechar */}
              <button
                onClick={fecharCarrinho}
                className="absolute top-4 right-4 text-black hover:text-orange-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              <h2 className="text-xl font-bold mb-4 text-black">Carrinho</h2>
              {carrinho.length === 0 ? (
                <p className="text-black">O carrinho está vazio.</p>
              ) : (

                //Estava dando erro aqui!
                <div className="space-y-4">
                  {carrinho.map((item) => (
                    <ItemCarrinho
                      key={item.id}
                      item={item}
                      removerDoCarrinho={removerDoCarrinho}
                      atualizarQuantidade={atualizarQuantidade}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
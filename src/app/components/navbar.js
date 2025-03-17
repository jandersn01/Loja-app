"use client";

import { useState } from 'react';
import { useCarrinho } from '../contexto/ContextoCarrinho';
import { motion, AnimatePresence } from 'framer-motion';
import ItemCarrinho from '@/app/components/ItemCarrinho';

export default function NavBar() {
  const { carrinho, removerDoCarrinho, atualizarQuantidade, calcularTotal } = useCarrinho();
  const [isCarrinhoAberto, setIsCarrinhoAberto] = useState(false);

  //tentando trabalhar com cep apartir daqui:
  const [cep, setCep] = useState('');
  const [frete, setFrete] = useState(0);
  const [mensagemFrete, setMensagemFrete] = useState('');


  const toggleCarrinho = () => {
    setIsCarrinhoAberto(!isCarrinhoAberto);
  };

  const fecharCarrinho = () => {
    setIsCarrinhoAberto(false);
  };

  // Transportar isso daqui para um arquivo a parte.
  const calcularFrete = async () => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (data.erro) {
        setMensagemFrete('CEP inválido');
        setFrete(0);
        return;
      }

      const estado = data.uf;

      if (estado === 'PB') {
        setFrete(0);
        setMensagemFrete('Elegível para frete grátis');
      } else if (['RN', 'PE', 'AL', 'SE', 'BA', 'MA', 'PI', 'CE'].includes(estado)) {
        setFrete(10);
        setMensagemFrete('Frete: R$ 10,00');
      } else if (['AM', 'PA', 'AC', 'RO', 'RR', 'AP', 'TO'].includes(estado)) {
        setFrete(15);
        setMensagemFrete('Frete: R$ 15,00');
      } else if (['SP', 'RJ', 'MG', 'ES'].includes(estado)) {
        setFrete(20);
        setMensagemFrete('Frete: R$ 20,00');
      } else if (['DF', 'GO', 'MT', 'MS'].includes(estado)) {
        setFrete(25);
        setMensagemFrete('Frete: R$ 25,00');
      } else if (['RS', 'SC', 'PR'].includes(estado)) {
        setFrete(30);
        setMensagemFrete('Frete: R$ 30,00');
      } else {
        setFrete(0);
        setMensagemFrete('Região não identificada');
      }
    } catch (error) {
      setMensagemFrete('Erro ao calcular frete');
      setFrete(0);
    }
  };

  const totalCarrinho = calcularTotal();
  const totalComFrete = totalCarrinho + frete;

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        {/* Logo ou Nome da Loja */}
        <div className="text-xl font-bold text-black">Minha Loja</div>

        {/* Barra de Pesquisa */}
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

      {/* Aba Lateral do Carrinho */}
      <AnimatePresence>
        {isCarrinhoAberto && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
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

              {/* Campo para calcular CEP */}
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Digite seu CEP"
                  className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-orange-500 text-black"
                  value={cep}
                  onChange={(e) => setCep(e.target.value)}
                />
                <button
                  onClick={calcularFrete}
                  className="mt-2 w-full bg-orange-500 text-white py-2 rounded-full hover:bg-orange-600"
                >
                  Calcular Frete
                </button>
                {mensagemFrete && (
                  <p
                    className={`mt-2 text-sm ${
                      frete === 0 && estado === 'PB' ? 'text-green-500' : 'text-black'
                    }`}
                  >
                    {mensagemFrete}
                  </p>
                )}
              </div>

              {/* Lista de Itens no Carrinho */}
              {carrinho.length === 0 ? (
                <p className="text-black">O carrinho está vazio.</p>
              ) : (
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

              {/* Resumo do Carrinho */}
              <div className="mt-4">
                <p className="text-black">Subtotal: R$ {totalCarrinho.toFixed(2)}</p>
                <p className="text-black">Frete: R$ {frete.toFixed(2)}</p>
                <p className="text-black font-bold">
                  Total: R$ {totalComFrete.toFixed(2)}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

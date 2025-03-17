"use client";

import Image from 'next/image';
import { useCarrinho } from '../contexto/ContextoCarrinho';

export default function Card({ produto }) {
  const {adicionarAoCarrinho} = useCarrinho();

  return (
    <div className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden w-65">
      <div className="relative w-full h-96">
        <Image
          src={produto.imagem}
          alt={produto.descricao}
          fill
          style={{ objectFit: 'cover' }}
        />
        {/* Badge de Desconto */}
        {produto.desconto && (
          <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
            {produto.desconto}% OFF
          </div>
        )}
      </div>

     
      <div className="p-3"> {/* Reduzi o padding para diminuir a altura da parte branca */}
        {/* Nome do Produto */}
        <h3 className="text-sm font-semibold text-gray-800 mb-1"> {/* Reduzi o tamanho da fonte */}
          {produto.descricao}
        </h3>

        {/* Preço e Botão de Carrinho */}
        <div className="flex items-center justify-between">
          {/* Preço */}
          <span className="text-xl  font-bold text-orange-500">
            R$ {produto.preco.toFixed(2)}
          </span>
 
          {/* Botão de Carrinho */}
          <button
            className="p-2 bg-white text-black border border-black-500 rounded-full hover:bg-orange-400 transition-colors duration-300"
              onClick={() => adicionarAoCarrinho(produto)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg>
          </button>
        </div>

        {/* Percentual de Desconto */}
        {produto.desconto && (
          <div className="text-sm text-red-600 mt-1">
            {produto.desconto}% de desconto
          </div>
        )}
      </div>
    </div>
  );
}
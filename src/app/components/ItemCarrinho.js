"use client";

import { useState } from 'react';
import Image from 'next/image';

export default function ItemCarrinho({ item, removerDoCarrinho, atualizarQuantidade }) {
  const quantidade = item.quantidade;

  const aumentarQuantidade = () => {
    atualizarQuantidade(item.id, quantidade + 1);
  };

  const diminuirQuantidade = () => {
    if (quantidade > 1) {
      atualizarQuantidade(item.id, quantidade - 1);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200">
      <div className="w-20 h-20 flex-shrink-0">
        <div className="w-full h-full relative rounded overflow-hidden">
          <Image
            src={item.imagem}
            alt={item.descricao}
            fill 
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>

      <div className="flex-grow ml-4">
        <p className="text-sm font-medium text-black">{item.descricao}</p>
        <div className="flex items-center mt-2">
          <div className="flex items-center gap-2">
            <button
              onClick={diminuirQuantidade}
              className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded-full text-black hover:bg-gray-200"
            >
              -
            </button>
            <span className="text-sm text-black">{quantidade}</span>
            <button
              onClick={aumentarQuantidade}
              className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded-full text-black hover:bg-gray-200"
            >
              +
            </button>
          </div>

          <button
            onClick={() => removerDoCarrinho(item.id)}
            className="ml-4 text-red-500 hover:text-red-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      
      <div className="text-sm font-medium text-black">
        R$ {(item.preco * quantidade).toFixed(2)}
      </div>
    </div>
  );
}
"use client";

import { createContext, useState, useContext } from 'react';
import ItemCarrinho from '../components/ItemCarrinho';

const CarrinhoContext = createContext();

export const CarrinhoProvider = ({ children }) => {
  const [carrinho, setCarrinho] = useState([]);
  const [quantidade] = useState(1)

  const adicionarAoCarrinho = (produto) => {
    const itemExistente = carrinho.find((item) => item.id === produto.id);
    if (itemExistente) {
      atualizarQuantidade(produto.id, itemExistente.quantidade + 1) 
    } else {
      // Se o item não existe, adiciona ao carrinho com quantidade 1
      setCarrinho([...carrinho, { ...produto, quantidade: 1 }]);
    }
  };

  const removerDoCarrinho = (produtoId) => {
    setCarrinho(carrinho.filter((item) => item.id !== produtoId));
  };


  const atualizarQuantidade = (produtoId, novaQuantidade) => {
    setCarrinho(
      carrinho.map((item) =>
        item.id === produtoId ? { ...item, quantidade: novaQuantidade } : item
      )
    );
  };

  const limparCarrinho = () =>{
    setCarrinho([]);
  }

  const calcularTotal = () => {
    return carrinho.reduce(
      (total, item) => total + item.preco * item.quantidade,
      0
    );
  };

  return (
    <CarrinhoContext.Provider
      value={{
        carrinho,
        adicionarAoCarrinho,
        removerDoCarrinho,
        atualizarQuantidade,
        limparCarrinho,
        calcularTotal }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
};

export const useCarrinho = () => {
  const context = useContext(CarrinhoContext);
  if (!context) {
    throw new Error('useCarrinho deve ser usado dentro de um CarrinhoProvider');
  }
  return context;
};
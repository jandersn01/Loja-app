"use client";
import { useCarrinho } from '../context/CarrinhoContext';

export default function Carrinho() {
  const { carrinho } = useCarrinho();

  return (
    <div>
      <h2>Carrinho</h2>
      <ul>
        {carrinho.map((produto, id) => (
          <li key={id}>{produto.descricao} - R$ {produto.preco.toFixed(2)}</li>
        ))}
      </ul>
    </div>
  );
}
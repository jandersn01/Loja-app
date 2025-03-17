import { useCarrinho } from '../contexto/ContextoCarrinho';

export default function Carrinho() {
  const { carrinho, removerDoCarrinho } = useCarrinho();

  return (
    <div>
      <h2>Carrinho</h2>
      {carrinho.length === 0 ? (
        <p>O carrinho está vazio.</p>
      ) : (
        <ul>
          {carrinho.map((produto, id) => (
            <li key={id}>
              {produto.descricao} - R$ {produto.preco.toFixed(2)}
              <button
                onClick={() => removerDoCarrinho(produto.id)}
                className="ml-2 text-red-500"
              >
                Remover
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
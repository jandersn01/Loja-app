import { supabase } from './lib/supabaseClient.js';
import Card from './components/Card.js';

export default async function Home() {

  //Deveria estar dentro de useefect
  const { data: produtos, error } = await supabase
    .from('produto')
    .select('*');

    if (!produtos || produtos.length === 0) {
      return <div>Nenhum produto encontrado.</div>;
    }

  if (error) {
    console.error('Erro ao buscar produtos:', error);
    return <div>Erro ao carregar produtos.</div>;
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {produtos.map((produto) => (
            <Card key={produto.id} produto={produto} />
          ))}
        </div>
      </main>
    </div>
  );
}
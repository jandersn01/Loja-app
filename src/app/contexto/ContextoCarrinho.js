"use client";

import {createContext, useState, useContext} from 'react';

const CarrinhoContext = createContext();

export const CarrinhoProvider = ({children}) => {
    const [carrinho, setCarrinho] = useState([]);


    const adicionarAoCarrinho = (produto) => {
        setCarrinho([...carrinho,produto])
    }

    return (
        <CarrinhoContext.Provider value={{carrinho, adicionarAoCarrinho}}>
            {children}
        </CarrinhoContext.Provider>
    )

};

export const useCarrinho = () => {
    const context = useContext(CarrinhoContext);
    console.log('Contexto:', context);
    if(!context){
        throw new Error('useCarrinho deve ser usado dentro de um carrinhoProvider')
    }
    return context;
}
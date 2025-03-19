"use client"; 

import { motion } from "framer-motion";
import { useState } from "react";

const ModalPagamento = ({ isOpen, onClose, onConfirm }) => {
  const [formaPagamentoSelecionada, setFormaPagamentoSelecionada] = useState(null);
  const [pagamentoConfirmado, setPagamentoConfirmado] = useState(false);

  if (!isOpen) return null;

  const handleConfirmar = () => {
    if (formaPagamentoSelecionada) {
      onConfirm(); 
      setPagamentoConfirmado(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50" // Efeito de blur
    >
      <motion.div
        className="bg-white rounded-lg p-6 w-96 shadow-lg relative"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        exit={{ y: -50 }}
      >

        <button
          onClick={onClose} // Fecha o modal ao clicar
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

        {pagamentoConfirmado ? (
          // Caixa de confirmação de pagamento
          <div className="text-center">
            <h2 className="text-xl font-bold mb-4 text-black">Pagamento Confirmado!</h2>
            <p className="text-gray-600 mb-6">Obrigado por sua compra.</p>
            <button
              onClick={() => {
                onClose(); // Fecha o modal
                setPagamentoConfirmado(false); // Reseta o estado de confirmação
              }}
              className="bg-green-500 text-white px-6 py-2 rounded-full"
            >
              OK
            </button>
          </div>
        ) : (
          // Formulário de seleção de pagamento
          <>
            <h2 className="text-xl font-bold mb-4 text-black">Selecione a forma de pagamento</h2>

            {/* Opção PIX */}
            <div
              className={`flex items-center justify-between p-4 rounded-lg cursor-pointer ${
                formaPagamentoSelecionada === "pix" ? "bg-gray-100" : "bg-white"
              }`}
              onClick={() => setFormaPagamentoSelecionada("pix")}
            >
              <div className="flex items-center gap-3">
                <img src="/icons/pix.png" alt="PIX" className="w-6 h-6" />
                <span className="text-black">PIX</span>
              </div>
              {formaPagamentoSelecionada === "pix" && (
                <span className="text-green-500">✔️</span>
              )}
            </div>
            <p className="text-sm text-gray-500 mt-1 mb-4">Confirmado em até 30 minutos</p>

            {/* Opção Boleto */}
            <div
              className={`flex items-center justify-between p-4 rounded-lg cursor-pointer ${
                formaPagamentoSelecionada === "boleto" ? "bg-gray-100" : "bg-white"
              }`}
              onClick={() => setFormaPagamentoSelecionada("boleto")}
            >
              <div className="flex items-center gap-3">
                <img src="/icons/boleto.png" alt="Boleto" className="w-6 h-6" /> 
                <span className="text-black">Boleto</span>
              </div>
              {formaPagamentoSelecionada === "boleto" && (
                <span className="text-green-500">✔️</span>
              )}
            </div>
            <p className="text-sm text-gray-500 mt-1 mb-4">Confirmado em até 3 dias úteis</p>

            {/* Opção Cartão de Crédito */}
            <div
              className={`flex items-center justify-between p-4 rounded-lg cursor-pointer ${
                formaPagamentoSelecionada === "cartao" ? "bg-gray-100" : "bg-white"
              }`}
              onClick={() => setFormaPagamentoSelecionada("cartao")}
            >
              <div className="flex items-center gap-3">
                <img src="/icons/cartao.png" alt="Cartão de Crédito" className="w-6 h-6" />
                <span className="text-black">Cartão de Crédito</span>
              </div>
              {formaPagamentoSelecionada === "cartao" && (
                <span className="text-green-500">✔️</span>
              )}
            </div>
            <p className="text-sm text-gray-500 mt-1 mb-4">Até 10x sem juros</p>

            <div className="flex justify-center mt-6">
            {formaPagamentoSelecionada ? (
                <button
                onClick={handleConfirmar}
                className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600"
              >
                Confirmar
              </button>
            ):( <button
                className="bg-gray-500 text-white px-6 py-2 rounded-full" disabled
              >
                Confirmar
              </button>)}
              
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ModalPagamento;
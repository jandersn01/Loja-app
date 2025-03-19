import React from 'react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-8">
      <div className="container mx-auto text-center">
        <p className="text-sm mb-2">
          Projeto disciplinar 2024.2 Linguagem de Script
        </p>
        <p className="text-sm mb-4">
          Desenvolvido por Janderson Lima e Francisco Maia
        </p>
        <div className="flex justify-center space-x-6">
          <a
            href="www.linkedin.com/in/janderson-lima-064bb9324" 
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors"
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href="https://github.com/jandersn01"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400 transition-colors"
          >
            <FaGithub size={24} />
          </a>

          <a
            href="https://www.linkedin.com/in/franciscovianamaianeto" 
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors"
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href="https://github.com/franciscovmn" 
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400 transition-colors"
          >
            <FaGithub size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
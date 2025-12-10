CREATE DATABASE empresa_db;

-- Conectar ao banco
\c empresa_db

-- Criar tabela clientes
CREATE TABLE clientes (
     id SERIAL PRIMARY KEY,
     nome VARCHAR(100) NOT NULL,
     email VARCHAR(100) UNIQUE NOT NULL,
     telefone VARCHAR(20),
     data_cadastro DATE DEFAULT CURRENT_DATE,
     ativo BOOLEAN DEFAULT TRUE,
     cidade VARCHAR(50),
     estado VARCHAR(2)
);

-- Criar índice para melhor performance
CREATE INDEX idx_clientes_email ON clientes(email);
CREATE INDEX idx_clientes_cidade ON clientes(cidade);

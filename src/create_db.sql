CREATE DATABASE empresa_db;

-- Conectar ao banco
\c empresa_db

-- Criar tabela clientes
CREATE TABLE clientes (
     id SERIAL PRIMARY KEY,
     nome VARCHAR(100) NOT NULL,
     email VARCHAR(100) UNIQUE NOT NULL,
     data_cadastro DATE DEFAULT CURRENT_DATE,
     ativo BOOLEAN DEFAULT TRUE,
     cidade VARCHAR(50),
     estado VARCHAR(2)
);

CREATE TABLE cliente_telefone (
     id SERIAL PRIMARY KEY,
     telefone VARCHAR(20),
     id_cliente INTEGER NOT NULL,
     FOREIGN KEY (id_cliente) REFERENCES clientes(id) ON DELETE CASCADE;
);

-- Criar índice para melhor performance
CREATE INDEX idx_clientes_email ON clientes(email);
CREATE INDEX idx_clientes_cidade ON clientes(cidade);

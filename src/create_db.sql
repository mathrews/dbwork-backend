-- 1. Criar banco de dados (se ainda não existir)
CREATE DATABASE empresa_db;

-- Conectar ao banco empresa_db
\c empresa_db

-- -- 2. Criar tabela clientes
-- CREATE TABLE clientes (
--     id SERIAL PRIMARY KEY,
--     nome VARCHAR(100) NOT NULL,
--     email VARCHAR(100) UNIQUE NOT NULL,
--     cpf VARCHAR(11) UNIQUE NOT NULL,
--     data_cadastro DATE DEFAULT CURRENT_DATE,
--     cidade VARCHAR(50),
--     estado VARCHAR(2),
--     ativo BOOLEAN DEFAULT TRUE
-- );

-- -- 3. Criar tabela cliente_telefone
-- CREATE TABLE cliente_telefone (
--     id SERIAL PRIMARY KEY,
--     telefone VARCHAR(20),
--     id_cliente INTEGER NOT NULL,
--     FOREIGN KEY (id_cliente) REFERENCES clientes(id) ON DELETE CASCADE
-- );

-- -- 4. Criar índices para melhor performance
-- CREATE INDEX idx_clientes_email ON clientes(email);
-- CREATE INDEX idx_clientes_cidade ON clientes(cidade);
-- CREATE INDEX idx_cliente_telefone_cliente ON cliente_telefone(id_cliente);
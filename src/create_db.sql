-- Criar banco de dados
-- CREATE DATABASE empresa_db;

-- Conectar ao banco
\c empresa_db

-- Criar tabela clientes
-- CREATE TABLE clientes (
--     id SERIAL PRIMARY KEY,
--     nome VARCHAR(100) NOT NULL,
--     email VARCHAR(100) UNIQUE NOT NULL,
--     telefone VARCHAR(20),
--     data_cadastro DATE DEFAULT CURRENT_DATE,
--     ativo BOOLEAN DEFAULT TRUE,
--     cidade VARCHAR(50),
--     estado VARCHAR(2)
-- );

-- Inserir dados de exemplo
INSERT INTO clientes (nome, email, telefone, cidade, estado) VALUES
('João Silva', 'joao@email.com', '(11) 99999-8888', 'São Paulo', 'SP'),
('Maria Santos', 'maria@email.com', '(21) 98888-7777', 'Rio de Janeiro', 'RJ'),
('Carlos Oliveira', 'carlos@email.com', '(31) 97777-6666', 'Belo Horizonte', 'MG'),
('Ana Costa', 'ana@email.com', '(41) 96666-5555', 'Curitiba', 'PR'),
('Pedro Alves', 'pedro@email.com', '(51) 95555-4444', 'Porto Alegre', 'RS');

-- Criar índice para melhor performance
-- CREATE INDEX idx_clientes_email ON clientes(email);
-- CREATE INDEX idx_clientes_cidade ON clientes(cidade);
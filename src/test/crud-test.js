// src/test/crud-test.js
import fetch from 'node-fetch';

const API_URL = 'http://localhost:3000/api';

async function testCRUD() {
  console.log('🧪 Testando CRUD de Clientes...\n');

  // 1. Criar cliente
  console.log('1. Criando novo cliente...');
  const novoCliente = {
    nome: 'Teste CRUD',
    email: 'teste.crud@email.com',
    telefone: '(11) 99999-0000',
    cidade: 'São Paulo',
    estado: 'SP'
  };

  try {
    const createRes = await fetch(`${API_URL}/clientes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novoCliente)
    });

    const created = await createRes.json();
    console.log('✅ Cliente criado:', created.data.email);
    const clienteId = created.data.id;

    // 2. Listar clientes
    console.log('\n2. Listando todos os clientes...');
    const listRes = await fetch(`${API_URL}/clientes`);
    const lista = await listRes.json();
    console.log(`✅ Total de clientes: ${lista.pagination.total}`);

    // 3. Buscar por ID
    console.log(`\n3. Buscando cliente ID ${clienteId}...`);
    const getRes = await fetch(`${API_URL}/clientes/${clienteId}`);
    const cliente = await getRes.json();
    console.log(`✅ Cliente encontrado: ${cliente.data.nome}`);

    // 4. Atualizar cliente
    console.log(`\n4. Atualizando cliente ID ${clienteId}...`);
    const updateRes = await fetch(`${API_URL}/clientes/${clienteId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ telefone: '(11) 98888-1111' })
    });

    const updated = await updateRes.json();
    console.log('✅ Cliente atualizado:', updated.message);

    // 5. Buscar por email
    console.log(`\n5. Buscando por email: ${novoCliente.email}...`);
    const emailRes = await fetch(`${API_URL}/clientes/email/${novoCliente.email}`);
    const porEmail = await emailRes.json();
    console.log('✅ Encontrado por email:', porEmail.data.nome);

    // 6. Listar por cidade
    console.log(`\n6. Listando clientes de ${novoCliente.cidade}...`);
    const cidadeRes = await fetch(`${API_URL}/clientes/cidade/${novoCliente.cidade}`);
    const porCidade = await cidadeRes.json();
    console.log(`✅ Total em ${novoCliente.cidade}: ${porCidade.total}`);

    // 7. Deletar (soft delete)
    console.log(`\n7. Marcando cliente ID ${clienteId} como inativo...`);
    const deleteRes = await fetch(`${API_URL}/clientes/${clienteId}`, {
      method: 'DELETE'
    });

    const deleted = await deleteRes.json();
    console.log('✅', deleted.message);

    console.log('\n🎉 Todos os testes passaram!');

  } catch (error) {
    console.error('❌ Erro nos testes:', error.message);
  }
}

testCRUD();
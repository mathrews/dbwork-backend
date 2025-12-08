// src/seeders/seed.js
import sequelize from '../config/database.js';
import Cliente from '../models/Cliente.js';

const clientesExemplo = [
  {
    nome: 'João Silva',
    email: 'joao.silva@email.com',
    telefone: '(11) 99999-8888',
    cidade: 'São Paulo',
    estado: 'SP',
    ativo: true
  },
  {
    nome: 'Maria Santos',
    email: 'maria.santos@email.com',
    telefone: '(21) 98888-7777',
    cidade: 'Rio de Janeiro',
    estado: 'RJ',
    ativo: true
  },
  {
    nome: 'Carlos Oliveira',
    email: 'carlos.oliveira@email.com',
    telefone: '(31) 97777-6666',
    cidade: 'Belo Horizonte',
    estado: 'MG',
    ativo: true
  },
  {
    nome: 'Ana Costa',
    email: 'ana.costa@email.com',
    telefone: '(41) 96666-5555',
    cidade: 'Curitiba',
    estado: 'PR',
    ativo: false
  },
  {
    nome: 'Pedro Alves',
    email: 'pedro.alves@email.com',
    telefone: '(51) 95555-4444',
    cidade: 'Porto Alegre',
    estado: 'RS',
    ativo: true
  }
];

async function seedDatabase() {
  try {
    // Sincronizar modelos
    await sequelize.sync({ force: false }); // Use force: true apenas em desenvolvimento!

    // Verificar se já existem clientes
    const count = await Cliente.count();

    if (count === 0) {
      // Inserir dados de exemplo
      await Cliente.bulkCreate(clientesExemplo);
      console.log('✅ Dados de exemplo inseridos com sucesso!');
    } else {
      console.log(`⚠️  Banco já contém ${count} clientes. Nenhum dado inserido.`);
    }

    // Listar clientes inseridos
    const clientes = await Cliente.findAll({
      attributes: ['id', 'nome', 'email', 'cidade', 'ativo']
    });

    console.log('\n📋 Clientes no banco:');
    clientes.forEach(cliente => {
      console.log(`  ${cliente.id}. ${cliente.nome} - ${cliente.email} (${cliente.cidade}) - Ativo: ${cliente.ativo}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Erro ao popular banco:', error);
    process.exit(1);
  }
}

seedDatabase();
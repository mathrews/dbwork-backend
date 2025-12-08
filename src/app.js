// src/app.js
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import clienteRoutes from './routes/clienteRoutes.js';
import sequelize from './config/database.js';
import Cliente from './models/Cliente.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use('/api', clienteRoutes);

// Rota de saúde
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    database: 'PostgreSQL'
  });
});

// Rota inicial
app.get('/', (req, res) => {
  res.json({
    message: 'API de Clientes',
    endpoints: {
      clientes: {
        POST: '/api/clientes - Criar novo cliente',
        GET: '/api/clientes - Listar todos os clientes',
        'GET :id': '/api/clientes/:id - Buscar cliente por ID',
        PUT: '/api/clientes/:id - Atualizar cliente',
        DELETE: '/api/clientes/:id - Excluir cliente (soft delete)',
        'GET email': '/api/clientes/email/:email - Buscar por email',
        'GET cidade': '/api/clientes/cidade/:cidade - Listar por cidade'
      }
    }
  });
});

// Sincronizar banco e iniciar servidor
async function startServer() {
  try {
    // Sincronizar modelos com o banco
    await sequelize.sync({ alter: true });
    console.log('✅ Modelos sincronizados com o banco de dados');

    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
      console.log(`📝 API disponível em: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Erro ao iniciar servidor:', error);
    process.exit(1);
  }
}

startServer();

export default app;
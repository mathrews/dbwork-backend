// src/routes/clienteRoutes.js
import express from 'express';
import {
  criarCliente,
  listarClientes,
  buscarClientePorId,
  atualizarCliente,
  excluirCliente,
  buscarPorEmail,
  listarPorCidade
} from '../controllers/clienteController.js';

const router = express.Router();

// Rotas CRUD básicas
router.post('/clientes', criarCliente);          // CREATE
router.get('/clientes', listarClientes);         // READ (todos)
router.get('/clientes/:id', buscarClientePorId); // READ (por ID)
router.put('/clientes/:id', atualizarCliente);   // UPDATE
router.delete('/clientes/:id', excluirCliente);  // DELETE

// Rotas adicionais
router.get('/clientes/email/:email', buscarPorEmail);
router.get('/clientes/cidade/:cidade', listarPorCidade);

export default router;
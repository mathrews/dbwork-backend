import { Cliente, ClienteTelefone } from '../models/Cliente.js';

// CREATE - Criar novo cliente
export const criarCliente = async (req, res) => {
  try {
    const { nome, email, telefones, cidade, estado, ativo = true } = req.body;

    if (!nome || !email) {
      return res.status(400).json({
        success: false,
        message: 'Nome e email são obrigatórios'
      });
    }

    const novoCliente = await Cliente.create({
      nome,
      email,
      cidade,
      estado,
      ativo,
      data_cadastro: new Date() // Opcional
    });

    const listaTelefone = telefones.split(",");

    for (let telefone of listaTelefone) {
      await ClienteTelefone.create({
        telefone,
        ClienteId: novoCliente.id,
      })
    }

    return res.status(201).json({
      success: true,
      message: 'Cliente criado com sucesso!',
      data: novoCliente
    });
  } catch (error) {
    console.error('Erro ao criar cliente:', error);

    // Tratamento de erros específicos
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({
        success: false,
        message: 'Este email já está cadastrado'
      });
    }

    if (error.name === 'SequelizeValidationError') {
      const mensagens = error.errors.map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Erro de validação',
        errors: mensagens
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Listar clientes (com filtros)
export const listarClientes = async (req, res) => {
  try {
    const { ativo, cidade, estado, page = 1, limit = 10 } = req.query;

    // Construir filtros
    const where = {};
    if (ativo !== undefined) where.ativo = ativo === 'true';
    if (cidade) where.cidade = cidade;
    if (estado) where.estado = estado.toUpperCase();

    // Paginação
    const offset = (page - 1) * limit;

    const { count, rows } = await Cliente.findAndCountAll({
	  where: where,
      order: [['nome', 'ASC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    console.log(rows);

    // horripilante
    for (let cliente of rows) {
      let dv = cliente.dataValues;
      let ClienteId = dv.id;
      let telefones = (await ClienteTelefone.findAll({
        where: {
          ClienteId
        }
      })).map(t => t.dataValues.telefone)

      dv.telefones = telefones;
    }

    return res.status(200).json({
      success: true,
      data: rows,
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit)
      }
    });
  } catch (error) {
    console.error('Erro ao listar clientes:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro ao listar clientes'
    });
  }
};

// READ - Buscar cliente por ID
export const buscarClientePorId = async (req, res) => {
  try {
    const { id } = req.params;

    const cliente = await Cliente.findByPk(id);

    if (!cliente) {
      return res.status(404).json({
        success: false,
        message: 'Cliente não encontrado'
      });
    }

    return res.status(200).json({
      success: true,
      data: cliente
    });
  } catch (error) {
    console.error('Erro ao buscar cliente:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro ao buscar cliente'
    });
  }
};

// UPDATE - Atualizar cliente
export const atualizarCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const dadosAtualizados = req.body;

    // Buscar cliente
    const cliente = await Cliente.findByPk(id);

    if (!cliente) {
      return res.status(404).json({
        success: false,
        message: 'Cliente não encontrado'
      });
    }

    if (dadosAtualizados.telefones !== undefined) {
      const telefones = dadosAtualizados.telefones.split(',');
      const ClienteId = cliente.id;

      await ClienteTelefone.destroy({
        where: {
          ClienteId
        }
      });

      for (let telefone of telefones) {
        await ClienteTelefone.create({
          telefone,
          ClienteId
        })
      }

      delete dadosAtualizados.telefones;
    }

    // Atualizar
    await cliente.update(dadosAtualizados);

    // Buscar cliente atualizado
    const clienteAtualizado = await Cliente.findByPk(id);

    return res.status(200).json({
      success: true,
      message: 'Cliente atualizado com sucesso!',
      data: clienteAtualizado
    });
  } catch (error) {
    console.error('Erro ao atualizar cliente:', error);

    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({
        success: false,
        message: 'Este email já está cadastrado'
      });
    }

    if (error.name === 'SequelizeValidationError') {
      const mensagens = error.errors.map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Erro de validação',
        errors: mensagens
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Erro ao atualizar cliente'
    });
  }
};

// DELETE - Excluir cliente (soft delete)
export const excluirCliente = async (req, res) => {
  try {
    const { id } = req.params;

    const cliente = await Cliente.findByPk(id);

    if (!cliente) {
      return res.status(404).json({
        success: false,
        message: 'Cliente não encontrado'
      });
    }

    // Soft delete: marcar como inativo
    await cliente.update({ ativo: false });

    return res.status(200).json({
      success: true,
      message: 'Cliente marcado como inativo'
    });

    // Para exclusão física (remover do banco):
    // await cliente.destroy();
    // return res.status(200).json({
    //   success: true,
    //   message: 'Cliente excluído permanentemente'
    // });

  } catch (error) {
    console.error('Erro ao excluir cliente:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro ao excluir cliente'
    });
  }
};

// Buscar clientes por email
export const buscarPorEmail = async (req, res) => {
  try {
    const { email } = req.params;

    const cliente = await Cliente.findOne({
      where: { email }
    });

    if (!cliente) {
      return res.status(404).json({
        success: false,
        message: 'Cliente não encontrado'
      });
    }

    return res.status(200).json({
      success: true,
      data: cliente
    });
  } catch (error) {
    console.error('Erro ao buscar cliente por email:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro ao buscar cliente'
    });
  }
};

// Listar clientes ativos por cidade
export const listarPorCidade = async (req, res) => {
  try {
    const { cidade } = req.params;

    const clientes = await Cliente.findAll({
      where: {
        cidade: cidade.charAt(0).toUpperCase() + cidade.slice(1).toLowerCase(),
        ativo: true
      },
      order: [['nome', 'ASC']]
    });

    return res.status(200).json({
      success: true,
      data: clientes,
      total: clientes.length
    });
  } catch (error) {
    console.error('Erro ao listar clientes por cidade:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro ao listar clientes'
    });
  }
};

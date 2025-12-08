// src/models/Cliente.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Cliente = sequelize.define('Cliente', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'id'
  },
  nome: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'O nome é obrigatório'
      },
      len: {
        args: [3, 100],
        msg: 'O nome deve ter entre 3 e 100 caracteres'
      }
    },
    field: 'nome'
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: {
      name: 'clientes_email_key',
      msg: 'Este email já está cadastrado'
    },
    validate: {
      isEmail: {
        msg: 'Email inválido'
      },
      notEmpty: {
        msg: 'O email é obrigatório'
      }
    },
    field: 'email'
  },
  telefone: {
    type: DataTypes.STRING(20),
    validate: {
      len: {
        args: [10, 20],
        msg: 'Telefone deve ter entre 10 e 20 caracteres'
      }
    },
    field: 'telefone'
  },
  data_cadastro: {
    type: DataTypes.DATEONLY,
    defaultValue: DataTypes.NOW,
    field: 'data_cadastro'
  },
  ativo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    field: 'ativo'
  },
  cidade: {
    type: DataTypes.STRING(50),
    field: 'cidade'
  },
  estado: {
    type: DataTypes.STRING(2),
    validate: {
      len: {
        args: [2, 2],
        msg: 'Estado deve ter exatamente 2 caracteres'
      }
    },
    field: 'estado'
  }
}, {
  tableName: 'clientes',
  timestamps: false, // Não usar created_at e updated_at
  underscored: false // Manter nome das colunas como estão
});

export default Cliente;
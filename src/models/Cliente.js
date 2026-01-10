import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

export const Cliente = sequelize.define('Cliente', {
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
  cpf: {
    type: DataTypes.CHAR(11),
    allowNull: false,
    unique: {
      name: 'clientes_cpf_key',
      msg: 'Este CPF já está cadastrado'
    },
    validate: {
      len: [11, 11],
    },
    field: 'cpf',
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
  endereco: {
    type: DataTypes.TEXT,
    field: 'endereco'
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
  },
  data_nascimento: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    field: 'data_nascimento'
  },
  ativo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    field: 'ativo'
  },
}, {
  tableName: 'clientes',
  timestamps: false,
  underscored: false
});

export const ClienteTelefone = sequelize.define('ClienteTelefone', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'id'
  },
  telefone: {
    type: DataTypes.STRING(20),
    validate: {
      len: {
        args: [10, 20],
        msg: 'Cada telefone deve ter entre 10 e 20 caracteres, e os telefones devem ser separados por vírgulas.'
      }
    },
    field: 'telefone'
  },
  tipo: { // whatsapp, celular, fixo...
    type: DataTypes.STRING(100),
    field: 'tipo',
  },
}, {
  tableName: 'cliente_telefone',
  timestamps: false,
  underscored: false
});

Cliente.hasMany(ClienteTelefone);

ClienteTelefone.belongsTo(Cliente);

export default Cliente;

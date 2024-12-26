'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt'); // For hashing passwords

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    // Method to compare passwords
    async validatePassword(password) {
      return bcrypt.compare(password, this.password);
    }
  }

  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Name cannot be empty' },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: { msg: 'Must be a valid email address' },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [8],
          msg: 'Password must be at least 8 characters long',
        },
      },
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'student',
    },
  }, {
    sequelize,
    modelName: 'User',

    // Hooks for hashing password before saving
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          const hashedPassword = await bcrypt.hash(user.password, 10);
          user.password = hashedPassword;
        }
      },
      beforeUpdate: async (user) => {
        if (user.password && user.changed('password')) {
          const hashedPassword = await bcrypt.hash(user.password, 10);
          user.password = hashedPassword;
        }
      },
    },
  });

  return User;
};

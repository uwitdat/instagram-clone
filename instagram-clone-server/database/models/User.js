import { DataTypes } from 'sequelize';


export const user = (db) => {
  db.define('user', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      min: 6
    },
    password: {
      type: DataTypes.TEXT
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
      default: ''
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
      default: ''
    },
  });
}



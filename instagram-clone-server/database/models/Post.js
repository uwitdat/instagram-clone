import { DataTypes } from 'sequelize';


export const post = (db) => {
  db.define('post', {
    postContent: {
      type: DataTypes.STRING,
      allowNull: false,
      default: ''
    },
    postDescription: {
      type: DataTypes.TEXT,
      allowNull: true,
      default: ''
    }
  });
}

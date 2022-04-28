import { DataTypes } from 'sequelize';

export const commentOnPost = (db) => {
  db.define('commentOnPost', {
    commentContent: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });
}

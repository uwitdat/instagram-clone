import { DataTypes } from 'sequelize';

export const replyToComment = (db) => {
  db.define('replyToComment', {
    replyContent: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });
}
import { DataTypes } from 'sequelize';

export const notification = (db) => {
  db.define('notification', {
    notificationType: {
      type: DataTypes.ENUM('liked your post', 'started following you', 'commented:'),
      allowNull: false
    },
    isChecked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
  });
}
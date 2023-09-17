
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class order extends Model {
		// static associate({ users }) {
    //   this.belongsTo(users, { foreignKey: 'user_id', as: 'users' })
    // }

    // toJSON(){
    //   return { ...this.get(), id: undefined }
    // }

	};
	order.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },   
    uid: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    uid_midtrans: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    update_reguler: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    waktu_bayar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    waktu: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    subtotal: {
      type: DataTypes.DECIMAL(20,2),
      allowNull: true,
      defaultValue: 0
    },
    total: {
      type: DataTypes.DECIMAL(20,2),
      allowNull: true,
      defaultValue: 0
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1
    }
	}, {
		sequelize,
		tableName: 'order',
		modelName: 'order',
	});
	return order;
};
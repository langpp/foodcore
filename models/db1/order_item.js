
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class order_item extends Model {
		// static associate({ users }) {
    //   this.belongsTo(users, { foreignKey: 'user_id', as: 'users' })
    // }

    // toJSON(){
    //   return { ...this.get(), id: undefined }
    // }

	};
	order_item.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },   
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    paket_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    }, 
    qty: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    rate: {
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
		tableName: 'order_item',
		modelName: 'order_item',
	});
	return order_item;
};
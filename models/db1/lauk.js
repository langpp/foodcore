
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class lauk extends Model {

	};
	lauk.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    rate: {
      type: DataTypes.DECIMAL(20,2),
      allowNull: true,
      defaultValue: 0
    },
    image: {
      type: DataTypes.TEXT(),
      allowNull: true,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1
    }
	}, {
		sequelize,
		tableName: 'lauk',
		modelName: 'lauk',
	});
	return lauk;
};
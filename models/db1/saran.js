
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class saran extends Model {

	};
	saran.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    saran: {
      type: DataTypes.STRING(),
      allowNull: false
    },
    sumber: {
      type: DataTypes.STRING(),
      allowNull: false
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1
    }
	}, {
		sequelize,
		tableName: 'saran',
		modelName: 'saran',
	});
	return saran;
};
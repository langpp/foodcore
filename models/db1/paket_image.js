
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class paket_image extends Model {

	};
	paket_image.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    paket_id: {
      type: DataTypes.STRING(40),
      allowNull: true
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
		tableName: 'paket_image',
		modelName: 'paket_image',
	});
	return paket_image;
};
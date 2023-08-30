
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class paket extends Model {

	};
	paket.init({
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
    keterangan: {
      type: DataTypes.STRING(),
      allowNull: true
    },
    image1: {
      type: DataTypes.STRING(),
      allowNull: true
    },
    image2: {
      type: DataTypes.STRING(),
      allowNull: true
    },
    type: {
      type: DataTypes.STRING(),
      allowNull: true,
      defaultValue: "Reguler"
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1
    },
    kategori: {
      type: DataTypes.STRING(),
      allowNull: true
    }
	}, {
		sequelize,
		tableName: 'paket',
		modelName: 'paket',
	});
	return paket;
};
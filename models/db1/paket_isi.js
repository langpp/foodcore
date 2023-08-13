
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class paket_isi extends Model {

	};
	paket_isi.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    paket_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    lauk_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1
    }
	}, {
		sequelize,
		tableName: 'paket_isi',
		modelName: 'paket_isi',
	});
	return paket_isi;
};
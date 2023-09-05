
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class paket_like extends Model {

	};
	paket_like.init({
    id : {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    paket_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
	}, {
		sequelize,
		tableName: 'paket_like',
		modelName: 'paket_like',
	});

  paket_like.associate = function(models) {
    paket_like.belongsTo(models.paket, {foreignKey: 'paket_id'});
  }
	return paket_like;
};

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class hari extends Model {
		// static associate({ rate }) {
    //   this.hasMany(rate, { foreignKey: 'hari_id', as: 'rate' })
    // }

    // toJSON(){
    //   return { ...this.get(), id: undefined }
    // }

	};
	hari.init({
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
    status: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1
    }
	}, {
		sequelize,
		tableName: 'hari',
		modelName: 'hari',
	});
	return hari;
};
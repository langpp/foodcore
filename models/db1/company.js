
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class company extends Model {
		// static associate({ users }) {
    //   this.belongsTo(users, { foreignKey: 'user_id', as: 'users' })
    // }

    // toJSON(){
    //   return { ...this.get(), id: undefined }
    // }

	};
	company.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },    
    kode: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    keterangan: {
      type: DataTypes.STRING(),
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1
    }
	}, {
		sequelize,
		tableName: 'company',
		modelName: 'company',
	});
	return company;
};
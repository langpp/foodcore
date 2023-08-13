
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class jadwal_menu extends Model {
		// static associate({ users }) {
    //   this.belongsTo(users, { foreignKey: 'user_id', as: 'users' })
    // }

    // toJSON(){
    //   return { ...this.get(), id: undefined }
    // }

	};
	jadwal_menu.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    paket_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    waktu: {
      type: DataTypes.STRING(),
      allowNull: true,
      defaultValue: "Siang"
    },
    sehat: {
      type: DataTypes.STRING(),
      allowNull: true,
      defaultValue: "Menu Biasa"
    },
    qty: {
      type: DataTypes.INTEGER,
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
		tableName: 'jadwal_menu',
		modelName: 'jadwal_menu',
	});
	return jadwal_menu;
};
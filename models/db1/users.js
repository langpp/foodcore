
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class users extends Model {
		// static associate({ rate, experience, education, review, schedule, project, candidate, wishlist, ticket }) {
    //   this.hasMany(rate, { foreignKey: 'user_id', as: 'rate' }),        
    //   this.hasMany(experience, { foreignKey: 'user_id', as: 'experience' }),
    //   this.hasMany(education, { foreignKey: 'user_id', as: 'education' }),
    //   this.hasMany(review, { foreignKey: 'user_id', as: 'review' }),
    //   this.hasMany(review, { foreignKey: 'reviewer_id', as: 'reviewer' }),
    //   this.hasMany(schedule, { foreignKey: 'user_id', as: 'schedule' }),
    //   this.hasMany(project, { foreignKey: 'user_id', as: 'project' }),
    //   this.hasMany(project, { foreignKey: 'winner_id', as: 'winner' }),
    //   this.hasMany(candidate, { foreignKey: 'candidate_id', as: 'candidate' }),
    //   this.hasMany(wishlist, { foreignKey: 'user_id', as: 'wishlist' }),
    //   this.hasMany(wishlist, { foreignKey: 'user_target_id', as: 'user_target' }),
    //   this.hasMany(ticket, { foreignKey: 'user_id', as: 'ticket' })
		// }

    // toJSON(){
    //   return { ...this.get(), id: undefined }
    // }

	};
	users.init({
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
    username: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true
    },
    uid: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    token: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    first_name: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    last_name: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    timezone_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 272
    },
    birthday: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    linkedin: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    rate: {
      type: DataTypes.DECIMAL(20,2),
      allowNull: true,
      defaultValue: 0
    },
    time_unit_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 2
    },
    currency_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 106
    },
    bio: {
      type: DataTypes.TEXT(),
      allowNull: true
    },
    tanggal: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    userType: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 7
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1
    },
    foto_profile: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
	}, {
		sequelize,
		tableName: 'users',
		modelName: 'users',
	});
	return users;
};
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
//const env = process.env.NODE_ENV || 'development';
const env = 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

fs.readdirSync(__dirname)
  .filter((file) => {
    return file.indexOf('.') !== 0 && file !== basename;
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

db.user_dog_info.hasMany(db.dog_poo, {
  sourceKey: 'uid',
  foreignKey: 'user_dog_id',
});
db.dog_poo.belongsTo(db.user_dog_info, {
  targetKey: 'uid',
  foreignKey: 'user_dog_id',
});

db.user_dog_info.hasMany(db.dog_pee, {
  sourceKey: 'uid',
  foreignKey: 'user_dog_id',
});
db.dog_pee.belongsTo(db.user_dog_info, {
  targetKey: 'uid',
  foreignKey: 'user_dog_id',
});

db.user_dog_info.hasMany(db.intake, {
  sourceKey: 'uid',
  foreignKey: 'user_dog_id',
});
db.intake.belongsTo(db.user_dog_info, {
  targetKey: 'uid',
  foreignKey: 'user_dog_id',
});

db.sequelize = sequelize;

module.exports = db;

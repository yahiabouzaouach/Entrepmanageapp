const fs= require("fs");
const Sequelize= require("sequelize");
const config= require('./../config/sequelizeConfig');
const models ={};
const sequelizeConnection= new Sequelize(config.development);


fs.readdirSync(__dirname).
filter(file =>file.indexOf(".")!=0 && file !=="index.js")
.forEach(file =>{
    let model = require("./"+ file)(sequelizeConnection,Sequelize);
    models[model.name]=model.schema;
});




models.Categorie.hasMany(models.depense);
models.depense.belongsTo(models.Categorie, { foreignKey: 'NomCat' });

models.Categorie.hasMany(models.depense);
models.depense.belongsTo(models.Categorie);

module.exports = models;
module.exports=sequelizeConnection;

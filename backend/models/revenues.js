module.exports = (sequelize,DataTypes)=>{
    const Revenues  =sequelize.define("Revenues",{
        idrev:{
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },nomprojet:{
        type:DataTypes.STRING,
        allowNull: false
    },nomclient:{
        type:DataTypes.STRING,
        allowNull: false
    },montant:{
        type:DataTypes.FLOAT,
        allowNull: false
    }
}
    );
    return {name:'Revenues',schema: Revenues}  
    }
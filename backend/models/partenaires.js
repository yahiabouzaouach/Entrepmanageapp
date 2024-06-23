module.exports = (sequelize,DataTypes)=>{
    const Partenaires =sequelize.define("Partenaires",{
        NomPartenaiers:{
        type:DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },adresse:{
        type:DataTypes.STRING,
        allowNull: false
    },numtel:{
        type:DataTypes.INTEGER,
        allowNull: false
    }
}
    );
    return {name:'Partenaires',schema: Partenaires}  
    }
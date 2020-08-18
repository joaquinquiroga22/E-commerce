const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("user", {
        email: {
            type: DataTypes.STRING,
            isEmail: true, // ===> Preguntar bien a Ger si esta bien esta validacion. 
            allowNull: false,
            unique: true,
            
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
            notNull: {
            msg: "Ingresa tu nombre",
            },
          },
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
            notNull: {
            msg: "Ingresa tu apellido",
            },
          },
        },
        password : {
            type: DataTypes.STRING,
            allowNull: false
        },
        role : {
            type: DataTypes.ENUM("admin", "user")

        }

    }

    )
}


// Generador de Hash para seguridad de password: 
//  User.methods.generateHash = function(password) {
//  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
//  };
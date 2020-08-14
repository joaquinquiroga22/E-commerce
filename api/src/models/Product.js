const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("product", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter your name",
        },
      },
      //validate: {
      // len: [5, 10]
      //} Esto tambien puede ir, son caracteres.
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter your name",
        },
      },
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      isFloat: {
        msg: "Solo Numeros",
      },
    },
    image: {
      type: DataTypes.BLOB,
      allowNull: true,
      //No se cual iria aca
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      isInt: {
        msg: "No es un entero",
      },
    },
  });
};

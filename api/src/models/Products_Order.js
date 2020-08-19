const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("productsorder", {
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      isDecimal: {
        msg: "Solo Numeros",
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      isInt: {
        msg: "No es un entero",
      },
    },
  });
};

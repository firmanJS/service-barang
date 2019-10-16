'use strict';
module.exports = (sequelize, DataTypes) => {
  const Barang = sequelize.define('Barang', {
    namabarang: DataTypes.STRING,
    hargajual: DataTypes.INTEGER,
    hargabeli: DataTypes.INTEGER,
    jumlah: DataTypes.DOUBLE,
    total: DataTypes.FLOAT,
    qty: DataTypes.INTEGER
  }, {});
  Barang.associate = function(models) {
    // associations can be defined here
  };
  return Barang;
};
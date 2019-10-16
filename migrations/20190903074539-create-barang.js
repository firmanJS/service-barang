'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Barangs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      namabarang: {
        type: Sequelize.STRING,
        allowNull: false
      },
      hargajual: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      hargabeli: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      jumlah: {
        type: Sequelize.DOUBLE,
        defaultValue :0
      },
      total: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue :0
      },
      qty: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }).then(() => queryInterface.addIndex('Barangs', ['namabarang','hargajual','hargabeli','jumlah','total','qty']));
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Barangs');
  }
};
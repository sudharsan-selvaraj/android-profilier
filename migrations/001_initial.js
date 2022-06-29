var promise = require('bluebird');

var createSessionsTable = function (queryInterface, Sequelize) {
  return queryInterface.createTable('sessions', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    uuid: { type: Sequelize.TEXT, allowNull: true, unique: true },
    name: { type: Sequelize.TEXT, allowNull: true },
    device_name: { type: Sequelize.TEXT, allowNull: true },
    device_udid: { type: Sequelize.TEXT, allowNull: true },
    device_total_ram: { type: Sequelize.TEXT, allowNull: false },
    device_total_cpu: { type: Sequelize.INTEGER, allowNull: false },
    device_version: { type: Sequelize.TEXT, allowNull: true },
    app_bundle_id: { type: Sequelize.TEXT, allowNull: true },
    is_real_device: { type: Sequelize.BOOLEAN, allowNull: true },
    completed: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    start_time: Sequelize.DATE,
    end_time: Sequelize.DATE,
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE,
  });
};

var createAppProfileTable = function (queryInterface, Sequelize) {
  return queryInterface.createTable('profiling', {
    session_id: {
      type: Sequelize.TEXT,
      references: { model: 'sessions', key: 'id' },
      onDelete: 'CASCADE',
    },
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    timestamp: Sequelize.DATE,
    cpu: { type: Sequelize.TEXT, allowNull: false, defaultValue: '0' },
    memory: { type: Sequelize.TEXT, allowNull: false, defaultValue: '0' },
    total_cpu_used: {
      type: Sequelize.TEXT,
      allowNull: false,
      defaultValue: '0',
    },
    total_memory_used: {
      type: Sequelize.TEXT,
      allowNull: false,
      defaultValue: '0',
    },
    raw_cpu_log: { type: Sequelize.TEXT },
    raw_memory_log: { type: Sequelize.TEXT },
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE,
  });
};

module.exports = {
  up: (queryInterface, Sequelize) => {
    return promise.each(
      [createSessionsTable, createAppProfileTable],
      function (table) {
        return table(queryInterface, Sequelize);
      }
    );
  },
  down: (queryInterface, Sequelize) => {
    return promise.each(['profiling', 'sessions'], function (table) {
      return queryInterface.dropTable(table);
    });
  },
};

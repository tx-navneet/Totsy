"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint("Students", {
      fields: ["date", "category"],
      type: "unique",
      name: "unique_date_category",
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint("Students", "unique_date_category");
  },
};

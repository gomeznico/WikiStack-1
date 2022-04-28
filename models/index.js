const Sequelize = require("sequelize");
const db = new Sequelize("postgres://localhost:5432/wikistack", {
  logging: false,
});

const Page = db.define(
  "page",
  {
    title: { type: Sequelize.STRING, allowNull: false },

    slug: { type: Sequelize.STRING, allowNull: false },

    content: { type: Sequelize.TEXT, allowNull: false },

    status: { type: Sequelize.ENUM("open", "closed"), defaultValue: "open" },
  },

  {
    hooks: {
      beforeValidate: (page, options) => {
        page.slug = "test";
        //  page.title.replace(/\s+/g, "_").replace(/\W/g, "");
      },
    },
  }
);
// function generateSlug (title) {
//   // Removes all non-alphanumeric characters from title
//   // And make whitespace underscore
//   return title.replace(/\s+/g, '_').replace(/\W/g, '');
// }

const User = db.define("user", {
  name: { type: Sequelize.STRING, allowNull: false, unique: true },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { isEmail: true },
  },
});

module.exports = {
  db,
  Page,
  User,
};

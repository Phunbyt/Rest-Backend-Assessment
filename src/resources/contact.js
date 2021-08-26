import Contact from "../controllers/contact";
const { validateToken } = require("../services/jwt.js");

/**
 *
 *
 */
module.exports = (app) => {
  app.route("/contact/all/:user_id").get(validateToken, Contact.all);
  app
    .route("/contact/get/:user_id/:contact_id")
    .post(validateToken, Contact.get);
  app.route("/contact/create/:user_id").post(validateToken, Contact.create);
  app.route("/contact/remove/:user_id/:contact_id").delete(validateToken, Contact.remove);
  app
    .route("/contact/update/:user_id/:contact_id")
    .put(validateToken, Contact.update);
  /**
   * Create the remaining routes
   * get,
   * create,
   * delete,
   * update,
   * remove
   */
};

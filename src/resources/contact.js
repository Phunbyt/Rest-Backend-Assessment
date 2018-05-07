import Contact from '../controllers/contact';
/**
 * 
 * 
 */
module.exports = app => {
    app.route('/contact/all').get(Contact.all);
    /**
     * Create the remaining routes
     * get,
     * create,
     * delete,
     * update,
     * remove
     */
};

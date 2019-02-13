/*
 *  This assignment no 6 for the NODE Masterclass
 *  Create simple API route /hello with welcome message 
 *  Add cluster module to application
 * 
 * 
 *  author: Byron Dunkley
 * 
 * 
 * 
 */

 const server = require('./lib/server');

 // Declare the app
 const app = {};


 app.init = () => {
     
    // start server
    server.init();
 }


 // start app
 app.init();


 module.exports = app;
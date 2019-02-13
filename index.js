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
 const os = require('os');
 const cluster = require('cluster');
 
 // Calculate the number of cores 
 const cores = os.cpus().length;

 // Declare the app
 const app = {};


 app.init = () => {
     

   // Check if we are in master thread
    if(cluster.isMaster) {
       // start server
       
       // Fork the process
       for(let i = 0; i < cores; i++){
          cluster.fork()
         }
      } else {
         // If we are not in the master thread start the HTTP server
         server.init()
      }
   }


 // start app
 app.init();


 module.exports = app;
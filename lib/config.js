/*
 * Create config object fro the server
 * 
 */

 // Set object to host configuations
 const environments = {};

 environments.staging = {
     httpPort : 3000,
     httpsPort: 3001,
     envName: 'staging'
 }

environments.staging = {
    httpPort: 3000,
    httpsPort: 3001,
    envName: 'staging'
}

// Determine which environment was passed as command-line argument
const currentEnvironment = typeof(process.env.NODE_ENV) === 'string'? process.env.NODE_ENV.toLowerCase() : '';

// Determine environment tyo export
const environmentToExport = typeof (environments[currentEnvironment]) === 'object' ? environments[currentEnvironment] : environments.staging

// Export config object/settngs
module.exports = environmentToExport;
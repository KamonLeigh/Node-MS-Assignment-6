/*
 * 
 * 
 * Server-related task
 * 
 * 
 * 
 */

 // Dependencies
 const http = require('http');
 const https = require('https');
 const fs = require('fs');
 const path = require('path');
 const url = require('url');
 const stringDecoder = require('string_decoder').StringDecoder;
 const handler = require('./handler');
 const config = require('./config');
 const helpers = require('./helpers');


 const server = {};


 // Keys for HTTPS server
 server.httpServerOptions = {
    key: fs.readFileSync(path.join(__dirname, './../https/key.pem')),
    cert: fs.readFileSync(path.join(__dirname, './../https/cert.pem'))
 }

 // Instantiate the HTTP Server
 server.httpServer = http.createServer((req, res) => {
     server.unifiedServer(req, res);
 });

 // Instantiate the HTTPS Server
 server.httpsServer = https.createServer(server.httpServerOptions, (req, res) => {
    server.unifiedServer(req, res);
 });

 // All the logic for both of the servers
 server.unifiedServer = ((req, res) => {

    // Get the url string and parse it
    const parsedString = url.parse(req.url, true);

    // Get the pathname
    const path = parsedString.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');

    // We need to obtain the query string
    const queryStringObject = parsedString.query;

    // Request the method
    const method = req.method;

    // Get the headers
    const headers = req.headers;

    // obtain the payload if there is one
    const decoder = new stringDecoder('utf-8');

    let buffer = '';

    req.on('data', (data) =>{
        buffer += decoder.write(data);
    });

    req.on('end', () =>{
        buffer += decoder.end();
    

    // Choose the handler in which the request should go

    const chosenHandler = typeof(server.router[trimmedPath]) !== 'undefined'? server.router[trimmedPath] : handler.notFound;

    // Construct the data object that should go back the handler
    const data = {
        trimmedPath,
        queryStringObject,
        method,
        headers,
        payload: helpers.parseJsonToObject(buffer)
    }

    chosenHandler(data,(statusCode, payload) => {

        // Call the statusCode called by the handler or default to 200
        statusCode = typeof(statusCode) === 'number' ? statusCode : 200;
        
        // Ensure that payload is an object and default to empty object
        payload = typeof(payload) === 'object' ? payload : {};

        // convert the payload to a string
        const payloadString = JSON.stringify(payload);

        // Send back the response 
        res.setHeader('Content-type', 'application/json');
        res.writeHead(statusCode);
        res.end(payloadString);

        console.log(`Returning this response ${statusCode} ${payloadString}`);

    });


 });

});


 // Define a server route
 server.router ={
     hello: handler.hello,
     ping: handler.ping
 }

 server.init = () => {

    // Start HTTP
    server.httpServer.listen(config.httpPort, () => {
    console.log(`The server is listening on port ${config.httpPort} in ${config.envName} mode`);
    });

    // Start HTTPS
    server.httpsServer.listen(config.httpsPort, () => {
    console.log(`The server is listenig on port ${config.httpsPort} in ${config.envName} mode`)
    })
 }

 // Export the server
 module.exports = server;
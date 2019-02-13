/*
 * 
 * Request handlers
 * 
 */

 const handlers = {};

 // handle methods
 handlers._hello = {};

 //ping handler
 handlers.ping = (data, callback) => {
     callback(200)
 };

 // path not found 
 handlers.notFound = ( data, callback ) => {
     callback(404);
 };

 handlers.hello = ( data, callback ) => {

    if(data.method === 'POST'){
        handlers._hello[data.method](data, callback);
    } else {
        callback(406);
    }
 };

 handlers._hello.POST = (data, callback) => {
   
    const name = typeof (data.payload.name) === 'string' && data.payload.name.trim().length > 0 ? data.payload.name.trim() : false;

    if(name){

        callback(200, {'message': 'Hello ' + name + '. How are you?'})
    } else {
        callback(406, {'message':'Please send body with key=name and value=your name'})
    }

 };

 // Export handlers
 module.exports = handlers;
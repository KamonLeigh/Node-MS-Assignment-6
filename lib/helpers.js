/**
 * 
 * functions to help run server
 * 
 * 
 */

 const helpers = {};
 
 // Parse JSON string
 helpers.parseJsonToObject = (str) => {

    try{
        return JSON.parse(str);

    } catch(e){

        return {};
    }

 }


 // helpers object
 module.exports = helpers;
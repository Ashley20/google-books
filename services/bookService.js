'use strict'

const google     = require('googleapis');
const books      = google.books('v1');


module.exports.search = (queryString) => {
  
    return new Promise(function(resolve, reject){
        books.volumes.list({
            q : queryString,
            maxResults : 40
        },(err, response) => {
            if(err){
                reject(err);
            }
            console.log(response.items);
            resolve(response);
        });
    });

}

module.exports.fetchVolumes = (type) => {
    let shelf = '';
    
    switch(type){
         case 'favorites':
           shelf = '0';
           break;
         case 'purchased':
           shelf = '1';
           break;
         
         case 'toread':
           shelf = '2';
           break;

         case 'readingnow': 
           shelf = '3'; 
           break;

         case 'haveread':
           shelf = '4';
           break;
         
         case 'reviewed':
           shelf = '5';
           break;
         case 'recentlyviewed':
           shelf = '6';
           break;

         case 'ebooks':
           shelf = '7';
           break;

        
    }

    return new Promise(function(resolve, reject){

        books.mylibrary.bookshelves.volumes.list({ 
            shelf : shelf,
            maxResults : 50
        }, (err, response) => {
            if(err){
              reject(err);
            }
              resolve(response);
        });
    });
    
}

module.exports.addVolume = (id, shelf) => {

    return new Promise(function(resolve, reject){
        books.mylibrary.bookshelves.addVolume({
            volumeId : id,
            shelf : shelf
 
        }, (err, response) => {
            if(err){
                reject(err);
            }
                resolve(response);

        });
    });
}

module.exports.removeVolume = (id, shelf) => {

    return new Promise(function(resolve, reject){
        books.mylibrary.bookshelves.removeVolume({
            volumeId : id,
            shelf : shelf
        }, (err, response) => {
            if(err){
                reject(err);
            }
                resolve(response);
        });
    });
    
}


module.exports.fetchVolumeDetails = (id) => {
    
    return new Promise(function(resolve, reject){
        books.volumes.get({
            volumeId : id
        }, (err, response) => {
            if(err){
                reject(err);
            }
                resolve(response);
        });
    });
}
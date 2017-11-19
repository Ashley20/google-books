'use strict'

const google     = require('googleapis');
const books      = google.books('v1');
const isLoggedIn = require('../auth/isLoggedIn');
const service    = require('../services/bookService');


let q = '';


module.exports = function(router){


   /**
    * Router handling search for a book.
    */

    router.get('/searches', isLoggedIn,  (req, res) => {
        res.render('search');
    });

    router.post('/searches', isLoggedIn,  (req, res) => {
        service.search(req.body.srch)
            .then(function(response){
                res.render('search', { books : response.items});
            })
            .catch(function(err){
                throw err;
            });
       
    });



    /**
     * Router handling opening a book with the given ISBN number in read-mode.
     */

    router.get('/books/:id/isbn/:bookISBN', isLoggedIn, (req, res) => {
          
           res.render('display', {
               id : req.params.id,
               bookISBN : req.params.bookISBN
           });
    });
           


        
   /**
    * Router handling fetching books from  a specific library shelf.
    */

    router.get('/books', isLoggedIn, (req, res) => {
        service.fetchVolumes(req.query.type)
        .then(function(response){
            res.render('books', { books : response.items});
        })
        .catch(function(err){
            throw err;
        });
       
    });




    /**
     * Router handling book addition to a specific library shelf.
     */

    router.post('/books', isLoggedIn, (req, res) => {
        service.addVolume(req.body.id, req.body.shelf)
        .then(function(response){
            res.json({ success : 'true', message:'The book has been successfully added to the library'});
        })
        .catch(function(err){
            throw err;
        });
       
    });


    
    /**
     * Router handling book deletion from a specific library shelf.
     */

    router.delete('/books', isLoggedIn, (req, res) => {

        service.removeVolume(req.body.id, req.body.shelf)
        .then(function(response){
            res.json({ success : 'true', message: ' The book has been successfuly removed from the library'});
        })
        .catch(function(err){
            throw err;
        });

    });


    /**
     * Router handling displaying the details of a specific book.
     */

     router.get('/books/:id/details', isLoggedIn, (req, res) => {

        service.fetchVolumeDetails(req.params.id)
        .then(function(response){
            res.render('details', { book : response});
        })
        .catch(function(err){
            throw err;
        });

     });
    

    

}


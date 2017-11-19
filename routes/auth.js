'use strict'

const isLoggedIn = require('../auth/isLoggedIn');
const google = require('googleapis');


// Get required credentials
let creds = require('../credentials.js');


module.exports = function(router, passport){

    // Google auth
    router.get('/auth/google',
        passport.authenticate('google', { scope: ['email', 'profile'] }));


    // Google auth callback
    router.get('/auth/google/callback', 
        passport.authenticate('google', { failureRedirect: '/login' }),
        function(req, res) {
        
            res.redirect('/consent');
        });

    // Login page
    router.get('/login',  (req, res) => {
        res.render('login');
    });
 

    // Logout
    router.get('/logout', (req, res) =>{
        req.logout();
        res.redirect('/login');

    });

    // First time user visits the page  she/he  is directed to login page 
    router.get('/', (req, res) =>{
        res.render('login');
    });
}





    


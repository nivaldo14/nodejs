module.exports = () => {
    const express = require('express');
    const app = express();
    const bodyparser = require('body-parser')
    const passport =require('passport')
    const expressValidator =require ('express-validator');

    app.set('view engine','ejs')
    app.set('views','./app/views')


    app.use(bodyparser.json());
    app.use(bodyparser.urlencoded({ extended: true}));
    app.use(expressValidator()); //validar os campos


    //app.use(passport.initialize())
    //app.use(passport.session())
    

    var rotas =require('../app/routes/web');
    rotas(app);


    
    app.listen(3000, () => {
        console.log('localhost:3000');
    })
}
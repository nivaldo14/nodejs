const userController = require('../controllers/usercontroller');





module.exports = (app) => {


    app.use(function (req, res, next) {
        //console.log(global.iduserlog === undefined)
        if (global.iduserlog == undefined) {
            //console.log('entro undefined')
            return res.render('site/login', {
                retornolg:''
            });
        } else {
            next();
        }
    });




    app.get('/', (req, res) => {
        //res.render('site/login')
        userController.indexLg(req, res);
    });

    app.post('/', (req, res) => {
        userController.login(req, res);
    });
    // post login para home
    app.post('/home', (req, res) => {
        //console.log('entrou web.js rotas quando houve post')

        userController.login(req, res);
        //res.render('site/home')
    });

    app.get('/novouser', (req, res) => {
        //res.render('site/novouser')
        userController.index(req, res);
    });
    app.post('/novouser', (req, res) => {
        //userController.store(req, res)
        userController.store(req, res)

    });
    app.get('/home', (req, res) => {
        console.log('requisicao pagina')

        //console.log(req.session.authenticated );
        //res.render('site/home',{user:req.user});
        res.render('site/home');

    });


}
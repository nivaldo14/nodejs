const userController = require('../controllers/usercontroller');


module.exports = (app) => {

    /*app.use(function (req, res, next) {
        //console.log(global.iduserlog === undefined)
        if (global.iduserlog == undefined) {
            //console.log('entro undefined')
            return res.render('site/login', {
                retornolg:''
            });
        } else {
            next();
        }
    });*/


   

   /* 
   exemplo abaixo tbm funciona 

   function logado(req, res, next){
            //console.log('chamou funcao');
            if (global.iduserlog == undefined) {
                return res.render('site/login', {
                    retornolg:''
                });
            } else {
                next();
            }
        

    }
    para chamar a funcao
    app.post('/home',logado, (req, res) => {
    */

    

    app.get('/', (req, res) => {
        //res.render('site/login')
        
        userController.indexLg(req, res);
    });

    app.post('/', (req, res) => {
        
        userController.login(req, res);
    });
    
    
    // codigo abaixo .. exclua-se o de cima

    app.all('/*',function(req,res,next){
        if (global.iduserlog == undefined) {
            res.end('401-Não Autorizado');
        } else {
            next();
        }
    });



    app.post('/home', (req, res) => {
        //console.log('entrou web.js rotas quando houve post')
        
        userController.login(req, res);
        //res.render('site/home')
    });

    app.get('/novouser', (req, res,next) => {
        //logado(req,res,next);
        userController.index(req, res);
    });
    app.post('/novouser', (req, res) => {
        //userController.store(req, res)
        userController.store(req, res)

    });
    app.get('/home', (req, res,next) => {
        console.log('requisicao pagina home');
        //res.render('site/home',{user:req.user});
        res.render('site/home',{retornolg:retornolg});

    });


}
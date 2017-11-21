const userModel = require('../model/userModel')();

module.exports.index = (req, res) => {
 
    res.render('site/novouser', {
        erros: {},
        dados: {}
    });

   
};


module.exports.indexLg = (req, res) => {
  
    res.render('site/login', {
        retornolg: '',
        
    });
    //console.log('index login');

   
  
};


module.exports.store = (req, res) => {
    const dados = req.body
    req.assert('nmuser', 'Nome Usuário Requerido!').notEmpty();
    req.assert('email', 'Email Requerido!').notEmpty();
    req.assert('email', 'Requerido um email válido!').isEmail();

    req.assert('senha', 'Senha deve conter minimo 6 maximo 10!').len(6, 10);

    const validacaoErros = req.validationErrors();

    if (validacaoErros) {
        res.render('site/novouser', {
            erros: validacaoErros,
            dados: dados
        });
        //console.log(validacaoErros);
        return;
    }

    userModel.save(dados, (erro, resultado) => {

        if (!erro) {
           
            res.redirect('/novouser')
            //console.log('cad sucesso')

        } else {
            //console.log('erro adicionar user')
           // res.redirect('/home')
        }
    });

}
module.exports.login = (req, res) => {
    const dados = req.body

    

    //req.assert('email', 'Email Requerido!').notEmpty();

    userModel.login(dados, (erro, resultado) => {
        /* console.log(resultado);
         console.log(resultado.length);*/
         const retornolg='';

        if (!erro) {

            if (resultado.length !== 0) {

                global.iduserlog = resultado[0].iduser;

               // console.log(global.iduserlog)
                console.log(resultado[0].iduser)
                res.render('site/home', {
                    retornolg: resultado[0].nmuser
                })

            } else {
                //console.log('Acesso negado!');
                res.render('site/login', {
                    retornolg: 'Senha incorreta!!!'
                })
            }

        } else {
            console.log('erro login' + erro);
            //res.redirect('/home')
        }
    });

}
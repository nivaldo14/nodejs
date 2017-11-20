const userModel = require('../model/userModel')();

module.exports.index = (req, res) => {
    // para o refresh em tela .. o iniciar .. 
// console.log(res);

    res.render('site/novouser', {
        erros: {},
        dados: {}
    });

   
  //  console.log('chamou index');
};


module.exports.indexLg = (req, res) => {
  
    res.render('site/login', {
        retornolg: '',
        
    });

   
  
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

    //const retornolg = 'acesso negado';

    //req.assert('email', 'Email Requerido!').notEmpty();

    userModel.login(dados, (erro, resultado) => {
        /* console.log(resultado);
         console.log(resultado.length);*/
         const retornolg='';

        if (!erro) {

            if (resultado.length !== 0) {

                //req.session.iduser = true;
                global.iduserlog = resultado[0];

                console.log(iduserlog);
                res.redirect('/home')
                console.log('login sucesso');

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
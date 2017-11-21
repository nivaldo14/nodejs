var db = require('../../config/db')
//const passport = require('passport') somente para autenticacao

var md5 = require('md5')

module.exports = () => {
    this.save = (dados, retorno) => {
        var pwd = md5(dados.senha);
        //console.log(pwd);
        var con = db();
        //const str ="insert into users (email,nmuser,senha) values ('" + dados.email  + "','"+ dados.nmuser  +"','"+ pwd +"')";
        //return con.query(str,retorno);
        //return con.query('insert into users set ?', dados,retorno);

        con.query('insert into users (email,nmuser,senha) values (?,?,?)', [dados.email, dados.nmuser, pwd], retorno)
        //return retorno;



        /// nao precisa do codigo abaixo
        // pq o token gera quando se loga 
        /*
         con.query('select LAST_INSERT_ID() as user_id',(erro, res,campo)=>{
             
             if(erro) throw erro
             
             console.log( " --> ultimo id"+ JSON.stringify(res[0]))
             ///" --> ultimo id"+
             return JSON.stringify(res[0])
         })
          */

    };
    this.login = (dados, retorno) => {

      //  console.log('entrou model user para select')
        
        const pwd = md5(dados.senha);
        
        //console.log(pwd)
        const con = db();
        con.query('select iduser,nmuser from users where email =? and senha =? and sta=?', [dados.email, pwd, 'A'], retorno);
        //console.log("Altenticou usermodel");
        
    };
    //console.log(this);
    return this;

}
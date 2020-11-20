
    class UserModel
    {
        // Definimos as propriedades do nosso objeto
        constructor() 
        { 
            console.log("Model diz: Fui criada!!!");
            this._nome = "";
            this._login= "";
            this._imagem= "";
            this._repos= []; 
        }


        buscaUsuario(login)
        {
            let request = new XMLHttpRequest();
            console.log("Bora buscar os dados do usuario!!!")
            
            request.addEventListener( "load", () =>
            {
                try
                {
                    if ( request.status == 200 )
                    {
                        let dadosUsuario = JSON.parse(request.responseText);
                        console.log(dadosUsuario);  
                        this._atualizaDados(dadosUsuario);
                        
                    }
                    else
                    {
                        throw new Error("Ops!!!");
                    }
                }  catch ( err ) {

                }             
                
            });

            request.open( "GET", `https://api.github.com/users/${login}`, false );    

            request.send();
        }


        localizaRepositorio(login){

            console.log('Model funciona')
    
            let request = new XMLHttpRequest
    
            request.addEventListener('load', ()=>{
                console.log('request funciona')
    
                if(request.status == 200)
                {    
                    let dadosRepositorio = JSON.parse(request.responseText);
                    this._repos=  dadosRepositorio;
                                      
                }
                
            })
    
    
            request.open('GET', `https://api.github.com/users/${login}/repos`, false)
    
            request.send()
        }


        _atualizaDados( dadosUsuario )
        {
            console.log( "Model: Atualizando os meus dados" );
            this._nome= dadosUsuario.name;
            this._login = dadosUsuario.login;
            console.log(this._login)
            this._imagem = dadosUsuario.avatar_url;
            console.log(this._repos);
            console.log(dadosRepositorio);
            
        }

        getNome()
        {
            return this._nome;
        }

        getLogin()
        {
            return this._login;
            
        }

        
        getImagem()
        {
            return this._imagem;
        }

        getRepos() 
        {
            return this._repos;
        }
        
    }

    class UserView
    {
        
        apresenta ( dados )
        {
            
            let nome = document.querySelector('.nomeDoPerfil');
            nome.textContent = dados.getNome();
            // console.log(nome)
            let log = document.querySelector('.login');
            log.textContent = dados.getLogin();

            let foto = document.querySelector('.imagem');
            
            foto.innerHTML = `<img src="${dados.getImagem()}">`;
            
            let mostraUsuario = document.querySelector('.mostraUsuario');

            // // let repos = documet.querySelector('.repositorios');
            // repos.textContent =dados.getRepos()
            console.log(dados.getRepos())
            // ; ;
            // console.log(repos)
              
        }
    }

 


    class Controller
    {
        constructor()
        {
            this.model = null;
        }
        procuraUsuario(login)
        {
            this.model = new UserModel;
            this.model.buscaUsuario(login);

            let view = new UserView();
            view.apresenta( this.model);
        }

        localizaRepositorio(login)
        {
            let user = this.model
            user.localizaRepositorio(login);
            let view = new UserView;
            view.apresenta( user)
        }
    }
    

    let controller = new Controller();
    
    let btnSearch = document.querySelector('.btnSearch');
    let body = document.querySelector('.principal')

    btnSearch.addEventListener('click', function(envent)
        {
            envent.preventDefault();
            let nomeUsuario = document.querySelector('#search').value;
            controller.procuraUsuario(nomeUsuario);
            controller.localizaRepositorio(nomeUsuario);
            // inputSearch.value = "";
            // inputSearch.focus();
        });
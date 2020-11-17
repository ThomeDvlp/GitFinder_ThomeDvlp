
    class UserModel
    {
        // Definimos as propriedades do nosso objeto
        constructor() 
        { 
            console.log("Model diz: Fui criada!!!");
            this._nome = "";
            this._login= "";
            this._imagem= "";
            this._repos= ""; 
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
                    this._repositorios = dadosRepositorio;
                    console.log(this._repositorios);                   
                }
    
            })
    
    
            request.open('GET', `https://api.github.com/users/${login}/repos`, false)
    
            request.send()
        }


        _atualizaDados( dadosUsuario )
        {
            // console.log(dadosUsuario);
            // console.log( "Model: Atualizando os meus dados" );
            this._nome= dadosUsuario.name;
            console.log(this._nome)
            this._login = dadosUsuario.login;
            console.log(this._login)
            this._imagem = dados.avatar_url;
            this._repos = dadosRepositorio;
            console.log(this._repos);
            console.log(this._repositorios);
            
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
            return this._repositorios;
        }
        
    }

    class UserView
    {
        
        apresenta ( dados )
        {
            let repos = this._repositorios
            console.log(repos)
            let nome = document.querySelector('.nomeDoPerfil');
            nome.textContent = dados.getNome();
            let log = document.querySelector('.login');
            log.textContent = dados.getLogin();
            let foto = document.querySelector('#foto_perfil');
            foto.src = dados.getImagem();
            // let repos = document.querySelector('.repos')
            // console.log(dados._repositorios);
              
        }
    }

    

    class Controller
    {
        procuraUsuario(login)
        {
            let user = new UserModel;
            user.buscaUsuario(login);

            let view = new UserView();
            view.apresenta( user );
        }

        localizaRepositorio(login)
        {
            let user = new UserModel
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
    
    controller.localizaRepositorio(nomeUsuario);
    controller.procuraUsuario(nomeUsuario);

    });


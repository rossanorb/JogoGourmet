window.onload = function(){

    if(document.getElementById('s') != null){
        document.getElementById('s').addEventListener('click', function(){                
            document.getElementById('option').value = this.id;
            document.querySelector("form[name=proximo]").submit();
        });
    }

    if(document.getElementById('n') != null){
        document.getElementById('n').addEventListener('click', function(){                
            document.getElementById('option').value = this.id;
            document.querySelector("form[name=proximo]").submit();
        });
    }

    disableSubmit = function(campo){
        console.log(campo);

        if(document.getElementById(campo).value){
            document.querySelector("button[type=submit]").disabled = false;                
        }else{
            document.querySelector("button[type=submit]").disabled = true;
        }
    }    

    if(document.querySelector('.nome_prato') != null){
        disableSubmit('nome_prato');
        this.addEventListener('keyup',  function(){
            disableSubmit('nome_prato');
        });
    }

    if(document.querySelector('.opcao') != null){
        disableSubmit('opcao');
        this.addEventListener('keyup',  function(){
            disableSubmit('opcao');
        });
    }    

}
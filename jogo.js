let rodada = 1;
let matriz_jogo = Array(3);

matriz_jogo['a'] = Array(3);
matriz_jogo['b'] = Array(3);
matriz_jogo['c'] = Array(3);

//linha a
matriz_jogo['a'][1] = 0;
matriz_jogo['a'][2] = 0;
matriz_jogo['a'][3] = 0;

//linha b
matriz_jogo['b'][1] = 0;
matriz_jogo['b'][2] = 0;
matriz_jogo['b'][3] = 0;

//linha c
matriz_jogo['c'][1] = 0;
matriz_jogo['c'][2] = 0;
matriz_jogo['c'][3] = 0;

$(document).ready(function(){
    
    $('#btn_iniciar_jogo').click(function(){

        //valida a digitação dos apelidos
        if ($('#entrada_apelido_jogador1').val() == ''){
            alert("Apelido do jogador 1 não foi preenchido");
            return false
        }
        if ($('#entrada_apelido_jogador2').val() == ''){
            alert("Apelido do jogador 2 não foi preenchido");
            return false
        }
        
        //exibir os apelidos
        $('#nome_jogador1').html($('#entrada_apelido_jogador1').val()); //html = innerHtml, insere no algo DOM, diretamente no html
        $('#nome_jogador2').html($('#entrada_apelido_jogador2').val()); //html = innerHtml, insere no algo DOM, diretamente no html

        //navegação
        $('#pagina_inicial').hide();
        $('#palco_jogo').show();

    });

    $('.jogada').click(function(){
        let id_campo_clicado = this.id; //o this recupera o elemento em si
        $('#' + id_campo_clicado).off(); //remove a possibilidade de ocorrer um evento em cima deste elemento
        jogada(id_campo_clicado);
    });

    function jogada(id){
        let icone = '';
        let ponto = 0;

        if ((rodada % 2) == 1) {
            icone = "url('imagens/marcacao_1.png')";
            ponto = -1;
        }
        else{
            icone = "url('imagens/marcacao_2.png')";
            ponto = 1;
        }

        rodada++;

        $('#' + id).css('background', icone); // a função .css atribui ao elemento uma formatação css, onde o primeiro parâmetro é a propriedade e o segundo é o valor

        let linha_coluna = id.split('-');

        matriz_jogo[linha_coluna[0]][linha_coluna[1]] = ponto;

        verifica_combinacao();
    }

    function verifica_combinacao(){

        // verifica na horizontal linha a
        let pontos = 0;
        for(let i = 1; i <=3; i++){
            pontos = pontos + matriz_jogo['a'][i];
        }
        ganhador(pontos);

        // verifica na horizontal linha b
        pontos = 0;
        for (let i = 1; i <= 3; i++) {
            pontos = pontos + matriz_jogo['b'][i];
        }
        ganhador(pontos);        

        // verifica na horizontal linha c
        pontos = 0;
        for (let i = 1; i <= 3; i++) {
            pontos = pontos + matriz_jogo['c'][i];
        }
        ganhador(pontos);        

        // verificar na vertical col 1
        for(let l = 1; l <=3; l++){

            pontos = 0;

            pontos = pontos + matriz_jogo['a'][l];
            pontos = pontos + matriz_jogo['b'][l];
            pontos = pontos + matriz_jogo['c'][l];

            ganhador(pontos);
        }

        // verificar na diagonal
        pontos = 0;
        pontos = matriz_jogo['a'][1] + matriz_jogo['b'][2] + matriz_jogo['c'][3];
        ganhador(pontos);
        
        pontos = 0;
        pontos = matriz_jogo['a'][3] + matriz_jogo['b'][2] + matriz_jogo['c'][1];
        ganhador(pontos);

    }

    function ganhador(pontos){
        if(pontos == -3){
            let jogador1 = $('#entrada_apelido_jogador1').val();
            alert(jogador1 + ' é o vencedor!');
            $('.jogada').off(); //remove a possibilidade de ocorrer um evento em cima deste elemento
        }
        else if(pontos == 3){
            let jogador2 = $('#entrada_apelido_jogador2').val();
            alert(jogador2 + ' é o vencedor!');
            $('.jogada').off(); //remove a possibilidade de ocorrer um evento em cima deste elemento
        }
    }

});
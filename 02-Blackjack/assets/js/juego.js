

(() => {
    'use strict'

    
    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'],
        cartasEspeciales = ['A', 'J', 'Q', 'K'];

    let puntosJugador = 0,
        puntosComputadora = 0;

    //referencias html
    const btnNuevoJuego = document.querySelector('#btnNuevo'),
        btnPedir = document.querySelector('#btnPedir'),
        btnDetener = document.querySelector('#btnDetener'),
        sumatoriaPuntos = document.querySelectorAll('small'),
        divJugadorCartas = document.querySelector('#jugador-cartas'),
        divCompuCartas = document.querySelector('#Computadora-cartas');


    //Funcion que crea una baraja
    const crearDeck = () =>{
        for(let numeroCarta = 2; numeroCarta <= 10; numeroCarta++ ){
            for(let tipo of tipos){
                deck.push(numeroCarta + tipo);
            }
            
        }

        for(let especial of cartasEspeciales){
            for(let tipo of tipos){
                deck.push(especial + tipo);
            }
        }

        shuffle(deck);
    }


    const shuffle = (deck) => {
        for( let indiceArr = deck.length -1; indiceArr > 0; indiceArr-- ){
            const numRandom = Math.floor(Math.random() * (indiceArr + 1)) ;
            [deck[indiceArr], deck[numRandom]] = [deck[numRandom], deck[indiceArr]];

        }
    }

    crearDeck();
    // console.log(deck);

    const pedirCarta = () =>{
        if(deck.length != 0){
            const carta = deck.pop();
            // console.log(carta);
            return carta;
        } else{
            throw 'Se acabaron las cartas de la baraja';
        }

        
    }


    const valorCarta = (carta) =>{
        const valor = carta.substring(0, carta.length - 1 );
        
        return  (isNaN(valor))? 
                ( valor === 'A' ) ? 11 : 10
                : valor * 1;

    }

    // funcion turno de la computadora

    const turnoComputadora = (puntosMinimos) =>{
        
        do{
            const carta = pedirCarta();
            puntosComputadora += valorCarta(carta);

            const imgCarta = document.createElement('img');
            imgCarta.classList.add('carta');
            divCompuCartas.append(imgCarta);
            imgCarta.src = `assets/cartas/${carta}.png`;

            sumatoriaPuntos[1].innerText = puntosComputadora;
            // console.log(puntosComputadora);

            if( puntosMinimos > 21 ){
                break;
            }
            
        }while( (puntosComputadora < puntosMinimos) && (puntosMinimos <=21) );


        setTimeout(() => {
            if((puntosComputadora > puntosJugador && puntosComputadora <= 21) || (puntosJugador > 21 && puntosComputadora <=21)){
                alert('La Computadora Gana');
            } else if((puntosJugador > puntosComputadora && puntosJugador <= 21) || (puntosComputadora > 21 && puntosJugador <=21)){
                alert('El jugador Gana');
            } else if(puntosComputadora == puntosJugador){
                alert('Empate!');
            }
        }, 100);

        
    }




    //eventos
    btnPedir.addEventListener('click', () => {
        
        const carta = pedirCarta();
        puntosJugador += valorCarta(carta) ;
        sumatoriaPuntos[0].innerText = puntosJugador;

        
        const imgCarta = document.createElement('img');
        imgCarta.classList.add('carta');
        divJugadorCartas.append(imgCarta);
        imgCarta.src = `assets/cartas/${carta}.png`;
        

        if(puntosJugador > 21){
            btnPedir.disabled = true;
            btnDetener.disabled = true;

            turnoComputadora(puntosJugador);

            // console.warn('Lo siento te pasaste de 21.');
            
        }

    });

    btnDetener.addEventListener('click', () =>{
        
        btnDetener.disabled = true;
        btnPedir.disabled = true;

        turnoComputadora(puntosJugador);
    });


    btnNuevoJuego.addEventListener('click', () => {

        btnDetener.disabled = false;
        btnPedir.disabled = false;

        puntosComputadora = 0;
        puntosJugador = 0;
        sumatoriaPuntos[0].innerText = puntosJugador;
        sumatoriaPuntos[1].innerText = puntosComputadora;

        deck = [];
        crearDeck();
        // console.log(deck);

        divJugadorCartas.innerHTML ='';
        divCompuCartas.innerHTML = '';
    });


})();






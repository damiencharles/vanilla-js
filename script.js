// Le minimum fonctionnel

//demander au joueur un pseudo avant de lancer le jeu
    //dans une fenêtre prompt
    //un input dont on récupèrerait la valeur -> document.getElementById

//des médias (images joueur, images ennemis, missiles, etc...)
    //créer des éléments HTML depuis Javascript -> document.createElement
    //leur donner des attributs -> element.setAttribute()
    //les afficher à l'écran -> parentNode.appendChild(childNode)

//des ennemis 
/* qui se déplace tout seuls et qui tire    ->  let nominterval = window.setInterval() // clearInterval(nominterval)
aléatoirement des projectiles en ligne droite*/


//un joueur
// qui peut se déplacer au moins sur l'un des axes avec les flèches correspondantes -> window.addEventListener sur le clavier 
// qui puisse tirer des projectiles sur les ennemis en ligne droite en appuyant sur une touche

//gérer la collision pour :
    //projectiles vs joueur ou ennemi 
    //joueur vs ennemi

//le score
    //chaque ennemi détruit doit rapporter des points




// Pour aller plus loin 

//choisir un vaisseau différent
//que le héro ai un nombre de vie définie avant que le jeu se termine
//la musique & les bruitages
//timer
//tableau des scores avec pseudo persistance à base de cookies
//le menu 
//des niveaux de difficultés supplémentaires (on peut jouer sur la vitesse, le nombre des ennemis ou la férquence des tirs)
let bouton = document.getElementById("BTN");
let loading = document.getElementById("loading");

//GAME START
let gameStart = bouton.addEventListener ('click',function (){
    let playerName = document.getElementById("name").value;
    document.getElementById('playerPseudo').innerHTML = playerName; 
    loading.style.display = "none";

    // VARIABLES UTILES
    let screenWidth = window.innerWidth;
    let screenHeight = window.innerHeight;
    let bkgd = document.getElementById('BKGD')
    let music = document.querySelector('#audioPlayer');
    music.play();
    music.volume = 0.1;
    let ennemies = 7
    let ennemyKO = 0

    // GAME STOP
    let gameStop = function(status){
        let endScreen = document.getElementById('endGame')
        if (status === "win"){
            endScreen.style.backgroundImage = "url(./assets/img/win2.png";
        }
        else {
            endScreen.style.backgroundImage = "url(./assets/img/loose.png)";
        }
        bkgd.style.display = "none";
        endScreen.style.display = "block";
        }

    // SCORE
    let score = document.createElement('p')
    let addPoints = document.getElementById('BKGD')
    addPoints.appendChild(score);
    score.id = "score";
    let x = 0
    score.innerHTML = "SCORE : " + x;

    // LIVES
    let lives = document.createElement('p')
    let kill = document.getElementById('BKGD')
    kill.appendChild(lives);
    lives.id = "lives";
    let y = 3
    lives.innerHTML = "LIVES : " + y;



    //FONCTION ALEATOIRE
    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    // PLAYER
    let player = document.createElement('img')
    player.src = "./assets/img/heisenberg.png";
    player.style.height = "150px"
    let playerHeight= parseInt(player.style.height);
    player.style.width = "150px"
    let playerWidth = parseInt(player.style.width);
    player.style.position = "absolute";
    player.style.left = screenWidth / 2 - (playerWidth / 2);
    player.style.top = screenHeight - playerHeight;
    player.id = "player";
    bkgd.appendChild(player);


    //SELECT JOUEUR
    let myPlayer = document.getElementById("choose").value;
    let chosePlayer = function(){
        if (myPlayer === "Pinkman"){
            player.src = "./assets/img/Pinkman.png";
        }
        else {player.src = "./assets/img/heisenberg.png";}
        }
    chosePlayer();

    //POLICE / ENNEMI
    for(var i =0; i < ennemies; i++) 
    {
        let ennemy = document.createElement('img');
        ennemy.id = "ennemy" + i;
        ennemy.src = "./assets/img/police.png";
        ennemy.style.position = "absolute";
        ennemy.style.width = "100px";
        ennemy.style.height = "100px";
        let ennemyWidth = parseInt(ennemy.style.width);
        let ennemyHeight = parseInt(ennemy.style.height);
        ennemy.style.top = 0;
        ennemy.style.left = 20 + (i * 240);
        bkgd.appendChild(ennemy);

    }

    // DEPLACEMENT ENNEMIES
    let moveEnnemy = function(){
        let move = window.setInterval(function(){
            for (var i=0; i < ennemies; i++){
                let ennemy = document.getElementById('ennemy' +i); 
                let ennemyTop = parseInt(ennemy.style.top);
                    ennemy.style.top = ennemyTop + 20 + "px";

                // COLLISION PLAYER
                if(collide(player, ennemy)){
                    let explosion = window.setTimeout(function() {
                    player.src = "./assets/img/explosion.png";
                    ennemy.src = "./assets/img/explosion.png";
                    lives.innerHTML = "DEAD"
                    clearInterval(move);
                },1000)   
                //gameStop("loose");  
                }
                if(ennemyTop > screenHeight){
                clearInterval(move)
                gameStop("loose");
                }
            }

    let selectedInt = getRandomInt(7); //tirer au sort une valeur aléatoire entre 0 et 6 pour sélectionner le tireur
            let ennemyShooter = document.getElementById('ennemy' + selectedInt);
            donutShot(ennemyShooter);
        },800)
    }
    moveEnnemy();


    // TIR PLAYER

    let moveCrystal = function(crystal){
        let moveMissile = window.setInterval(function(){
            //console.log(crystal.style.left);
            let shot = parseInt(crystal.style.bottom); 
            crystal.style.bottom = shot + 50 + "px";

            //COLLISION ennemy
            for (var i=0; i < ennemies; i++){
                let ennemy = document.getElementById('ennemy' + i);
                if(collide(crystal, ennemy) && ennemy.style.display != "none")
                {
                    //console.log("coucou");
                    x = x += 100;
                    score.innerHTML = "SCORE : " + x;
                    ennemyKO +=1;
                    //console.log(x);
                    clearInterval(moveMissile);
                    ennemy.src = "./assets/img/explosion.png";
                    let explosion = window.setTimeout(function() {
                        crystal.style.display = "none";
                        ennemy.style.display = "none";
                        if(ennemyKO === ennemies){
                            gameStop("win");
                        }
                    },100)
                    
                }
            }
                if(shot > screenHeight){
                    clearInterval(moveMissile)}
        },200);

    //SELECT JOUEUR
    let myPlayer = document.getElementById("choose").value;
    let chosePlayer = function(){
        if (myPlayer === "Pinkman"){
            player.src = "./assets/img/Pinkman.png";
            crystal.src = "./assets/img/bullet.png";
            crystal.style.height = "70px";
        }
        else {player.src = "./assets/img/heisenberg.png";}
        }
        chosePlayer();
        }

    // DEPLACEMENT PLAYER + LANCEMENT MISSILE
    let playerLeft = parseInt(player.style.left);

    window.addEventListener("keydown", function(event){
        switch (event.keyCode){
            case 37:
                player.style.left = playerLeft -= 30;
                break;

            case 39:
                player.style.left = playerLeft +=30;
                break;

            case 32:
                let crystal = document.createElement('img')
                crystal.src = "./assets/img/crystal.png";
                crystal.style.height = "40px"
                let crystalHeight = parseInt(crystal.style.height);
                crystal.style.width = "40px"
                let crystalWidth = parseInt(crystal.style.width);
                crystal.style.position = "absolute";
                crystal.style.left = playerLeft + 75;
                crystal.style.bottom = playerHeight;
                bkgd.appendChild(crystal);   
                moveCrystal (crystal);         
                break;
                
        }
    })
    //FONCTION COLLISION
    let collide = function(a, b){
        return !(
            ((a.y + a.height) < (b.y)) ||
            (a.y > (b.y + b.height)) ||
            ((a.x + a.width) < b.x) ||
            (a.x > (b.x + b.width))
        )
    }

    //DONUTS 
    let donutShot = function(shoot){
        if(shoot.style.display != "none") {
            let donut = document.createElement('img')
            donut.src = "./assets/img/donut.png";
            donut.id = "donut" + i;
            donut.style.position = "absolute";
            donut.style.width = "30px";
            donut.style.height = "30px";
            donut.style.top = parseInt(shoot.style.top) + shoot.height + 30 + "px";
            donut.style.left = parseInt(shoot.style.left) + shoot.width / 2 - 10 + "px";
            bkgd.appendChild(donut);
            moveDonuts(donut);
        }
    }

    // DEPLACEMENT DONUTS
    let moveDonuts = function(donut){
        let move = window.setInterval(function(){ 
                let donutTop = parseInt(donut.style.top);
                donut.style.top = donutTop + 30;

                //COLLISION DONUT PLAYER
                if(collide(donut, player)){
                    let explosion = window.setTimeout(function() {
                    player.src = "./assets/img/dead.png";
                    donut.src = "./assets/img/explodonut.png"
                    donut.style.display = "none";
                    y = y -= 1;
                        if (y > 0){
                            lives.innerHTML = "LIVES : " + y;
                        }
                        else{
                            lives.innerHTML = "DEAD";
                            clearInterval(move);
                            gameStop("loose");
                            }
                } 
                ,800)
        }
                if(donutTop > screenHeight){
                    clearInterval(move)}
        },1000)
    }
})
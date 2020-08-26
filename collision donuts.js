           /* //COLLISION donut
            let donut = document.getElementById('donut' + selectedInt);
        if(collide(crystal, donut) && donut.style.display != "none"){
            //console.log("coucou");
            x = x += 50;
            score.innerHTML = "SCORE : " + x;
            crystal.style.display = "none";
            clearInterval(moveMissile);
            donut.src = "./assets/img/explodonut.png";
            let explosion = window.setTimeout(function() {
            donut.style.display = "none";
            },1000)
        }*/
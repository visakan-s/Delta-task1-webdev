const bigGrid = document.querySelectorAll('.btns');
const smallGrid = document.querySelectorAll('.items');
let moves = document.querySelector('.moves');
let time = document.querySelector('.time');
let reset =document.querySelector('.reset');
let colorarray =['#4e8ada', '#4e8ada', '#4e8ada', '#4e8ada', '#ff4b4b', '#ff4b4b', '#ff4b4b', '#ff4b4b', '#ae20da', '#ae20da', '#ae20da', '#ae20da', '#18cf30', '#18cf30', '#18cf30', '#18cf30','#e2a344', '#e2a344', '#e2a344', '#e2a344','#e8eb59', '#e8eb59', '#e8eb59', '#e8eb59' ];
let mov=0;
let blackindex=24;
let clickindex;
let minimumMoves = 1;
let minimumTime = 1;
let highestScorePossible = 3000;

let seconds = 0;
let interval = null;
let startclick =true;
let timetaken = document.querySelector('.timetaken');
let totmov = document.querySelector('.totmov');
let score = document.querySelector('.score');

var sco;
//score = ((3000/seconds)*(3000/mov));




function random() {
 for(i=0;i<24;i++){
    let j=Math.floor(Math.random()*(24-i));
    [colorarray[i], colorarray[j]]=[colorarray[j], colorarray[i]];
 }
    //console.log(colorarray);
}
fill();
function fill() {
    bigGrid[24].style.backgroundColor= '#000000';
    random();
    for(i=0; i<24; i++){
    bigGrid[i].style.backgroundColor = colorarray[i];
    }
    random();
    for(i=0; i<9; i++){
        smallGrid[i].style.backgroundColor = colorarray[i];
        } 
        start = new Date().getTime();
}

function shuffle() {
    blackindex=24;
    fill();
    mov=0;
    moves.innerHTML="Moves: 0";
    seconds=0;
    startclick=true;
    time.innerHTML = "Time: 0 s"; 
    window.clearInterval(interval);
    //window.setInterval(timer, 1000);
    var resettune=new Audio("reset.mp3");
    resettune.play();
}

reset.addEventListener('click',function(){  
    shuffle();
});
 
   function swap(clickindex){
       //alert(clickindex);
     let temp = bigGrid[clickindex].style.backgroundColor;
    bigGrid[clickindex].style.backgroundColor = bigGrid[blackindex].style.backgroundColor;
    bigGrid[blackindex].style.backgroundColor = temp; 
    blackindex = clickindex;
    compare();
    mov++;
    moves.innerHTML="Moves: "+ mov;
    var movetune=new Audio("move.mp3");
        movetune.play(); 
   }



/*for(a=0;a<25;a++){
    bigGrid[a].addEventListener('click', function(e) {
         clickindex= e.target.id;
        check(clickindex);    
          console.log(e.target.id)  
            })} */
   
function check(clickindex){
  //alert(clickindex);
  if (startclick == true) {
   interval = window.setInterval(timer, 1000);
  }
     startclick=false;
    if(clickindex == blackindex+1 || clickindex == blackindex+5 || clickindex == blackindex-1 || clickindex == blackindex-5 ){
        
        if(blackindex%5==0) { 
            if ( clickindex == blackindex+5 || clickindex == blackindex+1 || clickindex == blackindex-5) 
            swap(clickindex);
            
        }
        else if(blackindex%5==4 ) {
            if ( clickindex == blackindex+5 || clickindex == blackindex-1 || clickindex == blackindex-5) 
             swap(clickindex);
            
         }
        else  
        swap(clickindex);
        
    }   
}

function compare() {
    if(smallGrid[0].style.backgroundColor == bigGrid[6].style.backgroundColor &&
       smallGrid[1].style.backgroundColor == bigGrid[7].style.backgroundColor && 
       smallGrid[2].style.backgroundColor == bigGrid[8].style.backgroundColor && 
       smallGrid[3].style.backgroundColor == bigGrid[11].style.backgroundColor &&
       smallGrid[4].style.backgroundColor == bigGrid[12].style.backgroundColor &&
       smallGrid[5].style.backgroundColor == bigGrid[13].style.backgroundColor &&
       smallGrid[6].style.backgroundColor == bigGrid[16].style.backgroundColor &&
       smallGrid[7].style.backgroundColor == bigGrid[17].style.backgroundColor &&
       smallGrid[8].style.backgroundColor == bigGrid[18].style.backgroundColor )
       {
       //alert("YOU WIN!!!");
       stop = new Date().getTime();
        toggle();
         var wintune=new Audio("win.mp3");
        wintune.play();
        window.clearInterval(interval);
    }
}
function toggle() {
    var blurscrn = document.querySelector('#screen');
    blurscrn.classList.toggle('blur')
    var winscrn = document.querySelector('#win');
    winscrn.classList.toggle('popup')
    sco = ((30000/seconds)*(100/mov)).toFixed(0);
    score.innerHTML = "Score: " + sco;
    timetaken.innerHTML = "Time Taken: " + seconds + " s";
    totmov.innerHTML = "Total Moves: " + mov;   
}

/*var score = ((minimumTime/seconds)*(minimumMoves/mov))*highestScorePossible;
var scores = (((1/seconds).tofixed(3))*((1/mov).toFixed(3)))*3000;
    scor = ((3000/seconds)*(3000/mov)).tofixed(0);
    total = seconds;*/

    function timer() {
        seconds++;
        time.innerHTML = "Time: " + seconds + " s";
    }
   
    

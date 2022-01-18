var score= window.localStorage.getItem('score');


var marray=['~','?','$','#','@','^','&',')','(','!','{','<','~','?','$','#','@','^','&',')','(','!','{','<'];
var shuffled_array=[];
var tiles_flipped=0;
var flipped_values=[];
var flipped_values_id=[];
const maxTime=300;
const maxMoves=100;
function insertScore(){
    if(!Number.isInteger(parseInt(score))){
        score='0';

    }
    let node = document.createTextNode(score);
    document.getElementById('score').appendChild(node);

}
function shuffle(array){
    let copy=[],n=array.length;
    while(n){
        let i =Math.floor(Math.random()*array.length);
        copy.push(array[i]);
        array.splice(i,1);
        n--;


    }
    console.log(copy);
    return copy;
}
function gameLostMovesover() {
    alert("YOU HAVE LOST.MOVES OVERS");
    window.location.reload();

}
function gameLostTimeUp() {
    alert("YOU HAVE LOST.TIME'S UP");
    window.location.reload(); 


}
function gameWon(newScore) {
    prevScore=parseInt(score);
    if(newScore>prevScore){
        window.localStorage.setItem('score',newScore);

    }
    alert("YOU HAVE WON. YOUR SCORE IS"+newScore);
}
function time(){
    let currTime= parseInt(document.getElementById('time').innerHTML)
    if(currTime==0){
        gameLostTimeUp();
    }
    document.getElementById('time').innerHTML=currTime-1;
}
function scoring(m,t){
    const f=0.5;
    let newScore=((maxTime-t)/maxTime *f)+((maxMoves-m)/maxMoves*(1-f));
    newScore+=1000;
    newScore=Math.floor(newScore);
    return newScore;
}

function newGame(){
    setInterval(time,1000);
    document.getElementById('start').style.display ='none';
    document.getElementById('memory').style.display ='block';
    document.getElementById('timer').style.display = 'block';

    document.getElementById('moves').innerHTML=0;
    document.getElementById('time').innerHTML=maxTime;
    
    shuffled_array=shuffle(marray);

    let insert='';
    for(let i=0;i<shuffled_array.length;i++){
        insert+= `<div id="tile_${i}" onclick="flipTile(this,'${shuffled_array[i]}')"></div>`;
    }
    document.getElementById('memory').innerHTML=insert;
}
function flipTile(tile,val){
    if(tile.innerHTML==""&&flipped_values.length<2){
       let currmoves= parseInt(document.getElementById('moves').innerHTML);
       document.getElementById('moves').innerHTML = currmoves+1;
       tile.style.background= 'white';
       tile.innerHTML= val;
       if(flipped_values.length==0) {
           flipped_values.push(val);
           flipped_values_id.push(tile.id);

       }
       else if(flipped_values.length==1){
           flipped_values.push(val);
           flipped_values_id.push(tile.id);

           if(flipped_values[0]==flipped_values[1]) {
               tiles_flipped+=2;
               flipped_values=[];
               flipped_values_id=[];
               if(tiles_flipped==shuffled_array.length) {
                   let time=parseInt(document.getElementById('time').innerHTML);
                   let newScore=scoring(currmoves+1,time);

                   gameWon(newScore);
               }

           }
           else if(currmoves+1==maxMoves){
               gameLostMovesover();
           }
           else{
               function flipback(){
                document.getElementById(flipped_values_id[0]).style.background= 'url(assets/q.jpg) no-repeat center';
                document.getElementById(flipped_values_id[1]).style.background= 'url(assets/q.jpg) no-repeat center';
                document.getElementById(flipped_values_id[0]).innerHTML="";
                document.getElementById(flipped_values_id[1]).innerHTML="";
                document.getElementById(flipped_values_id[0]).style.backgroundsize= "contain";
                document.getElementById(flipped_values_id[1]).style.backgroundsize= "contain";
                flipped_values=[];
               flipped_values_id=[];
        

               }
               setTimeout(flipback,1000);

            
    
    
           }
           
       }
      
        
    }
 
}

let buttonColours = ["red", "blue", "green", "yellow" ];
let gamePattern =[];
let userChosenPattern=[];
var started=false;
let level =0;
$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started=true;
    }
})
function nextSequence(){
    level++;
    $("#level-title").text("Level "+level);
    let randomNumber=Math.floor(4*Math.random());
    let randomColour=buttonColours[randomNumber];
    gamePattern.push(randomColour);
    $("#"+randomColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomColour);
}
$(".btn").click(function(event){
    let userChosenColour = event.currentTarget.id;
    userChosenPattern.push(userChosenColour);
    console.log(userChosenPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userChosenPattern.length-1);
})
function checkAnswer(currentlevel){
    if(userChosenPattern[currentlevel]==gamePattern[currentlevel]){
        console.log("success");
        if(userChosenPattern.length==gamePattern.length){
            setTimeout(function(){
                userChosenPattern=[];
                nextSequence();
            },1000);
        }
    }
    else{
        console.log("wrong");
        var audio =new Audio("sounds/wrong.mp3");
        audio.play();
        $(document).addClass(".game-over");
        setTimeout(function(){
            $(document).removeClass("game-over");
        },200);
        userChosenPattern=[];
        reset();
    }
}
function reset(){
    started=false;
    level=0;
    $("#level-title").text("Press A Key to Start");
    gamePattern=[];
}
function playSound(name){
    var audio = new Audio("sounds/"+name+'.mp3');
    audio.play();
}
function animatePress(currentcolour){
    $("#"+currentcolour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentcolour).removeClass("pressed");
    },100);
}
var buttonColor = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern=[];
var started = false;
var level = -1;

//detect a keypress
$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});


$(".btn").click(function (){

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    //check the answer after user has select the pattern
    checkAnswer(userClickedPattern.length -1);

});

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");
        //check
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    }
    else{
        console.log("wrong answer");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(()=>{
            $("body").removeClass("game-over");
        },200);

        $("#level-title").text("Game Over! Press any key to restart");
        startOver();
    }
}
function nextSequence(){
    //reset the user patter
    userClickedPattern = [];
    //increase the level each time by 1
    level++;
    //update H1 by level wise
    $("#level-title").text("Level "+level);
    var randomNum = Math.floor(4 * Math.random());
    // console.log(randomNum);
    var randomChosenColor = buttonColor[randomNum];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}
function animatePress(currentColor) {
    
      $("#"+currentColor).addClass("pressed");
      //remove pressed class after 100 ms
      setTimeout(function() {
        $("#"+currentColor).removeClass("pressed");
      }, 100);
}


function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}
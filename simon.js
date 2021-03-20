var buttonColors = ["red","blue","green","yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keydown(function(){
    if(!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started = true;
    }
})

$(".btn").click(function(){
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1)
})


function checkAnswer(currentlevel){
    if(gamePattern[currentlevel] === userClickedPattern[currentlevel]){

        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence()
            },1000)
        }
    }
    else{
        var wrongAudio = new Audio("sounds/wrong.mp3");
        wrongAudio.play();

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200)

        $("#level-title").text("Game Over, Press Any Key to Restart")
        startOver();
    }
}

function startOver(){
    gamePattern = [];
    userClickedPattern = [];

    started = false;
    level = 0;

    $(document).keydown(function(){
        if(!started){
            $("#level-title").text("Level "+level);
            nextSequence();
            started = true;
        }
    })
}

function nextSequence(){
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level "+level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(50).fadeIn(50).fadeOut(50).fadeIn(50);
    playSound(randomChosenColor);
}

function playSound(name){
        var newAudio = new Audio("sounds/"+name+".mp3")
        newAudio.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");

    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100)
}

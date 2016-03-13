var counter = 3;
var name = '';
var reset = function(){
$ ('#answers *').fadeOut(2000);
$('input').removeAttr('disabled');
counter = 3;
}
var gamecheck =function() {
	if (counter == 0){
		reset();
	}
}
// while (name ==''){
// name = prompt('what is your full name');
// }

$(".jumbotron h2 span").html(name);


if($('.true input[value="Truth"]').click(function(){
  $(this).prop("disabled", true).siblings().prop("disabled", true);
  $('#answers').append('<h2> Correct!</h2>');
  counter -= 1;
  gamecheck();
}));

if($('.true input[value="Lie"]').click(function(){
  $(this).prop("disabled", true).siblings().prop("disabled", true);
  $('#answers').append('<h2> GAME OVER!!!</h2>');
  reset();
  
}));
if($('.lie input[value="Truth"]').click(function(){
  $(this).prop("disabled", true).siblings().prop("disabled", true);
  $('#answers').append('<h2> GAME OVER!</h2>');
  reset();
}));
	if($('.lie input[value="Lie"]').click(function(){
  $(this).prop("disabled", true).siblings().prop("disabled", true);
   $('#answers').append('<h2> GANGER YOU WON LOTO 649 SIKE THATS WRONG NUMBER!</h2>');
   counter -= 1;
   gamecheck();
}));

// var gameWelcome = alert("Welcome to the coin toss game!");
// var userChoice = prompt("Do you choose HEADS or TAILS?").toUpperCase();
// var coinToss = Math.random();
// if (userChoice === "HEADS") {
//     if (coinToss < 0.5) {
//         var result = alert("The coin landed on heads. You Win!");
//     }
//     else {
//         var result = alert("The coin landed on tails. You Lose!");
//     }
// }
// else {
//     if (coinToss < 0.5) {
//         var result = alert("The coin landed on heads. You Lose!");
//     }
//     else {
//         var result = alert("The coin landed on tails. You Win!");
//     }
// }
var Game = {
	context:document.getElementById('canvas').getContext('2d'),
	backgroundMusic: new Audio('assets/bgm-town-center.mp3'),
	playAudio:true,
	redraw:true,
	stopGame:false,
	run:function() {
		Keyboard.listenForEvents([Keyboard.UP, Keyboard.DOWN, Keyboard.LEFT, Keyboard.RIGHT]);

		Game.backgroundMusic.play();

		Game.load();
		Game.gameLoop();
	},
	gameLoop:function(timestamp){
		var id = window.requestAnimationFrame( Game.gameLoop );
		if (Game.stopGame){
			window.cancelAnimationFrame(id);
			return;
		}
		if (Game.redraw){
			Game.update(timestamp);
			Game.draw();
			Game.redraw = false;
		}
	},
	update:function(timestamp){
		Keyboard.update();
		Player.update(timestamp);
	},
	draw:function(){
		Map.draw();
		Player.draw();
	},
	load:function(){
		Map.load();
		Player.load();
	}
}
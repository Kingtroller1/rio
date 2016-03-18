var Player = {
	mapX:0,
	mapY:0,
	currentAnimation:null,
	startedMoving:-1,
	isMoving:false,
	movementTime:500,
	moveXOffset:0,
	moveYOffset:0,
	moveDirection:0,
	facingRight:true,
	load: function() {
		Player.currentAnimation = Player.animations.idle;
	},
	animations: {
		run: new Animation("assets/player-run.png", 4, 75, 100, 150),
		runLeft: new Animation("assets/player-run.png", 4, 75, 100, 150, 300, 0),
		idle: new Animation("assets/player-idle.png", 2, 75, 100, 250),
		idleLeft: new Animation("assets/player-idle.png", 2, 75, 100, 250, 150, 0)
	},
	soundEffects: {
		coins: new Audio("assets/sfx-coin.ogg"),
		wall: new Audio("assets/sfx-wall.ogg")
	},
	update:function(timestamp) {
		if ( !Player.isMoving ) {
			var x = 0;
			var y = 0;
			if ( Keyboard.isDown( Keyboard.UP ) ) {
				y = -1;
				Player.moveDirection = 1;
			} else if ( Keyboard.isDown( Keyboard.RIGHT ) ) {
				x = 1;
				Player.moveDirection = 2;
				Player.facingRight = true;
			} else if ( Keyboard.isDown( Keyboard.DOWN ) ) {
				y = 1;
				Player.moveDirection = 3;
			} else if ( Keyboard.isDown( Keyboard.LEFT ) ) {
				x = -1;
				Player.moveDirection = 4;
				Player.facingRight = false;
			}

			if ( x !== 0 || y !== 0 ) {
				if ( !Map.tileIsBlocked( Player.mapX + x, Player.mapY + y ) ) {
					Player.isMoving = true;
					if ( Player.facingRight ) {
						Player.currentAnimation = Player.animations.run;
					} else {
						Player.currentAnimation = Player.animations.runLeft;
					}
					Player.startedMoving = timestamp;
				} else {
					Player.moveDirection = 0;
					if ( Game.playAudio ) {
						Player.soundEffects.wall.play();
					}
				}
			}
		} else {
			if ( ( timestamp - Player.startedMoving ) >= Player.movementTime ) {
				Player.moveXOffset = 0;
				Player.moveYOffset = 0;
				Player.isMoving = false;
				if ( Player.facingRight ) {
					Player.currentAnimation = Player.animations.idle;
				} else {
					Player.currentAnimation = Player.animations.idleLeft;
				}
				switch ( Player.moveDirection ) {
					case 1:
						Player.mapY -= 1;
						break;
					case 2:
						Player.mapX += 1;
						break;
					case 3:
						Player.mapY += 1;
						break;
					case 4:
						Player.mapX -= 1;
						break;
				}
				if ( Map.tileHasCoin( Player.mapX, Player.mapY ) ) {
					var score = parseInt( $('#score-label').text() );
					score += 100;
					$('#score-label').text( score );
					Map.coins[Player.mapY][Player.mapX] = 0;
					if ( Game.playAudio ) {
						Player.soundEffects.coins.pause();
						Player.soundEffects.coins.currentTime = 0;
						Player.soundEffects.coins.play();
					}
				}
			} else {
				var moveAmt = 100 * ( ( timestamp - Player.startedMoving ) / Player.movementTime );
				if ( Player.moveDirection == 1 || Player.moveDirection == 4 ) {
					moveAmt = moveAmt * -1;
				}
				if ( Player.moveDirection == 1 || Player.moveDirection == 3 ) {
					Player.moveYOffset = parseInt(moveAmt);
				} else if ( Player.moveDirection == 2 || Player.moveDirection == 4 ) {
					Player.moveXOffset = parseInt(moveAmt);
				}
			}
		}
	},
	draw: function() {
		var a = Player.currentAnimation;
		Game.context.drawImage(	a.image, 
								//Source x,y,w,h 
								a.getImageX(), a.getImageY(), a.frameWidth, a.frameHeight,
								//Destination x,y,w,h
								( Player.mapX * 100 ) + parseInt( ( 100 - a.frameWidth ) / 2 ) + Player.moveXOffset,
								( Player.mapY * 100 ) + Player.moveYOffset,
								a.frameWidth,
								a.frameHeight
							  );
	}
}

var Map = {
	drawBorders: false,
	drawCellInfo: false,
	tileImage: new Image(), 
	tiles: [
		[0,0,0,0,0,0,2,2,2,2,2],
		[1,1,1,0,0,0,2,1,1,1,2],
		[1,1,1,0,1,1,2,1,1,1,2],
		[0,0,1,1,1,0,2,1,1,1,2],
		[0,0,0,0,0,0,2,2,2,2,2]
	],
	coins: [
		[1,1,1,1,1,1,0,0,0,0,0],
		[1,1,1,1,1,1,0,1,1,1,0],
		[1,1,1,1,1,1,0,1,1,1,0],
		[1,1,1,1,1,1,0,1,1,1,0],
		[1,1,1,1,1,1,0,0,0,0,0]
	],
	blocks: [
		[0,0,0,0,0,0,1,1,1,1,1],
		[0,0,0,0,0,0,1,0,0,0,1],
		[0,0,0,0,0,0,1,0,0,0,1],
		[0,0,0,0,0,0,1,0,0,0,1],
		[0,0,0,0,0,0,0,0,1,1,1]
	],
	coinAnimation: new Animation( 'assets/coins.png', 10, 50, 50, 125 ),
	load: function(){
		Map.tileImage.src = 'assets/tiles.png';
		var canvas = document.getElementById('canvas');
		canvas.width = Map.tiles[0].length * 100;
		canvas.height = Map.tiles.length * 100;
	},
	drawTile: function(mapX, mapY, tileType) {
		Game.context.drawImage(	Map.tileImage,
							//Source: x, y, w, h
							tileType * 100, 0, 100, 100,
							//Destination: x, y, w, h
							mapX * 100, mapY * 100, 100, 100 );
		if ( Map.tileHasCoin( mapX, mapY ) ) {
			var a = Map.coinAnimation;
			Game.context.drawImage(	a.image,
									//Source: x, y, w, h
									a.getImageX(), a.getImageY(), a.frameWidth, a.frameHeight,
									//Destination: x, y, w, h
									( mapX * 100 ) + ( ( 100 - a.frameWidth ) / 2 ),
									( mapY * 100 ) + ( ( 100 - a.frameHeight ) / 2 ),
									a.frameWidth,
									a.frameHeight );
		}
		if ( Map.drawBorders ) {
			Game.context.beginPath();
			Game.context.strokeStyle = '#fc0c59';
			Game.context.moveTo(mapX * 100, mapY * 100);
			Game.context.lineTo((mapX * 100) + 100, (mapY * 100));
			Game.context.lineTo((mapX * 100) + 100, (mapY * 100) + 100);
			Game.context.lineTo((mapX * 100), (mapY * 100) + 100);
			Game.context.lineTo((mapX * 100), (mapY * 100));
			Game.context.stroke();
		}
		if ( Map.drawCellInfo ) {
			Game.context.font = '15pt Calibri, sans-serif';
			Game.context.fillText('Tile: ('+mapX+','+mapY+')', mapX * 100 + 5, mapY * 100 + 20);
			Game.context.fillText('Pixel:', mapX * 100 + 5, mapY * 100 + 50);
			Game.context.fillText('('+(mapX * 100)+','+(mapY * 100)+')', mapX * 100 + 5, mapY * 100 + 70);
		}
	},
	draw: function(){
		for(var y = 0; y < Map.tiles.length;y++) {
			for(var x = 0; x < Map.tiles[0].length;x++) {
				Map.drawTile(x,y,Map.tiles[y][x]); 
			}
		}
	},
	tileHasCoin: function(mapX, mapY){
		return ( Map.coins[mapY][mapX] == 1 );
	},
	tileIsBlocked: function(mapX, mapY){
		return ( Map.blocks[mapY][mapX] == 1 )
				|| mapX < 0
				|| mapY < 0
				|| mapX >= Map.tiles[0].length
				|| mapY >= Map.tiles.length;
	},
};


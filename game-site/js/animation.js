var Animation = function(isrc, f, fw, fh, ft, fsx, fsy) {
	this.image = new Image();
	this.image.src = isrc;
	this.frames = f;
	this.currentFrame = 0;
	this.frameWidth = fw;
	this.frameHeight = fh;
	this.frameStartX = fsx || 0;
	this.frameStartY = fsy || 0;
	var me = this;
	setInterval(function() { me.updateFrame(); }, ft);
};

Animation.prototype.getImageX = function() {
	if ( this != null ) {
		return this.frameStartX + ( this.currentFrame * this.frameWidth );
	}
};
Animation.prototype.getImageY = function() {
	return this.frameStartY;
};
Animation.prototype.updateFrame = function() {
	var a = this;
	a.currentFrame = a.currentFrame + 1;
	if ( a.currentFrame >= a.frames ) {
		a.currentFrame = 0;
	}
	if (Game) {
		Game.redraw = true;
	}
};
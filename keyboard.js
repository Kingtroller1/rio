//
// Keyboard handler
//

var Keyboard = {};

Keyboard.LEFT = 37;
Keyboard.RIGHT = 39;
Keyboard.UP = 38;
Keyboard.DOWN = 40;

Keyboard.W = 87;
Keyboard.A = 65;
Keyboard.S = 83;
Keyboard.D = 68;

Keyboard._keys = {};
Keyboard._pressedLast = {};
Keyboard._pressedKeys = {};


Keyboard.listenForEvents = function (keys) {
    window.addEventListener('keydown', this._onKeyDown.bind(this));
    window.addEventListener('keyup', this._onKeyUp.bind(this));

    keys.forEach(function (key) {
        this._keys[key] = false;
    }.bind(this));

    for ( var key in this._keys ) {
        this._pressedLast[key] = false;
        this._pressedKeys[key] = false;
    }
}

Keyboard._onKeyDown = function (event) {
    var keyCode = event.keyCode;
    if (keyCode in this._keys) {
        event.preventDefault();
        this._keys[keyCode] = true;
    }
};

Keyboard._onKeyUp = function (event) {
    var keyCode = event.keyCode;
    if (keyCode in this._keys) {
        event.preventDefault();
        this._keys[keyCode] = false;
    }
};

Keyboard.isDown = function (keyCode) {
    if (!keyCode in this._keys) {
        throw new Error('Keycode ' + keyCode + ' is not being listened to');
    }
    return this._keys[keyCode];
};

Keyboard.isPressed = function (keyCode) {
    if (!keyCode in this._pressedKeys) {
        throw new Error('Keycode ' + keyCode + ' is not being listened to');
    }
    return this._pressedKeys[keyCode];
};

Keyboard.update = function() {
    for ( var key in this._keys ) {
        this._pressedKeys[key] = ( this._keys[key] !== this._pressedLast[key] );
        this._pressedLast[key] = this._keys[key];
    }
}
// var immg = new Image;
// ssrc="bomb.png"
// immg.src = ssrc;
var Game = {
    init: function() {}
}

var Game = {
    display: null,
 
    init: function() {
        this.display = new ROT.Display();
        document.body.appendChild(this.display.getContainer());
	Game._generateMap();
	Game._drawWholeMap();
    }
}


Game.map = {};
Game._generateMap = function() {
    var digger = new ROT.Map.Digger();
    var freeCells = [];

    var digCallback = function(x, y, value) {
	var key = x+","+y;
        if (value) { 
	    console.log(value);
	    this.map[key] = "gfx/brick_gray1.png";//"o";
	    return; 
	} /* do not store walls */
	else{
            freeCells.push(key)
            this.map[key] = "gfx/lair1.png";//"o";
	}
    }
    digger.create(digCallback.bind(this));
    this._generateBoxes(freeCells);
    this._drawWholeMap();
}


Game._drawWholeMap = function() {
    console.log("done");
    for (var key in this.map) {
        var parts = key.split(",");
        var x = parseInt(parts[0]);
        var y = parseInt(parts[1]);
	// this.display._spacingX = 64;
	// this.display._spacingY = 64;
        this.display.drawImage(x, y,this.map[key]);
	
	//this.display.draw(x, y, "x" );

    }
}
Game._generateBoxes = function(freeCells) {
    for (var i=0;i<10;i++) {
        var index = Math.floor(ROT.RNG.getUniform() * freeCells.length);
        var key = freeCells.splice(index, 1)[0];
        this.map[key] = "gfx/unseen_item.png";
    }
};

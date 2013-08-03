// var immg = new Image;
// ssrc="bomb.png"
// immg.src = ssrc;




var Game = {
    display: null,
     map: {},
    engine: null,
    player: null,

    init: function() {
	console.log("init called");
	this.display = new ROT.Display();
	document.body.appendChild(this.display.getContainer());
	this._generateMap();

	var scheduler = new ROT.Scheduler.Simple();
	scheduler.add(this.player, true);

	this.engine = new ROT.Engine(scheduler);
	this.engine.start();


	// Game._drawWholeMap();


    },

    _generateMap: function(){
	var digger = new ROT.Map.Digger();
	var freeCells = [];

	var digCallback = function(x, y, value) {
	    var key = x+","+y;
            if (value) { 
		// console.log(value);
		this.map[key] = "."; //"gfx/brick_gray1.png";//"o";
		return; 
	    } /* do not store walls */
	    else{
		console.log("else");
		freeCells.push(key);
//		this.map[key] = "#" 
		this.map[key] = "gfx/lair1.png";
		//console.log(this.map[key]);
	    }
	}
	digger.create(digCallback.bind(this));
	//    this._generateBoxes(freeCells);
	this._createPlayer(freeCells);

	this._drawWholeMap();

	

    },
    
    _generateBoxes: function(){
	for (var i=0;i<10;i++) {
            var index = Math.floor(ROT.RNG.getUniform() * freeCells.length);
            var key = freeCells.splice(index, 1)[0];
            this.map[key] = "gfx/unseen_item.png";
	}

    },
    
    _drawWholeMap: function(){
	console.log("done");
	for (var key in this.map) {
            var parts = key.split(",");
            var x = parseInt(parts[0]);
            var y = parseInt(parts[1]);
	    // this.display._spacingX = 64;
	    // this.display._spacingY = 64;
	    if(this.map[key].length == 1){
		this.display.drawText(x,y,this.map[key]);
		console.log("drawing text");
	    }else{    
		this.display.drawImage(x, y,this.map[key]);
		}
	    
	    //this.display.draw(x, y, "x" );

	}
	//this.player._draw();
	
    },

    

    _createPlayer: function(freeCells){
	
	var index = Math.floor(ROT.RNG.getUniform() * freeCells.length);
	var key = freeCells.splice(index, 1)[0];
	var parts = key.split(",");
	var x = parseInt(parts[0]);
	var y = parseInt(parts[1]);
	this.player = new Player(x, y);
	this.player._draw()

    },
}

var Player = function(x, y) {
    this._x = x;
    this._y = y;
    this._draw();
}
 
Player.prototype._draw = function() {
    console.log("Player._draw");
//    Game.display.drawText(this._x, this._y, "@");
    Game.display.drawImage(this._x, this._y, "../../crawl-tiles/player/base/human_f.png");// "#ff0");
}

Player.prototype.act = function() {
    Game.engine.lock();
    /* wait for user input; do stuff when user hits a key */
    window.addEventListener("keydown", this);
}

Player.prototype.handleEvent = function(e) {
//    console.log(e);

    var keyMap = {};
    keyMap[38] = 0;
    keyMap[33] = 1;
    keyMap[39] = 2;
    keyMap[34] = 3;
    keyMap[40] = 4;
    keyMap[35] = 5;
    keyMap[37] = 6;
    keyMap[36] = 7;
    
    var code = e.keyCode;
    
    if (!(code in keyMap)) { console.log("not in keymap"); return; }
    
    var diff = ROT.DIRS[8][keyMap[code]];
    var newX = this._x + diff[0];
    var newY = this._y + diff[1];
    
    var newKey = newX + "," + newY;
    if (!(newKey in Game.map)) { return; } /* cannot move in this direction */
    /* process user input */
    console.log("Game.map[this._x=="+this._x+",this._y=="+this._y+"]",Game.map[this._x+","+this._y]);
    Game.display._drawImage(this._x, this._y, Game.map[this._x+","+this._y]);
//    Game._drawWholeMap();
    this._x = newX;
    this._y = newY;
    this._draw();
    window.removeEventListener("keydown", this);
    Game.engine.unlock();

}
 


//Game.init();

// var freeCells =[];
// Game.map = {};

// Game._generateMap = function() {
//     var digger = new ROT.Map.Digger();


//     var digCallback = function(x, y, value) {
// 	var key = x+","+y;
//         if (value) { 
// 	    // console.log(value);
// 	    // this.map[key] = "gfx/brick_gray1.png";//"o";
// 	    return; 
// 	} /* do not store walls */
// 	else{
// 	    console.log("else");
//             freeCells.push(key);
//             this.map[key] = "gfx/lair1.png";//"o";
// 	}
//     }
//     digger.create(digCallback.bind(this));
// //    this._generateBoxes(freeCells);
//     this._createPlayer(freeCells);

//     this._drawWholeMap();

// }


// Game._drawWholeMap = function() {
//     console.log("done");
//     for (var key in this.map) {
//         var parts = key.split(",");
//         var x = parseInt(parts[0]);
//         var y = parseInt(parts[1]);
// 	// this.display._spacingX = 64;
// 	// this.display._spacingY = 64;
//         this.display.drawImage(x, y,this.map[key]);
	
// 	//this.display.draw(x, y, "x" );

//     }
//     this.player._draw();
// }
// Game._generateBoxes = function(freeCells) {
//     for (var i=0;i<10;i++) {
//         var index = Math.floor(ROT.RNG.getUniform() * freeCells.length);
//         var key = freeCells.splice(index, 1)[0];
//         this.map[key] = "gfx/unseen_item.png";
//     }
// };


 
// Game._createPlayer = function(freeCells) {
//     var index = Math.floor(ROT.RNG.getUniform() * freeCells.length);
//     var key = freeCells.splice(index, 1)[0];
//     var parts = key.split(",");
//     var x = parseInt(parts[0]);
//     var y = parseInt(parts[1]);
//     this.player = new Player(x, y);
// };



// Game.engine = null;
 
// // Game.init = function() {
  

// // }


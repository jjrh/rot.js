// var buffer1_canvas = document.getElementById("buffer1");
// var buffer1_context = buffer1_canvas.getContext("2d");

// var buffer2_canvas = document.getElementById("buffer2");
// var buffer2_context = buffer2_canvas.getContext("2d");


var buffers = [];
var buffer_index = 0;

var CANVAS_WIDTH = 800;
var CANVAS_HEIGHT = 600;


var buffer_stack = [];
var render_interval = null;

function create_canvas_obj(){
    /* create and append canvas objects to the dom */
    var element = document.createElement('canvas');
    element.style.visibility="hidden";
    element.width = CANVAS_WIDTH;
    element.height = CANVAS_HEIGHT;
    element.style.position = "absolute";
    element.style.top = 0;
    element.style.left = 0;
    element.id = "buffer"+buffers.length;
    document.body.appendChild(element);
    buffers.push( { "canvas": element, "context": element.getContext("2d"), "lock":false });

    return element;

}

//buffers = [ { "canvas": buffer1_canvas, context: buffer1_context },{ "canvas": buffer2_canvas, context: buffer2_context } ]

function clear(){
    buffers[buffer_index]["context"].fillStyle = "grey";
    buffers[buffer_index]["context"].fillRect(0,0,800,600);//rect["x"],rect["y"],150,150); //rect["x"],rect["y"]);    
    
}



var v_x = 0;
var v_y = 0;
function draw_img(src,x,y,spacingX,spacingY,buff_index){
  //  console.log(buffers[buff_index]);
    
    // if (buffers[buff_index]["locked"]){
	
    // }
    var img = new Image;
    img.src = src;

    if(typeof(buff_index) == 'undefined'){
//	console.log("buff_index undefined");
//	setTimeout(draw_img(src,x,y,spacingX,spacingY,buff_index), 100);
//	return;
	}
    
    img.onload = function(){
//	    buffers[buff_index]["lock"] = true;
	buffers[buff_index]["context"].drawImage(img,(x*spacingX)+v_x,(y*spacingY)+v_y)
    };
//    buffers[buff_index]["lock"] = false;

	
    


}

var g_freecells = null;
var g_map = null;
function genMap(){
    var digger = new ROT.Map.Digger(100,100);
    var freeCells = [];
    var map = {}
    var digCallback = function(x, y, value) {
//	console.log("!!");
	var key = x+","+y;
        if (value) { 
	    map[key] = "gfx/brick_gray1.png";//"o";
	} /* do not store walls */
	else{
	    freeCells.push(key);
	    map[key] = "gfx/lair1.png";
	}
    }
    digger.create(digCallback.bind(this));
//    console.log(digger._map);
//    return digger

    g_map = map;
    g_freecells = freeCells;

    return map

}


function render_map(buff_index){
    for(e in g_map){
	cord = e.split(',');
	var x = parseInt(cord[0]);
	var y = parseInt(cord[1]);
	var src = g_map[e];
	draw_img(src,x,y,32,32,buff_index);
    }

}

var timeouts = [];

function gen(){
    genMap();
//    render_map();
}

var ratio = -10
function move_test(){
    gen();
    
    render_interval = setInterval(render_loop,1);
    for(var i = 0; i<buffers.length; i++){
//	render_map(i);
	console.log("creating_interval:"+i);
	timeouts.push(setTimeout(create_interval(i), 50));
	
    }
//    setInterval(function(){ render_map(0) },50);
    
//    setInterval(function(){ render_map(1) },50);
}


function create_interval(buff_index){
    buffer_stack.push(setInterval(function(){ render_map(buff_index) },60))

}

function set_buffer_index(){
    if(buffer_index+1 >= buffers.length){
	buffers[buffer_index]["canvas"].style.visibility="hidden";
	buffer_index = 0;
    }else{
	buffers[buffer_index]["canvas"].style.visibility="hidden";
	buffer_index++;
    }
}



function render_loop(){
    try{
	set_buffer_index();
    }catch(e){
	
    }
    v_x = v_x+ratio;
    
//    clear();
    // render_map();
  //  console.log(buffer_index);
    buffers[buffer_index]["canvas"].style.visibility="visible";
    

}
//document.body.appendChild(



var rect = { "x":50,
	     "y":25,
	     "width":150,
	     "height":150,
	   };


function move_loop(){

  //  window.setInterval("javascript function",milliseconds);
    setInterval(function(){ rect["x"] = rect["x"]+1; move_rect()},50);
}

function move_rect(x,y,w,h){
    console.log("bump!");
    clear();
    buffers[buffer_index]["context"].fillStyle = "black";
    var b = buffers[buffer_index]["context"].fillRect(rect["x"],rect["y"],150,150);//rect["x"],rect["y"],150,150); //rect["x"],rect["y"]);    
    
}

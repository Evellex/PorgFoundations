// Get the 2D context from the canvas in
// our HTML page
var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");

//load tileset image
var tileset = document.createElement("img");
tileset.src = "tileset.png";

//Constants
var LAYER_COUNT = 3; 
var MAP = {tw:60, th:15};
var TILE = 35;
var TILESET_TILE = TILE * 2;
var TILESET_PADDING = 2;
var TILESET_SPACING = 2;
var TILESET_COUNT_X = 14;
var TILESET_COUNT_Y = 14;


var player = new Player();
var keyboard = new Keyboard();

function Run(params) 
{
    var deltaTime = getDeltaTime();
    
    
    context.fillStyle = "#ccc";
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    player.update(deltaTime);
    player.draw();
    
    drawMap();
    
    fpsTime += deltaTime;
    fpsCount++;
    if(fpsTime >= 1)
    {
        fpsTime -= 1;
        fps = fpsCount;
        fpsCount = 0;        
    }
    context.fillStyle = "#f00";
    context.font = "14px Arial";
    context.fillText("FPS: " + fps,5,20,100);
    
}

//DANGER ZOOOOONE
function drawMap()
{
    for (var layerldx = 0; layerldx < LAYER_COUNT; layerldx++)
    {
        var idx = 0;
        for (var y = 0; y < level1.layers[layerldx].height; y++)
        {
            for (var x = 0; x < level1.layers[layerldx].width; x++)
            {
                //do check
                if(level1.layers[layerldx].data[idx] !=0 )
                {
                    var tileIndex = level1.layers[layerldx].data[idx] - 1;
                    var sx = TILESET_PADDING + (tileIndex % TILESET_COUNT_X) * (TILESET_TILE + TILESET_SPACING);
                    var sy = TILESET_PADDING + (Math.floor(tileIndex / TILESET_COUNT_Y)) * (TILESET_TILE + TILESET_SPACING);
                    //                //image | sprite chunk to use          |       game space to draw
                    context.drawImage(tileset,sx,sy,TILESET_TILE,TILESET_TILE, x*TILE, (y-1)*TILE, TILESET_TILE, TILESET_TILE);
                    //console.log("Data was not empty at position:" + idx.toString());
                }
                //increment check index 
                idx++;
            }
        }
    }    
}

// This function will return the time in seconds since the function 
// was last called
// You should only call this function once per frame

//DeltaTime vars and function 
var startFrameMillis = Date.now();
var endFrameMillis = Date.now();
var fpsTime = 0;
var fpsCount = 0;
var fps = 0;

function getDeltaTime()
{
	endFrameMillis = startFrameMillis;
	startFrameMillis = Date.now();

		// Find the delta time (dt) - the change in time since the last drawFrame
		// We need to modify the delta time to something we can use.
		// We want 1 to represent 1 second, so if the delta is in milliseconds
		// we divide it by 1000 (or multiply by 0.001). This will make our 
		// animations appear at the right speed, though we may need to use
		// some large values to get objects movement and rotation correct
	var deltaTime = (startFrameMillis - endFrameMillis) * 0.001;
	
		// validate that the delta is within range
	if(deltaTime > 1)
		deltaTime = 1;
		
	return deltaTime;
}

(function () {
    var onEachFrame;
    if (window.requestAnimationFrame) {
        onEachFrame = function (cb) {
            var _cb = function () { cb(); window.requestAnimationFrame(_cb); }
            _cb();
        };
    } else if (window.mozRequestAnimationFrame) {
        onEachFrame = function (cb) {
            var _cb = function () { cb(); window.mozRequestAnimationFrame(_cb); }
            _cb();
        };
    } else {
        onEachFrame = function (cb) {
            setInterval(cb, 1000 / 60);
        }
    }
    window.onEachFrame = onEachFrame;
})();
window.onEachFrame(Run);

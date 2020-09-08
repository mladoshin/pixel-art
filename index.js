const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const colorInp = document.getElementById("colorInp");
const block = 32; //size of each square
const canvWidth = 512;
const canvHeight = 512;
var isClicked = false
var color = "#FF0000";

function changeColor(){
	if (colorInp.value && colorInp.value.length==6){
		color = "#"+colorInp.value;
	}else{
		color = colorInp.value;
	}
}

function strokeRows(){
	for (let y=0; y<canvHeight; y+=block){
		ctx.fillStyle = "#CCCCCC";
		ctx.lineWidth=0.5;
		ctx.beginPath();
		ctx.moveTo(0, y);
		ctx.lineTo(canvWidth, y);
		ctx.stroke()
	}
}

function strokeColumns(){
	for (let x=0; x<canvWidth; x+=block){
		ctx.fillStyle = "#CCCCCC";
		ctx.lineWidth=0.5;
		ctx.beginPath();
		ctx.moveTo(x, 0);
		ctx.lineTo(x, canvHeight);
		ctx.stroke()
	}
}

function clickHandler(event){
	let x = event.clientX - event.target.offsetLeft;
	let y = event.clientY-event.target.offsetTop;
	console.log(x, y)
	isClicked=true;
	let sqX = Math.floor(x/block)+1;
	let sqY = Math.floor(y/block)+1;
	fillSquare(sqX, sqY);
	console.log("Coords x and y: "+ x+"  "+y);
	console.log(sqX, sqY);
}

function startDrawing(event){
	if (isClicked){
		clickHandler(event);
	}
}
function stopDrawing(){
	isClicked=false;
}
function fillSquare(sqX, sqY){
	let x = (sqX-1)*block;
	let y = (sqY-1)*block;
	ctx.fillStyle=color;
	ctx.fillRect(x, y, block, block);
}

function clear(){
	location.reload();
}

function main(){
	canvas.addEventListener("mousedown", (event) => clickHandler(event));
	canvas.addEventListener("mousemove", (event) => startDrawing(event));
	canvas.addEventListener("mouseup", () => stopDrawing());

	ctx.lineWidth=1;
	canvas.width=canvWidth;
	canvas.height=canvHeight;
	ctx.fillStyle="#FFFFFF";
	ctx.fillRect(0, 0, 512, 512);
	strokeRows();
	strokeColumns();
}

main();

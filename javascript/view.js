export default class View{


	static colors = {
		'7':'black',
		'6':'black',
		'5':'black',
		'4':'black',
		'3':'black',
		'2':'black',
		'1':'black',
	};
	constructor(element, width, height, rows, columns){

		this.element = element;
		this.width  = width;
		this.height = height;

		this.canvas = document.createElement('canvas');
		this.canvas.width = this.width;
		this.canvas.height = this.height;
		this.context = this.canvas.getContext('2d');

		this.playfieldBorderWidth = 4;
		this.playfieldX = this.playfieldBorderWidth;
		this.playfieldY = this.playfieldBorderWidth;
		this.playfieldWidth = this.width * 2 / 3;
		this.playfieldHeight = this.height;
		this.playfieldInnerWidth = this.playfieldWidth - this.playfieldBorderWidth * 2;
		this.playfieldInnerHeight = this.playfieldHeight - this.playfieldBorderWidth * 2;

		this.blockWidth = this.playfieldInnerWidth / columns;
		this.blockHeight = this.playfieldInnerHeight / rows;

		this.panelX = this.playfieldWidth + 10;
		this.panelY = 0;
		this.panelWidth = this.width / 3;
		this.panelHeight = this.height;

		this.element.appendChild(this.canvas);
	}



	renderMainScreen(state){
		this.clearScreen();
		this.renderPlayfield(state);
		this.renderPanel(state);		
	}

 	renderPlayfield({playfield}){
 		for (let y = 0;y < playfield.length; y++) {
			const line = playfield[y];


			for (let x = 0; x < line.length; x++) {
				const block = line[x];

				if (block){
					this.renderBlock(
						this.playfieldX + (x * this.blockWidth),
						this.playfieldY + (y * this.blockHeight),
						this.blockWidth,
						this.blockHeight,
						View.colors[block]
					);
				}
			}
		}
 	}

 	renderBlock(x,y,width, height,color){
 		this.context.fillStyle = color;
					this.context.strokeStyle = 'white';
					this.context.lineWidth = 2;

					this.context.fillRect(x, y, width,height);
					this.context.strokeRect(x, y, width,height);

 	}

 	renderPanel({level, score, lines, nextPiece}){
 		this.inputName = document.querySelector('input');
 		this.context.fillRect(this.panelX - 10,this.panelY,160,640);
 		this.context.textAlign = 'start';
 		this.context.textBaseline = 'top';
 		this.context.fillStyle = 'white';
 		this.context.font = '30px "Calibri"';

 		this.context.fillText(this.inputName.value,this.panelX ,this.panelY) ;
 		this.context.fillText(`Score: ${score}`,this.panelX ,this.panelY + 34) ;
 		this.context.fillText(`Next:`,this.panelX,this.panelY + 58);



 		for (let y = 0;y < nextPiece.blocks.length; y++) {
 			for (let x = 0;x < nextPiece.blocks[y].length;x++) {
 				const block = nextPiece.blocks[y][x];

 				if (block) {
 					this.renderBlock(
 						this.panelX + (x  * this.blockWidth * 0.5),
 						this.panelY + 74 +(y * this.blockHeight * 0.5),
 						this.blockWidth * 0.5 ,
 						this.blockHeight * 0.5,
 						View.colors[block]);

 				}
 			}
 		}
 	}


	renderStartScreen(){
		this.context.fillStyle = 'black';
		this.context.fillRect(0, 0, this.width, this.height);

		this.context.fillStyle = 'white';
		this.context.font = '30px "Calibri"';
		this.context.textAlign = 'center';
		this.context.textBaseLine = 'middle';
		this.context.fillText('Press Enter to START', this.width / 2, this.height / 2);

	}


	renderPauseScreen(){
		this.clearScreen();

		this.context.fillStyle = 'black';
		this.context.fillRect(0, 0, this.width, this.height);

		this.context.fillStyle = 'white';

		this.context.font = '30px "Calibri"';
		this.context.textAlign = 'center';
		this.context.textBaseLine = 'middle';
		this.context.fillText('Press Enter to RESUME', this.width / 2, this.height / 2);

	}

	renderEndScreen({score}){	
		this.context.fillStyle = 'black';
		this.context.fillRect(0, 0, this.width, this.height);

		this.context.fillStyle = 'white';
		this.context.font = '30px "Calibri"';
		this.context.textAlign = 'center';
		this.context.textBaseLine = 'middle';
		this.context.fillText(this.inputName.value, this.width / 2, this.height / 2 - 88);
		this.context.fillText('YOU LOSE', this.width / 2, this.height / 2 - 48);
		this.context.fillText(`Score: ${score}`, this.width / 2, this.height / 2 );
		this.context.fillText('PRESS  ENTER TO RESTART', this.width / 2, this.height / 2 + 48 );


	}


	clearScreen(){
		this.context.clearRect(0,0,this.width, this.height);
 	}

 	
	
}
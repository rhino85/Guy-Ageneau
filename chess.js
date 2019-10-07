'use strict'
var canvas = document.getElementById('canvas');
paper.setup(canvas);
function chess1(step, dev){  //creer une grille d'echec 
		
		var grid = [];  //le tableau des points (grid est un tableau qui contiendra des sous-tableau pour chaques colonnes)
		
		for (var i = 50; i <= paper.view.bounds.width - 50; i = i + step) {
			grid.push([]); //ajout d'un sous tableau (contient une colonne de point)
			for (var j = 50; j <= paper.view.bounds.height - 50; j = j + step) {
				
				grid[grid.length-1].push(new function point(){  //on ajoute au sous tableau en cours un objet point 
					this.i = grid.length - 1;					//index i du point
					this.j = grid[grid.length - 1].length;		//index j du point

					/*
					if(grid[this.i - 1] != undefined){    //si on est pas dans la premiere colonne
						this.wy = grid[this.i-1][this.j].wy + Math.random()*8 - 4;       	//on additionne a la deviation verticale du point de gauche une nouvelle deviation verticale
					}
					else{
							this.wy=Math.random()*8 - 4;									//sinon on init la dev verticale
					}
					if(grid[this.i][this.j - 1] != undefined){		//si on est pas dans la première ligne 
							this.wx = grid[this.i][this.j-1].wx + Math.random()*8 - 4;		//on additionne  à la deviation horizontale du point du dessus une nouvelle dev horzl
					}
					else{
						this.wx=Math.random()*8 - 4;
					}
					*/

					
					if(grid[this.i - 1] != undefined){    //si on est pas dans la premiere colonne
						this.wy = (grid[this.i-1][this.j].wy + grid[this.i-1][this.j].wx)/2 + (Math.random()*dev - dev/2);       	//on additionne a la deviation verticale du point de gauche une nouvelle deviation verticale
					}
					else{
							this.wy=Math.random()*dev - dev/2;									//sinon on init la dev verticale
					}
					if(grid[this.i][this.j - 1] != undefined){		//si on est pas dans la première ligne 
							this.wx = (grid[this.i][this.j-1].wx + grid[this.i][this.j-1].wy)/2 + (Math.random()*dev - dev/2);		//on additionne  à la deviation horizontale du point du dessus une nouvelle dev horzl
					}
					else{
						this.wx=Math.random()*dev - dev/2;
					}
					
					/*
					if(grid[this.i - 1] != undefined){          //si on est pas dans la premiere colonne
						this.wx = grid[this.i-1][this.j].wx + Math.random()*8 - 4;  	//on additionne a la deviation horizontale du point de gauche une nouvelle deviation horizontale
					}		
					else{
						this.wx=Math.random()*8 - 4;			//sinon on initialise la deviation horizontale
					}
					if(grid[this.i][this.j - 1] != undefined){	//si on est pas dans la premiere ligne
							this.wy = grid[this.i][this.j-1].wy + Math.random()*8 - 4; 	//on additionne à la deviation verticale du point du dessus une nouvelle deviation verticale
					}
					else{
						this.wy=Math.random()*8 - 4;			//sinon on initialise la deviation verticale
					}*/
					this.point = new paper.Point(i + this.wx, j + this.wy);				//on creer le point en tenant compte des deviations calculees


					/*dessin des lignes entre les points :
						il y a un seul objet "path" pour chaque ligne verticale, idem pour les lignes horizontales
						je stoque cet objet path dans le premier objet point de chaque ligne ou colonne
					*/
					if(grid[this.i][0] === undefined){  //si le premier point de la COLONNE n'a pas été créé (et le trait associé) aka si on est entrain de s'occuper de ce fameux point
						this.pathV = new paper.Path(this.point);	//on créer le trait
						this.pathV.strokeColor = "black";
					}
					else{								//sinon on ajoute le point actuel au trait
						grid[this.i][0].pathV.add(this.point);      
						grid[this.i][0].pathV.smooth({ type: 'continuous' });
					}

					if(grid[0][this.j] === undefined){  //si le premier point de la LIGNE n'a pas été créé (et le trait associé) aka si on est entrain de s'occuper de ce fameux point
						this.pathH = new paper.Path(this.point);	//on créer le trait
						this.pathH.strokeColor = "black";
					}
					else{
						grid[0][this.j].pathH.add(this.point);      //sinon on ajoute le point actuel au trait
						grid[0][this.j].pathH.smooth({ type: 'continuous' });
					}

								//pathtest.add(this.point); //ajouter chaque point au bon path ça resoud pas le problème du remplissage

								/*
								pour le remplissage :
								passer des lignes aux bandes ("closed path") puis methode paperjs booleennes 

								*/
					//this.dot = new paper.Path.Circle(this.point, 1);
					//this.dot.fillColor = 'black';
				});
				console.log("tic");
			}
		}

		for (var i = grid.length - 1; i >= grid.length-1; i = i-2) {
			//grid[i][0].pathV.addSegments(grid[i-1][0].pathV.segments);
			//grid[i][0].pathV.selected = true;
		}
		//pathtest.strokeColor = "black";
		
		console.log(grid)
		return this;
	}





var step = Math.random()*20 + 5;
var dev =4;
console.log("step : " + step + " dev : " + dev);
chess1(step, dev);
var blip = Math.random()*40;
var blip2 = Math.random()*20;
var blip3 = Math.random();
setInterval(function(){

	paper.project.clear();
	var step = Math.random()*blip + 5;
	var dev =Math.random()*blip2;
	console.log("step : " + step + " dev : " + dev);
	chess1(step, dev);

	if(Math.random()>blip3){
		console.log(blip3);
		blip = Math.random()*40;
		blip2 = Math.random()*20;
		blip3=Math.random();
	}
}, 5000)

document.getElementById('canvas').onclick = function(){
	paper.project.clear();
var step = Math.random()*blip + 5;
	var dev =Math.random()*blip2;
	console.log("step : " + step + " dev : " + dev);
	chess1(step, dev);

	if(Math.random()>blip3){
		console.log(blip3);
		blip = Math.random()*40;
		blip2 = Math.random()*20;
		blip3=Math.random();
	}
}








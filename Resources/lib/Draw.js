function Draw(){

}

Draw.prototype.gasolinerasPintar = function (){
	 	 //hideIndicator();
	 	 var lista = JSON.parse(Titanium.App.Properties.getString("gasolinerasList"));
	 	 var data = [];
	 	 for (var c=0;c<lista.length;c++)
			{
			var id = lista[c].id;
			var rotulo = lista[c].rotulo;
			var distancia = lista[c].distancia;
			var precio = lista[c].precio;
			var fecha = lista[c].fecha;
			var direccion = lista[c].direccion;
			
			var row = Ti.UI.createTableViewRow({hasChild:true,height:'40dp',backgroundColor:'#fff', rowId:c});
				
				var rotulo = Ti.UI.createLabel({
					text: rotulo,
					left:'15dp',
					top:'8dp',
					color:'#000',
					height:'16dp',
					width:'150dp',
					textAlign:'left',
					font:{fontSize:'12dp'}
				});
				row.add(rotulo);

				var direccion = Titanium.UI.createLabel({
					text:direccion,
					font:{fontSize:'10dp',fontWeight:'normal'},
					width:'150dp',
					textAlign:'left',
					bottom:'4dp',
					left:'15dp',
					height:'12dp'
				});
				row.add(direccion);
				
				var distancia = Titanium.UI.createLabel({
					text:'a '+distancia+' km /',
					font:{fontSize:'10dp',fontWeight:'normal'},
					width:'auto',
					textAlign:'left',
					bottom:'10dp',
					right:'50dp',
					height:'14dp',
					color:'#525751'
				});
				row.add(distancia);
				
				var precio = Titanium.UI.createLabel({
					text:precio+'€',
					font:{fontSize:'10dp',fontWeight:'normal'},
					width:'auto',
					textAlign:'left',
					bottom:'10dp',
					right:'20dp',
					height:'14dp',
					color:'#26870B'
				});
				row.add(precio);
				
				//row.add(post_view);
				row.className = 'item'+c;
				data[c] = row;
				
				}
				return data;
	 	 };

module.exports = Draw;
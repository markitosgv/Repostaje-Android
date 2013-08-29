function AppWindow(title) {
	
	//declare module dependencies
	var CurrentPosicion = require('/lib/CurrentPosicion');
	var Buttons = require('/lib/Buttons');
	var Draw = require('/lib/Draw');
	var Data = require('/lib/Data');
	//create module instance
	var position = new CurrentPosicion();
	var buttons = new Buttons();
	var pintar = new Draw();
	var datos = new Data();
	
	//iniciamos los objetos de la UI
	var self = Ti.UI.createWindow({
		title:title,
		backgroundColor:'white',
		barColor:'#638F0C'
	});

	var table = Ti.UI.createTableView({
		height:'96%',
		backgroundColor:'#ffffff',
		selectedBackgroundColor:'#dddddd',
		top:0
	});
	
	//self.rightNavButton = refrescar;
	//self.leftNavButton = bb;
	
	var actInd = Titanium.UI.createActivityIndicator({
			    height:50,
			    width:10
	});

	var activity = self.activity;
	 
	activity.onCreateOptionsMenu = function(e){
	  var menu = e.menu;
	  var refresh = menu.add({ title: "Refrescar" });
	  refresh.setIcon("/images/refresh.png");
		refresh.addEventListener('click', function()
		{
		Ti.App.fireEvent('location.refresh');
		});	
		
	  var ordenkm = menu.add({ title: "Ordenar por Km" });
	  ordenkm.setIcon("/images/arrowup.png");
	  ordenkm.addEventListener("click", function(e) {
	    //showIndicatorOrder("Más Cercana");
	    actInd.message ="Ordenar por KM";
	    actInd.show();
	    var gasolinerasList = JSON.parse(Titanium.App.Properties.getString("gasolinerasList"));
		Titanium.App.Properties.setString("gasolinerasList",  JSON.stringify(gasolinerasList.sort(mySortingKm)));
		table.data = pintar.gasolinerasPintar();
		actInd.hide();
	  });
	  
	  var ordeneur = menu.add({ title: "Ordenar por €" });
	  ordeneur.setIcon("/images/arrowup.png");
	  ordeneur.addEventListener("click", function(e) {
	    //showIndicatorOrder("Más Cercana");
	    actInd.message ="Ordenar por €";
	    actInd.show();
	    var gasolinerasList = JSON.parse(Titanium.App.Properties.getString("gasolinerasList"));
		Titanium.App.Properties.setString("gasolinerasList",  JSON.stringify(gasolinerasList.sort(mySortingMoney)));
		table.data = pintar.gasolinerasPintar();
		actInd.hide();
	  });
	};
	
	function mySortingMoney(a,b) {
	a = a['precio'];
	b = b['precio'];
	
	return a == b ? 0 : (a < b ? -1 : 1)

	};

	function mySortingKm(a,b) {
		a = Math.floor(a['distancia']);
		b = Math.floor(b['distancia']);
		
		return a == b ? 0 : (a < b ? -1 : 1)
	
	};

	var infobarra = Ti.UI.createView({
		backgroundColor:'#000',
		opacity:0.8,
		width:'100%',
		height:'20dp',
		bottom:0
	});
	
	var labelPosition = Ti.UI.createLabel({
		color:'#FFF',
		font:{fontSize:'10dp'},
		textAlign:'center'
	});
	
	var locationrefresh = function(){
			//limpiamos la tabla para volver a buscar
			table.data = null;
			//showIndicator();
			actInd.message = "Cargando...";
			actInd.show();
			position.getLocation();
	};
	//Global LISTENER si queremos refrescar la posición GPS
	Ti.App.addEventListener('location.refresh', locationrefresh);

	//Listener para cuando no encontramos gasolineras
	Ti.App.addEventListener('gas.notfound',function(){
		actInd.hide();
		table.data = "";
		Ti.App.fireEvent('map.clean');
		Ti.App.fireEvent('change.settings');
	});

	// GLOBAL LISTENER cuando tenemos la posición
	Ti.App.addEventListener('location.updated',function(){
	 	 datos.getGasolineras(JSON.parse(Titanium.App.Properties.getString("coordenadas")));
	 	 
	 	 //Listener cuando recibamos las gasolineras
	 	 Ti.App.addEventListener('gasolineras.notfound',function(gasolineras){
	 	 //hideIndicator();
	 	 });
	 	 
	 	 //Listener cuando recibamos las gasolineras, solo lo hacemos una vez por si nos disaparase mas veces
	 	 var gasolinerasupdated = function(){
	 	 		table.data = pintar.gasolinerasPintar();
	 	 		Ti.App.fireEvent('map.updated');
				Ti.App.removeEventListener('gasolineras.updated',gasolinerasupdated);
				//hideIndicator();
				labelPosition.text = 'Radio: '+JSON.parse(Titanium.App.Properties.getString("config")).radio+
									 ' km | Carburante: '+JSON.parse(Titanium.App.Properties.getString("config")).tipoName+
									 ' | Limite: '+JSON.parse(Titanium.App.Properties.getString("config")).limit;
				actInd.hide();
			};
	 	 Ti.App.addEventListener('gasolineras.updated', gasolinerasupdated);
			
	});
	
	self.add(table);
	table.addEventListener('click', function(e){
		 var masWin = require('ui/More');
		 self.containingTab.open(masWin(e.rowData.rowId));
	});
	infobarra.add(labelPosition);
	self.add(infobarra);
		
	return self;
};

module.exports = AppWindow;

function More(id) {
	
	//declare module dependencies
	var Buttons = require('/lib/Buttons');
	//create module instance
	var buttons = new Buttons();
	
	var self = Ti.UI.createWindow({
		title:'Detalle',
		backgroundImage:'/images/bg.png',
		backgroundRepeat:true
		});
	
	var gasolinerasList = JSON.parse(Titanium.App.Properties.getString("gasolinerasList"));
	var gasolinera = gasolinerasList[id];
	self.title = gasolinera.rotulo;

	var view_button = Titanium.UI.createView({
		width:'auto',
		height:'50dp',
		bottom:'10dp'
	});
	var ruta = Titanium.UI.createButton({
		title:'Ruta',
		width:'100dp'
	});
	
	view_button.add(ruta);

	// create table view
	var tableview = Titanium.UI.createTableView({
		backgroundImage:'images/bg.png',
		backgroundRepeat:true,
		touchEnabled:false
	});
	var morePintar = require('lib/MorePintar');
	tableview.data = morePintar(gasolinera);
	
	self.add(tableview);
	self.add(view_button);
	
	ruta.addEventListener('click', function()
	{
	Titanium.Platform.openURL('http://maps.google.es/maps?saddr='+JSON.parse(Titanium.App.Properties.getString("coordenadas")).lat+'+'+JSON.parse(Titanium.App.Properties.getString("coordenadas")).lng+'&daddr='+gasolinera.lat+'+'+gasolinera.lng);
	});	
	
	return self;
};

module.exports = More;
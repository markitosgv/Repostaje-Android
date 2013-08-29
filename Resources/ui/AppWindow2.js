function AppWindow2(title) {

	//declare module dependencies
	var Map = require('/ui/Map');
	var Buttons = require('/lib/Buttons');
	
	//create module instance
	var buttons = new Buttons();
	var mapa = new Map();
	
	var self = Ti.UI.createWindow({
		title:title,
		backgroundColor:'white',
		barColor:'#638F0C'
	});
	
	
	var mapview = Titanium.Map.createView({
		mapType: Titanium.Map.STANDARD_TYPE,
		//region:region,
		animate:true,
		regionFit:true,
		userLocation:true
		//annotations:anotacionesList
	});
	
	var sat = Titanium.UI.createButton({
		title:'Sat'
	});
	// button to change map type to STD
	var std = Titanium.UI.createButton({
		title:'Std'
	});
	//view_buttons.add(std);
	// button to change map type to HYBRID
	var hyb = Titanium.UI.createButton({
		title:'Hyb'
	});
	//view_buttons.add(hyb);
	
	//self.rightNavButton = std;
	self.add(mapview);

	var activity = self.activity;
	 
	activity.onCreateOptionsMenu = function(e){
	  var menu = e.menu;
	  var sat = menu.add({ title: "Satélite" });
	  sat.addEventListener("click", function(e) {
	    mapview.setMapType(Titanium.Map.SATELLITE_TYPE);
	  });
	  var hyb = menu.add({ title: "Estándar" });
	  hyb.addEventListener("click", function(e) {
	    mapview.setMapType(Titanium.Map.HYBRID_TYPE);
	  });
	  
	};
			var mapupdated = function()
			{
          	//mapview.annotations = [];
          	mapview.removeAllAnnotations();
			//mapview.annotations = mapa.getAnnotations();
			mapview.setRegion(mapa.getRegion());
			mapview.addAnnotations(mapa.getAnnotations());
			mapview.selectAnnotation(mapa.pin);
			}
			Ti.App.addEventListener('map.updated', mapupdated);
			
			var mapclean = function()
			{
          	mapview.removeAllAnnotations();
			}
			Ti.App.addEventListener('map.clean', mapclean);
	
	mapview.addEventListener('click',function(evt)
	{
			if (evt.clicksource == 'rightPane' || evt.clicksource == 'title' || evt.clicksource == 'subtitle')
			{
			var masWin = require('/ui/More');
			self.containingTab.open(masWin(evt.annotation.myid));
			}
	});

	return self;
};

module.exports = AppWindow2;

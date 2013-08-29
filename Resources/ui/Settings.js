function Settings(title) {
	
	//declare module dependencies
	var Buttons = require('lib/Buttons');
	var Data = require('lib/Data');
	//create module instance
	var buttons = new Buttons();
	var datos = new Data();
	
	var tipoName ="";
	var tipo = "";
	
	var self = Ti.UI.createWindow({
		title:title,
		backgroundImage:'/images/bg.png',
		backgroundRepeat:true,
		barColor:'#638F0C'	
		});
	
	//Actualizamos con los datos de la config las labels y sliders de configuracion (solo la primera vez por eso eliminamos el listener), las demas veces queda actualizado por tocarlo en esta window
	var focusSettings = function(){
		var config = JSON.parse(Titanium.App.Properties.getString("config"))
		limitLabel.text = 'Limite de gasolineras = '+config.limit;
		radioLabel.text = 'Radio de búsqueda (en Km) = '+config.radio;
		limitSlider.value = config.limit;
		radioSlider.value = config.radio;
		buttonOn(botonIni(config.tipo));
		tipoName = config.tipoName;
		tipo = config.tipo;
		self.removeEventListener('focus',focusSettings);
	};
	self.addEventListener('focus', focusSettings);

	var blurSettings = function(){
		Ti.API.info("SETTINGS FIRED");
		var config = JSON.parse(Titanium.App.Properties.getString("config"))
		if (config.tipoName != tipoName || config.radio != Math.round(radioSlider.value) || config.limit != Math.round(limitSlider.value) )
		{
		var config = {
					'radio': Math.round(radioSlider.value),
					'limit': Math.round(limitSlider.value),
					'tipo': tipo,
					'tipoName': tipoName
		};
		Titanium.App.Properties.setString("config",  JSON.stringify(config));
		Ti.App.fireEvent('location.refresh');
		}
	};
	Ti.App.addEventListener('blur.settings', blurSettings);
	
	function botonIni(i)
	{
			switch (i)
			{
					case '1':	
							return button1;
							break;
					case '2':	
							return button2;
							break;
					case '3': 
							return button3;
							break;
					case '4': 
							return button4;
							break;
					case '5': 
							return button5;
							break;
					case '6': return button6;
							break;
				}
				
	}
	
	//Boton de OK
	var infobutton = buttons.infolight();
	self.rightNavButton = infobutton;

	var limitLabel = Titanium.UI.createLabel({
		
		text:'Limite de gasolineras = '+JSON.parse(Titanium.App.Properties.getString("config")).limit ,
		color:'#000',
		font:{
			fontFamily:'Helvetica Neue',
			fontSize:'15dp'
		},
		textAlign:'center',
		top:'10dp',
		width:'300dp',
		height:'auto'
	});
	
	var radioLabel = Titanium.UI.createLabel({
		text:'Radio de búsqueda (en Km) = '+JSON.parse(Titanium.App.Properties.getString("config")).radio ,
		color:'#000',
		font:{
			fontFamily:'Helvetica Neue',
			fontSize:'15dp'
		},
		textAlign:'center',
		top:'70dp',
		width:'300dp',
		height:'auto'
	});
	
	var limitSlider = Titanium.UI.createSlider({
		min:1,
		max:30,
		value:JSON.parse(Titanium.App.Properties.getString("config")).limit,
		width:'200dp',
		height:'auto',
		top:'30dp',
		leftTrackImage:'images/slider_greenbar.png'
	});

	var radioSlider = Titanium.UI.createSlider({
		min:0,
		max:50,
		value:JSON.parse(Titanium.App.Properties.getString("config")).radio,
		width:'200dp',
		height:'auto',
		top:'90dp',
		leftTrackImage:'images/slider_greenbar.png'
	});
	
	
	limitSlider.addEventListener('change',function(e)
	{
		var limite = Math.round(limitSlider.value);
		limitLabel.text = 'Limite de gasolineras = ' + limite;
	});
	radioSlider.addEventListener('change',function(e)
	{
		var radio = Math.round(radioSlider.value);
		radioLabel.text = 'Radio de búsqueda (en Km) = ' + radio;
	});
	
	self.add(limitLabel);
	self.add(limitSlider);
	self.add(radioLabel);
	self.add(radioSlider);
	
		//botones de seleccion de carburante
	var button1 = buttons.button("Gasolina 95", '20%', '160dp');
	var button2 = buttons.button("Gasolina 98", '60%', '160dp');
	var button3 = buttons.button("Gasoleo A", '20%', '240dp');
	var button4 = buttons.button("Gasoleo B", '60%', '240dp');
	var button5 = buttons.button("Gasoleo C", '20%', '320dp');
	var button6 = buttons.button("Biodiesel", '60%', '320dp');
	
	self.add(button1);
	self.add(button2);
	self.add(button3);
	self.add(button4);
	self.add(button5);
	self.add(button6);
	
	button1.addEventListener('click',function()
	{
		buttonOn(button1);
		tipoName = "gasolina95";
		tipo = 1;
		var buttons = [button2,button3,button4,button5,button6];
		buttonOff(buttons);
	});
	
	button2.addEventListener('click',function()
	{
		buttonOn(button2);
		tipoName = "gasolina98";
		tipo = 2;
		var buttons = [button1,button3,button4,button5,button6];
		buttonOff(buttons);
	});
	
	button3.addEventListener('click',function()
	{
		buttonOn(button3);
		tipoName = "gasoleoA";
		tipo = 3;
		var buttons = [button1,button2,button4,button5,button6];
		buttonOff(buttons);
	});
	
	button4.addEventListener('click',function()
	{
		buttonOn(button4);
		tipoName = "gasoleoB";
		tipo = 4;
		var buttons = [button1,button2,button3,button5,button6];
		buttonOff(buttons);
	});
	
	button5.addEventListener('click',function()
	{
		buttonOn(button5);
		tipoName = "gasoleoC";
		tipo = 5;
		var buttons = [button1,button2,button3,button4,button6];
		buttonOff(buttons);
	});
	
	button6.addEventListener('click',function()
	{
		buttonOn(button6);
		tipoName = "biodiesel";
		tipo = 6;
		var buttons = [button1,button2,button3,button4,button5];
		buttonOff(buttons);
	});
	
	function buttonOn(button)
	{
			button.borderWidth = 2;
			button.borderColor = '#FFF';
			button.font = {fontWeight:'bold'};
				
	};
	
	function buttonOff(buttons)
	{

				for (var c=0; c<buttons.length ;c++)
				{
				buttons[c].font = {fontWeight:'normal'};
				}		
			
	};
	
	infobutton.addEventListener('click', function()
	{
		var AboutWin = require('ui/About');
		var about = new AboutWin();
		about.open({modalTransitionStyle: Ti.UI.iPhone.MODAL_TRANSITION_STYLE_FLIP_HORIZONTAL});
	});

	return self;
};

module.exports = Settings;

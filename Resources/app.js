if (Ti.version < 1.8 ) {
	alert('Sorry - this application template requires Titanium Mobile SDK 1.8 or later');
}
else if (Ti.Platform.osname === 'mobileweb') {
	alert('Mobile web is not yet supported by this template');
}
else {
	var AppTabGroup = require('/ui/AppTabGroup');
	
	//config inicial
	var config = {
			'radio': 50,
			'limit': 15,
			'tipo':'1',
			'tipoName': 'gasolina95'
		};
	Titanium.App.Properties.setString("config",  JSON.stringify(config));
		
	//referencias
	var tabGroup = new AppTabGroup();
	//Cuando queramos localizar y tengamos las settings definidas
	Ti.App.fireEvent('location.refresh');
	
	tabGroup.open();
	
	tabGroup.addEventListener('focus', function(e) {
		//Si venimos de las settings
    if (e.previousIndex == 2) {
        Ti.App.fireEvent('blur.settings');
    }
});

	//Listener si no encotramos gasolineras, volvemos a las settings
	Ti.App.addEventListener('change.settings',function(){
		tabGroup.setActiveTab(2);
	});

}
function MorePintar(gasolinera){
	
	var data=[];
	var carburante = capitaliseFirstLetter(JSON.parse(Titanium.App.Properties.getString("config")).tipoName);
	data[0] = Ti.UI.createTableViewSection({headerTitle:'Información General'});
	data[1] = Ti.UI.createTableViewSection({headerTitle:carburante});
	
	function capitaliseFirstLetter(string)
	{
    return string.charAt(0).toUpperCase() + string.slice(1);
	}

	//Localidad
	
	var label = Titanium.UI.createLabel({text: 'localidad', color:"#4C566C", width:'100dp', left: '10dp', font:{fontStyle:'italic', size:'10dp'}});
	try{
	var labeltext = Titanium.UI.createLabel({text: gasolinera.localidad, color:"#000", left: '60dp', width: '215dp'});
	}
	catch (e){
	var labeltext = Titanium.UI.createLabel({text: 'No disponible', color:"#000", left: '60dp', width: '215dp'});
	}
	var row = Ti.UI.createTableViewRow({height: '30'});
	row.add(label);
	row.add(labeltext);
	data[0].add(row);
	
	//Provincia
	var label = Titanium.UI.createLabel({text: 'provincia', color:"#4C566C", width:'100dp', left: '10dp', font:{fontStyle:'italic', size:'10dp'}});
	try{
	var labeltext = Titanium.UI.createLabel({text: gasolinera.provincia, color:"#000", left: '60dp', width: '215dp'});
	}
	catch (e){
	var labeltext = Titanium.UI.createLabel({text: 'No disponible', color:"#000", left: '60dp', width: '215dp'});
	}
	var row = Ti.UI.createTableViewRow({height: '30dp'});
	row.add(label);
	row.add(labeltext);
	data[0].add(row);

	//Horario
	var label = Titanium.UI.createLabel({text: 'horarios', color:"#4C566C", width:'100dp', left: '10dp', font:{fontStyle:'italic', size:'10dp'}});
	try{
	var labeltext = Titanium.UI.createLabel({text: gasolinera.horario, color:"#000", left: '60dp', width: '215dp'});
	}
	catch (e){
	var labeltext = Titanium.UI.createLabel({text: 'No disponible', color:"#000", left: '60dp', width: '215dp'});
	}
	var row = Ti.UI.createTableViewRow({height: '30dp'});
	row.add(label);
	row.add(labeltext);
	data[0].add(row);

	//fecha
	var label = Titanium.UI.createLabel({text: 'fecha actualización', color:"#4C566C", width:'140dp', left: '10dp', font:{fontStyle:'italic', size:'10dp'}});
	try{
	var aux = gasolinera.fecha.split("-");
	var fecha = aux[2]+'/'+aux[1]+'/'+aux[0];
	var labeltext = Titanium.UI.createLabel({text: fecha, color:"#000", left: '120dp', width: '215dp'});
	}
	catch (e){
	var labeltext = Titanium.UI.createLabel({text: 'No disponible', color:"#000", left: '120dp', width: '215dp'});
	}
	var row = Ti.UI.createTableViewRow({height: '30dp'});
	row.add(label);
	row.add(labeltext);
	data[1].add(row);

	//precio
	var label = Titanium.UI.createLabel({text: 'precio por litro', color:"#4C566C", width:'100dp', left: '10dp', font:{fontStyle:'italic', size:'10dp'}});
	try{
	var labeltext = Titanium.UI.createLabel({text: gasolinera.precio, color:"#000", left: '90dp', width: '225dp'});
	}
	catch (e){
	var labeltext = Titanium.UI.createLabel({text: 'No disponible', color:"#000", left: '90dp', width: '215dp'});
	}
	var row = Ti.UI.createTableViewRow({height: '30dp'});
	row.add(label);
	row.add(labeltext);
	data[1].add(row);
				
	return data;
}

module.exports = MorePintar;

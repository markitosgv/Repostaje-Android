function Annotations(){
			this.pin ="";
			this.gasolinerasList = JSON.parse(Titanium.App.Properties.getString("gasolinerasList"));
}
Annotations.prototype.Make = function(){
 

function mySortingMoney(a,b) {
	a = a['precio'];
	b = b['precio'];
	
	return a == b ? 0 : (a < b ? -1 : 1)

};

function mySortingKm(a,b) {
	a = a['distancia'];
	b = b['distancia'];
	
	return a == b ? 0 : (a < b ? -1 : 1)

};

var annotations = [];
var gasolinerasArray = this.gasolinerasList;
this.pin ="";//vaciamos
	for (var c=0;c<gasolinerasArray.length;c++)
		{
			var pin = Titanium.Map.createAnnotation({
				latitude:gasolinerasArray[c].lat,
				longitude:gasolinerasArray[c].lng,
				title:gasolinerasArray[c].rotulo,
				subtitle:gasolinerasArray[c].direccion,
				image: '/images/fillingstation.png',
				id: gasolinerasArray[c].id,
				animate:true,
				rightButton: '/images/more.png',
				myid: c// CUSTOM ATTRIBUTE THAT IS PASSED INTO EVENT OBJECTS
			});
		annotations.push(pin);
		}
var aux = gasolinerasArray.sort(mySortingMoney);
var id_barata = aux[0].id;
	for (var c=0;c<annotations.length;c++)
		{
			if (annotations[c].id == id_barata)
			{
			annotations[c].image = '/images/fillingstationgreen.png';
			this.pin = annotations[c];
			}
		}

return annotations;

};

module.exports = Annotations;
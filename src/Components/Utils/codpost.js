export let codpost = async (cod) => {
	if(cod.length == 5){
		let res = await fetch(`https://api.dif.gob.mx/geo/cp/callSepomex/${cod}`);
		let json = await res.json();
		return json
	}else{
		return;
	}
}
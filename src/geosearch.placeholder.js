class PlaceholderProvider {

    host = 'http://localhost:3000'

    constructor(host){
	if (host){
	    this.host = host;
	}
    }
    
    fullname(r) {

	const placetypes = [
	    // "microhood",
	    "neighbourhood",
	    "locality",
	    // "localadmin",
	    // "county",
	    "region",
	    "macroregion",
	    "country",
	];
	
	const count_placetypes = placetypes.length;
	
	var parts = [
	    r.name,
	];

	var lineage = r.lineage[0];
	
	for (var i=0; i < count_placetypes; i++){
	    
	    if (placetypes[i] == r.placetype){
		continue;
	    }
	    
	    if (lineage[ placetypes[i] ]){
		parts.push( lineage[ placetypes[i] ].name );
	    }
	}

	return parts.join(", ");
    }
    
    async search({ query }) {

	return new Promise((resolve, reject) => {
	    
	var uri = this.host + "/parser/search?text=" + encodeURIComponent(query);

	fetch(uri).then((rsp) => rsp.json()).
		   then((rsp) => {

		       var results = [];
		       const count = rsp.length;

		       for (var i=0; i < count; i++){

			   var ph_r = rsp[i];
			   var bbox = ph_r.geom.bbox.split(",");

			   const minx = parseFloat(bbox[0]);
			   const miny = parseFloat(bbox[1]);
			   const maxx = parseFloat(bbox[2]);
			   const maxy = parseFloat(bbox[3]);
			   const bounds = [ [miny,minx], [maxy, maxx] ];

			   const label = this.fullname(ph_r) + " (" + ph_r.placetype + ")";
			   
			   var r = {
			       x: ph_r.geom.lon,
			       y: ph_r.geom.lat,
			       label: label,
			       bounds: bounds,
			   };

			   results.push(r);
		       }
		       
		       // console.log("results: ", results.length);
		       resolve(results);		       
		       
		   }).catch((err) => {
		       console.log("Failed to derive results from Placeholder", err);
		       reject(err);
		   });
	    
	});
    };
};

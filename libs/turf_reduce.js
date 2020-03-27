function turfReduce(poly, tolerance){
    // check poly is a polygon
    if (poly.geometry === void 0 || poly.geometry.type !== 'Polygon' ) throw('"polygonreduce" only accepts polygon type input');

    // init defaults
    tolerance = (tolerance === void 0 || isNaN(tolerance) || tolerance === 0)? 0.1 : Math.abs(tolerance);

    var
        // init area value
        area = turf.area(poly),

        // max number of points to force a simplify
        maxcount = 250,

        // factor of shrinking ~ poly.area^1/2
        factor,

        // check if multiple islands and choose the bigger one
        // simplify if needed
        multi2simple = function(e){
            var e2 = (e.features !== void 0)? e.features[0]: e,
                    a=0, j=-1, p, count;
            if (e2.geometry.type=='MultiPolygon'){
                for (i=0;i<e2.geometry.coordinates.length;i++){
                    p = turf.polygon(e2.geometry.coordinates[i]);
                    if (turf.area(p)>a){
                        a = turf.area(p);
                        j=i;
                    }
                }
                e2.geometry.coordinates = [e2.geometry.coordinates[j][0]];
                e2.geometry.type='Polygon';
            }
            count = e2.geometry.coordinates.reduce(function(a, b){ return a + b.length; }, 0);
            return (count > maxcount) ? turf.simplify(e2) : e2;
        };

    // iteration loop, limited to area > 1 m^2 to avoid lockings
    while (area>1){
        factor =  -1 * tolerance* Math.sqrt(area) ;
        try{
            poly = turf.buffer(poly, factor, 'meters');
        }catch(err){
            /* it usually crashes before getting smaller than 1 m^2
            because it tries to buffer the "unbufferable" and crashes
            when processing a 0-vertex polygon (turf.js, line 12068)*/
            return turf.centroid(poly);
        }
        poly = multi2simple(poly);
        area = turf.area(poly);
    }

    // finally, if area<=1
    return turf.centroid(poly);

}

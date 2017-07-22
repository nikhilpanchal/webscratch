# Maps

Maps in D3 are drawn using input json files in the `geojson` format. A few salient features about this json format

1. It is an array of Feature objects, with each Feature representing a country
1. Each Feature object has the `geometry` and `properties` fields that represent the shape of the country on the map and
the name of the country respectively
1. The Geometry object consists of an Array of `coordinates`, with each `coordinate` itself being an array of two elements
   1. Longitude (Longitude is the first element of this pair array)
   1. Latitude
1. The Geometry object often represents a polygon that results in a line that joins all of its coordinates to form the
polygon that marks the country's border on the map.


In order to render maps, we need to first `project` the geoData. This is analogous to the scaling done in other D3 charts
where we map data points to x and y pixel coordinates in an SVG element. Once projected, we need to use the `path` function
to then render actual svg elements for each of the mapped pixels. What's curious and confusing is to actually render the 
map, we use the svg `path` elements which will map to each of the `feature` objects in the incoming geojson. These svg 
`path` objects are very flexible in that they take in an array of points in its `d` attribute that then specifies the 
shape of the `path` that actually needs to be drawn.




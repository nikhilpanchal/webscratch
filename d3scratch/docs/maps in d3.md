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


The technique used here to render the map is with SVG `path` elements. These elements are created using `path strings`
that are produced from the geoJson `feature` elements using `path generator functions`. So you would call the `d3.geoPath`
function that would return back a `path generator function`. The generator function then needs to be initialized with a
`projection` (explain later). Then you run the path generator through each `Feature` object in the geoJson to get `path
strings` that you then use to create `path` svg elements.

The `projection` in maps is similar to the scale function used in other charts, in that it maps points from a 3-D 
spherical globe (longitude and latitude) to a 2-D pixel range. In this example we've used a [mercator projection](https://en.wikipedia.org/wiki/Mercator_projection)
that in loose terms does the projection by looking at the global between -82deg and +82deg latitude and unravels the 
spherical globe into a 2-D plane by scaling points that are away from this range by a greater degree the further away you move.
eg. the regions of the globe near the equator appear roughly the same size, but regions further north or south appear 
larger, for instance, greenland appears in the same size as Australia, when in reality Australia is about 3 times larger.





# Data Visualization

## Data Types

Data can broadly be bucketed into two main types

### Quantitative Data
This is any variables that have exact numbers that have mathematical significance. These can be of two further sub-types

 1. Discrete: This is any variable whose values can be individually counted
 1. Continuous: Where it's not practical to count individual values and are best represented as a range of values
 
 
### Categorical Data
This is data that serves to create categories or buckets of data. These can be

 1. Nominal Data: This is a way of categorizing data into groups. Examples can be geographical data (eg. to categorize
 data by the continents)
 1. Ordered Data: This is where data is ordered or ranked in a particular way, most often by bucketing them into bins. 
 Examples could be ascending numerical ranges that are used in a histogram plot. 
 

## Visual Encodings

Many options exist to visually encode data points.

### Planar Data
This is where a correlation of 2 data points are represented as a plot on a 2-D graph. This is by far the most commonly
 used visual encoding technique.
 
### Retinal Variables
These are used to visually represent Ordered Data. Size is a good example of a retinal variable that can be used to plot
an ordered data point (eg. the size of the point--or circle-- can represent one of the bins in ordered data)

Color hue is another example of a retinal variable. The Color or a point on a graph can be used to represent a data-point 
value.

To represent Ordered Data: Size, Orientation, Color Saturation (light to dark)
To represent Nominal Data: Color Hue, Shape, Texture

### Animation
Animation is typically used to represent Time, and can be the more engaging part of data visualization, as the user
ends up watching points moving on a graph as the data steps through time.


## Rankings of Visual Encodings for Quantitative data
Studies have shown the following ranking of visual encodings in terms of their accuracy to display quantiative data.
This is the result of a study of how a bunch of human subjects most accurately interpreted the data based on how it
was visually encoded.

 1. Position
 1. Length
 1. Angle or Slope
 1. Area (like size of a circle or point)
 1. Volume (Area in 3D)
 1. Color or Color Saturation
 
 This is why it is no coincidence that the most important data points in a visualization are shown positionally, most
 often by positions on the x or y axes on a graph. 
 

## Resources
A good article explaining the points of Data types and visual encodings can be found here
[Visual Encoding](https://www.targetprocess.com/articles/visual-encoding/)
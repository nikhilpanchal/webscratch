# Project Info

This is a project that has me scratching about with d3. The project is organized as follows

## Setup

### Code
The bulk of the code is in the js files in the `src/draw` directory, where each file roughly creates one chart. All of
these files are referenced from the main starting point of the project which is the app.js file that imports other JS 
files each of which create a separate d3 graph.

### Styles
The compilation and inclusion of styles is handled by the webpack loader. The format that is followed is the styles have
an `app.css` file t11hat is the root of all styles. This file will import other .css files that are in the `styles/home` 
directory. Each .css file in this directory is used by a corresponding .js file from `src/draw`

### Build
The project is built using webpack, which transpiles all of the ES6 JS code, includes all of the CSS styles and includes
them in the index.html file.

### HTML
The index.html file does not create any svg element (anymore). It expects each JS file to append an svg element to the
body and render its chart within that svg.

### Data
All data files that any chart references should be placed in the resources directory. In the code you can refer to it
via the `/resources/<file-name>` path.

## Adding Code
To add a new chart, run through the following steps.

 * Create a .js file in `src/draw`. This should have a class with a constructor and a render function.
   * The constructor should define the height, width and margin values of the svg element, and create and append the svg 
   element to the body (each .js file will be responsible for creating its own svg element)
   * The render function should do the work of reading the data and actually create the type of chart that you desire.
 * Create a .css style file in `styles/home` with the styles you want for your chart
 * To get the code running you need to
   * Import the css file in the `styles/app.css` file
   * Import the .js file in `src/app.js`, create an instance, and call the render function
   
## Commands for the project

### Running the project
```javascript
npm start
```

Starts the local webpack dev server on port 8080

### Running the prod build
```javascript
npm run build-prod
```

This will create a minimized and uglified build that can be deployed to a production server

### Deploying the build
```javascript
firebase deploy
```

This will deploy it to the firebase web server
   
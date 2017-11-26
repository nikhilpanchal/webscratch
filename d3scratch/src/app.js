import Rectangle from './draw/rectangle'
import BarChart from './draw/bar'
import BarSvg from './draw/bar_svg'
import Histogram from './draw/histogram'
import BarDimple from './draw/bar_dimple'
import WorldCupGraph from './draw/world_cup'
import Maps from './draw/maps'
import GroupedBar from "./draw/groupedbar";
import Reusable from "./draw/reusable";


// let rectangle = new Rectangle();
// rectangle.render();

let data = [4, 8, 15, 16, 27, 40];
// let bar = new BarChart();
// bar.render(data);

function startPeriodicUpdates() {
    setInterval(() => {
        "use strict";
        data.push(Math.trunc(Math.random()*10));
        data[3] = Math.trunc(Math.random()*10);
        bar.update(data);
    }, 3000);
}

// let barSvg = new BarSvg();
// barSvg.render(data);


// let hist = new Histogram();
// hist.render(data);

// let barDimple = new BarDimple();
// barDimple.render();

// let worldCup = new WorldCupGraph();
// worldCup.render();

// let maps = new Maps();
// maps.render();

// let groupedBar = new GroupedBar();
// groupedBar.render();

let reusable = new Reusable();
// reusable.render();
// reusable.renderLines();
reusable.renderArea();
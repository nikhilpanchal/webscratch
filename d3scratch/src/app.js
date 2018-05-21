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
// rectangle.renderGroupedBar();

let data = [4, 8, 15, 16, 27, 40];
// let bar = new BarChart();
// bar.renderGroupedBar(data);

function startPeriodicUpdates() {
    setInterval(() => {
        "use strict";
        data.push(Math.trunc(Math.random()*10));
        data[3] = Math.trunc(Math.random()*10);
        bar.update(data);
    }, 3000);
}

// let barSvg = new BarSvg();
// barSvg.renderGroupedBar(data);


// let hist = new Histogram();
// hist.renderGroupedBar(data);

// let barDimple = new BarDimple();
// barDimple.renderGroupedBar();

// let worldCup = new WorldCupGraph();
// worldCup.renderGroupedBar();

// let maps = new Maps();
// maps.renderGroupedBar();

// let groupedBar = new GroupedBar();
// groupedBar.renderGroupedBar();

let reusable = new Reusable();
// reusable.renderGroupedBar();
// reusable.renderLines();
// reusable.renderArea();
reusable.renderAttribution();

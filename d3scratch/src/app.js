import Rectangle from './draw/rectangle'
import BarChart from './draw/bar'

let rectangle = new Rectangle();
rectangle.render();

let data = [4, 8, 15, 16, 27, 40];
let bar = new BarChart();
bar.render(data);

setInterval(() => {
    "use strict";
    data.push(Math.trunc(Math.random()*10));
    data[3] = Math.trunc(Math.random()*10);
    bar.update(data);
}, 3000);
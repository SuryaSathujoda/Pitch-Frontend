const a = document.getElementById('a');
const b = document.getElementById('b');
const c = document.getElementById('c');
const btn1 = document.getElementById('btn1');
const out1 = document.getElementById('output1');
const multiple = document.getElementById('multiple');

const X_MIN = -10;
const X_MAX = 10;
const STEPS = 50;

var traces = []
var overlay = multiple.checked;

function checkMultiple(){  
    overlay = multiple.checked;
}

function processData() {
    let x = [];
    let y = [];
    let inc = (X_MAX - X_MIN) / STEPS;

    let i = 0;
    while (i <= STEPS) {
        curr_x = X_MIN + i * inc;
        x.push(curr_x);
        y.push(+(a.value * curr_x ** 2) + +b.value * curr_x + +c.value);
        i += 1;
    }

    makePlotly(x, y);
}

function makePlotly(x, y) {
    if (!overlay) {
        traces = [];
    }
    traces.push(
        {
            x: x,
            y: y,
            name: a.value + ", " + b.value + ", " + c.value,
            line: {
                color: Math.floor(Math.random()*16777215).toString(16),
                width: 3
            }
        }
    );

    let layout = {
        title: "Quadratic Plot",
        yaxis: {
            //range: [-100, 100]
        },
        xaxis: {
            // tickformat: "%d/%m/%y"
        },
    };

    //https://plot.ly/javascript/configuration-options/
    let config = { 
        responsive: true,
        // staticPlot: true,
        // editable: true
    };
    
    Plotly.newPlot("plot", traces, layout, config);
}

btn1.addEventListener('click', processData);
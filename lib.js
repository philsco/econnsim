let POP = 1000;
let CURR = 500000;
let CYCLES = 100;

var population = [];

let state = {
    'pop': POP,
    'curr': CURR,
    'cycles': CYCLES,
    'curr_state': population
}

function initPop() {
    for (var x=0; x<POP; x++) {
        population[x] = CURR;
    }
}

function genDailyTrans () {
    let daily_trans = [];
    const num_trans = (Math.floor(Math.random() * POP));
    for (var x=0; x<num_trans; x++) {
        let cr = Math.floor(Math.random() * POP);
        let db = Math.floor(Math.random() * POP);
        let amt = Math.floor(Math.random() * population[db]);
        daily_trans.push([db, cr, amt]);
    }
    return daily_trans;
}

function runEconn(target) {
    for (var x=0; x<CYCLES; x++) {
        let update_pop = population;
        let transactions = genDailyTrans();
        for (var y=0; y<transactions.length; y++) {
            update_pop[y] = transactions[y][0] - transactions[y][2];
            update_pop[y] = transactions[y][1] + transactions[y][2];
        }
        population = update_pop;
        population.sort(function(a, b){return a-b});
        updateChart(target, population);
    }
}

function updateChart(chart, data) {
  chart.data.datasets[0].data = data;
  chart.update();
}

function initChart (pop) {
    const ctx = document.getElementById('chart').getContext('2d');
    let lbls = [];

    for (x=0; x<pop.length; x++) {
        lbls.push(String(x));
    }

    let barchart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: lbls,
            datasets: [{
            label: 'Net wealth',
            borderWidth: 1,
            data: pop
            }]
        
        },
        options: {
            scales: {
            y: {
                beginAtZero: true
            }
            }
        }
        });

    return barchart;
}

function start() {
    initPop();
    let chart = initChart(population);
    runEconn(chart);
}



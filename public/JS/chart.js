function create_chart() {

    let chart_exist = document.getElementById('div-chart');
    if (chart_exist !== null) {
        chart_exist.parentNode.removeChild(chart_exist);
    }

    let chart_label = document.createElement('h2');
    chart_label.id = "chart-label";
    chart_label.innerText = "Распределение значений Y по времени обработки";

    let div_chart = document.createElement('div');
    div_chart.id = "div-chart"
    div_chart.style.display = 'block';
    div_chart.style.textAlign = 'center';

    document.getElementById('content').appendChild(div_chart);
    div_chart.appendChild(chart_label);

    let canvas_chart = document.createElement('canvas');
    canvas_chart.id = "canvas-chart";

    div_chart.appendChild(canvas_chart);

    let temp_arr = [];

    for (let i = 0; i < rect_arr.length; i++) {
        let rect_class_temp = new rect_class(parseInt(rect_arr[i].time), null, null,
            null, null, rect_arr[i].YI);
        temp_arr.push(rect_class_temp);
    }

    temp_arr.sort((a,b) => a.time - b.time);

    const needed_obj = temp_arr.reduce((o, key) => ({ ...o, [key.time]: key.YI}), {});

    var chart_data = {
        labels: Object.keys(needed_obj),
        datasets: [
            {
                label: "Y",
                data: Object.values(needed_obj),
                borderColor: "#3e95cd",
                tension: 0.4
            }
        ]
    };

    var option = {
        scales: {
            y: {
                title: {
                    display: true,
                    text: 'Коэффициент Y'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Время, (с)'
                }
            }
        }
    }

    var line_chart = new Chart(canvas_chart.getContext('2d'), {
        type: 'line',
        data: chart_data,
        options: option
    });
}
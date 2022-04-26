function create_table() {
    let table_exist = document.getElementById('div-table');

    if (table_exist !== null) {
        table_exist.parentNode.removeChild(table_exist);
    }

    let table = document.createElement('table');
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');

    table.appendChild(thead);
    table.appendChild(tbody);

    table.className = "center";

    let div_table = document.createElement('div');
    div_table.className = "div-table";
    div_table.id = "div-table";
    document.getElementById('content').appendChild(div_table);

    div_table.appendChild(table);

    let rows = [];
    let headings = [];

    rows[0] = document.createElement('tr');
    headings[0] = document.createElement('th');
    headings[0].innerHTML = "Температура, °С";
    headings[1] = document.createElement('th');
    headings[1].innerHTML = "Время, с";
    headings[2] = document.createElement('th');
    headings[2].innerHTML = "L";
    headings[3] = document.createElement('th');
    headings[3].innerHTML = "a";
    headings[4] = document.createElement('th');
    headings[4].innerHTML = "b";
    headings[5] = document.createElement('th');
    headings[5].innerHTML = "Y";

    rows[0].appendChild(headings[0]);
    rows[0].appendChild(headings[1]);
    rows[0].appendChild(headings[2]);
    rows[0].appendChild(headings[3]);
    rows[0].appendChild(headings[4]);
    rows[0].appendChild(headings[5]);
    thead.appendChild(rows[0]);

    let j = 6;
    for (let i = 0; i < rect_arr.length; i++) {
        rows[i+1] = document.createElement('tr');
        j = j+6;
        headings[j] = document.createElement('th');
        headings[j].innerHTML = rect_arr[i].temp;
        headings[j+1] = document.createElement('th');
        headings[j+1].innerHTML = rect_arr[i].time;
        headings[j+2] = document.createElement('th');
        headings[j+2].innerHTML = rect_arr[i].LAB_L;
        headings[j+3] = document.createElement('th');
        headings[j+3].innerHTML = rect_arr[i].LAB_a;
        headings[j+4] = document.createElement('th');
        headings[j+4].innerHTML = rect_arr[i].LAB_b;
        headings[j+5] = document.createElement('th');
        headings[j+5].innerHTML = rect_arr[i].YI;

        rows[i+1].appendChild(headings[j]);
        rows[i+1].appendChild(headings[j+1]);
        rows[i+1].appendChild(headings[j+2]);
        rows[i+1].appendChild(headings[j+3]);
        rows[i+1].appendChild(headings[j+4]);
        rows[i+1].appendChild(headings[j+5]);
        thead.appendChild(rows[i+1]);
    }
}
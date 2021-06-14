var isX = false;
var size= 0;
var COUNT_CHECK_WIN= 5;

$(document).ready(function () {

    $('#btn-create').click(function () {
        size = $('#size').val();
        createTable();
    });

    $('body').on('click', '.btn-cell', function () {
        // console.log($(this).attr('id'));
        btnCell_click(this);
    });
});

// Tao bang kich thuoc i, j
function createTable() {
    var mainBoard = $('#boardgame tbody');

    var html = '';

    for (var i = 0; i < size; i++) {
        html += '<tr>';
        for (var j = 0; j < size; j++) {
            html += '<td>' + createCell(i, j) + '</td>'
        }
        html += '</tr>';
    }

    $(mainBoard).empty().append(html);
};


// Tao cac ô bằng button
function createCell(row, col) {

    var id = 'c-' + row + '-' + col;

    return '<button id="' + id + '" class="btn-cell"></button>';
}

// Xu ly click btnCell_click
function btnCell_click(cell) {
    if ($(cell).text().trim() == '') {
        var text = isX == true ? 'X' : 'O';
        var style= isX == true ? 'cell-x' :'cell-o';

        $(cell).removeClass('cell-x').removeClass('cell-o').addClass(style);

        isX = !isX;

        $(cell).text(text);

        checkWin(cell);
    }
}


function checkWin(cell) {
    var arr= $(cell).attr('id').split('-');
    var cRow= arr[1];
    var cCol= arr[2];
    var cText = $(cell).text();

    var row= 0;
    var col= 0;
    var countCheckWin=1;

    console.log('row =' + cRow + ' col =' + cCol);
    // kiểm tra dọc
    countCheckWin= 1;

    // kiem tra dọc trên
    col= cCol;
    row = cRow-1;

    while(row >= -1){
        var text= $('#c-' + row + '-' + col).text();
        if (!checkType(cText, text)) {
            break; 
        }
        countCheckWin++;
        row--;
    }

    if(checkCountWin(countCheckWin)){
        return;
    }

    // kiem tra dọc duoi
    col= cCol;
    row = cRow+1;

    while(row <size) {
        var text= $('#c-' + row + '-' + col).text();
        if (!checkType(cText, text)) {
            break; 
        }
        countCheckWin++;
        row++;
    }

    if(checkCountWin(countCheckWin)){
        return;
    }

    // check đường ngang
    countCheckWin =1;

    // check đường ngang trái

    col= cCol-1;
    row = cRow;

    while(col >= -1) {
        var text= $('#c-' + row + '-' + col).text();
        if (!checkType(cText, text)) {
            break; 
        }
        countCheckWin++;
        col--;
    }

    if(checkCountWin(countCheckWin)){
        return;
    }

    // check đường ngang phai

    col= cCol+1;
    row = cRow;

    while(col < size) {
        var text= $('#c-' + row + '-' + col).text();
        if (!checkType(cText, text)) {
            break; 
        }
        countCheckWin++;
        row++;
    }

    if(checkCountWin(countCheckWin)){
        return;
    }
}

function checkType(obj0, obj1) {
    return obj0.trim() == obj1.trim() ? true : false;
}

function checkCountWin(countCheckWin) {
    if(countCheckWin == COUNT_CHECK_WIN){
        $('.btn-cell').attr('disabled','disabled');

        // console.log('win');
        alert("win")
        return true;
    }
    return false;
}
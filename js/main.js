'use strict'
console.log('Touch Nums');

var gLevel = 4;
var gMat = createNumsMat();
var currNum = 0;
renderNums(gMat);

var gTime = 0;
var timeInterval;
var elSec = document.querySelector('#sec')
var elMilSec = document.querySelector('#ms')

function updateTime() {
    gTime+= 100;
    elSec.innerText = parseInt(gTime /1000)
    elMilSec.innerText = gTime % 1000;
}

function checkClick(el) {
    var clickedCount = document.querySelectorAll('.clicked').length+1;
    if (!gTime) {
        timeInterval = setInterval(updateTime, 100);
    }
    var elVal = +el.innerText
    if (elVal === currNum + 1) {
        el.classList.add('clicked');
        currNum++;
        if (clickedCount === Math.pow(gLevel,2)) clearInterval(timeInterval);
        
    }
}

function renderNums(nums) {
    var strHtml = '';
    for (var i = 0; i < gMat.length; i++) {
        strHtml += '<tr>'
        var row = gMat[i];
        for (var j = 0; j < gMat.length; j++) {
            var cell = row[j];
            strHtml += '<td class="numCell" onclick="checkClick(this)">' + cell + '</td>'
        }
        strHtml += '</tr>'
    }
    document.querySelector('tbody').innerHTML = strHtml;
}

function createNumsMat() {
    var mat = [];
    var nums = [];
    for (var i = 0; i < Math.pow(gLevel,2); i++) {
        nums.push(i + 1);
    }
    console.log(nums);
    nums = shuffleArr(nums);

    for (var i = 0; i < gLevel; i++) {
        mat.push([]);
        var row = mat[i];
        for (var j = 0; j < gLevel; j++) {
            row.push(nums.shift());
        }
    }
    return mat
}

function changeLevel(level) {
    gLevel = level;
    resetGame()
    
}
function resetGame () {
    gMat = createNumsMat();
    renderNums(gMat);
    var currNum = 0;
    renderNums(gMat);
    var gTime = 0;
}
function shuffleArr(arr) {
    var count = arr.length
    var temp;
    var index;

    // While there are elements in the array
    while (count > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * count);
        // Decrease ctr by 1
        count--;
        // And swap the last element with it
        temp = arr[count];
        arr[count] = arr[index];
        arr[index] = temp;
    }
    console.log(arr)

    return arr;

}
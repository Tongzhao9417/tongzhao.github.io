$(function () {
    $('#thanku,#1,#2,#3,#4,#5,#6,#7,#8,#9,#download').hide()
    setTimeout (function () {
        $('#thanku').show();
    },1000)
    setTimeout (function () {
        $('#1').show();
    },3000)
    setTimeout (function () {
        $('#2').show();
    },5000)
    setTimeout (function () {
        $('#3').show();
    },7000)
    setTimeout (function () {
        $('#4').show();
    },9000)
    setTimeout (function () {
        $('#5').effect('slide','right');
    },10000)
    setTimeout (function () {
        $('#6').show();
    },11000)
    setTimeout (function () {
        $('#7').show();
    },11000)
    setTimeout (function () {
        $('#8').show();
    },13000)


    var obj = {};
    function createObj(k,v) {
        obj[k] = v
        return obj;
    }
    $('.checkbox').click(function () {
        $('#download').show();
    })
    var time = new Date();
    var timestamp = Date.parse(time);
    var now = moment(timestamp).locale('zh-cn').format('LLL')
    function downloadData(data) {
        var blob = new Blob([JSON.stringify(data)],{ type:"text/plain;charset=utf-8"});
        saveAs(blob, now+'.txt');
    }
    for (var i = 0; i < sessionStorage.length; i++) {
        var key = sessionStorage.key(i)
        var value = sessionStorage.getItem(key)
        createObj(key,value)
    }
    // for (var o = 0; o< arr.length; o++){
    //     json[o] = arr[o]
    // }
    
    // console.log(JSON.stringify(obj))
    // var btn = document.getElementById('download')
    $('#download').click(function (e) { 
        downloadData(obj);
    });
});
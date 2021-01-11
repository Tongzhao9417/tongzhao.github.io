$(function () {
    var guestName1 = sessionStorage.getItem('guestName');
    var nameNum;
    function changeName(i) {
        if (i == '不懂'){
            nameNum = 1;
        } if (i == 'YI'){
            nameNum = 2;
        }if (i == '只爱学习') {
            nameNum = 3;
            
        }
        return nameNum;
    }


    var guestName = JSON.parse(sessionStorage.getItem(guestName1));

    $('.comment-send-btn').css('color','#9dc1f7')
    $('.solo-comment-detail').attr('placeholder','回复@'+guestName1+':');
    $('.comment-back').click(function () { 
        window.history.go(-1);
        
    });
    $('.solo-comment-detail').on('input', function () {
        var i = $(this).val();
        var len = i.length;
        if (len >=1) {
            $('.comment-send-btn').css('color','#1b9af4');
            // $('.comment-send-btn').toggleClass('comment-send-btn');
        } else {
            $('.comment-send-btn').css('color','#9dc1f7');
        }
    });

    $('.comment-send').mousedown(function () { 
        var context = $(this).parent().next().find('.solo-comment-detail').val();
        // sessionStorage.getItem(guestName);
        guestName.soloComment = context;
        // console.log(guestName)
        var data = JSON.stringify(guestName)
        // console.log(data)
        changeName(guestName1)
        sessionStorage.setItem(nameNum,data)
        // sessionStorage.setItem('data',data);
        sessionStorage.removeItem('guestName');
        sessionStorage.removeItem(guestName1);
        // console.log(sessionStorage)
        
        // soloArr[1] = context;
        // console.log(soloArr[1])
        // var flag = true
        // sessionStorage.setItem('data', soloArr);
        window.history.go(-1);
        // localStorage.setItem('flag',flag)
    });

});

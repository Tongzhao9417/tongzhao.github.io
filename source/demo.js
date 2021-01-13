$(function () {
    $('#finishing').hide();
    $('.like-area').hide();
    $('.forward-area').hide();

    var i = sessionStorage.getItem('name');
    var JSONObj = {};
    JSONObj.昵称 = i;
    var intDiff = parseInt(60); //倒计时总秒数量
    function timer(intDiff) {
        window.setInterval(function () {
            var minute = 0,
                second = 0; //时间默认值        
            if (intDiff > 0) {
                minute = Math.floor(intDiff / 60);
                second = Math.floor(intDiff) - (minute * 60);
            }
            if (minute <= 9) minute = '0' + minute;
            if (second <= 9) second = '0' + second;
            $('#minute_show').html('<s></s>' + minute + '分');
            $('#second_show').html('<s></s>' + second + '秒');
            intDiff--;
        }, 1000);
    }
    timer(intDiff);
    setTimeout (function (){
        $('#finishing').show()
    },1000)
    
    $('#finishing').click(function () { 
        sessionStorage.setItem('为评论点赞数量',countLikeNum())
        sessionStorage.setItem('为博主点赞数量',countHostLikeNum())
        var time = new Date();
        var timestamp = Date.parse(time);
        var now = moment(timestamp).locale('zh-cn').format('lll')
        JSONObj.为评论点赞数量 = countLikeNum();
        JSONObj.为博主点赞数量 = countHostLikeNum();
        JSONObj.为自己点赞数量 = countSelfLikeNum();
        JSONObj.评论内容 = sessionStorage.getItem('评论内容');
        JSONObj.完成时间 = now;
        var jsonStr = JSON.stringify(JSONObj)
        console.log(jsonStr)
        $.ajax({
            type: "post",
            url: "http://tongzhao.xyz/get.php",
            // url: "http://localhost/TryV6/get2.php",
            async:true,
            contentType:'application/json',
            data: jsonStr,
            dataType: "json",
            success: function (data) {
                console.log(data)
                if (data =='success') {
                    // $(window).attr('location','./finish.html')
                    // window.location.href="./finish.html" 
                }
            },
        });
        ;
    });
    function countLikeNum() {
        var p = $('.comment-area .lite-iconf-liked').length;
        return p;
    }
    function countHostLikeNum() {
        var q = $('.like-to-host .lite-iconf-liked').length;
        return q;
    }
    function countSelfLikeNum() {
        var z = $('.like-to-self .lite-iconf-liked').length;
        return z;
    }
    function showHitModal() {
        $('.mask').css('display', 'block')
        $('.modal-none').css('display', 'block')
    }
    function closeHitModal() {
        $('.mask').css('display', 'none')
        $('.modal-none').css('display', 'none')
    }
    function setComment() {
        var content = $('.comment-detail').val();
        sessionStorage.setItem('评论内容', content)
    }

    function showComment() {
        var text = sessionStorage.getItem('评论内容');
        $('.new-guest-name').text(i);
        $('.new-guest-comment').text(text);
        $('.new-comment').css('display', 'flex');
        $('.comment-detail').val('');
        $('#comment-num').text('4');
        $('.reply-btn').css('display', 'none');
    }
    var commentContent = sessionStorage.getItem('评论内容');
    // console.log(getData());
    if (commentContent != null) {
        showComment();
    }



    $('.ini').remove();
    $('.comment-frame,.reply-box').hide();
    setTimeout(function () {
        $('.comment-frame').show();
    }, 0)


    setTimeout(function () {
        $('.reply-box').show();
    }, 0)



    $('.reply-btn').css('display', 'none');
    $('.reply').css('opacity', '0');

    $('.comment-detail').focus(function () {
        $('.reply-btn').css('display', 'flex');
        // $('.reply').css('background-color', '#a4ccf6');
        $('.reply').animate({
            opacity: '1',
            speed: '0.5s'
        });
    });

    $('.like-num').click(function () {
        $('.comment-area').hide();
        $('.forward-area').hide();
        $('.like-area').show();
    })

    $('.forward-num').click(function () {
        $('.comment-area').hide();
        $('.like-area').hide();
        $('.forward-area').show();
    })

    $('.comment-num').click(function () {
        $('.comment-area').show();
        $('.like-area').hide();
        $('.forward-area').hide();
    })


    $('.comment-detail').on('input', function () {
        var i = $(this).val();
        var len = i.length;
        if (len >= 1) {
            $('.reply').attr('disable', false);
            $('.reply').css('background-color', '#1b9af4');
        } else {
            $('.reply').attr('disable', true);
            $('.reply').css('background-color', '#a4ccf6');
        }
    });
    $('.reply').mousedown(function () {
        setComment();
        showComment()
    });

    $('.comment-detail').blur(function () {
        $('.reply-btn').css('display', 'none');
    });

    $(".like-btn").click(function () {
        var name = $(this).find('#like').prop('className');
        var likednum = parseInt($(this).find('.liked-num').text());
        if (name == 'lite-iconf lite-iconf-like') {
            likednum += 1;
            $($(this).find('#like')).removeClass('lite-iconf lite-iconf-like').addClass('lite-iconf lite-iconf-liked');
            $(this).find('.liked-num').text(likednum).css('color', 'red');
        }
        if (name == 'lite-iconf lite-iconf-liked') {
            likednum -= 1;
            $($(this).find('#like')).removeClass('lite-iconf lite-iconf-liked').addClass('lite-iconf lite-iconf-like');
            $(this).find('.liked-num').text(likednum).css('color', '#888888');
        }
    });
    $(".like-to-host").click(function () {
        var name = $(this).find('#like').prop('className');
        var likednum = parseInt($(this).find('.liked-num').text());
        if (name == 'lite-iconf lite-iconf-like') {
            likednum += 1;
            $($(this).find('#like')).removeClass('lite-iconf lite-iconf-like').addClass('lite-iconf lite-iconf-liked');
            $(this).find('.liked-num').text(likednum).css('color', 'red');
        }
        if (name == 'lite-iconf lite-iconf-liked') {
            likednum -= 1;
            $($(this).find('#like')).removeClass('lite-iconf lite-iconf-liked').addClass('lite-iconf lite-iconf-like');
            $(this).find('.liked-num').text(likednum).css('color', '#888888');
        }
    });
    $(".like-to-self").click(function () {
        var name = $(this).find('#like').prop('className');
        var likednum = parseInt($(this).find('.liked-num').text());
        if (name == 'lite-iconf lite-iconf-like') {
            likednum += 1;
            $($(this).find('#like')).removeClass('lite-iconf lite-iconf-like').addClass('lite-iconf lite-iconf-liked');
            $(this).find('.liked-num').text(likednum).css('color', 'red');
        }
        if (name == 'lite-iconf lite-iconf-liked') {
            likednum -= 1;
            $($(this).find('#like')).removeClass('lite-iconf lite-iconf-liked').addClass('lite-iconf lite-iconf-like');
            $(this).find('.liked-num').text(likednum).css('color', '#888888');
        }
    });
    $('.back').unbind('click').click(function () { 
        showHitModal()
    });
    $('.more').unbind('click').click(function () { 
        showHitModal()
    });
    $('.modal-close-btn').unbind('click').click(function () { 
        closeHitModal()   
    });
    $('.modal-header-close').unbind('click').click(function () { 
        closeHitModal()   
    });

    $('.comment-btn').click(function () {
        var name = sessionStorage.getItem('name')
        // var guestName = '';
        var guestName = $(this).parent().parent().parent().find('.guest-name').text();
        showModal()
        showComment()



        function showModal() {
            $('.modal-content-text').val('');
            $('.mask').css('display', 'block')
            $('.modal').css('display', 'block')
            $('.modal-content-text').attr('placeholder', '回复@' + guestName)
        }


        function showComment(c) {
            // event.stopPropagation()
            // $(event.target).parents().children(2).removeAttr('style', 'display');
            $(event.target).parent().parent().parent().parent().children('.guest-comment-reply-box').attr("class", 'guest-comment-reply-boxing')
            // console.log(event.target)

        }

        function hideComment() {
            $('[class=guest-comment-reply-boxing').attr('class', 'guest-comment-reply-box')
        }

        function closeModal() {
            $('.mask').css('display', 'none')
            $('.modal').css('display', 'none')
        }
        $('.modal-content-text').on('input', function () {
            var i = $(this).val();
            var o = i.length;
            if (o >= 1) {
                $('.modal-send-btn').removeAttr('disabled')
                $('.modal-send-btn').css('background', '#1b9af4')
            } else {
                $('.modal-send-btn').attr('disabled', 'disabled')
                $('.modal-send-btn').css('background', '#a4ccf6')
            }
        })
        $('.modal-header-close').unbind('click').click(function () {
            closeModal()
            $('.modal-content-text').val('');
            hideComment()
        })
        $('.modal-send-btn').unbind('click').click(function () {
            var a = $('.modal-content-text').val();
            $('[class=guest-comment-reply-boxing]').children().children('div.ps-content').text(a)
            $('[class=guest-comment-reply-boxing]').children().children('div.ps-name').text(name)
            $('[class=guest-comment-reply-boxing]').attr('class', 'guest-comment-reply-boxed')
            // event.stopPropagation();
            // console.log(guestName)
            sessionStorage.setItem(guestName,a)
            JSONObj[guestName] = a;

            closeModal()
        })







        // var soloObj = {
        //     guestName: guestName,
        //     soloComment: ''
        // }
        // var data = JSON.stringify(soloObj)
        // sessionStorage.setItem(guestName, data)
        // sessionStorage.setItem('guestName', guestName);
        // window.location.href = './comment.html';
        // $(this).parents().children(2).removeAttr('style', 'display');
        // $(this).parent().parent().prev().children(0).find('.ps-name').text(name);
    });





});
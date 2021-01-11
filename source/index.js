$(function () {
    $('.btn-primary').css('visibility', 'hidden');
    $('#modal-nickname').on('input', function () {
        var i = $(this).val();
        var len = i.length;
        if (len >= 1) {
            $('.btn-primary').css('visibility', 'visible')
        } else {
            $('.btn-primary').css('visibility', 'hidden')
        }
    });

    $('.btn-primary').click(function getName() {
        var i = $('#modal-nickname').val()
        // var soloObj = {
        //     guestName:i,
        // }
        // var data = JSON.stringify(soloObj)
        // sessionStorage.setItem(i,data)
        sessionStorage.setItem('name', i)
    });
});
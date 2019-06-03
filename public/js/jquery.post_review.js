$(function () {

    var post_id = getparameter("post_id");

    function getparameter(paramName) {
        // 리턴값을 위한 변수 선언 
        var returnValue;
        // 현재 URL 가져오기 
        var url = location.href;
        // get 파라미터 값을 가져올 수 있는 ? 를 기점으로 slice 한 후 split 으로 나눔 
        var parameters = (url.slice(url.indexOf('?') + 1, url.length)).split('&');
        // 나누어진 값의 비교를 통해 paramName 으로 요청된 데이터의 값만 return 
        for (var i = 0; i < parameters.length; i++) {
            var varName = parameters[i].split('=')[0];
            if (varName.toUpperCase() == paramName.toUpperCase()) {
                returnValue = parameters[i].split('=')[1];
                return decodeURIComponent(returnValue);
            }
        }
    }

    $.get("/post_review?post_id="+post_id, function (data) {
  
      $.each(data, function () {
        //$('#test_td').html(this.sheet_id);
        $('#cmt_main > ul:last').append(
          '<li><div class="cmtOne"><strong class="title"><span class="nickname">'
          + this.user_id + '</span><br>'
          + '<span class="date">' + this.review_date + '</span></strong>'
          + '<div class="comment"><span class="content">'
          + this.review_description + '</span></div></li>'
          );
      });
    });


    $("#cmtSubmitBtn").click(function(){
        var textarea = document.getElementById('#cmtComment');    
        $.post("review_write", { post_id: post_id , COMMENT: $('#cmtComment').val() })
        .done(function( data ) {
            if(data=="Success"){
                var url = "post_view?post_id="+post_id;
                $(location).attr("href", url);
            }
            else{
                alert("댓글 등록 실패!!");
            }
      });
      
    });

});
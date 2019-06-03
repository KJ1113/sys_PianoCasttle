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


  $.get("/postView?post_id="+post_id, function (data) {
    $.each(data, function () {
      //$('#test_td').html(this.sheet_id);
      $('#communityView_tbody > tbody:last').append(
        '<tr >' + '<td style="width: 20%;">글 제목</td><td colspan="2">'
        + this.post_name + '</td></tr><tr><td>작성자</td><td colspan="2">'
        + this.user_id + '</td></tr><tr><td>작성일자</td><td colspan="2">'
        + this.post_date  + '</td></tr><tr><td>내용</td><td colspan="2" style="min-height: 200px; text-align: left;">'
        + this.post_data + '</td></tr>');
    });
  });
});
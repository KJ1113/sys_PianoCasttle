$(function() {
    $.get("/scorelist", function(data) {
        for(var i = 0 ; i < 5 ; i++)
        {
          $('#ScoreList > tbody:last').append('<tr><td>'+ (i+1)+' .' +'</td><td>' + data[i] + '</td></tr>');
        }
    });

    $.get("/sort_scoreList", function(data) {
      var number =1 ;
      $.each(data, function() {
        //$('#test_td').html(this.sheet_id);
        $('#other_likes_sheet > tbody:last').append(
          '<tr >'+'<td class = "clickable">'
        + (number++) +'</td><td class = "clickable">' 
        + this.sheet_name + '</td><td class = "clickable">' 
        + this.user_id + '</td><td>'
        + '</tr>');
      });
    });
});

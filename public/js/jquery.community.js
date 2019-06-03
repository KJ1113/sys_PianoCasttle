$(function () {

  $.get("/postMain", function (data) {
    var index = data.length;

    $.each(data, function () {
      //$('#test_td').html(this.sheet_id);
      $('#communityList_tbody > tbody:last').append(
        '<tr >' + '<td id="post_id">'
        + index-- + '</td><td>'
        + this.post_name + '</td><td>'
        + this.user_id  + '</td><td>'
        + this.post_date + '</td><td>'
        + this.post_id + '</td><td>'
        + '</tr>');
    });
  });

  $("#communityList_tbody tr" ).live( "mouseover", function() { 
    $( this ).css( "background-color", "#f4f4f4" ); 
    $( this).children("td").css( "cursor", "pointer" ); 
  });

  $("#communityList_tbody tr" ).live( "mouseleave", function() { 
    $( this ).css( "background-color", "white" );
  });

  $("#communityList_tbody tr").live( "click", function() {
    var postID = $(this).children().eq(4).text();
    var url = "post_view?post_id="+postID;
    $(location).attr("href", url);
  });
});
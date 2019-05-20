
$(function() {

  $("#mypost tr" ).on( "mouseover", function() { 
    $( this ).css( "background-color", "#f4f4f4" ); 
    $( this).children("td").css( "cursor", "pointer" ); 
  }); 

  $("#mypost tr" ).on( "mouseleave", function() { 
    $( this ).css( "background-color", "white" );
  });

  $.get("/present-user", function(data) {
    $.each(data, function() {
      $('#inform_title').html( this.user_name +"("+ this.user_id+ ")");
      $('#user_id').html(this.user_id);
      $('#user_name').html(this.user_name);
      $('#user_mail').html(this.user_id + "@naver.com");
      $('#user_birth').html(this.user_birth);
    });
  });

  $.get("/user_scoreList", function(data) {
    $.each(data, function() {
      //$('#test_td').html(this.sheet_id);
      $('#myScoreList_tbody > tbody:last').append(
        '<tr >'+'<td class = "clickable">'
      + this.sheet_id +'</td><td class = "clickable">' 
      + this.sheet_name + '</td><td class = "clickable">' 
      + "2019-05-19" + '</td><td>'
      + '<input type="checkbox" name="score_CheckBox" ></td></tr>');
    });
  });

  
  $("#myScoreList_tbody tr" ).live( "mouseover", function() { 
    $( this ).css( "background-color", "#f4f4f4" ); 
    $( this).children("td").css( "cursor", "pointer" ); 
  }); 

  $("#myScoreList_tbody tr" ).live( "mouseleave", function() { 
    $( this ).css( "background-color", "white" );
  });

  $("#myScoreList_tbody tr").live( "click", function() {
    var userID = $("#user_id").text();
    var sheet_name = $(this).children().eq(1).text();
    var url = "practice-music?sheet="+userID+"_"+sheet_name;

    $(location).attr("href", url);
  });
});
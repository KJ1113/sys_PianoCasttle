
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

  $.get("/user-scoreList", function(data) {
    $.each(data, function() {
      //$('#test_td').html(this.sheet_id);
      $('#myScoreList > tbody:last').append(
        '<tr><td>'
        + this.sheet_name + '</td><td>' 
        + this.insert_time + '</td></tr>');
    });
  });

  $.get("/user-postList", function(data) {
    $.each(data, function() {
      //$('#test_td').html(this.sheet_id);
      $('#mypostList > tbody:last').append(
        '<tr><td>'
        + this.post_id + '</td><td>' 
        + this.post_name + '</td><td>' 
        + this.post_date + '</td></tr>');
    });
  });

  $("#mypostList tr" ).live( "mouseover", function() { 
    $( this ).css( "background-color", "#f4f4f4" ); 
    $( this).children("td").css( "cursor", "pointer" ); 
  });

  $("#mypostList tr" ).live( "mouseleave", function() { 
    $( this ).css( "background-color", "white" );
  });

  $("#mypostList tr").live( "click", function() {
    var post_id = $(this).children().eq(0).text();
    var url = "post_view?post_id="+post_id;

    $(location).attr("href", url);
  });

  
  $("#myScoreList tr" ).live( "mouseover", function() { 
    $( this ).css( "background-color", "#f4f4f4" ); 
    $( this).children("td").css( "cursor", "pointer" ); 
  });

  $("#myScoreList tr" ).live( "mouseleave", function() { 
    $( this ).css( "background-color", "white" );
  });

  $("#myScoreList tr").live( "click", function() {
    var userID = $("#user_id").text();
    var sheet_name = $(this).children().eq(0).text();
    var url = "practice-music?sheet="+userID+"_"+sheet_name;

    $(location).attr("href", url);
  });
});
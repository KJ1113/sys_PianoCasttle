$(function() {
    $.get("/scorelist", function(data) {
        for(var i = 0 ; i < 5 ; i++)
        {
          $('#ScoreList > tbody:last').append('<tr><td>'+ (i+1) +'</td><td>' + data[i] + '</td></tr>');
        }
    });
    /*
    $("#other_inputScore tr").click( function(){
      alert("하하하 기재야 뭐하누");
    });

    $("#other_inputScore tr" ).on( "mouseover", function() { 
      $( this ).css( "background-color", "#f4f4f4" ); 
      $( this).children("td").css( "cursor", "pointer" ); 
    }); 
  
    $("#other_inputScore tr" ).on( "mouseleave", function() { 
      $( this ).css( "background-color", "white" );
    });


    $("#ScoreList tr").click( function(){
      alert("하하하 기재야 뭐하누");
    });

    $("#ScoreList tr" ).on( "mouseover", function() { 
      $( this ).css( "background-color", "#f4f4f4" ); 
      $( this).children("td").css( "cursor", "pointer" ); 
    }); 
  
    $("#ScoreList tr" ).on( "mouseleave", function() { 
      $( this ).css( "background-color", "white" );
    });
    */
});

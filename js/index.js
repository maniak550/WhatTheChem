
$(document).ready(function(){
    $("#search").focus(function() {
      $(".search-box").addClass("border-searching");
      $(".search-icon").addClass("si-rotate");
    });
    $("#search").blur(function() {
      $(".search-box").removeClass("border-searching");
      $(".search-icon").removeClass("si-rotate");
    });
    $("#search").keyup(function() {
        if($(this).val().length > 0) {
          $(".go-icon").addClass("go-in");
        }
        else {
          $(".go-icon").removeClass("go-in");
        }
    });

    $(".go-icon").click(function(){
      removeDiv();
    });
    $(".se-pre-con").hide();
    $("#search").keypress(function(event){
      $("#search").focus;
      if(event.which==13){
        event.preventDefault();
        removeDiv();
        
      }
    })
});
function hideKeyboard() { document.activeElement.blur();
	$("input").blur();
};


function removeDiv()
  {
  
  hideKeyboard();
  let checkFill=false;
  if (checkFill=true)
  {
    $("div.results").remove();
    $('main').css("height","100%");
    $(".se-pre-con").show();
    
      
    dataFetch();
  }
  else{dataFetch();
    $(".se-pre-con").show();};
}
//<input type="text" placeholder="Search" id="search" autocomplete="off">

//let url = 'https://api.wolframalpha.com/v2/query?appid=65EKRV-94YKPAKXQX&input=';
//let result2 = $("#search").val();
//let endOfTheLine = '&output=json'

function dataFetch() {
      let proxyUrl = "https://cors-anywhere.herokuapp.com/"
      let url = 'https://api.wolframalpha.com/v2/query?appid=65EKRV-94YKPAKXQX&input=';
      let result2 = $("#search").val();
      let endOfTheLine = '&output=json';
      
fetch(proxyUrl+url+result2+endOfTheLine,
  {
    method: "GET",
    mode: 'cors',  
    headers: {
    
    }
  }
  
)
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    
 
    data=(JSON.parse(JSON.stringify(myJson)));

    console.log(data.queryresult);
   
    // document.getElementById('results').innerHTML=`
    // <h1 class="app-config">Results:(${data.queryresult.numpods})</h1>
    // `
  $(document).ready(function(){
    $(".se-pre-con").fadeOut();
    let out='';
     out+='<hr width="75%">';
    for(i=0;i<data.queryresult.numpods;i++)
    {
      out+='<div class="results" id="div'+(i)+'">';
      out+='<h2>'+data.queryresult.pods[i].title+'</h2>'
      out+='<p>'+'<img src='+data.queryresult.pods[i].subpods[0].img.src+' '+ 'class="center"'+'>'+'</p>';
      out+='</div>'
    };
   
    $(out).appendTo('.test')
    
    // $(function() {
    //   $('.results').slideDown(300).delay(900).fadeIn(400);
    //   console.log('dziala');

    // });  
  
    $('main').removeClass("height");
    $('main').addClass("height");
    $('main').css("height","auto");
    let checkFill=true;


  })
    
    
   

  })
}

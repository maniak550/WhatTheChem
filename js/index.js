
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
      let checkFill=false;
      if (checkFill=true)
      {
        $("div.results").remove();
        $('main').css("height","100%");
        test();
      }
      else{test()};
      
      //$(".search-form").submit()
    });
    
});
//<input type="text" placeholder="Search" id="search" autocomplete="off">

//let url = 'http://api.wolframalpha.com/v2/query?appid=65EKRV-94YKPAKXQX&input=';
//let result2 = $("#search").val();
//let endOfTheLine = '&output=json'

function test() {
      let url = 'http://api.wolframalpha.com/v2/query?appid=65EKRV-94YKPAKXQX&input=';
      let result2 = $("#search").val();
      let endOfTheLine = '&output=json';
fetch(url+result2+endOfTheLine,
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
    //document.getElementById('results').innerHTML=JSON.stringify(myJson);
 
    data=(JSON.parse(JSON.stringify(myJson)));

    console.log(data.queryresult);
   

    
    
    document.getElementById('results').innerHTML=`
    <h1 class="app-config">Results:(${data.queryresult.numpods})</h1>
    `
    /*$(document).ready(function(){
      var divsToAppend="";
      for(i=0;i<data.queryresult.numpods;i++)
        {

          divsToAppend+='<div id="div'+(i)+'">+$(data.queryresult.pods.+(i)+</div>';
          //divsToAppend+='<div id="div'+(i)+'">Title of div: ${data.queryresult.pods.i}</div>';
        }
      $('body').append(divsToAppend);
    });*/
  $(document).ready(function(){
    
    let out='';
    for(i=0;i<data.queryresult.numpods;i++)
    {
      out+='<div class="results" id="div'+(i)+'">';
      out+='<h2>'+data.queryresult.pods[i].title+'</h2>'
      out+='<p>'+'<img src='+data.queryresult.pods[i].subpods[0].img.src+' '+ 'class="center"'+'>'+'</p>';
      out+='</div>'
    }
    
    $('main').append(out);
    $('main').removeClass("height");
    $('main').addClass("height");
    $('main').css("height","auto");
    let checkFill=true;

  })
    
    
   

  })
}
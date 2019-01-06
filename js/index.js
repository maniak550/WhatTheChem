let checkFill = false;
$(document).ready(function () {
  $("#search").focus(function () {
    $(".search-box").addClass("border-searching");
    $(".search-icon").addClass("si-rotate");
  });
  $("#search").blur(function () {
    $(".search-box").removeClass("border-searching");
    $(".search-icon").removeClass("si-rotate");
  });
  $("#search").keyup(function () {
    if ($(this).val().length > 0) {
      $(".go-icon").addClass("go-in");
    } else {
      $(".go-icon").removeClass("go-in");
    }
  });
  $("#helper p").delay(3000).animate({"opacity": "1"}, 1400);
  $("#sources a").delay(3000).animate({"opacity": "0.7"}, 1400);
  $('main').css("height", "auto");
  $(".go-icon").click(function () {
    removeDiv();
  });
  $(".se-pre-con").hide();

  $("#search").keypress(function (event) {
    $("#search").focus;
    if (event.which == 13) {
      event.preventDefault();
      removeDiv();

    }
  })
});

function hideKeyboard() {
  document.activeElement.blur();
  $("input").blur();
};


function removeDiv() {

  hideKeyboard();
$('#helper').empty();
  if (checkFill = true) {

    $("div.results").remove();
    $("#error").empty();
    $('main').css("height", "100%");
    $(".se-pre-con").show();
    $("hr:last").remove();
    dataFetch();
  } else {
    dataFetch();
    $("#error").empty();
    $(".se-pre-con").show();
  };
}

function mainManipulator()
{
  //$('main').removeClass("height");
  //$('main').addClass("height");
  $('main').css("height", "auto");
};

function displayError() {
  $(".se-pre-con").fadeOut();
  error = `

  <div class="error-container">
  <hr width="75%">
    <h1>oh no...</h1>
    <p>Certain we are that,</p>
    <p>this query valid is not </p>
    <p>Try again with something more chem!</p>
    <p>Any chemical element or compound will do nicely! </p>
  </div>
`
  $(error).appendTo('.error');
  mainManipulator();

  checkFill = false;

}

function displayResults() {
  $(document).ready(function () {
    $(".se-pre-con").fadeOut();
    let out = '';
    out += '<hr width="75%">';
    for (i = 0; i < data.queryresult.numpods; i++) {
      out += '<div class="results" id="div' + (i) + '">';
      out += '<h2>' + data.queryresult.pods[i].title + '</h2>'
      out += '<p>' + '<img src=' + data.queryresult.pods[i].subpods[0].img.src + ' ' + 'class="center"' + '>' + '</p>';
      out += '</div>'
    };

    $(out).appendTo('.test');
    mainManipulator();
    checkFill = true;


  })

}


function dataFetch() {
  let proxyUrl = "https://cors-anywhere.herokuapp.com/"
  let url = 'https://api.wolframalpha.com/v2/query?appid=65EKRV-94YKPAKXQX&input=';

  let result2 = $("#search").val();
  let endOfTheLine = '&output=json';

  fetch(proxyUrl + url + result2 + endOfTheLine, {
        method: "GET",
        mode: 'cors',
        headers: {

        }
      }

    )
    .then(function (response) {
      return response.json();
    })
    .then(function (myJson) {
      data = (JSON.parse(JSON.stringify(myJson)));

      console.log(data.queryresult);


      if (data.queryresult.success == false||!data.queryresult.datatypes.includes("Chemical")){
        displayError();
      };

      if (data.queryresult.success == true&&data.queryresult.datatypes.includes("Chemical")) {
        displayResults();
      };
    })
}
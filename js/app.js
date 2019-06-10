'use strict'


// start up everything
$(startApp);

// global variables
const keywords = []
let template;


// on page load
function startApp() {
  // start by showing page 1
  showPage(1);
  attachSelectListeners();
}

// show page and get data from correct json file
function showPage(pageNum){

  const success = horns => displayPage(horns);

  const failure = error => console.error(error);

  $.get(`data/page-${pageNum}.json`, 'json')
    .then(success)
    .catch(failure);
}


//function to display page
function displayPage(horns) {
  displaySelectedKeyword(horns);
  template = Handlebars.compile($('#horn-template').html());
  const render = template({ horns: horns });
  $('#dataSection').html(render);

  pageClickListeners();
}

// page number click listener
function pageClickListeners(){
  $('div li').on('click', event => {
    const pageNum = $(event.target).data('page');
    showPage(pageNum);
  });
}


function displaySelectedKeyword(horns) {
  horns.forEach(horn => {
    if (!keywords.includes(horn.keyword)) {
      keywords.push(horn.keyword)
    }

  })

  keywords.forEach((element) => {
    const $newKeyword = $('#key-word').clone();
    $newKeyword.text(element);
    $newKeyword.val(element);
    $newKeyword.removeAttr('#key-word');
    $('select').append($newKeyword);

  })


}

function attachSelectListeners() {
  $('select').on('change', event => {
    const $selector = $(event.target);
    const type = $selector.val();
    $('section').hide();
    $(`.${type}`).show();

    console.log(type);

  });
}

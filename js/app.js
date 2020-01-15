'use strict'

$(startApp);

function startApp() {
  showPage(1);
  attachSelectListeners();
}

function showPage(pageNum){
  const success = horns => displayPage(horns);
  const failure = error => console.error(error);
  $.get(`data/page-${pageNum}.json`, 'json')
    .then(success)
    .catch(failure);
}

function displayPage(horns) {
  displaySelectedKeyword(horns);
  const template = Handlebars.compile($('#horn-template').html());
  const render = template({ horn: horns });
  $('#data-section').html(render);
  pageClickListeners();
}

function pageClickListeners(){
  $('div li').on('click', event => {
    const pageNum = $(event.target).data('page');
    showPage(pageNum);
  });
}

function displaySelectedKeyword(horns) {
  const keywords = []
  horns.forEach(horn => {
    if (!keywords.includes(horn.keyword)) {
      keywords.push(horn.keyword)
    }
  })
  const keywordElements = [];
  const render = Handlebars.compile($('#keyword-template').html());
  keywords.forEach(keywordVal => {
    console.log(render({keyword: keywordVal}))
    console.log({keyword: keywordVal})
    keywordElements.push(render({keyword: keywordVal}));
  })
  
  $('.new-keywords').remove();
  $('#keyword-section').append(keywordElements);
}

function attachSelectListeners() {
  $('select').on('change', event => {
    const $selector = $(event.target);
    const type = $selector.val();
    $('section').hide();
    $(`.${type}`).show();
  });
}

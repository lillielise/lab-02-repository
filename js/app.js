'use strict'

// start up everything
$(startApp)
const keywords = [];


// on page load
function startApp(){
  showPage(1);
  template = Handlebars.compile($('horn-template').html());
  hideOrShow();
  

}

function showPage(pageNum){

  const success = horns => displayHorns(horns);

  const failure = error => console.error(error);

  $.get(`data/page-${pageNum}.json`, 'json')
    .then(success)
    .catch(failure);
}


function displayHorns(horns){
  // const template = $('#horn-template').html();
  // const render = Handlebars.compile(template);

  displayKeywords(horns);
  const render = template({ horns: horns });
  $('#dataSection').html(render);

  pageListeners();

}

// // populate the horns on the page
// function displayHorns(horns){

//   // Clearing any old content before loading the new content with a .not() and .remove()

//   $('section').not('#photo-template').remove();
//   //method on the array
//   horns.forEach(horn => {
//     //assign clone to id
//     const $newHorn = $('#photo-template').clone();
//     //find h2 and assign horn.title to text
//     $newHorn.find('h2').text(horn.title);
//     $newHorn.find('img').attr('src', horn.image_url);
//     $newHorn.find('img').attr('alt', horn.description);
//     $newHorn.find('img').attr('title', horn.title)
//     $newHorn.attr('class', horn.keyword);
//     $newHorn.find('p').text(`Horns: ${horn.horns}`);
//     //remove attribute
//     $newHorn.removeAttr('#photo-template');
//     $('main').append($newHorn);

//   });
//   displayKeywords(horns);
// }


// populate the keywords

function displayKeywords(horns) {

  horns.forEach(horn => {
    if (!keywords.includes(horn.keyword)){
      keywords.push(horn.keyword)
    }
  });

  keywords.forEach(keyword => {
    const $newKeyword = $('#keyword-template').clone();
    $newKeyword.text(keyword);
    $newKeyword.val(keyword);
    $newKeyword.removeAttr('#keyword-template');
    $('select').append($newKeyword)


  });

}

// select event listener
function pageListeners(){
  
  $('div li').on('click', event => {
    const pageNum = $(event.target).data('page');
    showPage(pageNum);
    console.log('you clicked', pageNum);
  });
}



function hideOrShow(){
  $('select').on('change', event => {
    const $selector = $(event.target);
    const type = $selector.val();
    $('section').hide();
    $(`.${type}`).show();

    console.log(type);

  })
}



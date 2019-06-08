'use strict'

// start up everything
$(startApp)
const keywords = [];

// on page load
function startApp(){
  showPage(1);
  displayKeywords();
  addEventListeners();
}


// populate the horns on the page
function displayHorns(horns){
  //method on the array
  horns.forEach(horn => {
    //assign clone to id
    const $newHorn = $('#photo-template').clone();
    //find h2 and assign horn.title to text
    $newHorn.find('h2').text(horn.title);
    $newHorn.find('img').attr('src', horn.image_url);
    $newHorn.find('img').attr('alt', horn.description);
    $newHorn.find('img').attr('title', horn.title)
    $newHorn.attr('class', horn.keyword);
    $newHorn.find('p').text(`Horns: ${horn.horns}`);
    //remove attribute
    $newHorn.removeAttr('#photo-template');
    $('main').append($newHorn);

  });
}


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
    $newKeyword.removeAttr('#keyword-template');
    $('select').append($newKeyword)


  })

}

// select event listener
function addEventListeners(){
  $('div li').on('change', event => {
    const pageNum = $(event.target).data('page')
  });
}


function hideOrShow(){
  var input = 'markhor';

$('#photo-template').hide();
$(`.${input}`).show();


  }

  //  $('.rhino').hide();
  //  $('.unicorn').hide();
  // $(toHide).show();
}
'use strict'

// start up everything
$(startApp)

// on page load
function startApp(){
  loadData();
}

// load the horm data from json file
function loadData(){

  const success = horns => {
    displayHorns(horns);
    displayKeywords(horns);

  }

  $.get('data/page-1.json', 'json').then(success);


  console.log('you got the data!!')

  //call the horn display function


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
    $newHorn.find('p').text(`Horns: ${horn.horns}`);
    //remove attribute
    $newHorn.removeAttr('#photo-template');
    $('main').append($newHorn);

  });
}


// populate the keywords

function displayKeywords(horns) {
  const keywords = [];
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
    console.log('this is the keyword', keywords)
  })

}

// select event listener


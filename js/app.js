'use strict';

function Image(item) {
  this.image_url = item.image_url;
  this.title = item.title;
  this.description = item.description;
  this.keyword = item.keyword;
  this.horns = item.horns;
}

let allImages = [];

Image.prototype.render = function () {
  let template = Handlebars.compile($('#photo-template').html());
  return template(this);
};

const readJson = (pageNum) => {

  $('main').empty();
  allImages = [];

  $.ajax(`../data/page-${pageNum}.json`, {mehod: 'GET', dataType: 'JSON'})
    .then(data => {
      data.forEach(item => {
        allImages.push(new Image(item));
      });

      allImages.forEach(image => {
        $('main').append(image.render());
      });

    })
    .then(populateFilter)
    .then(handleFilter);
};

const populateFilter = () => {
  let filterKeywords = [];

  $('option').not(':first').remove();

  allImages.forEach(image => {
    if (!filterKeywords.includes(image.keyword)) filterKeywords.push(image.keyword);
  });

  filterKeywords.sort();

  filterKeywords.forEach(keyword => {
    let optionTag = `<option value="${keyword}">${keyword}</option>`;
    $('select').append(optionTag);
  });
};

const handleFilter = () => {
  $('select').on('change', function() {
    const type = $( "select option:checked" ).val();
    console.log(type);
    if (type === 'default') {
      $('div').show();
    } else {
      $('div').hide();
      $(`.${type}`).show();
    }
  });
}

const pageListeners = function() {
  $('li').on('click', event => {
    const pageNum = $(event.target).val();
    if(parseInt(pageNum) === 1) {
      readJson(1)
    } else {
      readJson(2);
    }
  })
}

const sortListener = function() {
  $('input').on('change', function() {
    const inputValue = $(this).attr('id');
    handleSort(allImages, inputValue);

    $('main').empty();

    allImages.forEach(image => {
      $('main').append(image.render());
    });
  })
}

const handleSort = function(array, property) {
  array.sort((a, b) => {
    let firstComparison = a[property];
    let secondComparison = b[property];
    return (firstComparison > secondComparison) ? 1 : (firstComparison < secondComparison) ? -1 : 0;
  })
}

const loadPage = function() {
  readJson(1);
  pageListeners();
  sortListener();
}

$(() => loadPage());

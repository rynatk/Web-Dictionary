$(document).ready(function () {
  // const API_ROOT = 'http://192.168.128.111:3000';
  const API_ROOT = 'http://word-dict.herokuapp.com';



  var appendDefinition = function (entry) {
    var definition = $(
      "<a href='#' class='list-group-item'>" +
      "<h4 class='list-group-item-heading'>" + entry.word + "</h4>" +
      "<p class='list-group-item-text'>" + entry.definition + "</p></a>"
    );
    $('.word-list ').append(definition)
    return definition;
  }

  var handleAJAXError = function(jqXHR, textStatus, errorThrown ) {
    console.log(textStatus, errorThrown);
  };

  var handleWordList = function(data) {
    $.each(data, function(entry) {
      appendDefinition(this);
    });
  };

////////////////////////////////////////////////////////////////////////////////
  $('.add-definition-form').on('submit', function (event) {
    event.preventDefault();
    $('.add-definition-modal').modal('hide');
    var entry = {
      word: $('input[name=word]', this).val(),
      definition: $('textarea[name=definition]', this).val()
    }
    var newDefinition = appendDefinition(entry);

    newDefinition.addClass("highlight");
    setTimeout(function () {
      newDefinition.removeClass("highlight");
    }, 1000);

    $.ajax(API_ROOT + '/create', {
      method: 'POST',
      data: entry
    }).done(function (data) {
      newDefinition.addClass("highlight");
      setTimeout(function () {
        newDefinition.removeClass("highlight");
      }, 1000);
    // $(".add-definition-form form-horizontal").reset();
    }).fail(handleAJAXError);
  })
////////////////////////////////////////////////////////////////////////////////
  //const Test_URL = 'http://word-dict.herokuapp.com/words.json';

  $('.word-search-form').on('submit', function (event) {
    event.preventDefault();
    //var searchedFor = { q:$('input[name=q]', this).val() };... This doesn't work.
    $.ajax(API_ROOT + '/search', {
      //method: 'GET', ... default
      data: { q:$('input[name=q]', this).val() }
    }).done(function (data) {
      $('.word-list').empty();
      handleWordList(data);
    }).fail(handleAJAXError);
  })

////////////////////////////////////////////////////////////////////////////////
  $.ajax(API_ROOT + '/words.json')
    .done(handleWordList)
    .fail(handleAJAXError);
});

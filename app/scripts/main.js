$(document).ready(function () {
  const API_ROOT = 'http://192.168.128.111:3000';

  var appendDefinition = function (entry) {
    var definition = $(
      "<a href='#' class='list-group-item'>" +
      "<h4 class='list-group-item-heading'>" + entry.word + "</h4>" +
      "<p class='list-group-item-text'>" + entry.definition + "</p></a>"
    );
    $('.list-group').append(definition)
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

  $('.add-definition-form').on('submit', function (event) {
    event.preventDefault();
    $('.add-definition-modal').modal('hide');
    var entry = {
      word: $('input[name=word]', this).val(),
      definition: $('textarea[name=definition]', this).val()
    }
    var newDefinition = appendDefinition(entry);

    $.ajax(API_ROOT + '/create', {
      method: 'POST',
      data: entry
    }).done(function (data) {
      console.log(newDefinition);
      newDefinition.addClass("highlight");
      setTimeout(function () {
        newDefinition.removeClass("highlight");
      }, 500);
    }).fail(handleAJAXError);
  })

  $.ajax(API_ROOT + '/words.json')
    .done(handleWordList)
    .fail(handleAJAXError);
});

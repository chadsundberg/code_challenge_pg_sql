$(document).ready(function () {

  // get treats on load
  getTreats();

  /**---------- Event Handling ----------**/
  /** Save New Treat **/
  $('#saveNewButton').on('click', function(event) {
    event.preventDefault();

    var newTreat = {
      name: $('#treatNameInput').val(),
      description: $('#treatDescriptionInput').val(),
      url: $('#treatUrlInput').val()
    };
    console.log(newTreat);
    postTreat(newTreat);
  });

  /**---------- AJAX Functions ----------**/

  // GET /treats
  function getTreats() {
    $.ajax({
      method: 'GET',
      url: '/treats',
    })
    .done(function (treatArray) {
      console.log('GET /treats returned ', treatArray);

      $.each(treatArray, function (index, treat) {
        appendTreat(treat);
      });
    });
  }

  // POST /treats
  function postTreat(treat) {
    $.ajax({
      method: 'POST',
      url: '/treats',
      data: treat,
    })
    .done(function () {
      console.log('POST /treats sent ', newTreat);
      clearDom();
      getTreats();
    });
  }

  /** ---------- DOM Functions ----------**/

  function clearDom() {
    var $treats = $('#treat-display');
    $treats.empty();
  }

  function appendTreat(treat) {
    // append a treat to the DOM and add data attributes
    // treat-display -> treat row -> treat
    var $treats = $('#treat-display');

    var treatCount = $treats.children().children().length;

    if (treatCount % 2 === 0) {
      // add a treat row every 2 treats
      $treats.append('<div class="treat row"></div>');
    }

    var $treat = $('<div class="six columns individual-treat">' +
                  '<div class="image-wrap">' +
                  '<img src="' + treat.pic + '" class="u-max-full-width" />' +
                  '<div class="toggle row">' +
                  '<div class="six columns">' +
                  '<button class="edit u-full-width">Edit</button>' +
                  '</div>' +
                  '<div class="six columns">' +
                  '<button class="delete u-full-width">Delete</button>' +
                  '</div>' +
                  '</div>' +
                  '</div>' +
                  '<h3>' + treat.name + '</h3>' +
                  '<p>' + treat.description + '</p>' +
                  '</div>');

    $treat.data('id', treat.id);

    $('.treat:last-of-type').append($treat);
  }
});

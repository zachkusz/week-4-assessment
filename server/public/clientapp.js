$(document).ready(function(){
  showAniamls();

  //Event listeners!
  $('#create').on('click', function(){
    console.log('submit clicked');
    postAnimal();
    showAniamls();
  });

  //AJAX!
  function postAnimal(){
    event.preventDefault();

    var animal = {};

    $.each($('#animal-creator').serializeArray(), function (i, field) {
      animal[field.name] = field.value;
    });

    console.log('pet generated', animal);
    //empty field
    $('#pets-form').children('input[type=text]').val('');
    //send new animal to database
    $.post('/animals', animal, postAnimalResponse);

    //sets random number and updates database in one ajax call
    $.ajax ({
      type: 'PUT',
      url: '/count',
      data: animal,
      success: function (res) {
         console.log(res);
      }
    });
  }

  //response used because shorthand method of POST call
  function postAnimalResponse(res) {
    console.log(res);
  }

  function showAniamls() {
    $.ajax ({
      type: 'GET',
      url: '/animals',
      // data: animal,
      success: function (animal) {
         appendDom(animal);
      }
    });
  }

  function appendDom(animal) {

    $('#animals-container').empty();

    animal.forEach(function(row) {
      $('#animals-container').append('<div class="animal"></div>');
      var $el = $('#animals-container').children().last();
      $el.append('<p>Animal: ' + row.species + '</p>');
      $el.append('<p>Heard Count: ' + row.count + '</p>');
    });
  }
});

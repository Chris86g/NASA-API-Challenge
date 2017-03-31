$(function () {

  var nasaApodApi = 'https://api.nasa.gov/planetary/apod';
  var nasaMarsApi = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos'

  var nasaApiKey = 'Z4O8gmFsVbS9ABK6EhROzHl3ikDHPeqaFi6ij4hK';

  var sec1 = $('.first');
  var h1 = sec1.find('h1');

  var sec2 = $('.second');
  var tl = sec2.find('.topLeft');
  var tc = sec2.find('.topCenter');
  var tr = sec2.find('.topRight');
  var bl = sec2.find('.bottomLeft');
  var bc = sec2.find('.bottomCenter');
  var br = sec2.find('.bottomRight');
  var more = sec2.find('button');

  var photoIndex = 0;

  var photoData = {
    api_key: nasaApiKey
  }

  $.ajax({
    url: nasaApodApi,
    data: photoData
  }).done(function(response){
    console.log(response.hdurl);
    sec1.css('background-image','url('+response.hdurl+')');
  }).fail(function(error){
    console.log(error);
  })

  function insertPhotos(page) {
    var galleryData = {
      api_key: nasaApiKey,
      sol: 1000,
      page: page
    }

    $.ajax({
      url: nasaMarsApi,
      data: galleryData
    }).done(function(response){
      console.log(response.photos);
      var photo = response.photos;

      tl.css('background-image', 'url('+ photo[0 + photoIndex].img_src +')');
      tc.css('background-image', 'url('+ photo[100 + photoIndex].img_src +')');
      tr.css('background-image', 'url('+ photo[200 + photoIndex].img_src +')');
      bl.css('background-image', 'url('+ photo[300 + photoIndex].img_src +')');
      bc.css('background-image', 'url('+ photo[400 + photoIndex].img_src +')');
      br.css('background-image', 'url('+ photo[500 + photoIndex].img_src +')');

    }).fail(function(error){
      console.log(error);
    })
  };
  insertPhotos();

  more.on('click', function() {
    photoIndex++;
    insertPhotos(photoIndex);
  });

//////// JUST FOR FUN ///////

  h1.hide();
  h1.delay(1500).fadeIn(2000);
    document.querySelector('audio').play();

})

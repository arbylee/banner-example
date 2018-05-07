(function() {
  $('.image-container').hover(function(e) {
    $(this).toggleClass('grow');
    var side = $(this).data('side');
    $('.text-overlay[data-side="' + side + '"]').toggleClass('visible');
  });
})();

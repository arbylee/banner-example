(function() {
  const DEFAULT = 'default';
  const FULL_WIDTH = 'full-width';
  const EXPANDED = 'expanded';

  const HOVER = 'hover';
  const UNHOVER = 'unhover';
  const CLICK = 'click';

  let currentState = DEFAULT;

  const defaultToExpanded = ($containerElement, $textElement) => {
    $containerElement.addClass("grow");
    $textElement.addClass('visible');
    currentState = EXPANDED;
  }
  const expandedToDefault = ($containerElement, $textElement) => {
    $containerElement.removeClass("grow");
    $textElement.removeClass('visible');
    currentState = DEFAULT;
  }
  const expandedToFullWidth = ($containerElement, $textElement) => {
    $containerElement.removeClass("grow");
    $containerElement.addClass('full-width');
    currentState = FULL_WIDTH;
  }
  const fullWidthToDefault = ($containerElement, $textElement) => {
    $containerElement.removeClass("full-width")
    $textElement.removeClass('visible');
    currentState = DEFAULT;
  }

  const stateTransitions = {
    [DEFAULT]: {
      [HOVER]: defaultToExpanded,
    },
    [EXPANDED]: {
      [UNHOVER]: expandedToDefault,
      [CLICK]: expandedToFullWidth
    },
    [FULL_WIDTH]: {
      [CLICK]: fullWidthToDefault
    }
  };


  const getStateHandler = (from, to) => {
    const handler = stateTransitions[from] && stateTransitions[from][to];
    return handler;
  };

  $('.image-container').mouseenter(function(e) {
    const handler = getStateHandler(currentState, HOVER);
    if (!handler) {
      console.log(`No handler for transitioning ${currentState} with ${HOVER}`)
      return;
    }

    const side = $(this).data('side');
    const $textOverlay = $(this).children(`.text-overlay[data-side="${side}"]`);
    handler($(this), $textOverlay);
  });

  $('.image-container').mouseleave(function(e) {
    const handler = getStateHandler(currentState, UNHOVER);
    if (!handler) {
      return;
    }

    const side = $(this).data('side');
    const $textOverlay = $(this).children(`.text-overlay[data-side="${side}"]`);
    handler($(this), $textOverlay);
  });

  $('.image-container').click(function(e) {
    const handler = getStateHandler(currentState, CLICK);
    if (!handler) {
      return;
    }

    const side = $(this).data('side');
    const $textOverlay = $(this).children(`.text-overlay[data-side="${side}"]`);
    handler($(this), $textOverlay);
  });
})();

(function() {
  const HOVER = 'hover';
  const UNHOVER = 'unhover';
  const CLICK = 'click';

  const BannerImage = () => {
    const DEFAULT = 'default';
    const FULL_WIDTH = 'full-width';
    const EXPANDED = 'expanded';

    let currentState = DEFAULT;

    const defaultToExpanded = ($containerElement, $children) => {
      $containerElement.addClass("grow");
      currentState = EXPANDED;
    }
    const expandedToDefault = ($containerElement, $children) => {
      $containerElement.removeClass("grow");
      currentState = DEFAULT;
    }
    const expandedToFullWidth = ($containerElement, $children) => {
      $containerElement.removeClass("grow");
      $containerElement.addClass('full-width');
      currentState = FULL_WIDTH;
    }
    const fullWidthToDefault = ($containerElement, $children) => {
      $containerElement.removeClass("full-width")
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

    const getStateHandler = (action) => {
      const handler = stateTransitions[currentState] && stateTransitions[currentState][action];
      return handler;
    };

    const getChildrenSelector = (side) => {
      return [
        `.text-overlay[data-side="${side}"]`,
        `.close-control[data-side="${side}"]`
    ].join(',');
    };

    const getCurrentState = () => {
      return currentState;
    };

    return {
      getStateHandler,
      containerSelector: '.image-container',
      getChildrenSelector,
      getCurrentState
    }
  }

  const init = () => {
    const bannerImage = BannerImage();

    $(bannerImage.containerSelector).mouseenter(function(e) {
      const handler = bannerImage.getStateHandler(HOVER);
      if (!handler) {
        return;
      }

      const side = $(this).data('side');
      const $textOverlay = $(this).children(bannerImage.getChildrenSelector(side));
      handler($(this), $textOverlay);
    });

    $(bannerImage.containerSelector).mouseleave(function(e) {
      const handler = bannerImage.getStateHandler(UNHOVER);
      if (!handler) {
        return;
      }

      const side = $(this).data('side');
      const $textOverlay = $(this).children(bannerImage.getChildrenSelector(side));
      handler($(this), $textOverlay);
    });

    $(bannerImage.containerSelector).click(function(e) {
      const handler = bannerImage.getStateHandler(CLICK);
      if (!handler) {
        return;
      }

      const side = $(this).data('side');
      const $textOverlay = $(this).children(bannerImage.getChildrenSelector(side));
      handler($(this), $textOverlay);
    });
  }

  init();
})();

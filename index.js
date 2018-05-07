(function() {
  const HOVER = 'hover';
  const UNHOVER = 'unhover';
  const CLICK = 'click';

  const BannerImage = () => {
    const DEFAULT = 'default';
    const FULL_WIDTH = 'full-width';
    const EXPANDED = 'expanded';

    let currentState = DEFAULT;

    const defaultToExpanded = ($containerElement) => {
      $containerElement.addClass("grow");
      currentState = EXPANDED;
    };
    const defaultToFullWidth = ($containerElement) => {
      $containerElement.addClass("full-width");
      currentState = FULL_WIDTH;
    };
    const expandedToDefault = ($containerElement) => {
      $containerElement.removeClass("grow");
      currentState = DEFAULT;
    };
    const expandedToFullWidth = ($containerElement) => {
      $containerElement.removeClass("grow");
      $containerElement.addClass('full-width');
      currentState = FULL_WIDTH;
    };
    const fullWidthToDefault = ($containerElement) => {
      $containerElement.removeClass("full-width")
      currentState = DEFAULT;
    };

    const stateTransitions = {
      [DEFAULT]: {
        [HOVER]: defaultToExpanded,
        [CLICK]: defaultToFullWidth,
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

    const getCurrentState = () => {
      return currentState;
    };

    return {
      getStateHandler,
      containerSelector: '.image-container',
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

      handler($(this));
    });

    $(bannerImage.containerSelector).mouseleave(function(e) {
      const handler = bannerImage.getStateHandler(UNHOVER);
      if (!handler) {
        return;
      }

      handler($(this));
    });

    $(bannerImage.containerSelector).click(function(e) {
      const handler = bannerImage.getStateHandler(CLICK);
      if (!handler) {
        return;
      }

      handler($(this));
    });
  }

  init();
})();

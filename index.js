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
    const fullWidthToDefault = ($containerElement, e) => {
      if ($(e.target).hasClass('close-control')) {
        $containerElement.removeClass("full-width")
        currentState = DEFAULT;
      }
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

    const setupHandler = (element, action, e) => {
      const handler = stateTransitions[currentState] && stateTransitions[currentState][action];
      if (!handler) {
        return;
      }

      handler($(element), e);
    };

    return {
      mainSelector: '.image-container',
      setupHandler
    }
  }

  const init = () => {
    const bannerImage = BannerImage();

    $(bannerImage.mainSelector).mouseenter(function(e) {
      bannerImage.setupHandler(this, HOVER, e);
    });

    $(bannerImage.mainSelector).mouseleave(function(e) {
      bannerImage.setupHandler(this, UNHOVER, e);
    });

    $(bannerImage.mainSelector).click(function(e) {
      bannerImage.setupHandler(this, CLICK, e);
    });
  }

  init();
})();

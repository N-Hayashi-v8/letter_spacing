$(function () {
  const $concept = $(".p-concept");
  const $modeBtns = $concept.find(".p-concept__mode-btn");
  const $active = $modeBtns.filter(".is-active").first();
  const setConceptMode = (mode) => {
    $concept
      .attr("data-spacing-mode", mode)
      .removeClass("is-spacing-before is-spacing-after")
      .addClass(`is-spacing-${mode}`);
  };

  if($modeBtns.length){
    if($active.length){
      $modeBtns.attr("aria-pressed", "false");
      $active.attr("aria-pressed", "true");
      setConceptMode(String($active.attr("data-spacing-mode")));
    }

    $modeBtns.on("click", function(){
      const $clicked = $(this);
      if($clicked.hasClass("is-active")) return;

      $modeBtns.removeClass("is-active").attr("aria-pressed","false");
      $clicked.addClass("is-active").attr("aria-pressed", "true");

      const mode = String($clicked.attr("data-spacing-mode") || "");
      if(mode){
        setConceptMode(mode);
      }
    });
  }

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  $(document).on("click", "a[href^='#']", function(event){
    if(prefersReducedMotion) return;

    if(event.metaKey || event.ctrlKey || event.shiftKey || event.altKey){
      return;
    }

    const href = String($(this).attr("href") || "");
    const targetId = href.replace(/^#/, "");
    if(!targetId) return;

    const $target = $(`#${targetId}`);
    if(!$target.length) return;

    event.preventDefault();
    $("html, body").stop(true).animate(
      { scrollTop: Number($target.offset()?.top || 0) },
      500
    );
  });

  const $navLinks = $(".p-header__nav-link[href^='#']");
  const navItems = [];

  if($navLinks.length){
    $navLinks.each(function(){
      const $link = $(this);
      const targetId = String($link.attr("href") || "").replace(/^#/, "");
      if(!targetId) return;

      const $target = $(`#${targetId}`);
      if(!$target.length) return;

      navItems.push({$link, $target});
    });

    const setCurrentNavLink = () => {
      if(!navItems.length) return;

      const currentLine = window.scrollY + (window.innerHeight * 0.45);
      let activeIndex = -1;

      navItems.forEach((item, index) => {
        const top = Number(item.$target.offset()?.top || 0);
        const bottom = top + Number(item.$target.outerHeight() || 0);

        if(currentLine >= top && currentLine < bottom){
          activeIndex = index;
        }
      });

      navItems.forEach((item, index) => {
        const isCurrent = activeIndex !== -1 && index === activeIndex;
        item.$link.toggleClass("is-current", isCurrent);

        if(isCurrent){
          item.$link.attr("aria-current", "true");
        } else {
          item.$link.removeAttr("aria-current");
        }
      });
    };

    let isTicking = false;
    const requestNavUpdate = () => {
      if(isTicking) return;
      isTicking = true;

      window.requestAnimationFrame(() => {
        setCurrentNavLink();
        isTicking = false;
      });
    };

    $(window).on("scroll resize", requestNavUpdate);
    requestNavUpdate();
  }

  const $zoomModal = $(".p-feature__zoom-modal");
  const $zoomImage = $zoomModal.find(".p-feature__zoom-image");
  const $zoomTriggers = $(".p-feature__zoom-trigger");
  const zoomColorClasses = "is-color-red is-color-green is-color-blue";

  const closeZoomModal = () => {
    $("body").removeClass("is-noscroll");
    $zoomModal
      .removeClass('is-open ${zoomColorClasses}')
      .attr("aria-hidden", "true");
    $zoomImage.attr({ src: "", alt: "" });
  };

  if($zoomModal.length && $zoomTriggers.length){
    $zoomTriggers.on("click", function(){
      const $trigger = $(this);
      const $img = $trigger.find(".p-feature__image");
      const src = String($img.attr("src") || "");
      if(!src) return;

      const colorRaw = String($trigger.attr("data-feature-zoom-color") || "red");
      const color = ["red", "green", "blue"].includes(colorRaw) ? colorRaw : "red";

      $zoomImage.attr({
        src,
        alt: String($img.attr("alt") || "")
      });

      $("body").addClass("is-noscroll");
      $zoomModal
        .removeClass(zoomColorClasses)
        .addClass('is-open is-color-${color}')
        .attr("aria-hidden" , "false");

    });

    $zoomModal.on("click", "[data-feature-zoom-close]", closeZoomModal);

    $(document).on("keydown", function(event){
      if(event.key === "Escape" && $zoomModal.hasClass("is-open")){
        closeZoomModal();
      }
    });

  }


  const $modalTrack = $(".p-feature__modal-track");
  const $firstList = $modalTrack.find(".p-feature__modal-list").first();

  if($modalTrack.length && $firstList.length && !$modalTrack.attr("data-modal-ready")){
    $modalTrack.append($firstList.clone());
    $modalTrack.attr("data-modal-ready", "true");
  }

  if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){
    $modalTrack.css("animation", "none");
  }
});

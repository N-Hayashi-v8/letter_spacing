$(function () {
  const $concept = $(".p-concept");
  const $modeBtns = $concept.find(".p-concept__mode-btn");
  const $active = $modeBtns.filter(".is-active").first();
  const setConceptMode = (mode) => {
    $concept
      .attr("data-spacing-mode", mode)
      .removeClass("is-spacing-before is-spacing-after")
      .addClass(`is-spacing-${mode}`);
  }

  if($modeBtns.length === 0) return;

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
});

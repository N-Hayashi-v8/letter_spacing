$(function () {
  const $concept = $(".p-concept");
  const $modeBtns = $concept.find(".p-concept__mode-btn");
  const $active = $modeBtns.filter(".is-active").first();

  if($modeBtns.length === 0) return;

  if($active.length){
    $modeBtns.attr("aria-pressed", "false");
    $active.attr("aria-pressed", "true");
    $concept.attr("data-spacing-mode", String($active.data("spacing-mode")));
  }

  $modeBtns.on("click", function(){
    const $clicked = $(this);
    if($clicked.hasClass("is-active")) return;

    $modeBtns.removeClass("is-active").attr("aria-pressed","false");
    $clicked.addClass("is-active").attr("aria-pressed", "true");

    const mode = String($clicked.data("spacing-mode") || "");
    if(mode){
      $concept.attr("data-spacing-mode", mode);
    }
  });
});

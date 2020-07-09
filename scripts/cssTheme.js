$(document).ready(function() {
    let theme = getCook("theme");
    if (theme == "") {
      document.cookie = "theme=darky; expires=Fri, 31 Dec 2030 23:59:59 GMT";
      theme = "darky";
    };
    updateCss(theme);

    if (theme == "darky") $('#themeSwitch').prop('checked', false);

    $('#themeSwitch').click(function() {
        if (this.checked) updateCss("flaty");
        else updateCss("darky");
    });
});

function getCook(cookiename) {
  var cookiestring=RegExp(cookiename+"=[^;]+").exec(document.cookie);
  return decodeURIComponent(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./,"") : "");
}

function disableCss(element) {
  element.rel = "alternate stylesheet";
}

function enableCss(element) {
  element.rel = "stylesheet";
}

function updateCss(theme) {
  enableCss(document.getElementById(theme));
  if (theme == "darky") disableCss(document.getElementById("flaty"));
  else disableCss(document.getElementById("darky"));

  document.cookie = `theme=${theme}; expires=Fri, 31 Dec 2030 23:59:59 GMT`;
}

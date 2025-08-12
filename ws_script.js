function update_language() {
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    element.innerHTML = lang_data[key];
  });
}

function ws_toggle(element, state) {
  if (typeof state === "undefined") {
    state = element.getAttribute("data-state");
  }
  if (state == 0) {
    element.setAttribute("data-state", 1);
    element.style.backgroundColor = "#f7c499";
  }
  else {
    element.setAttribute("data-state", 0);
    element.style.backgroundColor = "#ed6c00";
  }
}

function select_page(page) {
  var i, pages, icons;

  pages = document.getElementsByClassName("page");
  for (i = 0; i < pages.length; i++) {
    pages[i].style.display = "none";
  }
  document.getElementById(page).style.display = "grid";

  icons = document.getElementsByClassName("page_icon");
  for (i = 0; i < icons.length; i++) {
    icons[i].className = icons[i].className.replace(" active", "");
  }
  document.getElementById("page_icon_" + page).className+= " active";
}

function select_link(link) {
  var i, tablinks;
  tablink = document.getElementsByClassName("tablink");
  for (i = 0; i < tablink.length; i++) {
    tablink[i].className = tablink[i].className.replace(" active", "");
  }
  document.getElementById(link).className+= " active";
}

function select_content(content) {
  var i, tabcontent;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  document.getElementById(content).style.display = "block";
}

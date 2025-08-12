document.addEventListener('DOMContentLoaded', init, false);
let revert_time = 0;
let actual_content = -1;

function init() {
  update_language();
  document.getElementById('page_icon_home').addEventListener('click', function() { select_page('home'); });
  document.getElementById('page_icon_pattern').addEventListener('click', function() { select_page('pattern'); });

  document.getElementById('link_1').addEventListener('click', function() { option_set(1); });
  document.getElementById('link_2').addEventListener('click', function() { option_set(2); });
  document.getElementById('link_3').addEventListener('click', function() { option_set(3); });
  document.getElementById('link_4').addEventListener('click', function() { option_set(4); });
  document.getElementById('link_5').addEventListener('click', function() { option_set(5); });
  document.getElementById('link_6').addEventListener('click', function() { option_set(6); });

  document.getElementById('button_R1.1').addEventListener('click', function() { modbus_set_R(1, 1); });
  document.getElementById('button_R1.2').addEventListener('click', function() { modbus_set_R(1, 2); });

  option_revert(0);
  select_page('home');
}

function update_values(res) {
  var tablink;
  if (res < 0) {
    document.getElementById('value_D0').textContent = "-";
//    ws_toggle(document.getElementById("button_R1.1"), 0);
//    ws_toggle(document.getElementById("button_R1.2"), 0);
    ws_toggle(document.getElementById('label_D1.1'), 0);
    ws_toggle(document.getElementById('label_D1.2'), 0);
    option_revert(0);
  }
  else {
    tablink = document.getElementsByClassName("tablink");
    document.getElementById('value_D0').textContent = tablink[modbus_get_D(0)].textContent;
//    ws_toggle(document.getElementById("button_R1.1"), modbus_get_D(1) === 1);
//    ws_toggle(document.getElementById("button_R1.2"), modbus_get_D(1) === 2);
    ws_toggle(document.getElementById('label_D1.1'), (modbus_get_D(1) & 1) === 1);
    ws_toggle(document.getElementById('label_D1.2'), (modbus_get_D(1) & 2) === 2);
    option_revert(modbus_get_D(0));
  }
}

function option_set(index) {
  select_link('link_' + index);
  select_content('content_' + index);
  actual_content = index;
  modbus_set_R(0, index);
  revert_time = 5;
}

function option_revert(index) {
  if (revert_time > 0) {
    revert_time--;
  }
  else if (index !== actual_content) {
    select_link('link_' + index);
    select_content('content_' + index);
    actual_content = index;
  }
}

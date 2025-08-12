var json_rd = {
  D: [ 0, 0, 0, 0, 0, 0, 0, 0 ],
  R: [ 0, 0, 0, 0, 0, 0, 0, 0 ],
}

var json_wd = {
  D: [ 0, 0, 0, 0, 0, 0, 0, 0 ],
  R: [ 0, 0, 0, 0, 0, 0, 0, 0 ],
}

function modbus_get_D(index) {
  return json_rd.D[index];
}

function modbus_set_D(index, value) {
  json_wd.D[index] = value;
  return value;
}

function modbus_get_R(index) {
  return json_rd.R[index];
}

function modbus_set_R(index, value) {
  json_wd.R[index] = value;
  return value;
}

function modbus_update() {
  fetch('http://' + ip + ':5080/modbus_json', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify (
      json_wd
    )
  })
  .then((response) => {
    if (!response.ok) {
      update_values(-1);
      throw new Error(`HTTP error: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    json_rd = data;
    for (let i = 0; i < 8; i++) json_wd.R[i] = 0;
    update_values(8);
  })
  .catch((error) => {
    update_values(-1);
    console.error(error);
  })
}

ip = '192.168.58.2'
setInterval(modbus_update, 500);

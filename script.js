let timeIndex = 0;
const labels = [];
const hrData = [];
const tempData = [];

const ctx = document.getElementById("vitalChart").getContext("2d");

const vitalChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: labels,
    datasets: [
      {
        label: "Heart Rate",
        data: hrData,
        borderWidth: 2,
        tension: 0.4
      },
      {
        label: "Temperature",
        data: tempData,
        borderWidth: 2,
        tension: 0.4
      }
    ]
  }
});

function updateUI(data) {
  document.getElementById("hr").innerText = data.hr;
  document.getElementById("spo2").innerText = data.spo2;
  document.getElementById("temp").innerText = data.temp;
  document.getElementById("ecg").innerText = data.ecg;

  const alertBox = document.getElementById("alert");

  if (data.alert) {
    alertBox.innerText = "⚠ SEPSIS ALERT DETECTED";
    alertBox.className = "alert danger";
    logSepsisEvent();
  } else {
    alertBox.innerText = "Status: NORMAL";
    alertBox.className = "alert normal";
  }

  labels.push(timeIndex++);
  hrData.push(data.hr);
  tempData.push(data.temp);

  if (labels.length > 20) {
    labels.shift();
    hrData.shift();
    tempData.shift();
  }

  vitalChart.update();
}

function logSepsisEvent() {
  const table = document.getElementById("logTable");
  const row = table.insertRow(1);

  const timeCell = row.insertCell(0);
  const statusCell = row.insertCell(1);

  const now = new Date().toLocaleString();
  timeCell.innerText = now;
  statusCell.innerText = "Sepsis Detected";
}

/* DEMO DATA – REMOVE AFTER ESP32 CONNECTION */
setInterval(() => {
  const demoData = {
    hr: Math.floor(Math.random() * 40) + 70,
    spo2: Math.floor(Math.random() * 5) + 95,
    temp: (36 + Math.random() * 3).toFixed(1),
    ecg: Math.floor(Math.random() * 1000),
    alert: Math.random() > 0.85
  };

  updateUI(demoData);
}, 2000);

/*
 AFTER ESP32:
 fetch("http://ESP32_IP/data")
*/

function updateUI(data) {
  document.getElementById("hr").innerText = data.hr;
  document.getElementById("spo2").innerText = data.spo2;
  document.getElementById("temp").innerText = data.temp;
  document.getElementById("ecg").innerText = data.ecg;

  const alertBox = document.getElementById("alert");

  if (data.alert) {
    alertBox.innerText = "⚠ SEPSIS ALERT DETECTED";
    alertBox.classList.remove("normal");
    alertBox.classList.add("danger");
  } else {
    alertBox.innerText = "Status: NORMAL";
    alertBox.classList.remove("danger");
    alertBox.classList.add("normal");
  }
}

/* 
 Temporary demo data (REMOVE when ESP32 is connected)
 This lets you see live effects without hardware
*/
setInterval(() => {
  const demoData = {
    hr: Math.floor(Math.random() * 40) + 70,
    spo2: Math.floor(Math.random() * 5) + 95,
    temp: (36 + Math.random() * 3).toFixed(1),
    ecg: Math.floor(Math.random() * 1000),
    alert: Math.random() > 0.8
  };

  updateUI(demoData);
}, 2000);

/*
 AFTER ESP32 ARRIVES, replace above code with:

 setInterval(() => {
   fetch("http://ESP32_IP/data")
     .then(res => res.json())
     .then(data => updateUI(data));
 }, 2000);
*/

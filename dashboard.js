document.addEventListener("DOMContentLoaded", () => {
  console.log("Dashboard loaded!");

  if (typeof Chart !== "undefined") {
    renderSentimentChart();
  }
});

function renderSentimentChart() {
  const ctx = document.getElementById("sentimentChart").getContext("2d");

  // डमी डेटा
  const labels = [
    "00:00",
    "02:00",
    "04:00",
    "06:00",
    "08:00",
    "10:00",
    "12:00",
    "14:00",
    "16:00",
    "18:00",
    "20:00",
    "22:00",
  ];
  const dataPositive = [45, 55, 60, 50, 70, 75, 65, 80, 75, 68, 72, 85];
  const dataNegative = [10, 15, 12, 18, 10, 8, 14, 9, 11, 13, 10, 7];
  const dataNeutral = [45, 30, 28, 32, 20, 17, 21, 11, 14, 19, 18, 8];

  // हाईलाइटेड (Highlighted) एरिया के लिए ग्रेडिएंट बनाएं
  const areaGradient = ctx.createLinearGradient(0, 0, 0, 400);
  areaGradient.addColorStop(0, "rgba(88, 166, 255, 0.5)"); // Top Blue
  areaGradient.addColorStop(0.5, "rgba(157, 82, 255, 0.3)"); // Middle Purple (Neon)
  areaGradient.addColorStop(1, "rgba(255, 255, 255, 0.0)"); // Bottom Transparent

  new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Positive",
          data: dataPositive,
          borderColor: "#3fb950", // Green line
          backgroundColor: "transparent",
          fill: false,
          tension: 0.4,
          borderWidth: 2,
        },
        {
          label: "Negative",
          data: dataNegative,
          borderColor: "#ff7b72", // Red line
          backgroundColor: "transparent",
          fill: false,
          tension: 0.4,
          borderWidth: 2,
        },
        {
          label: "Neutral",
          data: dataNeutral,
          // इस लाइन को मुख्य हाईलाइटेड लाइन बनाते हैं (जैसे इमेज में)
          borderColor: "#63d4e0", // Bright Cyan line
          backgroundColor: areaGradient,
          fill: "start", // लाइन के नीचे के क्षेत्र को भरता है
          tension: 0.5, // थोड़ा कर्व्ड
          borderWidth: 3,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          grid: { color: "#2d343f", borderColor: "#2d343f" },
          ticks: { color: "#8b949e" },
        },
        x: {
          grid: { display: false },
          ticks: { color: "#8b949e" },
        },
      },
      plugins: {
        legend: {
          labels: { color: "#c9d1d9" },
        },
      },
    },
  });
}

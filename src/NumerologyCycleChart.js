import React from "react";
import { Line } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const NumerologyCycleChart = ({ cycleData, labels, title }) => {
  // cycleData: array of numbers for each cycle
  // labels: array of labels for each cycle (e.g., years or cycle names)
  // title: chart title

  const data = {
    labels: labels || ["Cycle 1", "Cycle 2", "Cycle 3"],
    datasets: [
      {
        label: "Numerology Cycle",
        data: cycleData || [1, 5, 9],
        fill: false,
        borderColor: "#4f8cff",
        backgroundColor: "#4f8cff",
        tension: 0.3,
        pointRadius: 6,
        pointHoverRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: !!title,
        text: title,
        font: {
          size: 20,
          family: "Poppins, sans-serif",
        },
        color: "#333",
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (context) {
            return `Cycle: ${context.parsed.y}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Cycle",
          font: {
            size: 16,
            family: "Poppins, sans-serif",
          },
        },
        ticks: {
          font: {
            family: "Poppins, sans-serif",
          },
        },
      },
      y: {
        title: {
          display: true,
          text: "Number",
          font: {
            size: 16,
            family: "Poppins, sans-serif",
          },
        },
        min: 1,
        max: 9,
        ticks: {
          stepSize: 1,
          font: {
            family: "Poppins, sans-serif",
          },
        },
      },
    },
  };

  return (
    <div style={{ width: "100%", maxWidth: 600, margin: "0 auto", background: "#fff", borderRadius: 16, boxShadow: "0 2px 12px rgba(0,0,0,0.08)", padding: 24 }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default NumerologyCycleChart; 
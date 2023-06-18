import React from 'react';
import { CategoryScale, Chart } from "chart.js";

import { Line } from 'react-chartjs-2';
Chart.register(CategoryScale);

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'Room Bookings',
      data: [3, 131, 29, 6251, 64, 28, 0, 2, 2, 1, 1, 0],
      fill: true,
      backgroundColor: 'rgba(136, 132, 216, 0.4)',
      borderColor: 'rgba(136, 132, 216, 1)',
    },
  ],
};

const options = {};

const AreaChart = () => {
  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
};

export default AreaChart;

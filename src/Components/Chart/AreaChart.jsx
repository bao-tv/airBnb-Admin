import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
// import faker from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const AreaChart = ({onTotalByMonthArr, name, dvt}) => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: `ĐVT: ${dvt}`,
        // data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        data: onTotalByMonthArr,
        fill: true,
        backgroundColor: 'rgba(136, 132, 216, 0.4)',
        borderColor: 'rgba(136, 132, 216, 1)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        // position: 'top' as const,
      },
      title: {
        display: true,
        text: name,
      },
    },
  };

  return (
    <div>
      <Line data={data} options={options} width={80}
  height={40}/>
    </div>
  );
};

export default AreaChart;

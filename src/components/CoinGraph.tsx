import useCoinData from "../hooks/useCoinData";
import { Coin } from "../hooks/useCoins";
import { Text, Box, Spinner } from "@chakra-ui/react";
import { Line } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  TooltipItem,
} from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";

Chart.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  zoomPlugin
);

interface Props {
  coin: Coin;
}

const getStartOfYear = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const startOfYear = new Date(currentYear, 0, 1);
  return startOfYear.toISOString();
};

const getCurrentDate = () => {
  const currentDate = new Date();
  return currentDate.toISOString();
};

const CoinGraph = ({ coin }: Props) => {
  const { data, isLoading } = useCoinData(`/v1/exchangerate/${coin.symbol}/USD/history`, {
    period_id: "1DAY",
    time_start: getStartOfYear(),
    time_end: getCurrentDate(),
    limit: 100,
  });

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="70vh">
        <Spinner thickness="4px" speed="1s" size="xl" />
      </Box>
    );
  }

  const labels = data.map((item) => new Date(item.time_close).toLocaleDateString());
  const openRates = data.map((item) => item.rate_open);
  const closeRates = data.map((item) => item.rate_close);
  const highRates = data.map((item) => item.rate_high);
  const lowRates = data.map((item) => item.rate_low);

  const chartData = {
    labels,
    datasets: [
      {
        label: `${coin.symbol}/USD Rates`,
        data: closeRates,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        pointBorderColor: "rgb(75, 192, 192)",
        pointBackgroundColor: "rgb(255, 255, 255)",
        pointBorderWidth: 2,
        pointRadius: 4,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "#4B4B4B",
          font: {
            size: 14,
          },
        },
      },
      zoom: {
        pan: {
          enabled: true,
          mode: "xy",
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: "xy",
        },
      },
      tooltip: {
        enabled: true,
        callbacks: {
          title: (tooltipItems: TooltipItem<"line">[]) => {
            return tooltipItems[0].label || "";
          },
          label: (tooltipItem: TooltipItem<"line">) => {
            const index = tooltipItem.dataIndex;
            return [
              `Open: ${openRates[index].toFixed(2)}`,
              `Close: ${closeRates[index].toFixed(2)}`,
              `High: ${highRates[index].toFixed(2)}`,
              `Low: ${lowRates[index].toFixed(2)}`,
            ];
          },
        },
        backgroundColor: "rgba(75, 75, 75, 0.8)",
        titleColor: "#fff",
        bodyColor: "#fff",
        cornerRadius: 4,
        padding: {
          x: 10,
          y: 10,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#4B4B4B",
        },
      },
      y: {
        grid: {
          color: "rgba(200, 200, 200, 0.2)",
        },
        ticks: {
          color: "#4B4B4B",
        },
      },
    },
  };

  return (
    <Box height="400px">
      <Text
        textAlign="center"
        fontSize="2xl"
        my="4"
        color="#4B4B4B"
      >{`${coin.symbol}/USD`}</Text>
      <Line data={chartData} options={options} />
    </Box>
  );
};

export default CoinGraph;

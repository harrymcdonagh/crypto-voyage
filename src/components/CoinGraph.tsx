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
import useCoinData from "../hooks/useCoinData";
import { Coin } from "../hooks/useCoins";

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
  height?: string;
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

const CoinGraph = ({ height, coin }: Props) => {
  const { data, isLoading } = useCoinData(`/v1/exchangerate/${coin.symbol}/USD/history`, {
    period_id: "1DAY",
    time_start: getStartOfYear(),
    time_end: getCurrentDate(),
    limit: 1000,
  });

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
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
        label: `${coin.symbol}/USD`,
        data: closeRates,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        pointBorderColor: "rgb(75, 192, 192)",
        pointBackgroundColor: "rgb(255, 255, 255)",
        pointBorderWidth: 0,
        pointRadius: 0, // Points are not visible by default
        hoverRadius: 5, // Points become visible and larger on hover
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
          mode: "xy", // Enable panning on both x and y axes
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: "xy", // Enable zooming on both x and y axes
        },
      },
      tooltip: {
        enabled: true,
        mode: "nearest", // Use the nearest mode for crosshair effect
        intersect: false, // Ensure the tooltip shows even when not intersecting with a data point
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
    interaction: {
      mode: "index", // Shows the tooltip for the closest data point along the x-axis
      intersect: false, // Tooltip appears even when not directly over a data point
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
    <Box
      height={height}
      p={3}
      paddingBottom={14}
      mx={3}
      borderWidth={1}
      borderColor="gray.200"
      borderRadius="lg"
    >
      <Text textAlign="center" fontSize="2xl" my="4">{`${coin.symbol}/USD`}</Text>
      <Line data={chartData} options={options} />
    </Box>
  );
};

export default CoinGraph;

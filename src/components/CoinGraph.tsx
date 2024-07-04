import useCoinData from "../hooks/useCoinData";
import { Coin } from "../hooks/useCoins";
import { Text, Box } from "@chakra-ui/react";
import { Line } from "react-chartjs-2"; // Import Line from react-chartjs
import {
  Chart,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
} from "chart.js"; // Import necessary Chart.js components

// Register necessary Chart.js components
Chart.register(CategoryScale, LinearScale, LineElement, PointElement, Title);

interface Props {
  coin: Coin;
}

const CoinGraph = ({ coin }: Props) => {
  const { data, isLoading } = useCoinData(`/v1/exchangerate/${coin.symbol}/USD/history`, {
    period_id: "1DAY",
    time_start: "2024-01-01T00:00:00",
    time_end: "2024-06-30T00:00:00",
    limit: 100,
  });

  console.log("CoinGraph data:", data); // Log the data for debugging

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  const labels = data.map((item) => new Date(item.time_close).toLocaleDateString()); // Format date for labels
  const chartData = {
    labels,
    datasets: [
      {
        label: `${coin.symbol}/USD Closing Rate`,
        data: data.map((item) => item.rate_close), // Use rate_close as data
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  return (
    <Box>
      <h2>{`${coin.symbol}/USD Closing Rates`}</h2>
      <Line data={chartData} />
    </Box>
  );
};

export default CoinGraph;

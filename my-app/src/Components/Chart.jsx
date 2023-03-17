import {
  Box,
  Container,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Chart as ChartJs, Tooltip, Title, ArcElement, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
ChartJs.register(Tooltip, Title, ArcElement, Legend);

function Chart() {
  const [grossEarnings, setGrossEarnings] = useState(2500);
  const [miscFeesPercent, setMiscFeesPercent] = useState(9);
  const [traderEarningsPercent, setTraderEarningsPercent] = useState(32);
  const [dalalEarningsPercent, setDalalEarningsPercent] = useState(49);
  const referralEarningsPercent = 10;

  useEffect(() => {
    const dalalEarnings = grossEarnings * (dalalEarningsPercent / 100);
    const traderEarnings = grossEarnings * (traderEarningsPercent / 100);
    const miscFees = grossEarnings * (miscFeesPercent / 100);
    const referralEarnings = grossEarnings * (referralEarningsPercent / 100);
    setData({
      datasets: [
        {
          data: [dalalEarnings, miscFees, traderEarnings, referralEarnings],
          backgroundColor: ["rgb(38, 38, 169)", "orange", "grey", "yellow"],
        },
      ],
      labels: [
        "Dalal Earnings",
        "Misc",
        "Trader Earnings",
        "Referral Earnings",
      ],
    });
  }, [
    grossEarnings,
    dalalEarningsPercent,
    traderEarningsPercent,
    miscFeesPercent,
  ]);

  const [data, setData] = useState({
    datasets: [
      {
        data: [],
        backgroundColor: [],
      },
    ],
    labels: [],
  });

  const [miscFees, setMiscFees] = useState(0);

  const handleChange = (value) => {
    setMiscFees(value);
  };

  //note : need some improment to make the slider 
  //as inbuild in graph and i have done it at ouside 
  return (
    <>
      <Container maxW={"4xl"} p="12" display="flex" gap={4} mt={10}>
        <Box
          border="2px solid rgb(38, 38, 169)"
          height="400px"
          width="40%"
          p={5}
          borderRadius="10px"
        >
          <InputGroup>
            <InputLeftAddon children="Gross Earnings :" />
            <Input
              placeholder="Enter Number"
              type="number"
              value={grossEarnings}
              onChange={(e) => setGrossEarnings(e.target.value)}
            />
          </InputGroup>
          <br />
          <InputGroup>
            <InputLeftAddon children="Referral % :" />
            <Input
              type="tel"
              placeholder="Enter Number"
              value={miscFeesPercent}
              onChange={(e) => setMiscFeesPercent(e.target.value)}
            />
          </InputGroup>
        </Box>

        <Box
          border="2px solid rgb(38, 38, 169)"
          height="400px"
          width="60%"
          p={10}
          borderRadius="10px"
        >
          <Heading mt={-10}>Gross Earnings</Heading>
          <Box
            // border="2px solid blue"
            height="330px"
            width="330px"
            margin="auto"
            mt={2}
          >
            <Doughnut data={data} />
            <br />
            Adjust MiscFees
            <Box
              p={2}
              borderRadius="10px"
              // boxShadow='dark-lg'
              boxShadow="outline"
              mt={2}
            >
              <Slider
                value={miscFeesPercent}
                onChange={(value) => setMiscFeesPercent(value)}
                min={0}
                max={80}
                // border="2px solid blue"
              />
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default Chart;

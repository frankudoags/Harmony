// import { OneLogo } from "../assets"
import { CubeIcon } from "@heroicons/react/24/outline"
import { Box, Text } from "grommet";
import { Transaction, LineChart, Cubes } from "grommet-icons";
import { useEffect, useState } from "react";
import { getCount } from "../api/client";
import { OneLogo } from "../assets";
import { useONEExchangeRate } from "../hooks/useONEExchangeRate";
import { formatNumber } from "../ui";
// import { LatencyIcon } from "../ui/icons";



const Home = () => {
    return (
        <div className="flex flex-col justify-center items-center w-full lg:min-h-[80vh]">
            {/* Title */}
            <h1 className='text-4xl text-center tracking-tight font-bold text-[#070F6F] max-w-7xl sm:text-5xl md:text-6xl lg:text-[77px]'>
                The Harmony Tool for <span className="text-[#00AEE9]">Tracking</span> & <span className="text-[#00AEE9]">Analysing</span> Transactions
            </h1>
            <p className='text-center max-w-5xl mt-8 mb-12 text-slate-500'>
                The Harmony Framework is a blockchain analytics platform that provides a comprehensive view of the blockchain ecosystem. It is a one-stop solution for all your blockchain analytics needs.
                It helps you to track the transactions, addresses, tokens, and blocks on the blockchain.
            </p>
            {/* Cards */}
            <div className='mb-20 w-full max-w-4xl grid grid-cols-1 md:grid-cols-2  gap-4 py-2 px-6 rounded-md'>
                <div className='flex flex-col justify-center items-center p-4 bg-white rounded-md border-2 border-gray-100'>
                    <div className="flex items-center gap-4">
                        <div>
                        <img src={OneLogo} alt="" className="h-8 w-8" />
                        </div>
                        <div className="flex flex-col justify-center items-start">
                            <ONEPrice />
                        </div>
                    </div>
                </div>
                <div className='flex flex-col justify-center items-center p-4 bg-white rounded-md border-2 border-gray-100'>
                    <div className="flex items-center gap-6">
                        <div className="flex flex-col justify-center items-start">
                            <TransactionsCount />
                        </div>
                    </div>
                </div>
                <div className='flex flex-col justify-center items-center p-4 bg-white rounded-md border-2 border-gray-100'>
                    <div className="flex items-center gap-6">
                        <div>
                            <Cubes size="large" color="#00AEE9" />
                        </div>
                        <div className="flex flex-col justify-center items-start">
                            <span className='text-sm text-[#727272] uppercase'>SHARD COUNT</span>
                            <div>4</div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col justify-center items-center p-4 bg-white rounded-md border-2 border-gray-100'>
                    <div className="flex items-center gap-6">
                        <div className="flex flex-col justify-center items-start">
                            <BlockLatency />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home






function ONEPrice() {
    const { lastPrice = 0, priceChangePercent = 0 } = useONEExchangeRate();
  
    return (
      <Box direction="row" align="stretch">
        <Box
          pad={{ left: "xsmall", right: "small" }}
          justify="center"
          align="center"
        >
        </Box>
        <Box align="start">
          <Text size="small" color="minorText">
            {"ONE PRICE"}
          </Text>
          <Box direction="row" gap="xsmall" align="baseline">
            <Text size="small" weight="bold">
              $ {(+lastPrice).toFixed(2)}
            </Text>
            <Text
              size="11px"
              weight="bold"
              color={priceChangePercent > 0 ? "status-ok" : "#d23540"}
            >
              ({priceChangePercent > 0 ? "+" : ""}
              {formatNumber(priceChangePercent)}%)
            </Text>
          </Box>
        </Box>
      </Box>
    );
  }

  function TransactionsCount() {
    const [count, setCount] = useState<string>("");
  
    useEffect(() => {
      let tId = 0;
      const getRes = async () => {
        try {
          let res = await getCount([0, "transactions"]);
          setCount(res.count);
        } catch (err) {
          console.log(err);
        }
      };
      getRes();
      tId = window.setInterval(getRes, 30000);
  
      return () => {
        clearTimeout(tId);
      };
    }, []);
  
    return (
      <Box direction="row" align="stretch">
        <Box
          pad={{ left: "xsmall", right: "small" }}
          justify="center"
          align="center"
        >
          <Transaction size="32px" color="#00AEE9" />
        </Box>
        <Box align="start">
          <Text size="small" color="minorText">
            {"TRANSACTIONS COUNT"}
          </Text>
          <Text size="small" weight="bold">
            {formatNumber(+count)}
          </Text>
        </Box>
      </Box>
    );
  }

  function BlockLatency() {
    const latency = 2.02;
  
    return (
      <Box direction="row" align="stretch">
        <Box
          pad={{ left: "xsmall", right: "small" }}
          justify="center"
          align="center"
        >
          {/* <LatencyIcon size="30px" color="brand" /> */}
        </Box>
        <Box align="start">
          <Text size="small" color="minorText">
            {"BLOCK LATENCY"}
          </Text>
          <Text size="small" weight="bold">
            {formatNumber(latency)}s
          </Text>
        </Box>
      </Box>
    );
  }
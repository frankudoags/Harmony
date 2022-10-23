import { useONEExchangeRate } from "../hooks/useONEExchangeRate";
import { getNearestPriceForTimestamp } from "../components/ONE_USDT_Rate"
import { TipContent } from "./Tooltip";
import dayjs from "dayjs";
import { formatNumber } from "./utils";
import { Text, Box, Tip } from "grommet";

interface ONEValueProps {
  value: string | number;
  timestamp?: string;
}

// @ts-ignore
export const ONEValue = (props: ONEValueProps) => {
  const { value, timestamp = "" } = props;
  const { lastPrice } = useONEExchangeRate();

  if(!value) {
    return null;
  }

  const isTodayTransaction =
    dayjs(timestamp).format("YYYY-MM-DD") === dayjs().format("YYYY-MM-DD");
  const price =
    timestamp && !isTodayTransaction
      ? getNearestPriceForTimestamp(timestamp)
      : lastPrice;

  const bi = BigInt(value) / BigInt(10 ** 14);
  const v = parseInt(bi.toString()) / 10000;
  let USDValue = "";
  if (price && v > 0) {
    USDValue = (v * +price).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      currency: "USD",
    });
  }

  return (
    <Box>
      <Text
        weight={v > 0 ? "bold" : "normal"}
        size="small"
      >
        {v.toString()} ONE
      </Text>
    </Box>
  );
};

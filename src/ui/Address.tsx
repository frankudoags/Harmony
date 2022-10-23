import React, { CSSProperties } from "react";
import { Text } from "grommet";
import { useERC20Pool } from "../hooks/ERC20_Pool";

interface IAddress {
  address: string;
  isShort?: boolean;
  type?: "tx" | "address";
  style?: CSSProperties;
  color?: string;
  displayHash?: boolean;
}

export const Address = (props: IAddress) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { address, isShort, style, type = "address", color = '#00AEE9', displayHash } = props;
  const ERC20Map = useERC20Pool();

  if (!address) {
    return null;
  }

  let parsedName = "";

  if (ERC20Map[address] && !displayHash) {
    parsedName = ERC20Map[address].name;
  }

  return (
    <Text
      size="small"
      color={color}
      style={{ cursor: "pointer", textDecoration: !!parsedName ? 'underline' : 'none', ...style }}
    >
      {parsedName ||
        (isShort ? `${address?.slice(0, 6)}...${address?.slice(-4)}` : address)}
    </Text>
  );
};

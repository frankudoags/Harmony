import React from "react";
import { Box, Text } from "grommet";
import { Address, formatNumber, TokenValue } from "../ui";
import { AddressDetails } from "../types";
import { TokensInfo } from "./TokenInfo";
import { Erc20, useERC20Pool } from "../hooks/ERC20_Pool";
import { ERC721, useERC721Pool } from "../hooks/ERC721.Pool";
import { ERC1155, useERC1155Pool } from "../hooks/ERC1155.Pool";
import { type } from "os";

interface AddressDetailsProps {
  address: string;
  contracts: AddressDetails;
  tokens: any[];
  erc721tokens: any[];
  erc1155tokens: any[];
}

export function AddressDetailsDisplay(props: AddressDetailsProps) {
  const { address, contracts, tokens, erc721tokens, erc1155tokens } = props;
  const erc20Map = useERC20Pool();
  const erc721Map = useERC721Pool();
  const erc1155Map = useERC1155Pool();

  const erc20Token = erc20Map[address] || null;
  const erc721Token = erc721Map[address] || null;
  const erc1155Token = erc1155Map[address] || null;
  const type = getType(contracts, erc20Token, erc721Token, erc1155Token);

  const data = { ...contracts, ...erc20Token, ...erc721Token, address, token: tokens, erc721tokens, erc1155tokens };

  if (!data) {
    return null;
  }

  const items: string[] = Object.keys(data);

  return (
    <Box>
      {items.sort(sortByOrder).map((i) => (
        //@ts-ignore
        <DetailItem key={i} name={i} data={data} type={type} />
      ))}
    </Box>
  );
}

function DetailItem(props: { data: any; name: string; type: TAddressType }) {
  const { data, name, type } = props;

  if (
    !addressPropertyDisplayNames[name] ||
    !addressPropertyDisplayValues[name] ||
    data[name] === null
  ) {
    return null;
  }

  return (
    <Box
      direction="row"
      margin={{ bottom: "small" }}
      pad={{ bottom: "small" }}
      border={{ size: "xsmall", side: "bottom", color: "border" }}
    >
      <Text
        style={{ width: "20%" }}
        color="minorText"
        size="small"
        margin={{ right: "xsmall" }}
      >
        {addressPropertyDisplayNames[name](data, { type })}
      </Text>
      <Text style={{ width: "80%", wordBreak: "break-all" }} size="small">
        {addressPropertyDisplayValues[name](data[name], data, { type })}
      </Text>
    </Box>
  );
}

const addressPropertyDisplayNames: Record<
  string,
  (data: any, options: { type: TAddressType }) => React.ReactNode
> = {
  address: () => 'Address',
  value: () => "Value",
  creatorAddress: () => "Creator",
  solidityVersion: () => "Solidity version",
  IPFSHash: () => "IPFS hash",
  meta: () => "Meta",
  bytecode: () => "Bytecode",
  token: () => "Token",
  name: () => "Name",
  symbol: () => "Symbol",
  decimals: () => "Decimals",
  totalSupply: () => "Total Supply",
  holders: () => "Holders",
};

const addressPropertyDisplayValues: Record<
  string,
  (value: any, data: any, options: { type: TAddressType }) => React.ReactNode
> = {
  address: (value, data, options: { type: TAddressType }) => {
    return (
      <div className="flex items-center gap-6">
        <Address address={value} isShort={false} />
        <div className="font-bold">
          {options.type === "erc20" && <div>HRC20</div>}
          {options.type === "erc721" && <div>HRC721</div>}
          {options.type === "erc1155" && <div>HRC1155</div>}
          {options.type === "contract" && <div>CONTRACT</div>}
          {options.type === "address" && <div>EOA</div>}
        </div>
      </div>
    )
  },
  value: (value) => <TokenValue value={value} />,
  creatorAddress: (value) => <Address address={value} />,
  solidityVersion: (value) => value,
  IPFSHash: (value) => value,
  meta: (value) => value,
  token: (value) => <TokensInfo value={value} />,
  name: (value) => value,
  symbol: (value) => value,
  decimals: (value) => value,
  totalSupply: (value) => <TokenValue value={value} />,
  holders: (value: string) => formatNumber(+value),
};

function sortByOrder(a: string, b: string) {
  return addressPropertyOrder[a] - addressPropertyOrder[b];
}

const addressPropertyOrder: Record<string, number> = {
  address: 10,
  value: 11,
  token: 12,
  creatorAddress: 13,

  name: 20,
  symbol: 21,
  decimals: 22,
  totalSupply: 23,
  holders: 24,

  solidityVersion: 31,
  IPFSHash: 32,
  meta: 33,
  bytecode: 34,
};

export type TAddressType = "address" | "contract" | "erc20" | "erc721" | "erc1155";

export function getType(contracts: AddressDetails, erc20Token: Erc20, erc721Token: ERC721, erc1155Token: ERC1155): TAddressType {
  if (!!contracts && !!erc20Token) {
    return "erc20";
  }

  if (!!contracts && !!erc721Token) {
    return "erc721";
  }
  if (!!contracts && !!erc1155Token) {
    return "erc1155";
  }
  if (!!contracts) {
    return "contract";
  }

  return "address";
}

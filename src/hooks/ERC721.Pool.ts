import { useState } from "react";
import { singletonHook } from "react-singleton-hook";
import { get } from "idb-keyval"

const initValue: ERC721_Pool = {};

let globalSetMode = () => {
  return {};
};

export const useERC721Pool = singletonHook(initValue, () => {
  const pool = get("ERC721_Pool") as unknown as ERC721_Pool || initValue;

  const [mode, setMode] = useState<ERC721_Pool>(pool);
  //@ts-ignore
  globalSetMode = setMode;
  return mode;
});

export const setERC721Pool = (pool: ERC721_Pool) => {
  //@ts-ignore
  globalSetMode(pool);
};

export interface ERC721 {
  name: string;
  address: string;
  totalSupply: string;
  holders: string;
  decimals: number;
  symbol: string;
}

export type ERC721_Pool = Record<string, ERC721>;

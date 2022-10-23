import { useState } from "react";
import { singletonHook } from "react-singleton-hook";
import { get } from 'idb-keyval';

const initValue: ERC20_Pool = {};

let globalSetMode = () => {
  return {};
};

export const useERC20Pool = singletonHook(initValue, () => {
  const pool =  get("ERC20_Pool") as unknown as ERC20_Pool || initValue;

  const [mode, setMode] = useState<ERC20_Pool>(pool);
  //@ts-ignore
  globalSetMode = setMode;
  return mode;
});

export const setERC20Pool = (pool: ERC20_Pool) => {
  //@ts-ignore
  globalSetMode(pool);
};

export interface Erc20 {
  name: string;
  address: string;
  totalSupply: string;
  holders: string;
  decimals: number;
  symbol: string;
}

export type ERC20_Pool = Record<string, Erc20>;

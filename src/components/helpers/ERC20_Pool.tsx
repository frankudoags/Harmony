import { useEffect } from "react";
import { getAllERC20 } from "../../api/client"
import { setERC20Pool, Erc20 } from '../../hooks/ERC20_Pool';
import { set } from 'idb-keyval';

export default function ERC20_Pool() {
  useEffect(() => {
    const getRates = async () => {
      const erc20: Erc20[] = await getAllERC20();
      // console.log(erc20);
      const erc20Map = {} as Record<string, Erc20>;
      erc20.forEach((i: any) => {
        erc20Map[i.address] = i;
      });

      set('ERC20_Pool', erc20Map);
      setERC20Pool(erc20Map);
    };

    let tId = 0;

    window.onload = function () {
      getRates();
      tId = window.setInterval(getRates, 10 * 60 * 1e3);
    };

    return () => {
      clearTimeout(tId);
      set('ERC20_Pool', {});
    };
  }, []);

  return null;
}

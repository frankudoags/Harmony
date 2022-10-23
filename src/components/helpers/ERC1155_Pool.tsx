import { useEffect } from "react";
import { getAllERC1155 } from "../../api/client"
import { setERC1155Pool, ERC1155 } from '../../hooks/ERC1155.Pool'
import { set } from 'idb-keyval';

export default function ERC1155_Pool() {
  useEffect(() => {
    const getRates = async () => {
      const erc1155: ERC1155[] = await getAllERC1155();
      // console.log(erc1155);
      const erc1155Map = {} as Record<string, ERC1155>;
      erc1155.forEach((i: any) => {
        erc1155Map[i.address] = i;
      });

      set('ERC1155_Pool', erc1155Map);
      setERC1155Pool(erc1155Map);
    };

    let tId = 0;

    window.onload = function () {
      getRates();
      tId = window.setInterval(getRates, 10 * 60 * 1e3);
    };

    return () => {
      clearTimeout(tId);
      set('ERC1155_Pool', {});
    };
  }, []);

  return null;
}

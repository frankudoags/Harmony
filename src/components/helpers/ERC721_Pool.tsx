import { useEffect } from "react";
import { getAllERC721 } from "../../api/client"
import { setERC721Pool, ERC721 } from '../../hooks/ERC721.Pool'
import { set } from 'idb-keyval';

export default function ERC721_Pool() {
  useEffect(() => {
    const getRates = async () => {
      const erc721: ERC721[] = await getAllERC721();
      // console.log(erc721);
      const erc721Map = {} as Record<string, ERC721>;
      erc721.forEach((i: any) => {
        erc721Map[i.address] = i;
      });

      set('ERC721_Pool', erc721Map);
      setERC721Pool(erc721Map);
    };

    let tId = 0;

    window.onload = function () {
      getRates();
      tId = window.setInterval(getRates, 10 * 60 * 1e3);
    };

    return () => {
      clearTimeout(tId);
      set('ERC721_Pool', {});
    };
  }, []);

  return null;
}

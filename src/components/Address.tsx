import React, { useEffect, useState } from "react";
import { Text, Box } from "grommet";
import { BasePage, BaseContainer, Address, ONEValue } from "../ui";
import { AddressDetailsDisplay, getType, TAddressType } from "./AddressDetails";
import { getRelatedTransactionsByType, getContractsByField, getUserERC20Balances,
getUserERC721Balances, getUserERC1155Balances } from "../api/client";
import { Filter, RelatedTransactionByType } from "../types";
import { useParams } from "react-router-dom";
import { TransactionsTable } from "./tables/TransactionsTable";
import { Erc20, useERC20Pool } from "../hooks/ERC20_Pool";
import { ERC721, useERC721Pool } from "../hooks/ERC721.Pool";
import dayjs from "dayjs";
import { useERC1155Pool } from "../hooks/ERC1155.Pool";

const initFilter: Filter = {
  offset: 0,
  limit: 10,
  orderBy: "block_number",
  orderDirection: "desc",
  filters: [{ type: "gte", property: "block_number", value: 0 }],
};

export default function AddressPage() {
  const [contracts, setContracts] = useState<any>(null);
  const [tokens, setTokens] = useState<any>(null);
  const [erc721tokens, setErc721Tokens] = useState<any>(null);
  const [erc1155tokens, setErc1155Tokens] = useState<any>(null);
  const [relatedTrxs, setRelatedTrxs] = useState<RelatedTransactionByType[]>([]);
  const [filter, setFilter] = useState<Filter>(initFilter);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const { id = "" } = useParams();


  useEffect(() => {
    const getElements = async () => {
      setIsLoading(true);
      try {
        let relatedTransactions = await getRelatedTransactionsByType([0, id, "transaction", filter]);
        setRelatedTrxs(relatedTransactions);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };
    getElements();
  }, [filter, id]);

  useEffect(() => {
    const getContracts = async () => {
      try {
        let contracts = await getContractsByField([0, "address", id]);
        setContracts(contracts);
      } catch (err) {
        setContracts(null);
      }
    };
    getContracts();
  }, [id]);

  useEffect(() => {
    const getTokens = async () => {
      try {
        let tokens = await getUserERC20Balances([id]);
        setTokens(tokens);
      } catch (err) {
        setTokens(null);
      }
    };
    getTokens();
  }, [id]);
  //useEffect to fetch and save users erc721 tokens
  useEffect(() => {
    const get721Toks = async () => {
      try {
        let tokens = await getUserERC721Balances([id]);
        console.log(tokens);
        setErc721Tokens(tokens);
      } catch (error) {
        console.log(error)
        setErc721Tokens(null);
      }
    };
    get721Toks();
  }, [id])
  //useEffect to fetch and save users erc1155 tokens
  useEffect(() => {
    const get1155Toks = async () => {
      try {
        let tokens = await getUserERC1155Balances([id]);
        console.log(tokens);
        setErc1155Tokens(tokens);
      } catch (error) {
        console.log(error)
        setErc1155Tokens(null);
      }
    };
    get1155Toks();
  }, [id])

  const { limit = 10 } = filter;
  const erc20Map = useERC20Pool();
  const erc721Map = useERC721Pool();
  const erc1155Map = useERC1155Pool();

  const erc20Token = erc20Map[id] || null;
  const erc721Token = erc721Map[id] || null;
  const erc1155Token = erc1155Map[id] || null;
  const type = getType(contracts, erc20Token, erc721Token, erc1155Token);

  return (
    <div className="pb-16">
      <BaseContainer pad={{ horizontal: "0" }}>
        <Text size="xlarge" weight="bold" margin={{ bottom: "medium" }}>
          {getHeaderText(type, { contracts, erc20Token, erc721Token })}
        </Text>
        <BasePage margin={{ vertical: "0" }}>
          <AddressDetailsDisplay address={id} contracts={contracts} tokens={tokens} erc721tokens={erc721tokens} erc1155tokens={erc1155tokens} />
          <Text
            size="xlarge"
            margin={{ top: !!contracts ? "large" : "medium", bottom: "large" }}
          >
            Related transactions
          </Text>
          <TransactionsTable
            columns={getColumns()}
            data={relatedTrxs}
            totalElements={100}
            limit={+limit}
            filter={filter}
            isLoading={isLoading}
            setFilter={setFilter}
            noScrollTop
          />
        </BasePage>
      </BaseContainer>
    </div>
  );
}

function getColumns() {
  return [
    {
      property: "hash",
      header: (
        <Text color="minorText" size="small" style={{ fontWeight: 300 }}>
          Hash
        </Text>
      ),
      render: (data: RelatedTransactionByType) => (
        <a href={`https://explorer.harmony.one/tx/${data.hash}`} target="_blank" rel="noreferrer"  className="hover:underline hover:font-medium hover:text-2xl transition-all duration-200 ease-in-out">
        <Text size="small">
          {`${data?.hash?.slice(0, 15)}`}
        </Text>
        </a>
      ),
    },
    {
      property: "method",
      header: (
        <Text color="minorText" size="small" style={{ fontWeight: 300 }}>
          Method
        </Text>
      ),
      render: (data: RelatedTransactionByType) => (
        <div className="rounded py-2 px-4 bg-[#070F6F] text-white w-fit">
          {
            data.input?.length > 20 ? 
            <Text size="small">{data?.input.slice(2, 9)}</Text>
            : <Text size="small">---------</Text>
          }
        </div>
      ),
    },
    {
      property: "from",
      header: (
        <Text color="minorText" size="small" style={{ fontWeight: 300 }}>
          From
        </Text>
      ),
      render: (data: RelatedTransactionByType) => (
        <div className="text-[#00AEE9]">
          <Text size="12px">
            <Address address={data.from} isShort={true} />
          </Text>
        </div>
      ),
    },
    {
      property: "to",
      header: (
        <Text color="minorText" size="small" style={{ fontWeight: 300 }}>
          To
        </Text>
      ),
      render: (data: RelatedTransactionByType) => (
        <div className="text-[#00AEE9]">
            <Address address={data.to} isShort={true} />
        </div>
      ),
    },
    {
      property: "value",
      header: (
        <Text color="minorText" size="small" style={{ fontWeight: 300 }}>
          ONEValue
        </Text>
      ),
      render: (data: RelatedTransactionByType) => (
        <Box justify="center">
          <ONEValue value={data.value} />
        </Box>
      ),
    },
    {
      property: "timestamp",
      header: (
        <Text color="minorText" size="small" style={{ fontWeight: 300 }}>
          Timestamp
        </Text>
      ),
      render: (data: RelatedTransactionByType) => (
        <Box direction="row" justify="start">
          <Text size="small">
            {!!data.timestamp
              ? dayjs(data.timestamp).format("YYYY-MM-DD, HH:mm:ss")
              : "—"}
          </Text>
        </Box>
      ),
    },
  ];
}


function getHeaderText(type: TAddressType, data: { erc20Token: Erc20, erc721Token: ERC721, contracts: any }) {
  const { contracts, erc20Token, erc721Token } = data;
  if (!!erc20Token) {
    return `HRC20 ${erc20Token.name}`;
  }

  if (!!erc721Token) {
    return `HRC721 ${erc721Token.name}`;
  }

  if (!!contracts) {
    return 'Contract';
  }

  return 'Address';
}

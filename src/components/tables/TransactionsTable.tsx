import { Box, DataTable, Text } from "grommet";
import { Filter, RelatedTransactionByType } from "../../types";
import {
  Address,
  PaginationNavigator,
  PaginationRecordsPerPage,
  ONEValue,
} from "../../ui";
import dayjs from "dayjs";

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
        <Text size="small">
          {`${data?.hash?.slice(0, 15)}`}
        </Text>
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
          <Text size="small">
            {data.input ? data?.input.slice(2, 9) : 0x000000}
          </Text>
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
          {/* <RelativeTimer
            date={data.timestamp}
            updateInterval={1000}
            style={{ minWidth: "auto" }}
          /> */}
        </Box>
      ),
    },
  ];
}

interface TransactionTableProps {
  data: any[];
  columns?: any[];
  totalElements: number;
  limit: number;
  filter: Filter;
  setFilter: (filter: Filter) => void;
  showIfEmpty?: boolean;
  emptyText?: string;
  hidePagination?: boolean;
  isLoading?: boolean;
  hideCounter?: boolean;
  minWidth?: string;
  noScrollTop?: boolean;
}

export function TransactionsTable(props: TransactionTableProps) {
  const {
    data,
    totalElements,
    limit,
    filter,
    setFilter,
    showIfEmpty,
    emptyText = "No data to display",
    columns,
    hidePagination,
    isLoading,
    hideCounter,
    noScrollTop,
    minWidth = "120px",
  } = props;

  const _IsLoading = (!data.length && !showIfEmpty) || isLoading;

  if (!data.length && !_IsLoading) {
    return (
      <Box style={{ height: "120px" }} justify="center" align="center">
        <Text size="small">{emptyText}</Text>
      </Box>
    );
  }

  return (
    <>
      <Box
        direction="row"
        justify={hidePagination ? "start" : "between"}
        pad={{ bottom: "small" }}
        margin={{ bottom: "small" }}
        border={{ size: "xsmall", side: "bottom", color: "border" }}
      >
        {!hideCounter && (
          <Text style={{ flex: "1 1 100%" }}>
            <b>{Math.min(limit, data.length)}</b> transaction
            {data.length !== 1 ? "s" : ""} shown
          </Text>
        )}
        {!hidePagination && (
          <PaginationNavigator
            onChange={setFilter}
            filter={filter}
            totalElements={totalElements}
            elements={data}
            noScrollTop={noScrollTop}
            property="block_number"
          />
        )}
      </Box>
      <Box
        style={{
          overflow: "auto",
          opacity: _IsLoading ? "0.4" : "1",
          transition: "0.1s all",
          height: _IsLoading ? "529px" : "auto",
        }}
      >
        <DataTable
          className={"g-table-header"}
          style={{ width: "100%", minWidth }}
          columns={columns ? columns : getColumns()}
          data={data}
          step={10}
          border={{
            header: {
              color: "brand",
            },
            body: {
              color: "border",
              side: "top",
              size: "1px",
            },
          }}
          background={{
            header: "background",
            body: ["white", "white"],
          }}
        />
      </Box>
      {!hidePagination && (
        <Box
          direction="row"
          justify="between"
          align="center"
          margin={{ top: "medium" }}
        >
          <PaginationRecordsPerPage filter={filter} onChange={setFilter} />
          <PaginationNavigator
            onChange={setFilter}
            filter={filter}
            totalElements={totalElements}
            elements={data}
            noScrollTop={noScrollTop}
            property="block_number"
          />
        </Box>
      )}
    </>
  );
}

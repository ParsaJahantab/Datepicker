import React, { useMemo } from "react";

import MOCK_DATA from "./MOCK_DATA.json";
import { COLUMNS } from "./columns";
import {
  Button,
  Center,
  Code,
  HStack,
  Select,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useTableStyles,
} from "@chakra-ui/react";
import { useTable, useSortBy, usePagination, useRowSelect, Row } from "react-table";
import { CheckBox } from "./CheckBox";

const CustomTable = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    rows,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    state,
    prepareRow,
    selectedFlatRows
  } = useTable(
    {
      columns,
      data,
      initialState : {pageIndex :0},
    },
    useSortBy,
    usePagination,
    useRowSelect,
  );

  const { pageIndex, pageSize } = state;

  return (
    <>
      <Center>
        <Button
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
          variant={"link"}
        >
          {"<<"}
        </Button>
        <Button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          variant={"link"}
        >
          {"<"}
        </Button>
        <span>
          <HStack>
            {pageIndex >= 2 && (
              <Button onClick={() => gotoPage(pageIndex - 2)} variant={"link"}>
                {pageIndex - 1}
              </Button>
            )}
            {pageIndex >= 1 && (
              <Button onClick={() => gotoPage(pageIndex - 1)} variant={"link"}>
                {pageIndex}
              </Button>
            )}
            <Button variant={"link"} color={"teal"}>
              {pageIndex + 1}
            </Button>
            {pageIndex < pageOptions.length - 1 && (
              <Button onClick={() => gotoPage(pageIndex + 1)} variant={"link"}>
                {pageIndex + 2}
              </Button>
            )}
            {pageIndex < pageOptions.length - 2 && (
              <Button onClick={() => gotoPage(pageIndex + 2)} variant={"link"}>
                {pageIndex + 3}
              </Button>
            )}
          </HStack>
        </span>
        <Button
          onClick={() => {
            nextPage();
            console.log(canNextPage);
          }}
          disabled={!canNextPage}
          variant={"link"}
        >
          {">"}
        </Button>
        <Button
          onClick={() => gotoPage(pageOptions.length - 1)}
          disabled={!canNextPage}
          variant={"link"}
        >
          {">>"}
        </Button>
        <Select width={"200px"}
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[10, 25, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              show {pageSize}
            </option>
          ))}
        </Select>
      </Center>
      <div>
        <Table {...getTableProps()}>
          <Thead>
            {" "}
            {...headerGroups.map((headerGroup) => (
              <Tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <Th {...column.getHeaderProps()}>
                    {column.render("Header")}
                    <span>
                      {column.isSorted ? (column.isSortedDesc ? "↑" : "↓") : ""}
                    </span>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {page.map((row: Row<{ id: number; settings: string; value: string; desc: string; bank_name: string; sub_system: string; }>) => {
              prepareRow(row);
              return (
                <Tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                    );
                  })}
                </Tr>
              );
            })}
          </Tbody>
          <pre>
            <Code>
              {JSON.stringify(
                {
                  selectedFlatRows: selectedFlatRows.map((row: { original: any; }) => row.original),
                },
                null,
                2
              )}
            </Code>
          </pre>
        </Table>
      </div>
    </>
  );
};

export default CustomTable;

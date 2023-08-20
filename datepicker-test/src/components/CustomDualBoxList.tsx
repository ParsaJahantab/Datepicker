import { Box, Button, Center, HStack, VStack } from "@chakra-ui/react";
import React, { useState } from "react";

interface Props {
  listOneOptions: string[];
}

const CustomDualBoxList = (props: Props) => {
  const [listOneOptions, setListOneOptions] = useState<string[]>(
    props.listOneOptions || []
  );
  const [listTwoOptions, setListTwoOptions] = useState<string[]>([]);
  const [selectedItemListOne, setSelectedItemListOne] = useState("");
  const [selectedItemListTwo, setSelectedItemListTwo] = useState("");

  const handleChangeListOne = (event: { target: { value: any } }) => {
    const selectedOption = event.target.value;
    setSelectedItemListOne(selectedOption);
  };
  const handleChangeListTwo = (event: { target: { value: any } }) => {
    const selectedOption = event.target.value;
    setSelectedItemListTwo(selectedOption);
  };

  const handleTransferOnlyOneItem = (
    TransferItem: string,
    setTransferItem: Function,
    deleteFromOptionList: string[],
    addToOptionList: string[],
    setDeleteFromOptionList: Function,
    setAddToOptionList: Function
  ) => {
    if (TransferItem !== "" && TransferItem !== undefined) {
      setAddToOptionList([...addToOptionList, TransferItem]);
      if (deleteFromOptionList.length > 1)
        setTransferItem(
          deleteFromOptionList[
            deleteFromOptionList.findIndex((item) => item == TransferItem) + 1
          ]
        );
      else setTransferItem("");

      setDeleteFromOptionList(
        deleteFromOptionList.filter((item) => item !== TransferItem)
      );
    }
  };

  const handleTransferAllItems = (
    deleteFromOptionList: string[],
    addToOptionList: string[],
    setDeleteFromOptionList: Function,
    setAddToOptionList: Function
  ) => {
    if (deleteFromOptionList.length > 0) {
      setAddToOptionList(addToOptionList.concat(deleteFromOptionList));
      setDeleteFromOptionList([]);
    }
  };

  return (
    <>
      <Center mt={"300px"}>
        <Box style={{ direction: "rtl" }}>
          <HStack>
            <VStack>
              <form action="#">
                <select
                  name="languages"
                  id="lang"
                  size={5}
                  style={{
                    width: "300px",
                    marginLeft: "30px",
                    borderWidth: "3px",
                    borderStyle: "solid",
                  }}
                  onChange={handleChangeListOne}
                >
                  {listOneOptions.map((listOneOption, index) => (
                    <option key={index} value={listOneOption}>
                      {listOneOption}
                    </option>
                  ))}
                </select>
              </form>
            </VStack>
            <VStack>
              <HStack>
                <Button
                  colorScheme="teal"
                  variant="solid"
                  size={"xs"}
                  onClick={() =>
                    handleTransferAllItems(
                      listTwoOptions,
                      listOneOptions,
                      setListTwoOptions,
                      setListOneOptions
                    )
                  }
                >
                  {"<<"}
                </Button>
                <Button
                  colorScheme="teal"
                  variant="solid"
                  size={"xs"}
                  onClick={() =>
                    handleTransferAllItems(
                      listOneOptions,
                      listTwoOptions,
                      setListOneOptions,
                      setListTwoOptions
                    )
                  }
                >
                  {">>"}
                </Button>
              </HStack>
              <HStack>
                <Button
                  colorScheme="teal"
                  variant="solid"
                  size={"xs"}
                  onClick={() =>
                    handleTransferOnlyOneItem(
                      selectedItemListTwo,
                      setSelectedItemListTwo,
                      listTwoOptions,
                      listOneOptions,
                      setListTwoOptions,
                      setListOneOptions
                    )
                  }
                >
                  {"<"}
                </Button>
                <Button
                  colorScheme="teal"
                  variant="solid"
                  size={"xs"}
                  onClick={() =>
                    handleTransferOnlyOneItem(
                      selectedItemListOne,
                      setSelectedItemListOne,
                      listOneOptions,
                      listTwoOptions,
                      setListOneOptions,
                      setListTwoOptions
                    )
                  }
                >
                  {">"}
                </Button>
              </HStack>
            </VStack>
            <VStack>
              <form action="#">
                <select
                  name="languages"
                  id="lang"
                  size={5}
                  multiple
                  onChange={handleChangeListTwo}
                  style={{
                    width: "300px",
                    marginRight: "30px",
                    borderWidth: "3px",
                    borderStyle: "solid",
                  }}
                >
                  {listTwoOptions.map((listTwoOption, index) => (
                    <option key={index} value={listTwoOption}>
                      {listTwoOption}
                    </option>
                  ))}
                </select>
              </form>
            </VStack>
          </HStack>
        </Box>
      </Center>
    </>
  );
};

export default CustomDualBoxList;

import React, { useRef, useState } from "react";
import { Button, ButtonGroup, HStack, Input, transition } from "@chakra-ui/react";
import DatePicker, { Calendar, DateObject } from "react-multi-date-picker";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import size from "react-element-popper/animations/size";
import DatePickerHeader from "react-multi-date-picker/plugins/date_picker_header";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import Icon from "react-multi-date-picker/components/icon"

const DatePickerTest = () => {
  const [date, setDate] = useState<DateObject | null>(new Date);
  const [clandertype, setClandertype] = useState<boolean>(true);
  const [year , setYear] = useState<number | undefined>(undefined);
  const [month , setMonth] = useState<number | undefined>(undefined);
  const [day , setDay] = useState<number | undefined>(undefined);
  const [hour , setHour] = useState<number | undefined>(undefined);
  const [minute , setMinute] = useState<number | undefined>(undefined);
  const [second , setSecond] = useState<number | undefined>(undefined);

  const datePickerRef = useRef();
  function handleChange(date: DateObject) {
    date.convert(persian , persian_fa)
    setDate(date);
    setYear(date.year)
    setMonth(date.month.number)
    setDay(date.day)
    console.log(date.day);
  }
  return (
    <>
    <HStack>
      <DatePicker
      render={<Icon/>}
        ref={datePickerRef}
        plugins={[
          <DatePickerHeader
            position="top"
            size="small"
            style={{ backgroundColor: "steelblue" }}
          />,
          <TimePicker position="bottom" hStep={1} mStep={1} sStep={1} />,
        ]}
        format="YYYY/MM/DD"
        className="rmdp-prime"
        showOtherDays
        animations={[size()]}
        value={date}
        onChange={handleChange}
        calendar={clandertype ? gregorian : persian}
        locale={clandertype ? gregorian_en : persian_fa}
      >
        <ButtonGroup variant="outline" spacing="1" mb={30}>
          <Button
            size={"sm"}
            color={"teal"}
            onClick={() => {
              if (clandertype) setClandertype(!clandertype);
            }}
          >
            شمسی
          </Button>

          <Button
            size={"sm"}
            color={"teal"}
            onClick={() => {
              if (!clandertype) setClandertype(!clandertype);
            }}
          >
            میلادی
          </Button>
          <Button
            size={"sm"}
            color={"teal"}
            onClick={() => {
                handleChange(new DateObject())
            }}
          >
            امروز
          </Button>
          <Button
            size={"sm"}
            color={"red"}
            onClick={() => {
              datePickerRef.current.closeCalendar();
            }}
          >
            بستن
          </Button>
        </ButtonGroup>
      </DatePicker>
      <Input value={year} htmlSize={4} width='auto' placeholder="سال"maxLength={4}></Input>
      <Input value={month}htmlSize={3} width='auto' placeholder="ماه"maxLength={2}></Input>
      <Input value={day}htmlSize={3} width='auto' placeholder="روز" maxLength={2}></Input>
      </HStack>
    </>
  );
};

export default DatePickerTest;

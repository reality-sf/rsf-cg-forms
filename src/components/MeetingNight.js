import React from "react";
import Select from "react-select";
import styled from "styled-components";

const NIGHTS = [
  { label: 'Monday', value: 'Monday' },
  { label: 'Tuesday', value: 'Tuesday' },
  { label: 'Wednesday', value: 'Wednesday' },
  { label: 'Thursday', value: 'Thursday' },
  { label: 'Friday', value: 'Friday' },
  { label: 'Saturday', value: 'Saturday' },
  { label: 'Sunday', value: 'Sunday' },
  { label: 'Saturday (Every other)', value: 'Saturday (Every other)' }
];

const SelectWrapper = styled.div`
  margin: 3px 0 12px;
`;

const MeetingNight = (props) => {
  return <SelectWrapper>
    <Select
      options={NIGHTS}
      getOptionLabel={(night) => night.label}
      {...props}
      value={NIGHTS.find((night) => night.value === props.value)}
    />
  </SelectWrapper>;
};

export default MeetingNight;

import React from "react";
import styled from "styled-components";

const Check = () => {
  return (
    <Box>
      <svg
        width="30"
        height="30"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.5858 13.4142L7.75735 10.5858L6.34314 12L10.5858 16.2427L17.6568 9.1716L16.2426 7.75739L10.5858 13.4142Z"
          fill="currentColor"
        />
      </svg>
    </Box>
  );
};
const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgb(52, 199, 123);
`;

export default React.memo(Check);

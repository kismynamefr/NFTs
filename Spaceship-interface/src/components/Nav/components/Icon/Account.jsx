import React from "react";
import styled from "styled-components";

function Account() {
  return (
    <Box>
      <img src="https://storage.googleapis.com/opensea-static/opensea-profile/8.png" />
    </Box>
  );
}

const Box = styled.div`
  border-radius: 50%;
  border: 2px solid rgb(229, 232, 235);
  height: 30px;
  width: 30px;
  max-height: 100%;
  max-width: 100%;
  overflow: hidden;
  img {
    object-fit: cover;
    height: 100%;
    object-fit: contain;
    transition: opacity 400ms ease 0s;
    width: 100%;
  }
`;

export default React.memo(Account);

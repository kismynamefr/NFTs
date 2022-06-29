import React from "react";
import styled from "styled-components";

const Pencil = ({width, height}) => {
  return (
    <Pencils>
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} style={{fill: 'rgba(255, 255, 255, 1)', transform: '', msfilter: ''}}><path d="M8.707 19.707 18 10.414 13.586 6l-9.293 9.293a1.003 1.003 0 0 0-.263.464L3 21l5.242-1.03c.176-.044.337-.135.465-.263zM21 7.414a2 2 0 0 0 0-2.828L19.414 3a2 2 0 0 0-2.828 0L15 4.586 19.414 9 21 7.414z" /></svg>
    </Pencils>
  );
};

const Pencils = styled.div`
  cursor: pointer;
  background-color: #333;
  padding: 2px;
  border-radius: 4px;
  height: 26px;
  width: 26px;
  cursor: pointer;
`;
export default React.memo(Pencil);
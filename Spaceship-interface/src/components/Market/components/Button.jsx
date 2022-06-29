import React from "react";
import styled from "styled-components";

const Button = () => {
  return (
    <Button_main>
      <Button_explore>Explore</Button_explore>
      <Button_create>Create</Button_create>
    </Button_main>
  );
};
const Button_main = styled.div`
  display: flex;
  gap: 20px;
`;
const Button_explore = styled.div`
  background-color: #000000;
  border: none;
  cursor: pointer;
  color: inhirit;
  padding: 17px 40px;
  text-align: center;
  display: inline-block;
  font-size: 16px;
  box-shadow: rgb(171 171 171 / 25%) 0px 0px 10px 0px;
  border-radius: 10px;
  transition-duration: 0.4s;
  &:hover {
    background-color: white;
    color: black;
  }
`;
const Button_create = styled.div`
  background-color: white;
  border: none;
  cursor: pointer;
  color: black;
  padding: 17px 40px;
  text-align: center;
  display: inline-block;
  font-size: 16px;
  box-shadow: rgb(171 171 171 / 25%) 0px 0px 10px 0px;
  border-radius: 10px;
  transition-duration: 0.4s;
  &:hover {
    background-color: black;
    color: white;
  }
`;

export default React.memo(Button);

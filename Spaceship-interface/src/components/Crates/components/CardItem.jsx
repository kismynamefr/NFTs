import React from "react";
import Title from "react-vanilla-tilt";
import styled from "styled-components";
import "./css/CardItem.css";

const Carditem = ({ item }) => {
  console.log("serial: ", item.serial);
  return (
    <Cards>
      <h1>
        Congratulations. You have a {item.nftName} #{item.tokenId}
      </h1>
      <section className="cards">
        <Title
          style={{ padding: 0, margin: 0, background: "none" }}
          options={{ scale: 2, max: 25 }}
        >
          <div
            className="card mewtwo animated"
            style={{ backgroundImage: `url(${item.URI})` }}
          />
        </Title>
      </section>
    </Cards>
  );
};
const Cards = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  text-align: center;
  h1 {
    background: -webkit-linear-gradient(
      120deg,
      rgb(0, 195, 254) 100%,
      rgb(0, 4, 254) 0%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0px 4px 3px rgb(0, 195, 254, 0.2),
      0px 8px 13px rgb(0, 195, 254, 0.2), 0px 18px 23px rgb(0, 195, 254, 0.2);
    text-transform: uppercase;
  }
`;

export default Carditem;

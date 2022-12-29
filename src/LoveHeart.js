import React from "react";
import styled from "styled-components";

const HeartContainer = styled.div`
  width: 100px;
  height: 90px;
  position: relative;
  transform: rotate(45deg) skew(-20deg);
`;

const Heart = styled.div`
  width: 100%;
  height: 100%;
  background: #e74c3c;
  border-radius: 50%;
  position: absolute;
  top: 0;
  left: 50%;
  transform: rotate(-45deg) skew(20deg);
`;

const LoveHeart = () => (
  <HeartContainer>
    <Heart />
  </HeartContainer>
);

export default LoveHeart;

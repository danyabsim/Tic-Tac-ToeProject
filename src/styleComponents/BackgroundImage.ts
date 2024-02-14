import styled from "styled-components";

export const BackgroundImage = styled.div<{ $marginRight?: string; $marginLeft?: string; }>`
  background-image: url('https://i.pinimg.com/originals/e4/d2/c1/e4d2c1d0da356797359acd9270bcdd77.gif');
  background-color: white;
  margin-right: ${props => props.$marginRight || '0'};
  margin-left: ${props => props.$marginLeft || '0'};
`;
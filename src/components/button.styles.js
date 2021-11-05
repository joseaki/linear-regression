import styled, { css } from "styled-components";

export default styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  margin: 8px 0;

  ${(props) =>
    props.primary
      ? css`
          border-radius: 8px;
          padding: 12px;
          background-color: #0041d0;
          color: white;
          font-weight: 500;
        `
      : css`
          border-radius: 8px;
          padding: 12px;
          background-color: #ff0072;
          color: white;
          font-weight: 500;
        `}
`;

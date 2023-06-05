import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    *{
        box-sizing: border-box;
    }
    html, body{
        background: #333333;
        width: 100%;
    }
`;

export default GlobalStyle;
import {createGlobalStyle} from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      
    }
    body {
      font-family: 'Noto Sans KR', sans-serif;
      background-color: #f5f5f5;
      height: 100vh;
    }
    div{
      max-width: 500px;
      width: 100%;
      height: 100%;
      margin: 0 auto;
      background-color: #fff;
    }
    
    a {
      text-decoration: none;
      color: inherit;
    }
    button {
      border: none;
      outline: none;
      background-color: transparent;
      cursor: pointer;
    }
    input {
      border: none;
      outline: none;
    }
    ul {
      list-style: none;
    }
    img {
      display: block;
    }
    h1, h2, h3, h4, h5, h6 {
      font-family: 'Pretendard', 'Noto Sans Kannada' ,sans-serif;
    }
`;

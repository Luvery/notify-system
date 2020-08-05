import { createGlobalStyle } from 'styled-components';
// import { colors } from '../../utils/colors';

const GlobalStyle = createGlobalStyle`
*, *::before, *::after{
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
html {
    font-size: 62.5%;


}
body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
    font-size: 1.6rem;
}

`;

export default GlobalStyle;

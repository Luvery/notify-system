import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '../../assets/styles/GlobalStyle';
import SEO from '../../components/SEO/SEO';
import Header from '../../components/Header/Header';
import { theme } from '../../assets/styles/theme';

const MainTemplate = ({ children }) => (
  <>
    <SEO />
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <>
        <Header />
        {children}
      </>
    </ThemeProvider>
  </>
);

MainTemplate.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default MainTemplate;

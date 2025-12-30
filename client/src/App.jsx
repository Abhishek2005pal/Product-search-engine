import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import HomePage from './pages/HomePage';
import SearchResultsPage from './pages/SearchResultsPage';

const theme = {
  token: {
    colorPrimary: '#667eea',
    borderRadius: 8,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
  },
};

function App() {
  return (
    <ConfigProvider theme={theme}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/results" element={<SearchResultsPage />} />
      </Routes>
    </ConfigProvider>
  );
}

export default App;


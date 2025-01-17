import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Documentation from './pages/Documentation';
import Processing from './pages/Processing';
import About from './pages/About';
import GitHubSetup from './pages/GitHubSetup';
import ApiDocs from './pages/ApiDocs';
import AlgorithmGuide from './pages/AlgorithmGuide';
import './App.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ 
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(135deg, #F9FAFB 0%, #F0F2F5 100%)',
        }}>
          <Navbar />
          <Box sx={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Documentation />} />
              <Route path="/processing" element={<Processing />} />
              <Route path="/about" element={<About />} />
              <Route path="/github-setup" element={<GitHubSetup />} />
              <Route path="/api-docs" element={<ApiDocs />} />
              <Route path="/algorithm-guide" element={<AlgorithmGuide />} />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;

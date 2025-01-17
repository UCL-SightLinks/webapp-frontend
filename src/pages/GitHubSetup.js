import { Container, Typography, Box, List, ListItem, ListItemIcon, ListItemText, IconButton, Snackbar, Stepper, Step, StepLabel, Alert, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { 
  GitHub, Code, Terminal, 
  CheckCircle, Build, PlayArrow,
  ContentCopy, Warning, Info
} from '@mui/icons-material';
import { useState } from 'react';
import { GlassPaper, PageContainer } from '../components/StyledComponents';

function GitHubSetup() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setSnackbarOpen(true);
  };

  const prerequisites = [
    { name: 'Node.js', version: '>=16.0.0', required: true },
    { name: 'npm', version: '>=8.0.0', required: true },
    { name: 'Git', version: '>=2.0.0', required: true },
    { name: 'Python', version: '>=3.8.0', required: false },
  ];

  const steps = [
    {
      title: 'Clone the Repository',
      description: 'Clone our GitHub repository to your local machine.',
      command: 'git clone https://github.com/your-org/satellite-cv.git',
      icon: GitHub,
      notes: [
        { type: 'info', text: 'Make sure you have Git installed and configured' },
        { type: 'warning', text: 'Ensure you have sufficient disk space (>2GB)' }
      ]
    },
    {
      title: 'Install Dependencies',
      description: 'Install all required dependencies for both frontend and backend.',
      command: 'cd satellite-cv && npm install',
      icon: Build,
      notes: [
        { type: 'info', text: 'This may take several minutes' },
        { type: 'warning', text: 'Requires Node.js version 16 or higher' }
      ],
      subCommands: [
        { title: 'Backend Dependencies', command: 'cd backend && pip install -r requirements.txt' },
        { title: 'Development Tools', command: 'npm install --save-dev @types/react @types/node' }
      ]
    },
    {
      title: 'Environment Setup',
      description: 'Set up your environment variables and configuration.',
      command: 'cp .env.example .env',
      icon: Code,
      notes: [
        { type: 'warning', text: 'Update API keys in .env before proceeding' }
      ],
      configExample: {
        API_KEY: 'your-api-key',
        BACKEND_URL: 'http://localhost:5000',
        MODEL_PATH: './models/detection_model.h5'
      }
    },
    {
      title: 'Run the Application',
      description: 'Start the development server and backend services.',
      command: 'npm start',
      icon: PlayArrow,
      notes: [
        { type: 'info', text: 'Frontend will run on port 3000' },
        { type: 'info', text: 'Backend will run on port 5000' }
      ],
      healthChecks: [
        { service: 'Frontend', url: 'http://localhost:3000' },
        { service: 'Backend API', url: 'http://localhost:5000/health' },
        { service: 'Model Service', url: 'http://localhost:5000/model/status' }
      ]
    }
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <Container maxWidth="lg">
      <PageContainer>
        <motion.div {...fadeInUp}>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography 
              variant="h3"
              gutterBottom
              sx={{
                fontWeight: 700,
                fontSize: '2.5rem',
                background: 'linear-gradient(45deg, #2D3436 30%, #636E72 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              GitHub Setup Guide
            </Typography>
            <Typography 
              variant="h6"
              color="text.secondary"
              sx={{ 
                maxWidth: '700px',
                mx: 'auto',
                mb: 4,
                fontWeight: 500,
                lineHeight: 1.6,
                fontSize: '1.125rem',
              }}
            >
              Follow these steps to set up and run our satellite computer vision project locally
            </Typography>
          </Box>

          <GlassPaper sx={{ p: 4, mb: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', mb: 3 }}>
              <Info sx={{ mr: 1, color: '#0984E3' }} />
              Prerequisites
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {prerequisites.map((prereq, index) => (
                <Chip
                  key={index}
                  label={`${prereq.name} ${prereq.version}`}
                  color={prereq.required ? 'primary' : 'default'}
                  variant={prereq.required ? 'filled' : 'outlined'}
                  size="small"
                  sx={{ px: 1 }}
                />
              ))}
            </Box>
          </GlassPaper>

          <GlassPaper sx={{ p: 4 }}>
            <Stepper 
              activeStep={activeStep} 
              orientation="horizontal" 
              sx={{ 
                mb: 6,
                '& .MuiStepConnector-line': {
                  borderColor: 'rgba(0, 0, 0, 0.08)'
                },
                '& .MuiStepIcon-root': {
                  color: 'rgba(0, 0, 0, 0.08)',
                  '&.Mui-active': {
                    color: '#0984E3'
                  },
                  '&.Mui-completed': {
                    color: '#0984E3'
                  }
                },
                '& .MuiStepLabel-label': {
                  color: 'text.secondary',
                  '&.Mui-active': {
                    color: 'text.primary',
                    fontWeight: 600
                  }
                }
              }}
            >
              {steps.map((step, index) => (
                <Step key={index} completed={activeStep > index}>
                  <StepLabel
                    onClick={() => setActiveStep(index)}
                    sx={{ 
                      cursor: 'pointer',
                      '& .MuiStepLabel-iconContainer': {
                        pr: 1
                      }
                    }}
                  >
                    {step.title}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>

            <List sx={{ '& > div:not(:last-child)': { mb: 6 } }}>
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ListItem 
                    sx={{ 
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      opacity: activeStep === index ? 1 : 0.5,
                      p: 0,
                    }}
                  >
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'flex-start', 
                      width: '100%',
                      mb: 3
                    }}>
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: '12px',
                          backgroundColor: 'rgba(9, 132, 227, 0.08)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          mr: 2,
                        }}
                      >
                        <step.icon sx={{ color: '#0984E3' }} />
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                          {step.title}
                        </Typography>
                        <Typography color="text.secondary">
                          {step.description}
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ width: '100%', pl: '52px' }}>
                      {step.notes.map((note, idx) => (
                        <Alert 
                          key={idx} 
                          severity={note.type}
                          sx={{ mb: 2 }}
                          icon={note.type === 'info' ? <Info /> : <Warning />}
                        >
                          {note.text}
                        </Alert>
                      ))}

                      <Box
                        sx={{
                          backgroundColor: 'rgba(0, 0, 0, 0.04)',
                          borderRadius: '8px',
                          p: 2,
                          width: '100%',
                          fontFamily: 'monospace',
                          position: 'relative',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.06)',
                          },
                          mb: step.subCommands || step.configExample || step.healthChecks ? 3 : 0,
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            color: 'text.primary',
                            fontFamily: 'monospace',
                          }}
                        >
                          $ {step.command}
                        </Typography>
                        <IconButton 
                          size="small" 
                          onClick={() => handleCopy(step.command)}
                          sx={{ 
                            opacity: 0.6,
                            ml: 2,
                            '&:hover': {
                              opacity: 1,
                              backgroundColor: 'rgba(9, 132, 227, 0.08)',
                            }
                          }}
                        >
                          <ContentCopy fontSize="small" />
                        </IconButton>
                      </Box>

                      {step.subCommands && (
                        <Box sx={{ mt: 3 }}>
                          {step.subCommands.map((subCmd, idx) => (
                            <Box
                              key={idx}
                              sx={{
                                mt: 2,
                                p: 2,
                                borderLeft: '2px solid rgba(9, 132, 227, 0.2)',
                                backgroundColor: 'rgba(9, 132, 227, 0.02)',
                              }}
                            >
                              <Typography variant="caption" display="block" sx={{ mb: 1, color: 'text.secondary' }}>
                                {subCmd.title}
                              </Typography>
                              <Box
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                                  borderRadius: '4px',
                                  p: 1.5,
                                }}
                              >
                                <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                                  $ {subCmd.command}
                                </Typography>
                                <IconButton 
                                  size="small"
                                  onClick={() => handleCopy(subCmd.command)}
                                  sx={{ ml: 2 }}
                                >
                                  <ContentCopy fontSize="small" />
                                </IconButton>
                              </Box>
                            </Box>
                          ))}
                        </Box>
                      )}

                      {step.configExample && (
                        <Box sx={{ mt: 3 }}>
                          <Typography variant="caption" display="block" sx={{ mb: 1, color: 'text.secondary' }}>
                            Example Configuration
                          </Typography>
                          <Box
                            sx={{
                              backgroundColor: 'rgba(0, 0, 0, 0.04)',
                              borderRadius: '8px',
                              p: 2,
                              fontFamily: 'monospace',
                            }}
                          >
                            <pre style={{ margin: 0, overflow: 'auto' }}>
                              {JSON.stringify(step.configExample, null, 2)}
                            </pre>
                          </Box>
                        </Box>
                      )}

                      {step.healthChecks && (
                        <Box sx={{ mt: 3 }}>
                          <Typography variant="caption" display="block" sx={{ mb: 1, color: 'text.secondary' }}>
                            Health Checks
                          </Typography>
                          <Box sx={{ 
                            backgroundColor: 'rgba(0, 0, 0, 0.04)',
                            borderRadius: '8px',
                            overflow: 'hidden'
                          }}>
                            {step.healthChecks.map((check, idx) => (
                              <Box
                                key={idx}
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                  p: 2,
                                  borderBottom: idx < step.healthChecks.length - 1 ? '1px solid rgba(0, 0, 0, 0.06)' : 'none',
                                }}
                              >
                                <Typography variant="body2">{check.service}</Typography>
                                <Typography variant="body2" sx={{ fontFamily: 'monospace', color: 'text.secondary' }}>
                                  {check.url}
                                </Typography>
                              </Box>
                            ))}
                          </Box>
                        </Box>
                      )}
                    </Box>
                  </ListItem>
                </motion.div>
              ))}
            </List>
          </GlassPaper>

          <Snackbar
            open={snackbarOpen}
            autoHideDuration={2000}
            onClose={() => setSnackbarOpen(false)}
            message="Command copied to clipboard"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          />
        </motion.div>
      </PageContainer>
    </Container>
  );
}

export default GitHubSetup; 
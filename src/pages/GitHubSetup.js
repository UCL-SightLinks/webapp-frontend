import React from 'react';
import { 
  Container, Typography, Box, List, ListItem, 
  Alert, Chip, Tooltip, 
  IconButton, Snackbar 
} from '@mui/material';
import { motion } from 'framer-motion';
import { 
  GitHub, Code, Terminal, 
  CheckCircle, Build, PlayArrow,
  ContentCopy as CopyIcon, 
  Warning, Info,
  CheckCircle as CheckIcon
} from '@mui/icons-material';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { GlassPaper, PageContainer, PageTitle, PageSubtitle } from '../components/StyledComponents';

const CommandBlock = styled(Box)(({ theme }) => ({
  backgroundColor: 'rgba(0, 0, 0, 0.04)',
  borderRadius: '12px',
  padding: theme.spacing(2),
  fontFamily: 'monospace',
  position: 'relative',
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  border: '1px solid rgba(0, 0, 0, 0.05)',
  '&:hover .copy-button-container': {
    opacity: 1,
  }
}));

const CopyButtonContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  right: 0,
  padding: theme.spacing(1),
  opacity: 0,
  transition: 'opacity 0.2s ease-in-out',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const CopyButton = styled(IconButton)(({ theme, copied }) => ({
  backgroundColor: copied ? 'rgba(76, 175, 80, 0.15)' : 'rgba(255, 255, 255, 0.85)',
  backdropFilter: 'blur(4px)',
  color: copied ? '#4caf50' : theme.palette.text.secondary,
  borderRadius: '10px',
  transition: 'all 0.2s ease-in-out',
  width: '38px',
  height: '38px',
  border: copied ? '1px solid rgba(76, 175, 80, 0.3)' : '1px solid rgba(0, 0, 0, 0.08)',
  '&:hover': {
    backgroundColor: copied ? 'rgba(76, 175, 80, 0.25)' : 'rgba(255, 255, 255, 1)',
    transform: 'translateY(-2px)',
    boxShadow: copied 
      ? '0 4px 12px rgba(76, 175, 80, 0.2)' 
      : '0 4px 12px rgba(9, 132, 227, 0.15)',
  },
  '& svg': {
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    transform: copied ? 'scale(1.1)' : 'scale(1)',
  }
}));

const StepCard = styled(GlassPaper)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  transition: 'all 0.3s ease-in-out',
  opacity: 1,
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.12)'
  }
}));

const IconContainer = styled(Box)(({ theme }) => ({
  width: 48,
  height: 48,
  borderRadius: '14px',
  backgroundColor: 'rgba(9, 132, 227, 0.08)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: theme.spacing(2),
}));

const StepNumber = styled(Box)(({ theme }) => ({
  width: 28,
  height: 28,
  borderRadius: '8px',
  backgroundColor: 'rgba(9, 132, 227, 0.1)',
  color: '#0984E3',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 600,
  fontSize: '0.875rem',
  marginRight: theme.spacing(2),
}));

const ConfigBlock = styled(Box)(({ theme }) => ({
  backgroundColor: 'rgba(0, 0, 0, 0.04)',
  borderRadius: '12px',
  padding: theme.spacing(2),
  fontFamily: 'monospace',
  fontSize: '0.875rem',
  border: '1px solid rgba(0, 0, 0, 0.05)',
}));

function GitHubSetup() {
  const [copiedStates, setCopiedStates] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedStates(prev => ({ ...prev, [id]: true }));
      setSnackbarMessage('Command copied to clipboard!');
      setSnackbarOpen(true);
      
    setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [id]: false }));
    }, 2000);
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const keyFeatures = [
    { 
      title: 'Input Formats', 
      description: 'Supports .jpg/.jgw files and .tif files with automatic zip extraction',
      icon: <Info sx={{ color: '#0984E3' }} />
    },
    { 
      title: 'Detection Models', 
      description: 'Advanced YOLO-based models with configurable thresholds',
      icon: <CheckCircle sx={{ color: '#0984E3' }} />
    },
    { 
      title: 'Georeferencing', 
      description: 'Converts pixel coordinates to geographical coordinates',
      icon: <Terminal sx={{ color: '#0984E3' }} />
    },
    { 
      title: 'Output Options', 
      description: 'Multiple output formats (JSON/TXT) with visualization options',
      icon: <Code sx={{ color: '#0984E3' }} />
    }
  ];

  const steps = [
    {
      id: 'clone',
      title: 'Clone the Repository',
      description: 'Clone the SightLinks repository to your local machine.',
      command: 'git clone https://github.com/UCL-SightLinks/SightLinks-Main.git && cd SightLinks-Main',
      icon: GitHub,
      notes: [
        { type: 'info', text: 'Make sure you have Git installed and configured' },
        { type: 'warning', text: 'Ensure you have sufficient disk space for image processing' }
      ]
    },
    {
      id: 'venv',
      title: 'Create Virtual Environment',
      description: 'Set up a Python virtual environment for isolated dependencies.',
      command: 'python -m venv venv',
      icon: Code,
      notes: [
        { type: 'info', text: 'This creates an isolated Python environment' }
      ],
      subCommands: [
        { 
          id: 'activate-unix', 
          title: 'Activate on macOS/Linux', 
          command: 'source venv/bin/activate'
        },
        { 
          id: 'activate-win', 
          title: 'Activate on Windows', 
          command: 'venv\\Scripts\\activate'
        }
      ]
    },
    {
      id: 'install',
      title: 'Install Dependencies',
      description: 'Install all required Python packages for SightLinks.',
      command: 'pip install -r requirements.txt',
      icon: Build,
      notes: [
        { type: 'info', text: 'This may take several minutes' },
        { type: 'warning', text: 'Requires Python 3.8 or higher' }
      ]
    },
    {
      id: 'run',
      title: 'Run SightLinks',
      description: 'Place your input files and run the system.',
      command: 'python run.py',
      icon: PlayArrow,
      notes: [
        { type: 'info', text: 'Place input files in the input/ directory before running' },
        { type: 'info', text: 'Supports .jpg/.jgw files and .tif files' }
      ],
      configExample: {
        uploadDir: "input",
        inputType: "0",              // "0" for .jpg/.jgw, "1" for .tif files
        classificationThreshold: 0.35,
        predictionThreshold: 0.5,
        saveLabeledImage: false,
        outputType: "0",             // "0" for JSON, "1" for TXT
        yolo_model_type: "n"         // "n" for nano model
      }
    }
  ];

  const inputFormatDetails = [
    {
      title: "Image Data (input_type=0)",
      items: [
        "Supported file types: ZIP, JPG, JPEG, PNG, JGW",
        "Must provide either a ZIP file containing JPG/PNG/JPEG + JGW files, or individual JPG/PNG/JPEG + JGW files",
        "System extracts contents from ZIP files if provided",
        "System copies individual files to the processing directory",
        "Hidden files starting with \"._\" are ignored"
      ]
    },
    {
      title: "GeoTIFF Data (input_type=1)",
      items: [
        "Supported file types: ZIP, TIF, TIFF",
        "Must provide either a ZIP file containing GeoTIFF files, or individual GeoTIFF files",
        "System extracts contents from ZIP files if provided",
        "System copies individual files to the processing directory",
        "Hidden files starting with \"._\" are ignored"
      ]
    }
  ];

  const fileManagementDetails = [
    "Each task creates a unique session ID: timestamp_uuid",
    "Files are uploaded to: input/{session_id}/",
    "Processing results saved to: run/output/{session_id}/",
    "Results are compressed into a ZIP file after processing",
    "Original directories are deleted after successful compression",
    "ZIP file integrity is verified after creation"
  ];

  const parameterValidationDetails = [
    { param: "input_type", desc: "Must be '0' (Image Data) or '1' (GeoTIFF Data)" },
    { param: "classification_threshold", desc: "String representation of float, default '0.35'" },
    { param: "prediction_threshold", desc: "String representation of float, default '0.5'" },
    { param: "save_labeled_image", desc: "String 'true' or 'false', default 'false'" },
    { param: "output_type", desc: "String '0' (JSON) or '1' (TXT), default '0'" },
    { param: "yolo_model_type", desc: "String 'n', 's', or 'm', default 'n'" }
  ];

  const renderCommandBlock = (command, id) => (
    <CommandBlock>
      <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
        $ {command}
      </Typography>
      <CopyButtonContainer className="copy-button-container">
        <Tooltip 
          title={copiedStates[id] ? "Copied!" : "Copy to clipboard"} 
          placement="left"
        >
          <CopyButton
            size="small"
            copied={copiedStates[id] ? 1 : 0}
            onClick={() => handleCopy(command, id)}
          >
            {copiedStates[id] ? <CheckIcon /> : <CopyIcon />}
          </CopyButton>
        </Tooltip>
      </CopyButtonContainer>
    </CommandBlock>
  );

  return (
    <Container maxWidth="lg">
      <PageContainer>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
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
              Local Setup Guide
            </Typography>
            <Typography 
              variant="h6" 
              color="text.secondary"
              sx={{ 
                maxWidth: '700px',
                mx: 'auto',
                mb: 3,
                fontWeight: 500,
                lineHeight: 1.6,
                fontSize: '1.125rem',
              }}
            >
              Follow these steps to set up and run SightLinks on your own device
            </Typography>
          </Box>

          <GlassPaper sx={{ p: 4, mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <GitHub sx={{ color: 'primary.main' }} />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Key Features
              </Typography>
            </Box>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
              {keyFeatures.map((feature, index) => (
                <Box 
                  key={index}
                  sx={{
                    display: 'flex',
                    p: 2,
                    borderRadius: '12px',
                    backgroundColor: 'rgba(9, 132, 227, 0.04)',
                    border: '1px solid rgba(9, 132, 227, 0.1)',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      backgroundColor: 'rgba(9, 132, 227, 0.08)',
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  <Box sx={{ mr: 2, mt: 0.5 }}>
                    {feature.icon}
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
            <Box sx={{ mt: 3, p: 2, borderRadius: '12px', backgroundColor: 'rgba(255, 153, 0, 0.08)', border: '1px solid rgba(255, 153, 0, 0.2)' }}>
              <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                <Warning sx={{ fontSize: 20, color: 'warning.main', mr: 1 }} />
                <strong>System Requirements:&ensp;</strong> Python 3.8+ required
              </Typography>
            </Box>
          </GlassPaper>

          <GlassPaper sx={{ p: 4, mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Terminal sx={{ color: 'primary.main' }} />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Technical Details
              </Typography>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                Input Formats
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
                {inputFormatDetails.map((format, index) => (
                  <Box 
                    key={index}
              sx={{ 
                      p: 2,
                      borderRadius: '12px',
                      backgroundColor: 'rgba(9, 132, 227, 0.04)',
                      border: '1px solid rgba(9, 132, 227, 0.1)',
                    }}
                  >
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: 'primary.main' }}>
                      {format.title}
                    </Typography>
                    <List dense disablePadding>
                      {format.items.map((item, idx) => (
                        <ListItem key={idx} sx={{ py: 0.5 }}>
                          <Typography variant="body2">• {item}</Typography>
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                ))}
              </Box>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                File Management
              </Typography>
              <Box 
                sx={{
                  p: 2,
                  borderRadius: '12px',
                  backgroundColor: 'rgba(9, 132, 227, 0.04)',
                  border: '1px solid rgba(9, 132, 227, 0.1)',
                }}
              >
                <List dense disablePadding>
                  {fileManagementDetails.map((item, idx) => (
                    <ListItem key={idx} sx={{ py: 0.5 }}>
                      <Typography variant="body2">• {item}</Typography>
                    </ListItem>
                  ))}
                </List>
              </Box>
          </Box>

            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                Parameter Validation
              </Typography>
              <Box 
                sx={{
                  p: 2,
                  borderRadius: '12px',
                  backgroundColor: 'rgba(9, 132, 227, 0.04)',
                  border: '1px solid rgba(9, 132, 227, 0.1)',
                }}
              >
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 2fr' }, gap: 1 }}>
                  {parameterValidationDetails.map((param, idx) => (
                    <React.Fragment key={idx}>
                      <Box sx={{ py: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600, fontFamily: 'monospace' }}>
                          {param.param}
                        </Typography>
                      </Box>
                      <Box sx={{ py: 1 }}>
                        <Typography variant="body2">
                          {param.desc}
                        </Typography>
                      </Box>
                    </React.Fragment>
                  ))}
                </Box>
              </Box>
            </Box>
          </GlassPaper>

          {steps.map((step, index) => (
            <StepCard 
              key={step.id} 
              sx={{ 
                p: 4, 
                mb: 4,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 40px rgba(0, 0, 0, 0.12)'
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
                <StepNumber>{index + 1}</StepNumber>
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, justifyContent: 'space-between' }}>
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                      {step.title}
                    </Typography>
                    <IconContainer>
                      <step.icon sx={{ color: '#0984E3', fontSize: 24 }} />
                    </IconContainer>
                  </Box>
                  <Typography color="text.secondary">
                    {step.description}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ ml: '60px' }}>
                {step.notes && step.notes.map((note, idx) => (
                  <Alert 
                    key={idx} 
                    severity={note.type}
                    sx={{ mb: 2 }}
                    icon={note.type === 'info' ? <Info /> : <Warning />}
                  >
                    {note.text}
                  </Alert>
                ))}

                {renderCommandBlock(step.command, `${step.id}-main`)}

                {step.subCommands && (
                  <Box sx={{ mt: 3 }}>
                    <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600, color: 'text.secondary' }}>
                      Additional Commands
                    </Typography>
                    {step.subCommands.map((subCmd, idx) => (
                      <Box key={idx} sx={{ mt: 2 }}>
                        <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                          {subCmd.title}
                        </Typography>
                        {renderCommandBlock(subCmd.command, `${step.id}-${subCmd.id}`)}
                      </Box>
                    ))}
                  </Box>
                )}

                {step.configExample && (
                  <Box sx={{ mt: 3 }}>
                    <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600, color: 'text.secondary' }}>
                      Example Configuration
                    </Typography>
                    <ConfigBlock>
                      <pre style={{ margin: 0, overflow: 'auto' }}>
                        {JSON.stringify(step.configExample, null, 2)}
                      </pre>
                    </ConfigBlock>
                  </Box>
                )}
              </Box>
            </StepCard>
          ))}
        </motion.div>
      </PageContainer>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default GitHubSetup; 
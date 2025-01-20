import { useState } from 'react';
import React from 'react';
import { 
  Container, Typography, Box, Button, ToggleButton, 
  ToggleButtonGroup, Paper, IconButton, LinearProgress, 
  Grid, Stepper, Step, StepLabel,
  useTheme,
  Switch,
  Alert,
  Snackbar,
  CircularProgress
} from '@mui/material';
import { 
  CloudUpload as UploadIcon,
  Close as CloseIcon,
  CheckCircle as CheckCircleIcon,
  Article as ArticleIcon,
  NavigateNext as NextIcon,
  Map as MapIcon,
  Category as CategoryIcon,
  Upload as UploadFileIcon,
  Chair as ChairIcon,
  TableRows as TableRowsIcon,
  Escalator as EscalatorIcon,
  DirectionsWalk as DirectionsWalkIcon,
  DataObject as DataObjectIcon,
  Info as InfoIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  height: '100%',
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(20px)',
  borderRadius: theme.shape.borderRadius * 2,
  transition: 'all 0.3s ease-in-out',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
  border: '1px solid rgba(255, 255, 255, 0.4)',
}));

const StyledStepIcon = styled('div')(({ theme, completed, active }) => ({
  width: 48,
  height: 48,
  borderRadius: '14px',
  backgroundColor: completed 
    ? 'rgba(9, 132, 227, 0.9)'
    : active 
    ? 'rgba(9, 132, 227, 0.1)'
    : theme.palette.grey[50],
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: completed 
    ? 'white'
    : active 
    ? theme.palette.primary.main
    : theme.palette.grey[400],
  transition: 'all 0.3s ease',
  boxShadow: completed || active 
    ? '0 4px 12px rgba(9, 132, 227, 0.2)'
    : 'none',
  transform: active ? 'scale(1.05)' : 'scale(1)',
}));

const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  borderRadius: '16px !important',
  padding: '24px',
  minHeight: '160px',
  border: '1px solid rgba(0, 0, 0, 0.08)',
  transition: 'all 0.3s ease',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  flex: 1,
  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.05)',
  '&.Mui-selected': {
    backgroundColor: 'rgba(9, 132, 227, 0.04)',
    border: '2px solid #0984E3',
    boxShadow: '0 8px 24px rgba(9, 132, 227, 0.15)',
  },
  '&:hover': {
    backgroundColor: 'rgba(9, 132, 227, 0.04)',
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
    borderColor: theme.palette.primary.main,
  }
}));

const IconContainer = styled(Box)(({ selected }) => ({
  width: 64,
  height: 64,
  borderRadius: '16px',
  background: selected 
    ? 'linear-gradient(135deg, #0984E3 0%, #74B9FF 100%)'
    : 'rgba(0, 0, 0, 0.04)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 12,
  marginLeft: 'auto',
  marginRight: 'auto',
  transition: 'all 0.3s ease',
  boxShadow: selected
    ? '0 8px 20px rgba(9, 132, 227, 0.2)'
    : 'none',
  transform: selected ? 'scale(1.05)' : 'scale(1)',
  '&:hover': {
    transform: 'scale(1.05)',
  }
}));

const ButtonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: theme.spacing(2),
  marginTop: 'auto',
  paddingTop: theme.spacing(3),
}));

const DetectionObjectCard = styled(Paper)(({ theme, selected }) => ({
  padding: theme.spacing(2.5),
  borderRadius: '16px',
  border: '1px solid rgba(0, 0, 0, 0.08)',
  backgroundColor: selected ? 'rgba(9, 132, 227, 0.04)' : 'rgba(255, 255, 255, 0.8)',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  overflow: 'visible',
  boxShadow: selected 
    ? '0 8px 24px rgba(9, 132, 227, 0.15)'
    : '0 2px 12px rgba(0, 0, 0, 0.05)',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
    borderColor: selected ? '#0984E3' : 'rgba(9, 132, 227, 0.3)',
    zIndex: 100,
  },
  ...(selected && {
    border: '2px solid #0984E3',
    backgroundColor: 'rgba(9, 132, 227, 0.04)',
    zIndex: 99,
  })
}));

const ObjectIcon = styled(Box)(({ theme, selected }) => ({
  width: 48,
  height: 48,
  borderRadius: '12px',
  background: selected 
    ? 'linear-gradient(135deg, #0984E3 0%, #74B9FF 100%)'
    : 'rgba(0, 0, 0, 0.04)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: theme.spacing(2),
  transition: 'all 0.3s ease',
  flexShrink: 0,
  '& svg': {
    fontSize: 24,
    color: selected ? 'white' : '#666666',
    transition: 'all 0.3s ease',
  }
}));

const FileCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(1.5),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderRadius: '16px',
  border: '1px solid rgba(0, 0, 0, 0.08)',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    boxShadow: '0 8px 24px rgba(9, 132, 227, 0.12)',
    border: '1px solid rgba(9, 132, 227, 0.2)',
    '& .file-icon-container': {
      backgroundColor: 'rgba(9, 132, 227, 0.12)',
      transform: 'scale(1.05)',
    },
    '& .file-icon': {
      color: '#0984E3',
      transform: 'scale(1.1)',
    },
    '& .file-type': {
      backgroundColor: 'rgba(9, 132, 227, 0.08)',
      color: '#0984E3',
    },
    '& .delete-button': {
      opacity: 1,
      transform: 'translateX(0) scale(1)',
      visibility: 'visible',
    }
  }
}));

const TooltipContent = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 'calc(100% + 12px)',
  left: '50%',
  transform: 'translateX(-50%) translateY(-10px)',
  zIndex: 1000,
  opacity: 0,
  visibility: 'hidden',
  transition: 'all 0.3s ease',
  minWidth: '280px',
  maxWidth: '320px',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '12px',
  overflow: 'visible',
  boxShadow: '0 12px 32px rgba(0, 0, 0, 0.18)',
  '.DetectionObjectCard:hover &': {
    opacity: 1,
    visibility: 'visible',
    transform: 'translateX(-50%) translateY(0)',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-6px',
    left: '50%',
    transform: 'translateX(-50%) rotate(45deg)',
    width: '12px',
    height: '12px',
    backgroundColor: 'rgba(9, 132, 227, 0.9)',
    borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    zIndex: 0,
  },
  '.tooltip-label': {
    backgroundColor: 'rgba(9, 132, 227, 0.9)',
    color: 'white',
    padding: '8px 16px',
    fontSize: '0.75rem',
    fontWeight: 600,
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    position: 'relative',
    zIndex: 1,
    borderTopLeftRadius: '12px',
    borderTopRightRadius: '12px',
  },
  '.tooltip-content': {
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    color: '#E2E8F0',
    padding: '12px 16px',
    fontSize: '0.8rem',
    fontFamily: 'monospace',
    lineHeight: '1.6',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    position: 'relative',
    zIndex: 1,
    borderBottomLeftRadius: '12px',
    borderBottomRightRadius: '12px',
  }
}));

const StyledSwitch = styled(Switch)(({ theme }) => ({
  width: 56,
  height: 32,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(24px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: '#0984E3',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 28,
    height: 28,
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  '& .MuiSwitch-track': {
    borderRadius: 32,
    backgroundColor: 'rgba(0,0,0,0.08)',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

const TetrominoLoader = styled('div')({
  position: 'relative',
  width: '224px',
  height: '224px',
  margin: '0 auto',
  marginBottom: '2rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const TetrominoContainer = styled('div')({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-112px, -96px)',
});

const Tetromino = styled('div')({
  width: '96px',
  height: '112px',
  position: 'absolute',
  transition: 'all ease 0.3s',
  background: `url('data:image/svg+xml;utf-8,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 612 684"%3E%3Cpath fill="%230984E3" d="M305.7 0L0 170.9v342.3L305.7 684 612 513.2V170.9L305.7 0z"/%3E%3Cpath fill="%23fff" d="M305.7 80.1l-233.6 131 233.6 131 234.2-131-234.2-131"/%3E%3C/svg%3E') no-repeat top center`,
  backgroundSize: 'contain',
});

function CustomStepIcon({ icon, completed, active }) {
  const getStepIcon = (step) => {
    switch (step) {
      case 1:
        return <MapIcon fontSize="small" />;
      case 2:
        return <CategoryIcon fontSize="small" />;
      case 3:
        return <UploadFileIcon fontSize="small" />;
      default:
        return null;
    }
  };

  return (
    <StyledStepIcon completed={completed} active={active}>
      {completed ? <CheckCircleIcon fontSize="small" /> : getStepIcon(icon)}
    </StyledStepIcon>
  );
}

const ContinueButton = styled(Button)(({ theme }) => ({
  flex: 1,
  padding: '12px 24px',
  borderRadius: '10px',
  background: 'linear-gradient(45deg, #0984E3 30%, #74B9FF 90%)',
  boxShadow: '0 8px 24px rgba(9, 132, 227, 0.25)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '& .arrow-icon': {
    opacity: 0,
    width: 0,
    marginLeft: 0,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 12px 28px rgba(9, 132, 227, 0.3)',
    '& .arrow-icon': {
      opacity: 1,
      width: '24px',
      marginLeft: theme.spacing(1),
    }
  },
  '&:active': {
    transform: 'translateY(0)',
    boxShadow: '0 8px 24px rgba(9, 132, 227, 0.25)',
  }
}));

// Update API configuration
const API_CONFIG = {
  baseUrl: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5010',
  endpoints: {
    webPredict: '/web/predict',
    status: '/web/status',
    download: '/download'
  }
};

// Add processing stages configuration
const PROCESSING_STAGES = {
  'Initializing': 5,
  'Extracting files': 10,
  'Initializing model': 20,
  'Processing images': 40,
  'Segmenting images': 60,
  'Creating bounding boxes': 70,
  'Saving results': 80,
  'Creating ZIP file': 90,
  'Completed': 100
};

// Add keyframe animations
const GlobalStyles = styled('style')({
  '& @keyframes tetromino1': {
    '0%, 40%': {
      transform: 'translate(0, 0)',
    },
    '50%': {
      transform: 'translate(48px, -27px)',
    },
    '60%, 100%': {
      transform: 'translate(96px, 0)',
    },
  },
  '& @keyframes tetromino2': {
    '0%, 20%': {
      transform: 'translate(96px, 0px)',
    },
    '40%, 100%': {
      transform: 'translate(144px, 27px)',
    },
  },
  '& @keyframes tetromino3': {
    '0%': {
      transform: 'translate(144px, 27px)',
    },
    '20%, 60%': {
      transform: 'translate(96px, 54px)',
    },
    '90%, 100%': {
      transform: 'translate(48px, 27px)',
    },
  },
  '& @keyframes tetromino4': {
    '0%, 60%': {
      transform: 'translate(48px, 27px)',
    },
    '90%, 100%': {
      transform: 'translate(0, 0)',
    },
  },
});

function Processing() {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedObjects, setSelectedObjects] = useState(['Zebra Cross']);
  const [inputType, setInputType] = useState('DigiMap');
  const [outputFormat, setOutputFormat] = useState('JSON');
  const [saveLabeledImages, setSaveLabeledImages] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processSuccess, setProcessSuccess] = useState(false);
  const [progress, setProgress] = useState(0);
  const [apiError, setApiError] = useState(null);
  const [processingId, setProcessingId] = useState(null);
  const [statusCheckInterval, setStatusCheckInterval] = useState(null);
  const [taskId, setTaskId] = useState(null);
  const [downloadToken, setDownloadToken] = useState(null);
  const [processingStage, setProcessingStage] = useState('');
  const [isCancelling, setIsCancelling] = useState(false);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      const zipFiles = acceptedFiles.filter(
        file => file.type === 'application/zip' || file.name.endsWith('.zip')
      );
      if (zipFiles.length === 0) {
        setApiError('Please upload a ZIP file');
        return;
      }
      setUploadedFiles(zipFiles);
    },
    accept: {
      'application/zip': ['.zip']
    },
    multiple: false
  });

  // Update API-related functions
  const uploadToApi = async (files) => {
    try {
      const formData = new FormData();
      const zipFile = files.find(file => file.type === 'application/zip' || file.name.endsWith('.zip'));
      if (!zipFile) {
        throw new Error('Please upload a ZIP file containing images');
      }
      formData.append('file', zipFile);
      
      // Match exact parameter names from API doc
      formData.append('input_type', inputType === 'DigiMap' ? '0' : '1');
      formData.append('save_labeled_image', saveLabeledImages ? 'true' : 'false');
      formData.append('classification_threshold', '0.35');
      formData.append('prediction_threshold', '0.5');
      formData.append('yolo_model_type', 'n');
      formData.append('output_type', outputFormat === 'JSON' ? '0' : '1');

      console.log('Sending request to:', `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.webPredict}`);
      const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.webPredict}`, {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      console.log('Upload response:', data);
      
      if (!response.ok) {
        throw new Error(data.error || `API Error: ${response.statusText}`);
      }

      if (data.task_id) {
        console.log('Received task ID:', data.task_id);
        setTaskId(data.task_id);
        setProcessingStage(data.message || 'Task queued successfully');
        startStatusCheck(data.task_id);
      } else {
        throw new Error('No task ID received from server');
      }
    } catch (error) {
      console.error('Upload error:', error);
      setApiError(error.message);
      setIsProcessing(false);
      setProcessSuccess(false);
    }
  };

  const checkProcessingStatus = async (id) => {
    if (!id) return;
    
    try {
      const statusUrl = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.status}/${id}`;
      console.log('Checking status at:', statusUrl);
      
      const response = await fetch(statusUrl);
      const data = await response.json();
      console.log('Status response:', data);

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Task not found');
        }
        throw new Error(data.error || 'Failed to check status');
      }

      // Update progress and stage based on API response
      setProgress(data.progress || 0);
      setProcessingStage(data.stage || 'Processing...');

      switch (data.status) {
        case 'completed':
          console.log('Processing completed, download token:', data.download_token);
          clearInterval(statusCheckInterval);
          setStatusCheckInterval(null);
          setProcessSuccess(true);
          setIsProcessing(false);
          if (data.download_token) {
            setDownloadToken(data.download_token);
          } else {
            throw new Error('No download token received');
          }
          break;
        case 'failed':
          console.error('Processing failed:', data.error);
          clearInterval(statusCheckInterval);
          setStatusCheckInterval(null);
          setIsProcessing(false);
          setProcessSuccess(false);
          throw new Error(data.error || 'Processing failed');
        case 'queued':
          console.log('Task queued');
          setProcessingStage('Waiting in queue...');
          break;
        case 'processing':
          console.log('Processing:', data.stage, data.progress + '%');
          break;
        default:
          console.warn('Unknown status:', data.status);
          break;
      }
    } catch (error) {
      console.error('Status check error:', error);
      if (error.message === 'Task not found' || error.message.includes('failed')) {
        clearInterval(statusCheckInterval);
        setStatusCheckInterval(null);
        setApiError(error.message);
        setIsProcessing(false);
        setProcessSuccess(false);
      }
    }
  };

  const handleDownload = async () => {
    if (!downloadToken) {
      setApiError('No download token available');
      return;
    }

    try {
      console.log('Downloading with token:', downloadToken);
      const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.download}/${downloadToken}`);

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Invalid or expired download token');
        } else if (response.status === 404) {
          throw new Error('Results not found');
        }
        throw new Error('Failed to download results');
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `results.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download error:', error);
      setApiError(error.message);
    }
  };

  const startStatusCheck = (id) => {
    if (statusCheckInterval) {
      clearInterval(statusCheckInterval);
    }
    
    // Immediate first check
    checkProcessingStatus(id);
    
    // Then start polling every 2 seconds
    const interval = setInterval(() => checkProcessingStatus(id), 4000);
    setStatusCheckInterval(interval);
  };

  // Modify handleStartProcessing
  const handleStartProcessing = async () => {
    setIsProcessing(true);
    setProgress(0);
    setProcessSuccess(false);
    setApiError(null);
    setProcessingStage('Starting upload...');
    await uploadToApi(uploadedFiles);
  };

  // Update cleanup effect
  React.useEffect(() => {
    return () => {
      if (statusCheckInterval) {
        clearInterval(statusCheckInterval);
      }
    };
  }, [statusCheckInterval]);

  // Add task ID cleanup
  React.useEffect(() => {
    return () => {
      setTaskId(null);
      setDownloadToken(null);
    };
  }, []);

  // Add error handling UI
  const handleCloseError = () => {
    setApiError(null);
  };

  // Add cancel handler
  const handleCancelProcessing = async () => {
    if (!taskId || isCancelling) return;
    
    try {
      setIsCancelling(true);
      const response = await fetch(`${API_CONFIG.baseUrl}/web/cancel/${taskId}`, {
        method: 'POST'
      });

      if (!response.ok) {
        throw new Error('Failed to cancel processing');
      }

      // Clear interval and reset states
      if (statusCheckInterval) {
        clearInterval(statusCheckInterval);
        setStatusCheckInterval(null);
      }
      setApiError('Processing cancelled');
      setIsProcessing(false);
      setProcessSuccess(false);
      setProgress(0);
      setTaskId(null);
      setProcessingStage('Cancelled');
    } catch (error) {
      console.error('Cancel error:', error);
      setApiError(error.message);
    } finally {
      setIsCancelling(false);
    }
  };

  const steps = [
    {
      label: 'Input & Output',
      description: 'Choose data source and output format',
      content: (
        <Box sx={{ 
          py: 4,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '600px'
        }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
              Input & Output Settings
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 4, fontSize: '1rem' }}>
              Configure your data source and result format
            </Typography>
            
            {/* Input Type Selection */}
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
              Input Type
            </Typography>
            <Grid container spacing={2} sx={{ mb: 4 }}>
              <Grid item xs={12} sm={6}>
                <DetectionObjectCard
                  selected={inputType === 'DigiMap'}
                  onClick={() => setInputType('DigiMap')}
                  elevation={inputType === 'DigiMap' ? 2 : 1}
                  className="DetectionObjectCard"
                  sx={{ 
                    overflow: 'visible',
                    position: 'relative',
                    zIndex: inputType === 'DigiMap' ? 2 : 1
                  }}
                >
                  <ObjectIcon selected={inputType === 'DigiMap'}>
                    <MapIcon sx={{ 
                      fontSize: 24,
                      color: inputType === 'DigiMap' ? 'white' : '#666666'
                    }} />
                  </ObjectIcon>
                  <Box sx={{ flex: 1 }}>
                    <Typography 
                      variant="subtitle1" 
                      sx={{ 
                        fontWeight: 600,
                        color: inputType === 'DigiMap' ? '#0984E3' : 'text.primary'
                      }}
                    >
                      DigiMap Data
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ opacity: 0.8 }}
                    >
                      Process DigiMap format files
                    </Typography>
                  </Box>
                  <TooltipContent>
                    <div className="tooltip-label">Supported Format</div>
                    <div className="tooltip-content">
                      {`• ZIP file directly downloaded from DigiMap
• Contains all necessary data
• No modification needed`}
                    </div>
                  </TooltipContent>
                </DetectionObjectCard>
              </Grid>
              <Grid item xs={12} sm={6}>
                <DetectionObjectCard
                  selected={inputType === 'Custom'}
                  onClick={() => setInputType('Custom')}
                  elevation={inputType === 'Custom' ? 2 : 1}
                  className="DetectionObjectCard"
                  sx={{ 
                    overflow: 'visible',
                    position: 'relative',
                    zIndex: inputType === 'Custom' ? 2 : 1
                  }}
                >
                  <ObjectIcon selected={inputType === 'Custom'}>
                    <CategoryIcon sx={{ 
                      fontSize: 24,
                      color: inputType === 'Custom' ? 'white' : '#666666'
                    }} />
                  </ObjectIcon>
                  <Box sx={{ flex: 1 }}>
                    <Typography 
                      variant="subtitle1" 
                      sx={{ 
                        fontWeight: 600,
                        color: inputType === 'Custom' ? '#0984E3' : 'text.primary'
                      }}
                    >
                      Custom Data
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ opacity: 0.8 }}
                    >
                      Process custom format files
                    </Typography>
                  </Box>
                  <TooltipContent>
                    <div className="tooltip-label">Supported Formats</div>
                    <div className="tooltip-content">
                      {`• Option 1: Individual Files
  - Image file (.jpg)
  - World file (.jgw)
  - Must have same name

• Option 2: ZIP Archive
  - Contains .jpg + .jgw files
  - Files must match names`}
                    </div>
                  </TooltipContent>
                </DetectionObjectCard>
              </Grid>
            </Grid>

            {/* Output Format Section */}
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
              Output Format
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <DetectionObjectCard
                  selected={outputFormat === 'JSON'}
                  onClick={() => setOutputFormat('JSON')}
                  elevation={outputFormat === 'JSON' ? 2 : 1}
                  className="DetectionObjectCard"
                  sx={{ 
                    overflow: 'visible', 
                    position: 'relative',
                    zIndex: outputFormat === 'JSON' ? 2 : 1
                  }}
                >
                  <ObjectIcon selected={outputFormat === 'JSON'}>
                    <Typography
                      sx={{
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        fontSize: '1rem',
                        color: outputFormat === 'JSON' ? 'white' : '#666666'
                      }}
                    >
                      JSON
                    </Typography>
                  </ObjectIcon>
                  <Box sx={{ flex: 1 }}>
                    <Typography 
                      variant="subtitle1" 
                      sx={{ 
                        fontWeight: 600,
                        color: outputFormat === 'JSON' ? '#0984E3' : 'text.primary'
                      }}
                    >
                      JSON Format
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ opacity: 0.8 }}
                    >
                      Combined structured data
                    </Typography>
                  </Box>
                  <TooltipContent>
                    <div className="tooltip-label">Example Format</div>
                    <div className="tooltip-content">
                      {`[{
  "image": "example.jpg",
  "coordinates": [
    [-0.176, 51.488]
  ]
}]`}
                    </div>
                  </TooltipContent>
                </DetectionObjectCard>
              </Grid>
              <Grid item xs={12} sm={6}>
                <DetectionObjectCard
                  selected={outputFormat === 'TXT'}
                  onClick={() => setOutputFormat('TXT')}
                  elevation={outputFormat === 'TXT' ? 2 : 1}
                  className="DetectionObjectCard"
                  sx={{ 
                    overflow: 'visible',
                    position: 'relative',
                    zIndex: outputFormat === 'TXT' ? 2 : 1
                  }}
                >
                  <ObjectIcon selected={outputFormat === 'TXT'}>
                    <Typography
                      sx={{
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        fontSize: '1rem',
                        color: outputFormat === 'TXT' ? 'white' : '#666666'
                      }}
                    >
                      TXT
                    </Typography>
                  </ObjectIcon>
                  <Box sx={{ flex: 1 }}>
                    <Typography 
                      variant="subtitle1" 
                      sx={{ 
                        fontWeight: 600,
                        color: outputFormat === 'TXT' ? '#0984E3' : 'text.primary'
                      }}
                    >
                      TXT Format
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ opacity: 0.8 }}
                    >
                      Individual coordinate points
                    </Typography>
                  </Box>
                  <TooltipContent>
                    <div className="tooltip-label">Example Format</div>
                    <div className="tooltip-content">
                      {`# example.txt
# Each line represents one shape with coordinates
-0.176 51.488 -0.177 51.489 -0.175 51.487`}
                    </div>
                  </TooltipContent>
                </DetectionObjectCard>
              </Grid>
            </Grid>
          </Box>

          <ButtonContainer>
            <ContinueButton
              variant="contained"
              onClick={() => setActiveStep(1)}
              disabled={!inputType}
              sx={{ 
                flex: 1,
                py: 1.5,
                borderRadius: '10px',
              }}
            >
              Continue
              <NextIcon className="arrow-icon" />
            </ContinueButton>
          </ButtonContainer>
        </Box>
      )
    },
    {
      label: 'Detection Settings',
      description: 'Select objects to detect and visualization options',
      content: (
        <Box sx={{ 
          py: 4,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '600px'
        }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
              Detection Settings
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 4, fontSize: '1rem' }}>
              Choose detection objects and visualization options
            </Typography>
            
            {/* Detection Objects Section */}
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
              Detection Objects
            </Typography>
            <Grid container spacing={2} sx={{ mb: 4 }}>
              {[
                { id: 'Zebra Cross', icon: <TableRowsIcon />, label: 'Zebra Crossings', description: 'Identify pedestrian crossings' },
              ].map((item) => (
                <Grid item xs={12} sm={6} key={item.id}>
                  <DetectionObjectCard
                    selected={selectedObjects.includes(item.id)}
                    onClick={() => {
                      setSelectedObjects(prev => 
                        prev.includes(item.id)
                          ? prev.filter(i => i !== item.id)
                          : [...prev, item.id]
                      );
                    }}
                    elevation={selectedObjects.includes(item.id) ? 2 : 1}
                  >
                    <ObjectIcon selected={selectedObjects.includes(item.id)}>
                      {React.cloneElement(item.icon, { 
                        sx: { 
                          fontSize: 24,
                          color: selectedObjects.includes(item.id) ? 'white' : '#666666'
                        } 
                      })}
                    </ObjectIcon>
                    <Box sx={{ flex: 1 }}>
                      <Typography 
                        variant="subtitle1" 
                        sx={{ 
                          fontWeight: 600,
                          color: selectedObjects.includes(item.id) ? '#0984E3' : 'text.primary'
                        }}
                      >
                        {item.label}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ opacity: 0.8 }}
                      >
                        {item.description}
                      </Typography>
                    </Box>
                  </DetectionObjectCard>
                </Grid>
              ))}
            </Grid>

            {/* Save Labeled Images Toggle */}
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
              Visualization Options
            </Typography>
            <DetectionObjectCard
              sx={{ 
                cursor: 'default',
                '&:hover': {
                  transform: 'none',
                  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.05)',
                }
              }}
            >
              <ObjectIcon selected={saveLabeledImages}>
                <CheckCircleIcon sx={{ 
                  fontSize: 24,
                  color: saveLabeledImages ? 'white' : '#666666',
                  transition: 'all 0.3s ease',
                }} />
              </ObjectIcon>
              <Box sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography 
                      variant="subtitle1" 
                      sx={{ 
                        fontWeight: 600,
                        color: saveLabeledImages ? '#0984E3' : 'text.primary',
                        transition: 'color 0.3s ease',
                      }}
                    >
                      Save Labeled Images
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ opacity: 0.8 }}
                    >
                      Generate images with highlighted detected objects
                    </Typography>
                  </Box>
                  <StyledSwitch
                    checked={saveLabeledImages}
                    onChange={(e) => setSaveLabeledImages(e.target.checked)}
                  />
                </Box>
              </Box>
            </DetectionObjectCard>
          </Box>

          <ButtonContainer>
            <Button
              variant="outlined"
              onClick={() => setActiveStep(0)}
              sx={{
                flex: 1,
                py: 1.5,
                borderRadius: '10px',
              }}
            >
              Back
            </Button>
            <ContinueButton
              variant="contained"
              onClick={() => setActiveStep(2)}
              disabled={selectedObjects.length === 0}
              sx={{ 
                flex: 1,
                py: 1.5,
                borderRadius: '10px',
              }}
            >
              Continue
              <NextIcon className="arrow-icon" />
            </ContinueButton>
          </ButtonContainer>
        </Box>
      )
    },
    {
      label: 'Upload Files',
      description: 'Upload your files for processing',
      content: (
        <Box sx={{ 
          py: 4,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '600px'
        }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
              Upload Your Files
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 4, fontSize: '1rem' }}>
              Drag and drop your files or click to browse
            </Typography>
            <Typography 
              variant="body2" 
              color="text.secondary" 
              sx={{ 
                mb: 3, 
                fontSize: '0.875rem',
                backgroundColor: 'rgba(9, 132, 227, 0.08)',
                px: 2,
                py: 1.5,
                borderRadius: '10px',
                lineHeight: 1.5
              }}
            >
              {inputType === 'DigiMap' 
                ? 'Upload the complete ZIP file exported from DigiMap containing all necessary data'
                : 'Upload matching image and label files (same filename) or a ZIP containing both files'}
            </Typography>

            <StyledPaper
              {...getRootProps()}
              sx={{
                cursor: 'pointer',
                textAlign: 'center',
                py: uploadedFiles.length > 0 ? 2.5 : 4,
                px: 3,
                minHeight: uploadedFiles.length > 0 ? '100px' : '250px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 1.5,
                background: isDragActive 
                  ? 'rgba(9, 132, 227, 0.04)' 
                  : uploadedFiles.length > 0
                  ? 'rgba(255, 255, 255, 0.7)'
                  : 'rgba(255, 255, 255, 0.9)',
                border: `2px dashed ${
                  isDragActive 
                    ? '#0984E3' 
                    : uploadedFiles.length > 0
                    ? 'rgba(9, 132, 227, 0.1)'
                    : 'rgba(9, 132, 227, 0.2)'
                }`,
                transition: 'all 0.3s ease',
                '&:hover': {
                  border: '2px dashed #0984E3',
                  backgroundColor: 'rgba(9, 132, 227, 0.04)',
                  transform: 'translateY(-2px)',
                }
              }}
            >
              <input {...getInputProps()} accept={inputType === 'DigiMap' ? '.zip' : '.jpg,.jgw,.zip'} />
              {uploadedFiles.length > 0 ? (
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'flex-start', 
                  gap: 2,
                  width: '100%',
                  maxWidth: '240px',
                  margin: '0 auto'
                }}>
                  <Box
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: '10px',
                      background: 'linear-gradient(135deg, rgba(9, 132, 227, 0.1) 0%, rgba(116, 185, 255, 0.1) 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <UploadIcon sx={{ 
                      fontSize: 18, 
                      color: 'rgba(9, 132, 227, 0.6)',
                    }} />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.25, color: 'text.primary' }}>
                      Add more files
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                      or drop them here
                    </Typography>
                  </Box>
                </Box>
              ) : (
                <>
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: '16px',
                      background: 'linear-gradient(135deg, rgba(9, 132, 227, 0.1) 0%, rgba(116, 185, 255, 0.1) 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto',
                    }}
                  >
                    <UploadIcon sx={{ 
                      fontSize: 28, 
                      color: isDragActive ? '#0984E3' : 'rgba(9, 132, 227, 0.6)',
                      transition: 'all 0.3s ease',
                    }} />
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75, alignItems: 'center' }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1.125rem' }}>
                      {isDragActive ? 'Drop files here' : 'Upload Files'}
                    </Typography>
                    <Typography color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                      {isDragActive ? 'Release to upload files' : 'Drag and drop files here or click to browse'}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ opacity: 0.8 }}>
                      {inputType === 'DigiMap' 
                        ? 'Supported format: .zip'
                        : 'Supported formats: .jpg + .jgw files or .zip containing both files'}
                    </Typography>
                  </Box>
                </>
              )}
            </StyledPaper>

            {uploadedFiles.length > 0 && (
              <Box sx={{ mt: 3 }}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  mb: 2 
                }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    Uploaded Files
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ 
                      backgroundColor: 'rgba(9, 132, 227, 0.08)',
                      px: 1.5,
                      py: 0.5,
                      borderRadius: '20px',
                      fontWeight: 500,
                      fontSize: '0.75rem'
                    }}
                  >
                    {uploadedFiles.length} {uploadedFiles.length === 1 ? 'file' : 'files'}
                  </Typography>
                </Box>
                {uploadedFiles.map((file, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      duration: 0.3,
                      delay: index * 0.1,
                      ease: "easeOut"
                    }}
                  >
                    <FileCard>
                      <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                        <Box
                          className="file-icon-container"
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: '14px',
                            backgroundColor: 'rgba(9, 132, 227, 0.08)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mr: 2,
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          }}
                        >
                          <ArticleIcon 
                            className="file-icon"
                            sx={{ 
                              color: 'rgba(9, 132, 227, 0.6)',
                              fontSize: 20,
                              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            }} 
                          />
                        </Box>
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Typography 
                            variant="subtitle2" 
                            sx={{ 
                              fontWeight: 600,
                              color: 'text.primary',
                              mb: 0.5,
                              textAlign: 'left',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap'
                            }}
                          >
                            {file.name}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Typography 
                              className="file-type"
                              variant="caption" 
                              sx={{ 
                                color: 'text.secondary',
                                backgroundColor: 'rgba(0, 0, 0, 0.04)',
                                px: 1.5,
                                py: 0.5,
                                borderRadius: '20px',
                                fontWeight: 500,
                                textTransform: 'uppercase',
                                letterSpacing: '0.02em',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                              }}
                            >
                              {file.name.split('.').pop().toUpperCase()}
                            </Typography>
                            <Typography 
                              variant="caption" 
                              color="text.secondary"
                              sx={{ flexShrink: 0 }}
                            >
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                      <IconButton 
                        className="delete-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          const element = e.currentTarget.parentElement;
                          element.style.opacity = '0';
                          element.style.transform = 'scale(0.95)';
                          setTimeout(() => {
                            setUploadedFiles(files => files.filter((_, i) => i !== index));
                          }, 200);
                        }}
                        sx={{
                          width: 32,
                          height: 32,
                          color: 'text.secondary',
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          opacity: 0,
                          visibility: 'hidden',
                          transform: 'translateX(10px) scale(0.8)',
                          backgroundColor: 'rgba(0, 0, 0, 0.04)',
                          '&:hover': {
                            backgroundColor: '#EF5350',
                            color: 'white',
                            transform: 'translateX(0) scale(1.1)',
                          }
                        }}
                      >
                        <CloseIcon sx={{ 
                          fontSize: 18,
                          transition: 'all 0.2s ease',
                        }} />
                      </IconButton>
                    </FileCard>
                  </motion.div>
                ))}
              </Box>
            )}
          </Box>

          <ButtonContainer>
            <Button
              variant="outlined"
              onClick={() => setActiveStep(1)}
              sx={{
                flex: 1,
                py: 1.5,
                borderRadius: '10px',
              }}
            >
              Back
            </Button>
            <ContinueButton
              variant="contained"
              onClick={handleStartProcessing}
              disabled={uploadedFiles.length === 0}
              sx={{ 
                flex: 1,
                py: 1.5,
                borderRadius: '10px',
              }}
            >
              Start Processing
              <NextIcon className="arrow-icon" />
            </ContinueButton>
          </ButtonContainer>
        </Box>
      )
    }
  ];

  // Update the processing status display
  const renderProcessingStatus = () => {
    const currentStage = Object.entries(PROCESSING_STAGES).find(
      ([_, stageProgress]) => progress <= stageProgress
    )?.[0] || 'Processing...';

    const getCurrentAndUpcomingStages = () => {
      const allStages = Object.entries(PROCESSING_STAGES);
      const currentIndex = allStages.findIndex(([_, stageProgress]) => progress <= stageProgress);
      const start = Math.max(0, currentIndex - 1);
      return allStages.slice(start, start + 3);
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <StyledPaper 
          sx={{ 
            p: { xs: 4, md: 6 },
            background: 'white',
            position: 'relative',
            overflow: 'hidden',
            minHeight: '500px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: 4
          }}
        >
          {/* Cancel Button */}
          <Box sx={{ 
            position: 'absolute',
            top: 24,
            right: 24
          }}>
            <IconButton
              onClick={handleCancelProcessing}
              disabled={isCancelling}
              sx={{
                color: 'rgba(239, 83, 80, 0.8)',
                '&:hover': {
                  backgroundColor: 'rgba(239, 83, 80, 0.04)'
                }
              }}
            >
              {isCancelling ? (
                <CircularProgress size={20} sx={{ color: 'rgba(239, 83, 80, 0.8)' }} />
              ) : (
                <CloseIcon />
              )}
            </IconButton>
          </Box>

          {/* Progress Circle */}
          <Box sx={{ 
            width: { xs: '120px', md: '160px' },
            height: { xs: '120px', md: '160px' },
            position: 'relative',
            mt: 4
          }}>
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                background: `conic-gradient(from 0deg, 
                  #0984E3 0%, 
                  #0984E3 ${progress}%, 
                  #E8F4FF ${progress}%, 
                  #E8F4FF 100%
                )`,
                transform: 'translate(-50%, -50%) rotate(-90deg)',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  inset: '8px',
                  borderRadius: '50%',
                  background: 'white'
                }
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                zIndex: 1
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 600,
                  color: '#0984E3',
                  fontSize: { xs: '1.75rem', md: '2rem' }
                }}
              >
                {progress}%
              </Typography>
            </Box>
          </Box>

          {/* Status Text */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
              Processing Files
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {currentStage}
            </Typography>
          </Box>

          {/* Stages Timeline */}
          <Box sx={{ 
            width: '100%',
            maxWidth: '400px'
          }}>
            {getCurrentAndUpcomingStages().map(([stage, stageProgress], index) => (
              <motion.div
                key={stage}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Box
                  sx={{
                    p: 2,
                    mb: 1.5,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2
                  }}
                >
                  <Box
                    sx={{
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      backgroundColor: progress >= stageProgress ? 
                        '#0984E3' : 
                        'rgba(0, 0, 0, 0.04)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white'
                    }}
                  >
                    {progress >= stageProgress ? (
                      <CheckCircleIcon sx={{ fontSize: 16 }} />
                    ) : (
                      <CircularProgress 
                        size={14} 
                        thickness={6}
                        sx={{ color: 'rgba(0, 0, 0, 0.2)' }} 
                      />
                    )}
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant="body2"
                      sx={{
                        color: progress >= stageProgress ? 
                          'text.primary' : 
                          'text.secondary',
                        fontWeight: progress >= stageProgress ? 500 : 400,
                        mb: 0.5
                      }}
                    >
                      {stage}
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={progress >= stageProgress ? 100 : 0}
                      sx={{
                        height: 2,
                        borderRadius: 1,
                        backgroundColor: 'rgba(0, 0, 0, 0.04)',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: '#0984E3'
                        }
                      }}
                    />
                  </Box>
                </Box>
              </motion.div>
            ))}
          </Box>

          {/* Info Message */}
          <Box 
            sx={{ 
              mt: 'auto',
              pt: 2,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              backgroundColor: 'rgba(25, 118, 210, 0.04)',
              borderRadius: '12px',
              py: 1.5,
              px: 3
            }}
          >
            <InfoIcon sx={{ fontSize: 20, color: '#0984E3' }} />
            <Typography variant="body2" color="text.secondary">
              Please keep this window open while processing
            </Typography>
          </Box>
        </StyledPaper>
      </motion.div>
    );
  };

  // Reset all states
  const resetStates = () => {
    setProcessSuccess(false);
    setUploadedFiles([]);
    setProgress(0);
    setActiveStep(0);
    setTaskId(null);
    setDownloadToken(null);
    setProcessingStage('');
    setApiError(null);
    setIsProcessing(false);
    if (statusCheckInterval) {
      clearInterval(statusCheckInterval);
      setStatusCheckInterval(null);
    }
  };

  return (
    <Container maxWidth="lg">
      <GlobalStyles />
      <Snackbar 
        open={!!apiError} 
        autoHideDuration={6000} 
        onClose={handleCloseError}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
          {apiError}
        </Alert>
      </Snackbar>
      
      <Box sx={{ py: 8 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
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
                Online Processing
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
                Transform your satellite imagery with our advanced computer vision technology
              </Typography>
            </motion.div>
          </Box>

          {!isProcessing && !processSuccess ? (
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <StyledPaper 
                  sx={{ 
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%)',
                  }}
                >
                  <Stepper 
                    activeStep={activeStep} 
                    orientation="vertical"
                    sx={{
                      '.MuiStepConnector-line': {
                        minHeight: 40,
                      }
                    }}
                  >
                    {steps.map((step, index) => (
                      <Step key={index}>
                        <StepLabel 
                          StepIconComponent={(props) => (
                            <CustomStepIcon {...props} active={activeStep === index} />
                          )}
                        >
                          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            {step.label}
                          </Typography>
                          {activeStep === index && (
                            <motion.div
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <Typography 
                                variant="body2" 
                                color="text.secondary"
                                sx={{ 
                                  mt: 0.5,
                                  opacity: 0.8
                                }}
                              >
                                {step.description}
                              </Typography>
                            </motion.div>
                          )}
                        </StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </StyledPaper>
              </Grid>
              <Grid item xs={12} md={8}>
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <StyledPaper>
                    {steps[activeStep].content}
                  </StyledPaper>
                </motion.div>
              </Grid>
            </Grid>
          ) : isProcessing ? (
            renderProcessingStatus()
          ) : processSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <StyledPaper 
                sx={{ 
                  p: 8,
                  textAlign: 'center',
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%)',
                }}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5,
                    delay: 0.2,
                    ease: "easeOut"
                  }}
                >
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                      delay: 0.3
                    }}
                  >
                    <Box
                      sx={{
                        width: 100,
                        height: 100,
                        borderRadius: '30px',
                        background: 'linear-gradient(135deg, #4CAF50 0%, #81C784 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto',
                        mb: 4,
                        boxShadow: '0 12px 32px rgba(76, 175, 80, 0.2)',
                      }}
                    >
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          damping: 20,
                          delay: 0.5
                        }}
                      >
                        <CheckCircleIcon 
                          sx={{ 
                            fontSize: 50,
                            color: 'white',
                          }} 
                        />
                      </motion.div>
                    </Box>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                  >
                    <Typography 
                      variant="h3" 
                      gutterBottom 
                      sx={{ 
                        fontWeight: 700,
                        background: 'linear-gradient(45deg, #2D3436 30%, #636E72 90%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        mb: 2,
                      }}
                    >
                      Success!
                    </Typography>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        color: 'text.secondary',
                        mb: 6,
                        maxWidth: '500px',
                        mx: 'auto',
                        lineHeight: 1.6,
                      }}
                    >
                      Your files have been successfully processed and are ready for download
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 1.5,
                        mb: 6,
                        background: 'linear-gradient(135deg, rgba(9, 132, 227, 0.08) 0%, rgba(116, 185, 255, 0.08) 100%)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '12px',
                        border: '1px solid rgba(9, 132, 227, 0.12)',
                        py: 1.5,
                        px: 3,
                        maxWidth: 'fit-content',
                        mx: 'auto',
                        boxShadow: '0 4px 12px rgba(9, 132, 227, 0.08)',
                      }}
                    >
                      <Box
                        sx={{
                          width: 24,
                          height: 24,
                          borderRadius: '50%',
                          backgroundColor: 'rgba(9, 132, 227, 0.12)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: '14px',
                            color: '#0984E3',
                            lineHeight: 1,
                          }}
                        >
                          ℹ️
                        </Typography>
                      </Box>
                      <Typography
                        variant="body2"
                        sx={{
                          color: '#0984E3',
                          fontWeight: 300,
                          letterSpacing: '0.01em',
                        }}
                      >
                        Results will be expired in 2 hours
                      </Typography>
                    </Box>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                  >
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        justifyContent: 'center', 
                        gap: 2,
                      }}
                    >
                      <Button
                        variant="outlined"
                        onClick={resetStates}
                        sx={{
                          flex: 1,
                          py: 1.5,
                          borderRadius: '10px',
                          maxWidth: 280,
                        }}
                      >
                        Process New Files
                      </Button>
                      <ContinueButton
                        variant="contained"
                        onClick={handleDownload}
                        sx={{ 
                          flex: '0 1 280px',
                        }}
                      >
                        Download Results
                        <NextIcon className="arrow-icon" />
                      </ContinueButton>
                    </Box>
                  </motion.div>
                </motion.div>
              </StyledPaper>
            </motion.div>
          ) : null}
        </motion.div>
      </Box>
    </Container>
  );
}

export default Processing; 
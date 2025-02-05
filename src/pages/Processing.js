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
  CircularProgress,
  Tooltip
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
  Info as InfoIcon,
  Settings as SettingsIcon,
  Queue as QueueIcon,
  Memory as MemoryIcon,
  Folder as FolderIcon,
  ErrorOutline as ErrorOutlineIcon
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
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
  baseUrl: 'http://api.sightlinks.org',  // Updated base URL
  endpoints: {
    webPredict: '/web/predict',
    status: '/web/status',
    download: '/download',
    cancel: '/web/cancel',
    serverStatus: '/api/server-status'
  }
};

const defaultHeaders = {
  'Accept': 'application/json'
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

// Add new styled components for server status
const ServerStatusContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, 0.06)',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1.5),  // Reduced gap
  flex: 0,
  justifyContent: 'flex-end'
}));

const StatusCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1.5),  // Reduced padding
  borderRadius: theme.shape.borderRadius,
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
  border: '1px solid rgba(0, 0, 0, 0.04)',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),  // Reduced gap
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
  }
}));

const StatusIcon = styled(Box)(({ theme, color }) => ({
  width: 36,  // Reduced size
  height: 36,  // Reduced size
  borderRadius: 10,
  backgroundColor: `rgba(${color}, 0.1)`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '& svg': {
    fontSize: 18,  // Reduced size
    color: `rgb(${color})`,
  }
}));

// Add server status state
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
  const [hasDetections, setHasDetections] = useState(null);
  const [serverStatus, setServerStatus] = useState({
    total_tasks_processed: 0,
    total_files_processed: 0,
    failed_tasks: 0,
    cancelled_tasks: 0,
    current_tasks: 0,
    queued_tasks: 0,
    uptime_seconds: 0,
    max_concurrent_tasks: 0,
    max_queue_size: 0,
    cpu_usage_percent: 0
  });
  const [statusError, setStatusError] = useState(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      // Reset any previous errors
      setApiError(null);

      // Only accept ZIP files
      const zipFiles = acceptedFiles.filter(
        file => file.type === 'application/zip' || file.name.endsWith('.zip')
      );

      if (zipFiles.length === 0) {
        setApiError('Please upload a ZIP file containing your data');
        return;
      }

      setUploadedFiles([...uploadedFiles, ...zipFiles]);
    },
    accept: { 'application/zip': ['.zip'] },
    multiple: true,
    noClick: false,
    noKeyboard: false
  });

  const uploadToApi = async (files) => {
    try {
      const formData = new FormData();
      
      // API only accepts ZIP files
      const zipFile = files.find(file => file.type === 'application/zip' || file.name.endsWith('.zip'));
      if (!zipFile) {
        throw new Error('Only ZIP files are accepted for processing');
      }
      formData.append('file', zipFile);
      
      // Convert parameters to the exact types expected by the API
      formData.append('input_type', String(inputType === 'DigiMap' ? 0 : 1));
      formData.append('save_labeled_image', String(saveLabeledImages));
      formData.append('classification_threshold', String(0.35));
      formData.append('prediction_threshold', String(0.5));
      formData.append('yolo_model_type', 'n');
      formData.append('output_type', String(outputFormat === 'JSON' ? 0 : 1));

      console.log('Uploading files to API...');
      console.log('API URL:', `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.webPredict}`);

      const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.webPredict}`, {
        method: 'POST',
        body: formData,
        mode: 'cors',
        credentials: 'omit',
        headers: defaultHeaders
      });

      const data = await response.json();
      console.log('Upload response:', data);
      
      if (!response.ok) {
        if (response.status === 503) {
          throw new Error('Server is busy. Please try again later.');
        }
        throw new Error(data.error || `API Error: ${response.statusText}`);
      }

      if (data.task_id) {
        console.log('Task ID received:', data.task_id);
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
    if (!id) {
      console.log('No task ID provided for status check');
      return;
    }

    try {
      console.log('Checking status for task:', id);
      const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.status}/${id}`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'omit',
        headers: defaultHeaders
      });

      const data = await response.json();
      console.log('Status response:', data);

      // Only ignore updates if explicitly cancelled
      if (isCancelling) {
        console.log('Processing was cancelled, ignoring status update');
        return;
      }

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Task not found');
        }
        throw new Error(data.error || 'Failed to check status');
      }

      // Update progress and stage with proper fallbacks
      const newProgress = typeof data.percentage === 'number' ? data.percentage : 0;
      setProgress(newProgress);

      // Better status message handling with fallbacks
      let statusMessage = 'Processing...';
      if (data.log) {
        statusMessage = data.log;
      } else if (newProgress === 0) {
        statusMessage = 'Task queued, waiting to start...';
      } else if (newProgress === 100) {
        statusMessage = 'Processing complete';
      } else if (newProgress > 0) {
        statusMessage = `Processing: ${newProgress}% complete`;
      }
      setProcessingStage(statusMessage);

      // Handle error in response
      if (data.error) {
        throw new Error(data.error);
      }

      // Update has_detections state when available
      if (typeof data.has_detections === 'boolean') {
        setHasDetections(data.has_detections);
      }

      // Handle download token
      if (data.download_token) {
        console.log('Processing complete, download token:', data.download_token);
        // Ensure we reach 100% before completing
        setProgress(100);
        setProcessingStage('Processing complete');
        
        // Wait for progress animation to complete
        setTimeout(() => {
          // Double check we haven't been cancelled during the timeout
          if (!isCancelling) {
            if (statusCheckInterval) {
              clearInterval(statusCheckInterval);
              setStatusCheckInterval(null);
            }
            setProcessSuccess(true);
            setIsProcessing(false);
            setDownloadToken(data.download_token);
          }
        }, 1000);
      }
    } catch (error) {
      console.error('Status check error:', error);
      setApiError(error.message);
      if (statusCheckInterval) {
        clearInterval(statusCheckInterval);
        setStatusCheckInterval(null);
      }
      setIsProcessing(false);
      setProcessSuccess(false);
      // Set a clear error message in the processing stage
      setProcessingStage('Error: ' + error.message);
    }
  };

  const startStatusCheck = (id) => {
    if (statusCheckInterval) {
      clearInterval(statusCheckInterval);
    }
    
    // Reset states when starting new check
    setIsCancelling(false);
    setProcessingStage('Initializing task...');
    setProgress(0);
    
    // Immediately check status
    checkProcessingStatus(id);
    
    // Set up interval for subsequent checks
    const interval = setInterval(() => {
      checkProcessingStatus(id);
    }, 3000);
    
    setStatusCheckInterval(interval);
  };

  const handleDownload = async () => {
    if (!downloadToken) {
      setApiError('No download token available');
      return;
    }

    try {
      console.log('Initiating download...');
      const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.download}/${downloadToken}`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'omit',
        headers: {
          ...defaultHeaders,
          'Accept': 'application/zip'
        }
      });

      if (!response.ok) {
        console.error('Download failed:', response.status, response.statusText);
        if (response.status === 401) {
          throw new Error('Invalid or expired download token');
        } else if (response.status === 404) {
          throw new Error('Results not found');
        } else if (response.status === 500) {
          throw new Error('Server error while downloading results');
        }
        throw new Error('Failed to download results');
      }
      
      const blob = await response.blob();
      console.log('Download successful, blob size:', blob.size);
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

  const handleStartProcessing = async () => {
    setIsProcessing(true);
    setProgress(0);
    setDisplayProgress(0);
    progressRef.current = 0;
    setProcessSuccess(false);
    setApiError(null);
    setProcessingStage('Starting upload...');
    await uploadToApi(uploadedFiles);
  };

  React.useEffect(() => {
    return () => {
      if (statusCheckInterval) {
        clearInterval(statusCheckInterval);
      }
    };
  }, [statusCheckInterval]);

  React.useEffect(() => {
    return () => {
      setTaskId(null);
      setDownloadToken(null);
    };
  }, []);

  const handleCloseError = () => {
    setApiError(null);
  };

  const handleCancelProcessing = async () => {
    if (!taskId || isCancelling) return;
    
    try {
      setIsCancelling(true);
      console.log('Cancelling task:', taskId);
      
      const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.cancel}/${taskId}`, {
        method: 'POST',
        mode: 'cors',
        credentials: 'omit',
        headers: {
          ...defaultHeaders,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      console.log('Cancel response:', data);

      if (!response.ok) {
        throw new Error(data.error || 'Failed to cancel processing');
      }

      // Only after successful API cancellation, update local states
      if (statusCheckInterval) {
        clearInterval(statusCheckInterval);
        setStatusCheckInterval(null);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      setIsProcessing(false);
      setTaskId(null);
      setProgress(0);
      setDisplayProgress(0);
      progressRef.current = 0;
      setProcessingStage('Processing cancelled');
      setDownloadToken(null);
      setProcessSuccess(false);
      setApiError('Processing cancelled by user');

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
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        {/* Delete Single File Button */}
                        <Tooltip 
                          title="Delete this file" 
                          placement="top"
                          arrow
                        >
                      <IconButton 
                        className="delete-button"
                        onClick={(e) => {
                          e.stopPropagation();
                              const newFiles = uploadedFiles.filter((_, i) => i !== index);
                              setUploadedFiles(newFiles);
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
                        </Tooltip>

                        {/* Delete Pair Button - Only show for JPG/JGW files */}
                        {(file.name.toLowerCase().endsWith('.jpg') || 
                          file.name.toLowerCase().endsWith('.jpeg') ||
                          file.name.toLowerCase().endsWith('.jgw')) && (
                          <Tooltip 
                            title={`Delete both ${file.name.slice(0, -4)}.jpg and ${file.name.slice(0, -4)}.jgw files`}
                            placement="top"
                            arrow
                          >
                            <IconButton 
                              className="delete-button"
                              onClick={(e) => {
                                e.stopPropagation();
                                const baseName = file.name.slice(0, -4);
                                const newFiles = uploadedFiles.filter(f => {
                                  const fileBaseName = f.name.slice(0, -4);
                                  return fileBaseName !== baseName;
                                });
                                setUploadedFiles(newFiles);
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
                                  backgroundColor: '#FF9800',
                                  color: 'white',
                                  transform: 'translateX(0) scale(1.1)',
                                }
                              }}
                            >
                              <Box 
                                component="span" 
                                sx={{ 
                                  fontSize: '14px',
                                  fontWeight: 'bold',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}
                              >
                                2×
                              </Box>
                            </IconButton>
                          </Tooltip>
                        )}
                      </Box>
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

  // Add animated progress value with linear interpolation
  const [animatedProgress, setAnimatedProgress] = React.useState(0);
  const [displayProgress, setDisplayProgress] = React.useState(0);
  const progressRef = React.useRef(0);
  const animationFrameRef = React.useRef();

  // Update the progress animation effect
  React.useEffect(() => {
    const animateProgress = () => {
      const diff = progress - progressRef.current;
      
      // If the difference is very small, snap to the target value
      if (Math.abs(diff) < 0.5) {
        progressRef.current = progress;
        setDisplayProgress(Math.round(progress));
        cancelAnimationFrame(animationFrameRef.current);
        return;
      }

      // Calculate step size based on the difference
      const stepSize = Math.max(Math.abs(diff) * 0.15, 0.5); // Minimum step of 0.5
      const step = diff > 0 ? stepSize : -stepSize;

      // Update the progress
      const nextProgress = progressRef.current + step;
      
      // Ensure we don't overshoot
      if ((diff > 0 && nextProgress > progress) || (diff < 0 && nextProgress < progress)) {
        progressRef.current = progress;
        setDisplayProgress(Math.round(progress));
      } else {
        progressRef.current = nextProgress;
        setDisplayProgress(Math.round(nextProgress));
      }

      // Continue animation
      animationFrameRef.current = requestAnimationFrame(animateProgress);
    };

    // Start animation
    animationFrameRef.current = requestAnimationFrame(animateProgress);

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [progress]);

  // Add cleanup for animation frame on unmount
  React.useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Update the progress circle component
  const renderProgressCircle = () => (
          <Box
            sx={{
              position: 'relative',
        width: { xs: '260px', md: '300px' },
        height: { xs: '260px', md: '300px' },
              display: 'flex',
              alignItems: 'center',
        justifyContent: 'center',
        mt: 2
            }}
          >
      {/* Background Glow */}
              <Box
                sx={{
                  position: 'absolute',
          width: '140%',
          height: '140%',
          background: `radial-gradient(circle, rgba(9, 132, 227, 0.08) 0%, transparent 70%)`,
          animation: 'pulse 2s infinite',
          '@keyframes pulse': {
            '0%': {
              transform: 'scale(0.95)',
              opacity: 0.5,
            },
            '50%': {
              transform: 'scale(1)',
              opacity: 0.3,
            },
            '100%': {
              transform: 'scale(0.95)',
              opacity: 0.5,
            },
          },
        }}
      />

      {/* Background Circle */}
      <CircularProgress
        variant="determinate"
        value={100}
        size="100%"
        thickness={2}
              sx={{
                position: 'absolute',
          color: 'rgba(0, 0, 0, 0.04)',
          transform: 'rotate(-90deg)'
        }}
      />
      
      {/* Progress Circle */}
      <CircularProgress
        variant="determinate"
        value={displayProgress}
        size="100%"
        thickness={2}
        sx={{
                  position: 'absolute',
          color: '#0984E3',
          transform: 'rotate(-90deg)',
          '& .MuiCircularProgress-circle': {
            strokeLinecap: 'round',
            transition: 'stroke-dashoffset 0.3s linear'
                }
              }}
            />

            {/* Progress Text */}
            <Box
              sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
              <Typography
            variant="h2"
                sx={{
              fontWeight: 600,
              fontSize: { xs: '3.5rem', md: '4rem' },
              color: '#0984E3',
              fontFamily: 'monospace',
              letterSpacing: '-0.05em',
                  lineHeight: 1,
                  mb: 1
                }}
              >
            {displayProgress}
              </Typography>
              <Typography
            variant="h5"
                sx={{
              fontWeight: 600,
              fontSize: { xs: '1.25rem', md: '1.5rem' },
              color: '#0984E3',
              opacity: 0.5,
                  fontFamily: 'monospace',
              letterSpacing: '-0.05em'
                }}
              >
            %
              </Typography>
            </Box>
          </Box>
    </Box>
  );

  // Update the processing status render function
  const renderProcessingStatus = () => {
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
            minHeight: '600px',
              display: 'flex',
              flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            gap: 4,
            borderRadius: '24px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
            border: '1px solid rgba(0, 0, 0, 0.06)'
          }}
        >
          {/* Cancel Button */}
          <IconButton
            onClick={handleCancelProcessing}
            disabled={isCancelling}
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              width: 36,
              height: 36,
              backgroundColor: 'white',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
              color: 'rgba(0, 0, 0, 0.5)',
              '&:hover': {
                backgroundColor: '#FEF2F2',
                color: '#EF4444',
                borderColor: '#FEE2E2',
              },
              transition: 'all 0.2s ease',
              zIndex: 10
            }}
          >
            {isCancelling ? (
              <CircularProgress size={16} sx={{ color: 'rgba(0, 0, 0, 0.4)' }} />
            ) : (
              <CloseIcon sx={{ fontSize: 16 }} />
            )}
          </IconButton>

          {/* Progress Circle */}
                <Box
                  sx={{
                    position: 'relative',
              width: { xs: '240px', md: '280px' },
              height: { xs: '240px', md: '280px' },
                    display: 'flex',
                    alignItems: 'center',
              justifyContent: 'center',
              mt: 2,
              animation: 'floatContainer 6s ease-in-out infinite',
              '@keyframes floatContainer': {
                '0%, 100%': {
                  transform: 'translateY(0px) scale(1)',
                },
                '50%': {
                  transform: 'translateY(-10px) scale(1.02)',
                },
              }
            }}
          >
            {/* Background Glow */}
                  <Box
                    sx={{
                        position: 'absolute',
                width: '180%',
                height: '180%',
                background: `radial-gradient(circle, rgba(9, 132, 227, 0.12) 0%, rgba(116, 185, 255, 0.08) 40%, transparent 70%)`,
                animation: 'glowPulse 4s ease-in-out infinite',
                '@keyframes glowPulse': {
                  '0%, 100%': {
                    transform: 'scale(0.8) rotate(0deg)',
                    opacity: 0.3,
                  },
                  '50%': {
                    transform: 'scale(1.2) rotate(180deg)',
                    opacity: 0.5,
                  }
                }
              }}
            />
            
            {/* Progress Circle with Gradient */}
            <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
              <svg width="100%" height="100%" viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)' }}>
                <defs>
                  <linearGradient id="circleGradient" gradientTransform="rotate(0)">
                    <stop offset="0%" stopColor="#0984E3">
                      <animate
                        attributeName="stop-color"
                        values="#0984E3; #74B9FF; #4FB7FF; #0984E3"
                        dur="4s"
                        repeatCount="indefinite"
                      />
                    </stop>
                    <stop offset="50%" stopColor="#4FB7FF">
                      <animate
                        attributeName="stop-color"
                        values="#4FB7FF; #0984E3; #74B9FF; #4FB7FF"
                        dur="4s"
                        repeatCount="indefinite"
                      />
                    </stop>
                    <stop offset="100%" stopColor="#74B9FF">
                      <animate
                        attributeName="stop-color"
                        values="#74B9FF; #4FB7FF; #0984E3; #74B9FF"
                        dur="4s"
                        repeatCount="indefinite"
                      />
                    </stop>
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="url(#circleGradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={`${displayProgress * 2.83}, 283`}
                  filter="url(#glow)"
                  style={{
                    transition: 'stroke-dasharray 0.3s ease'
                  }}
                >
                  <animateTransform
                    attributeName="gradientTransform"
                    attributeType="XML"
                    type="rotate"
                    from="0 50 50"
                    to="360 50 50"
                    dur="8s"
                    repeatCount="indefinite"
                  />
                </circle>
              </svg>
                  </Box>

            {/* Progress Text */}
            <Box
              sx={{
                position: 'absolute',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 0.5,
                animation: 'textFloat 3s ease-in-out infinite',
                '@keyframes textFloat': {
                  '0%, 100%': {
                    transform: 'translateY(0px) scale(1)',
                    filter: 'brightness(1)',
                  },
                  '50%': {
                    transform: 'translateY(-5px) scale(1.02)',
                    filter: 'brightness(1.1)',
                  }
                }
              }}
            >
              <Box sx={{ position: 'relative' }}>
                    <Typography
                  variant="h1"
                      sx={{
                    fontWeight: 600,
                    fontSize: { xs: '3rem', md: '3.5rem' },
                    background: 'linear-gradient(135deg, #0984E3 0%, #74B9FF 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                        fontFamily: 'monospace',
                    letterSpacing: '-0.05em',
                    lineHeight: 1,
                    mb: 0.5,
                    animation: 'numberPulse 2s ease-in-out infinite',
                    '@keyframes numberPulse': {
                      '0%, 100%': {
                        transform: 'scale(1)',
                        filter: 'brightness(1)',
                      },
                      '50%': {
                        transform: 'scale(1.05)',
                        filter: 'brightness(1.2)',
                      }
                    }
                  }}
                >
                  {displayProgress}
                    </Typography>
                <Typography
                  variant="h4"
                      sx={{
                    fontWeight: 600,
                    fontSize: { xs: '1.25rem', md: '1.5rem' },
                    background: 'linear-gradient(135deg, #0984E3 0%, #74B9FF 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    opacity: 0.7,
                    fontFamily: 'monospace',
                    letterSpacing: '-0.05em',
                    position: 'absolute',
                    right: -16,
                    top: 8,
                    animation: 'percentFloat 2s ease-in-out infinite',
                    '@keyframes percentFloat': {
                      '0%, 100%': {
                        transform: 'translateY(0px) rotate(0deg)',
                      },
                      '50%': {
                        transform: 'translateY(-3px) rotate(5deg)',
                      }
                    }
                  }}
                >
                  %
                </Typography>
                    </Box>
              <Typography
                variant="body1"
                    sx={{
                  color: 'rgba(0, 0, 0, 0.4)',
                  fontSize: '0.875rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  fontWeight: 500,
                  animation: 'processingText 3s ease-in-out infinite',
                  '@keyframes processingText': {
                    '0%, 100%': {
                      opacity: 0.4,
                      letterSpacing: '0.1em',
                    },
                    '50%': {
                      opacity: 0.8,
                      letterSpacing: '0.15em',
                    }
                  }
                }}
              >
                Processing
              </Typography>
                </Box>
          </Box>

          {/* Status Text */}
          <Box
            sx={{
              maxWidth: '400px', 
              zIndex: 1
            }}
          >
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 600,
                fontSize: { xs: '1.5rem', md: '1.75rem' },
                color: '#1E293B',
                mb: 2,
                lineHeight: 1.3
              }}
            >
              Processing Files
            </Typography>
            <Typography 
              variant="body1"
              sx={{ 
                fontSize: '0.875rem',
                color: 'rgba(0, 0, 0, 0.6)',
                lineHeight: 1.6,
                maxWidth: '320px',
                mx: 'auto'
              }}
            >
              {processingStage}
            </Typography>
          </Box>

          {/* Warning Message */}
          <Box 
            sx={{ 
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                py: 1.5,
              px: 2.5,
              borderRadius: '12px',
              backgroundColor: 'rgba(239, 68, 68, 0.04)',
              border: '1px solid rgba(239, 68, 68, 0.1)',
              maxWidth: 'fit-content',
              zIndex: 1
            }}
          >
            <InfoIcon 
                sx={{
                fontSize: 18, 
                color: '#EF4444',
                opacity: 0.8
              }} 
            />
            <Typography 
              variant="body2"
              sx={{ 
                fontSize: '0.75rem',
                color: 'rgba(239, 68, 68, 0.8)',
                fontWeight: 500
              }}
            >
              Please don't leave this page during processing
            </Typography>
          </Box>

          {/* Processing Time Notice */}
          <Typography
            variant="caption"
            sx={{
              position: 'absolute',
              bottom: 16,
              color: 'rgba(0, 0, 0, 0.4)',
              fontSize: '0.75rem',
              letterSpacing: '0.02em',
              textAlign: 'center',
              width: '100%',
              left: 0,
              padding: '0 24px'
            }}
          >
            Processing may take a few minutes depending on file size
          </Typography>
        </StyledPaper>
      </motion.div>
    );
  };

  // Add resetStates function
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
    setHasDetections(null);
    if (statusCheckInterval) {
      clearInterval(statusCheckInterval);
      setStatusCheckInterval(null);
    }
    // Reset progress animation states
    setDisplayProgress(0);
    progressRef.current = 0;
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  };

  // Add ESC key handler for cancelling
  React.useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && isProcessing && !isCancelling) {
        handleCancelProcessing();
      }
    };

    window.addEventListener('keydown', handleEscKey);
    return () => {
      window.removeEventListener('keydown', handleEscKey);
    };
  }, [isProcessing, isCancelling]);

  // Add cleanup effect for page unload
  React.useEffect(() => {
    const handleBeforeUnload = async () => {
      if (taskId) {
        try {
          await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.cancel}/${taskId}`, {
            method: 'POST',
            keepalive: true // Ensures the request completes even if the page is closing
          });
        } catch (error) {
          console.error('Failed to cancel task on page unload:', error);
        }
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      // Also cancel task when component unmounts
      if (taskId) {
        fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.cancel}/${taskId}`, {
          method: 'POST'
        }).catch(error => {
          console.error('Failed to cancel task on unmount:', error);
        });
      }
    };
  }, [taskId]);

  // Add cleanup effect for unmounting
  React.useEffect(() => {
    return () => {
      // Cleanup on unmount
      if (statusCheckInterval) {
        clearInterval(statusCheckInterval);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      // Cancel task if it's still running
      if (taskId && isProcessing) {
        fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.cancel}/${taskId}`, {
          method: 'POST',
          mode: 'cors',
          credentials: 'omit',
          headers: {
            ...defaultHeaders,
            'Content-Type': 'application/json'
          }
        }).catch(error => {
          console.error('Failed to cancel task on unmount:', error);
        });
      }
    };
  }, [taskId, isProcessing]);

  // Add server status fetch function
  const fetchServerStatus = async () => {
    try {
      const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.serverStatus}`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'omit',
        headers: defaultHeaders
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Validate and format the data before setting state
      const formattedStatus = {
        total_tasks_processed: parseInt(data.total_tasks_processed) || 0,
        total_files_processed: parseInt(data.total_files_processed) || 0,
        failed_tasks: parseInt(data.failed_tasks) || 0,
        cancelled_tasks: parseInt(data.cancelled_tasks) || 0,
        current_tasks: parseInt(data.current_tasks) || 0,
        queued_tasks: parseInt(data.queued_tasks) || 0,
        uptime_seconds: parseInt(data.uptime_seconds) || 0,
        max_concurrent_tasks: parseInt(data.max_concurrent_tasks) || 0,
        max_queue_size: parseInt(data.max_queue_size) || 0,
        cpu_usage_percent: Math.min(Math.max(parseFloat(data.cpu_usage_percent) || 0, 0), 100) // Clamp between 0-100
      };

      setServerStatus(formattedStatus);
      setStatusError(null);
    } catch (error) {
      console.error('Server status error:', error);
      setStatusError(error.message || 'Unable to fetch server status');
      // Keep the previous state on error
    }
  };

  // Add effect to fetch server status periodically
  React.useEffect(() => {
    fetchServerStatus();
    const interval = setInterval(fetchServerStatus, 5000); // Update every 5 seconds
    return () => clearInterval(interval);
  }, []);

  // Add server status component
  const renderServerStatus = () => (
    <ServerStatusContainer>
      <Typography 
        variant="subtitle2" 
        sx={{ 
          fontWeight: 600,
          color: 'text.secondary',
          fontSize: '0.75rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          mb: 1
        }}
      >
        Server Status
      </Typography>
      
      <StatusCard>
        <StatusIcon color={serverStatus.cpu_usage_percent > 80 ? '239, 68, 68' : 
                         serverStatus.cpu_usage_percent > 50 ? '245, 158, 11' : 
                         '9, 132, 227'}>
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            <SettingsIcon />
          </motion.div>
        </StatusIcon>
        <Box sx={{ flex: 1 }}>
          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
            CPU Usage
          </Typography>
          <Typography 
            variant="subtitle2" 
            sx={{ 
              fontWeight: 600, 
              color: serverStatus.cpu_usage_percent > 80 ? '#EF4444' : 
                     serverStatus.cpu_usage_percent > 50 ? '#F59E0B' : 
                     '#0984E3'
            }}
          >
            {Math.round(serverStatus.cpu_usage_percent)}%
          </Typography>
        </Box>
      </StatusCard>

      <StatusCard>
        <StatusIcon color="46, 204, 113">
          <QueueIcon />
        </StatusIcon>
        <Box sx={{ flex: 1 }}>
          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
            Tasks in Queue
          </Typography>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#2ECC71' }}>
            {serverStatus.queued_tasks || 0} / {serverStatus.max_queue_size || 0}
          </Typography>
        </Box>
      </StatusCard>

      <StatusCard>
        <StatusIcon color="155, 89, 182">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <FolderIcon />
          </motion.div>
        </StatusIcon>
        <Box sx={{ flex: 1 }}>
          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
            Files Processed
          </Typography>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#9B59B6' }}>
            {(serverStatus.total_files_processed || 0).toLocaleString()}
          </Typography>
        </Box>
      </StatusCard>

      {statusError && (
        <Typography 
          variant="caption" 
          color="error" 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 0.5,
            opacity: 0.8 
          }}
        >
          <ErrorOutlineIcon sx={{ fontSize: 14 }} />
          {statusError}
        </Typography>
      )}
    </ServerStatusContainer>
  );

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

          <AnimatePresence mode="wait">
          {!isProcessing && !processSuccess ? (
              <motion.div
                key="setup"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ 
                  duration: 0.4,
                  ease: "easeOut"
                }}
              >
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2, duration: 0.4 }}
                    >
                <StyledPaper 
                  sx={{ 
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    minHeight: 'unset',
                    '& .MuiStepLabel-root': {  // Reduce spacing in stepper
                      py: 1,  // Reduced padding
                    },
                    '& .MuiStepContent-root': {
                      ml: 2.5,  // Reduced margin
                    }
                  }}
                >
                  <Box sx={{ flex: '0 0 auto' }}>
                  <Stepper 
                    activeStep={activeStep} 
                    orientation="vertical"
                    sx={{
                      '.MuiStepConnector-line': {
                          minHeight: 24,  // Further reduced
                        },
                        '& .MuiStepLabel-label': {  // Reduce text size
                          fontSize: '0.9rem',
                        },
                        '& .MuiStepLabel-iconContainer': {
                          pr: 1.5,  // Reduced padding
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
                                  <AnimatePresence mode="wait">
                          {activeStep === index && (
                            <motion.div
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                                      exit={{ opacity: 0, y: 5 }}
                                      transition={{ duration: 0.3 }}
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
                                  </AnimatePresence>
                        </StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                  </Box>
                  {renderServerStatus()}
                </StyledPaper>
                    </motion.div>
              </Grid>
              <Grid item xs={12} md={8}>
                    <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                        initial={{ opacity: 0, x: 20, scale: 0.98 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -20, scale: 0.98 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <StyledPaper>
                    {steps[activeStep].content}
                  </StyledPaper>
                </motion.div>
                    </AnimatePresence>
              </Grid>
            </Grid>
              </motion.div>
          ) : isProcessing ? (
              <motion.div
                key="processing"
                initial={{ opacity: 0, scale: 0.98, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ 
                  duration: 0.5,
                  ease: "easeOut"
                }}
              >
                {renderProcessingStatus()}
              </motion.div>
          ) : processSuccess ? (
            <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.98, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ 
                  duration: 0.5,
                  ease: "easeOut"
                }}
            >
              <StyledPaper 
                sx={{ 
                  p: 8,
                  textAlign: 'center',
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%)',
                }}
              >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                  transition={{ 
                      duration: 0.6,
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
                          background: hasDetections 
                            ? 'linear-gradient(135deg, #4CAF50 0%, #81C784 100%)'
                            : 'linear-gradient(135deg, #FFA726 0%, #FFB74D 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto',
                        mb: 4,
                          boxShadow: hasDetections
                            ? '0 12px 32px rgba(76, 175, 80, 0.2)'
                            : '0 12px 32px rgba(255, 167, 38, 0.2)',
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
                          {hasDetections ? (
                        <CheckCircleIcon 
                          sx={{ 
                            fontSize: 50,
                            color: 'white',
                          }} 
                        />
                          ) : (
                            <InfoIcon 
                              sx={{ 
                                fontSize: 50,
                                color: 'white',
                              }} 
                            />
                          )}
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
                          background: hasDetections
                            ? 'linear-gradient(45deg, #2D3436 30%, #636E72 90%)'
                            : 'linear-gradient(45deg, #F39C12 30%, #F1C40F 90%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        mb: 2,
                      }}
                    >
                        {hasDetections ? 'Success!' : 'Processing Complete'}
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
                        {hasDetections 
                          ? 'Your files have been successfully processed and detections were found'
                          : 'Your files have been processed, but no detections were found in the provided images'}
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 1.5,
                        mb: 6,
                          background: 'linear-gradient(135deg, rgba(9, 132, 227, 0.04) 0%, rgba(116, 185, 255, 0.04) 100%)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '12px',
                          border: '1px solid rgba(9, 132, 227, 0.1)',
                        py: 1.5,
                        px: 3,
                        maxWidth: 'fit-content',
                        mx: 'auto',
                          animation: 'noticePulse 3s ease-in-out infinite',
                          '@keyframes noticePulse': {
                            '0%, 100%': {
                              backgroundColor: 'rgba(9, 132, 227, 0.04)',
                              borderColor: 'rgba(9, 132, 227, 0.1)',
                            },
                            '50%': {
                              backgroundColor: 'rgba(9, 132, 227, 0.08)',
                              borderColor: 'rgba(9, 132, 227, 0.15)',
                            },
                          }
                        }}
                      >
                        <InfoIcon 
                        sx={{
                            fontSize: 18,
                            color: '#0984E3',
                            opacity: 0.8,
                            animation: 'iconFloat 2s ease-in-out infinite',
                            '@keyframes iconFloat': {
                              '0%, 100%': {
                                transform: 'translateY(0)',
                              },
                              '50%': {
                                transform: 'translateY(-2px)',
                              },
                            }
                          }} 
                        />
                      <Typography
                        variant="body2"
                        sx={{
                            color: 'rgba(9, 132, 227, 0.8)',
                            fontWeight: 500,
                          letterSpacing: '0.01em',
                            fontSize: '0.875rem'
                        }}
                      >
                          Results will be available for 2 hours
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
          </AnimatePresence>
        </motion.div>
      </Box>
    </Container>
  );
}

export default Processing; 
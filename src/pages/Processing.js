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
  ErrorOutline as ErrorOutlineIcon,
  Cloud as CloudIcon
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
  margin: '2px',  // Add margin to prevent cutoff
  flexShrink: 0,  // Prevent icon from shrinking
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
  padding: theme.spacing(1.5),  // Reduced from 2
  marginBottom: theme.spacing(1),  // Reduced from 1.5
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderRadius: '12px',  // Reduced from 16px
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
  baseUrl: 'http://localhost:8000',  // Make URL configurable
  // baseUrl: process.env.REACT_APP_API_URL || 'https://sightlinks.org/api',  // Make URL configurable
  endpoints: {
    webPredict: '/web/predict',
    status: '/web/status',
    download: '/download',
    cancel: '/web/cancel',
    serverStatus: '/server-status'
  }
};

const defaultHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

// Add API connection test function
const testApiConnection = async () => {
  try {
    console.log('Testing API connection to:', API_CONFIG.baseUrl);
    const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.serverStatus}`, {
      method: 'GET',
      mode: 'cors',
      credentials: 'omit',
      headers: defaultHeaders
    });
    
    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('API connection successful:', data);
    return true;
  } catch (error) {
    console.error('API connection failed:', error);
    return false;
  }
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

// Add a new styled component for the data sources tooltip
const DataSourceTooltip = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '100%',
  left: '50%',
  transform: 'translateX(-50%) translateY(-10px)',
  zIndex: 1000,
  opacity: 0,
  visibility: 'hidden',
  transition: 'all 0.3s ease',
  minWidth: '350px',
  maxWidth: '400px',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '12px',
  overflow: 'visible',
  boxShadow: '0 12px 32px rgba(0, 0, 0, 0.18)',
  '.info-button-container:hover &': {
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
    lineHeight: '1.6',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    position: 'relative',
    zIndex: 1,
    borderBottomLeftRadius: '12px',
    borderBottomRightRadius: '12px',
  },
  '.data-source': {
    padding: '12px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  },
  '.data-source:last-child': {
    borderBottom: 'none',
  },
  '.data-source-title': {
    fontSize: '0.85rem',
    fontWeight: 600,
    marginBottom: '4px',
    color: 'white',
  },
  '.data-source-desc': {
    fontSize: '0.75rem',
    color: '#E2E8F0',
    marginBottom: '8px',
  },
  '.data-source-link': {
    display: 'inline-block',
    fontSize: '0.75rem',
    color: '#74B9FF',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    }
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
      console.log('Accepted files:', acceptedFiles); // Add logging

      if (inputType === 'DigiMap') {
        // For DigiMap: Accept ZIP, PNG, JPG, JPEG, JGW, JPGW files
        const validFiles = acceptedFiles.filter(file => 
          file.type === 'application/zip' || 
          file.name.endsWith('.zip') ||
          file.name.toLowerCase().endsWith('.png') ||
          file.name.toLowerCase().endsWith('.jpg') ||
          file.name.toLowerCase().endsWith('.jpeg') ||
          file.name.toLowerCase().endsWith('.jgw') ||
          file.name.toLowerCase().endsWith('.jpgw')
        );

        if (validFiles.length === 0) {
          setApiError('Please upload either a ZIP file or image files (PNG, JPG, JPEG) with world files (JGW, JPGW) from DigiMap');
          return;
        }

        setUploadedFiles([...uploadedFiles, ...validFiles]);
      } else {
        // For GeoTIFF: Accept ZIP, TIF, TIFF files
        const validFiles = acceptedFiles.filter(file => {
          console.log('Checking file:', file.name, 'Type:', file.type); // Add logging
          return file.type === 'application/zip' || 
                 file.name.endsWith('.zip') ||
                 file.type === 'image/tiff' ||
                 file.type === 'application/x-tiff' ||
                 file.type === 'application/tiff' ||
                 file.name.toLowerCase().endsWith('.tif') ||
                 file.name.toLowerCase().endsWith('.tiff');
        });

        console.log('Valid files:', validFiles); // Add logging

        if (validFiles.length === 0) {
          setApiError('Please upload either a ZIP file or GeoTIFF files (TIF, TIFF)');
          return;
        }

        setUploadedFiles([...uploadedFiles, ...validFiles]);
      }
    },
    accept: inputType === 'DigiMap' 
      ? {
          'application/zip': ['.zip'],
          'image/jpeg': ['.jpg', '.jpeg'],
          'image/png': ['.png'],
          'application/octet-stream': ['.jgw', '.jpgw']
        }
      : {
          'application/zip': ['.zip'],
          'image/tiff': ['.tif', '.tiff'],
          'application/x-tiff': ['.tif', '.tiff'],
          'application/tiff': ['.tif', '.tiff'],
          'application/octet-stream': ['.tif', '.tiff'],
          'image/*': ['.tif', '.tiff']
        },
    multiple: true,
    noClick: false,
    noKeyboard: false
  });

  // Update the uploadToApi function with better error handling
  const uploadToApi = async (files) => {
    try {
      console.log('Starting upload with files:', files);
      console.log('Number of files to upload:', files.length);
      files.forEach((file, index) => {
        console.log(`File ${index}: ${file.name}, type: ${file.type}, size: ${file.size}`);
      });

      // Test API connection first
      const isConnected = await testApiConnection();
      if (!isConnected) {
        throw new Error('Unable to connect to the API server. Please check your internet connection and try again.');
      }

      const formData = new FormData();
      
      // File type detection
      const zipFiles = files.filter(file => 
        file.type === 'application/zip' || file.name.endsWith('.zip')
      );
      
      const imageFiles = files.filter(file => 
        file.name.toLowerCase().endsWith('.jpg') || 
        file.name.toLowerCase().endsWith('.jpeg') || 
        file.name.toLowerCase().endsWith('.png')
      );
      
      const worldFiles = files.filter(file => 
        file.name.toLowerCase().endsWith('.jgw') || 
        file.name.toLowerCase().endsWith('.jpgw')
      );
      
      const tiffFiles = files.filter(file => 
        file.type === 'image/tiff' ||
        file.type === 'application/x-tiff' ||
        file.type === 'application/tiff' ||
        file.name.toLowerCase().endsWith('.tif') || 
        file.name.toLowerCase().endsWith('.tiff')
      );
      
      console.log(`Found ${zipFiles.length} ZIP files`);
      console.log(`Found ${imageFiles.length} image files`);
      console.log(`Found ${worldFiles.length} world files`);
      console.log(`Found ${tiffFiles.length} TIFF files`);
      
      // Prioritize files based on type
      if (zipFiles.length > 0) {
        // If ZIP files present, use only the first one
        console.log(`Using ZIP file: ${zipFiles[0].name}`);
        formData.append('file', zipFiles[0]);
      } else if (inputType === 'DigiMap' && (imageFiles.length > 0 || worldFiles.length > 0)) {
        // For DigiMap mode with image/world files
        
        // Add image files with indexed names
        imageFiles.forEach((file, index) => {
          const fieldName = index === 0 ? 'file' : `file${index}`;
          console.log(`Adding image file as ${fieldName}: ${file.name}`);
          formData.append(fieldName, file);
        });
        
        // Add world files with indexed names
        worldFiles.forEach((file, index) => {
          const fieldName = index === 0 ? 'world_file' : `world_file${index}`;
          console.log(`Adding world file as ${fieldName}: ${file.name}`);
          formData.append(fieldName, file);
        });
        
        // Set file count parameters
        formData.append('image_file_count', String(imageFiles.length));
        formData.append('world_file_count', String(worldFiles.length));
      } else if (tiffFiles.length > 0) {
        // For GeoTIFF files
        tiffFiles.forEach((file, index) => {
          const fieldName = index === 0 ? 'file' : `file${index}`;
          console.log(`Adding TIFF file as ${fieldName}: ${file.name}`);
          formData.append(fieldName, file);
        });
        
        // Set file count parameter
        formData.append('tiff_file_count', String(tiffFiles.length));
      } else {
        throw new Error('No valid files found for upload');
      }
      
      // Convert parameters to the exact types expected by the API
      formData.append('input_type', String(inputType === 'DigiMap' ? 0 : 1));
      formData.append('save_labeled_image', String(saveLabeledImages));
      formData.append('classification_threshold', String(0.35));
      formData.append('prediction_threshold', String(0.5));
      formData.append('yolo_model_type', 'n');
      formData.append('output_type', String(outputFormat === 'JSON' ? 0 : 1));
      formData.append('multiple_files', 'true'); // Flag to indicate multiple files are being sent

      console.log('Uploading files to API...');
      console.log('API URL:', `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.webPredict}`);
      
      // Log all entries in FormData
      console.log('FormData contents:');
      for (let [key, value] of formData.entries()) {
        if (value instanceof File) {
          console.log(`FormData entry: ${key} - ${value.name} (${value.type}, ${value.size} bytes)`);
        } else {
          console.log(`FormData entry: ${key} - ${value}`);
        }
      }

      // Use XMLHttpRequest instead of fetch for more detailed control and debugging
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        
        xhr.open('POST', `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.webPredict}`, true);
        xhr.setRequestHeader('Accept', 'application/json');
        
        xhr.onload = function() {
          if (xhr.status >= 200 && xhr.status < 300) {
            try {
              const data = JSON.parse(xhr.responseText);
              console.log('Upload response data:', data);
              
              if (data.task_id) {
                console.log('Task ID received:', data.task_id);
                setTaskId(data.task_id);
                setProcessingStage(data.message || 'Task queued successfully');
                startStatusCheck(data.task_id);
                resolve(data);
              } else {
                reject(new Error('No task ID received from server'));
              }
            } catch (error) {
              reject(new Error(`Error parsing response: ${error.message}`));
            }
          } else {
            let errorMessage = 'Upload failed';
            try {
              const errorData = JSON.parse(xhr.responseText);
              errorMessage = errorData.error || `API Error: ${xhr.statusText} (${xhr.status})`;
            } catch (e) {
              errorMessage = `API Error: ${xhr.statusText} (${xhr.status})`;
            }
            if (xhr.status === 503) {
              errorMessage = 'Server is busy. Please try again later.';
            }
            reject(new Error(errorMessage));
          }
        };
        
        xhr.onerror = function() {
          reject(new Error('Network error during upload'));
        };
        
        xhr.upload.onprogress = function(e) {
          if (e.lengthComputable) {
            const percentComplete = Math.round((e.loaded / e.total) * 100);
            console.log(`Upload progress: ${percentComplete}%`);
          }
        };
        
        xhr.send(formData);
      }).then(data => {
        return data; // Return data to continue the chain
      }).catch(error => {
        console.error('Upload error:', error);
        setApiError(error.message);
        setIsProcessing(false);
        setProcessSuccess(false);
        setProcessingStage('Error: ' + error.message);
        throw error; // Re-throw to stop the chain
      });
    } catch (error) {
      console.error('Upload error:', error);
      setApiError(error.message);
      setIsProcessing(false);
      setProcessSuccess(false);
      setProcessingStage('Error: ' + error.message);
    }
  };

  // Add an effect hook to clear any error messages when switching between stepper steps
  React.useEffect(() => {
    // Clear error messages when changing steps
    setApiError(null);
    setProcessingStage('');
  }, [activeStep]);

  // Add a complete error reset function to be called at critical points
  const clearAllErrorStates = () => {
    console.log('Clearing all error states');
    setApiError(null);
    setProcessingStage('');
    if (statusCheckInterval) {
      clearInterval(statusCheckInterval);
      setStatusCheckInterval(null);
    }
  };

  // Update handleStartProcessing to use the new clearAllErrorStates function
  const handleStartProcessing = async () => {
    // Immediately clear all error states at the beginning
    clearAllErrorStates();
    
    // Clear any previous processing states
    setIsProcessing(true);
    setProgress(0);
    setDisplayProgress(0);
    progressRef.current = 0;
    setProcessSuccess(false);
    
    // Reset task data
    setTaskId(null);
    setDownloadToken(null);
    setIsCancelling(false);
    
    // Set initial processing stage
    setProcessingStage('Starting upload...');
    
    // Start the upload process
    await uploadToApi(uploadedFiles);
  };

  // Update checkProcessingStatus function to handle the new API response format
  const checkProcessingStatus = async (id) => {
    if (!id) {
      console.log('No task ID provided for status check');
      return;
    }

    // Prevent status checks if already cancelled or completed
    if (isCancelling || processSuccess) {
      console.log('Skipping status check - task is cancelled or completed');
      return;
    }

    try {
      console.log('Checking status for task:', id);
      const statusResponse = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.status}/${id}`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'omit',
        headers: defaultHeaders
      });

      // Handle 404 (task not found) error specifically
      if (statusResponse.status === 404) {
        console.log('Task not found in status check');
        throw new Error('Task not found or expired');
      }

      console.log('Status response status:', statusResponse.status);
      const statusData = await statusResponse.json();
      console.log('Status response data:', statusData);

      // Only ignore updates if explicitly cancelled
      if (isCancelling) {
        console.log('Processing was cancelled, ignoring status update');
        return;
      }

      if (!statusResponse.ok) {
        throw new Error(statusData.error || `API error: ${statusResponse.status}`);
      }

      // Reset error state on successful status check
      if (isProcessing && apiError) {
        console.log('Clearing previous error message during active processing');
        setApiError(null);
      }

      // First check the explicit error state from the new API format
      if (statusData.error === true) {
        console.log('Processing error reported by API:', statusData.error_message);
        throw new Error(statusData.error_message || 'An error occurred during processing');
      }

      // Handle completed status according to the new API format
      if (statusData.completed === true) {
        console.log('Task marked as completed');
        setProcessingStage('Processing complete');
        
        // Clear the status check interval
        if (statusCheckInterval) {
          clearInterval(statusCheckInterval);
          setStatusCheckInterval(null);
        }

        // Set the detection status based on the has_detections flag
        setHasDetections(!!statusData.has_detections);
        
        // Log total detections if available
        if (statusData.total_detections !== undefined) {
          console.log('Total detections found:', statusData.total_detections);
          // Optionally update the UI to show this information
          if (statusData.total_detections > 0) {
            setProcessingStage(`Processing complete. Found ${statusData.total_detections} detections.`);
          } else {
            setProcessingStage('Processing complete. No detections found.');
          }
        }

        // If we have a download token, use it
        if (statusData.download_token) {
          setDownloadToken(statusData.download_token);
        }

        // Mark as success and stop processing
        setProcessSuccess(true);
        setIsProcessing(false);
        return;
      }

      // Task is not completed yet, update status message
      // Since the API doesn't provide specific in-progress status fields,
      // we'll maintain our existing code for handling stage/status updates
      // Determine status message based on available fields
      let statusMessage = 'Processing files...';
      
      if (statusData.stage) {
        statusMessage = statusData.stage;
      } else if (statusData.status === 'queued') {
        if (typeof statusData.queue_position === 'number') {
        statusMessage = `Waiting in queue (position ${statusData.queue_position})`;
        } else {
          statusMessage = 'Waiting in queue...';
        }
      } else if (statusData.status) {
        statusMessage = `Status: ${statusData.status}`;
      }

      // Update the processing stage with the new message
        setProcessingStage(statusMessage);

    } catch (error) {
      console.error('Status check error:', error);
      // Only set error if it's not a cancellation
      if (!isCancelling) {
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
    }
  };

  const startStatusCheck = (id) => {
    if (statusCheckInterval) {
      clearInterval(statusCheckInterval);
    }
    
    // Explicitly clear error states when starting a new status check
    setApiError(null);
    
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

  // Update the handleDownload function to use iframe for direct download with timestamp filename
  const handleDownload = async () => {
    if (!downloadToken) {
      console.error('Download attempt with no token');
      setApiError('No download token available');
      return;
    }

    try {
      console.log('Initiating download with token:', downloadToken);
      
      // Create timestamp for filename
      const now = new Date();
      const timestamp = now.toISOString().replace(/[:T.Z]/g, '-').substring(0, 19);
      
      // Generate the download URL with timestamp filename
      const downloadUrl = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.download}/${downloadToken}?filename=results-${timestamp}.zip`;
      
      console.log('Download URL:', downloadUrl);
      
      // Create hidden iframe for direct download without any JS processing of the file
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
      
      // Set iframe source to trigger download directly from server
      iframe.src = downloadUrl;
      
      // Remove iframe after a delay
      setTimeout(() => {
        document.body.removeChild(iframe);
        console.log('Download iframe removed');
      }, 2000);
      
      console.log('Download initiated via iframe');
    } catch (error) {
      console.error('Download error:', error);
      setApiError(`Download failed: ${error.message}`);
    }
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
            
            <Typography variant="subtitle1" sx={{ 
              fontWeight: 600, 
              mb: 2, 
              display: 'flex', 
              alignItems: 'center',
              position: 'relative'
            }}>
              Input Type
              <Box 
                component="span" 
                sx={{ 
                  ml: 1, 
                  display: 'inline-flex',
                  alignItems: 'center',
                  position: 'relative'
                }}
                className="info-button-container"
              >
                <InfoIcon 
                  sx={{ 
                    fontSize: 18, 
                    color: 'info.main', 
                    cursor: 'pointer' 
                  }} 
                />
                <DataSourceTooltip>
                  <div className="tooltip-label">Data Sources</div>
                  <div className="tooltip-content">
                    <div className="data-source">
                      <div className="data-source-title">Digimap (UK Academic Institutions)</div>
                      <div className="data-source-desc">
                        High-quality aerial imagery with georeferencing files. Includes Ordnance Survey maps for UK academic institutions.
                      </div>
                      <a 
                        href="https://digimap.edina.ac.uk/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="data-source-link"
                      >
                        Visit Digimap →
                      </a>
                    </div>
                    <div className="data-source">
                      <div className="data-source-title">USGS Earth Explorer (Global)</div>
                      <div className="data-source-desc">
                        Access to GeoTIFF datasets including satellite imagery, aerial photographs, and elevation data. Free global service.
                      </div>
                      <a 
                        href="https://earthexplorer.usgs.gov/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="data-source-link"
                      >
                        Visit Earth Explorer →
                      </a>
                    </div>
                  </div>
                </DataSourceTooltip>
              </Box>
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
                      {`• Option 1: ZIP Archive
  - ZIP file from DigiMap
  - Contains all required files

• Option 2: Individual Files
  - Image and world files
  - Downloaded from DigiMap
  - Must keep original names`}
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
                      Process GeoTIFF data
                    </Typography>
                  </Box>
                  <TooltipContent>
                    <div className="tooltip-label">Supported Formats</div>
                    <div className="tooltip-content">
                      {`• Option 1: ZIP Archive
  - Contains multiple GeoTIFF files (.tif)

• Option 2: Individual Files
  - Single GeoTIFF file (.tif) which contains embedded georeferencing`}
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
            {!uploadedFiles.length && (
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
                  ? 'Upload a ZIP file from DigiMap or individual image and world files downloaded from DigiMap'
                  : 'Upload GeoTIFF files (.tif) individually or as a ZIP archive'}
              </Typography>
            )}

            {/* Uploaded Files Section - Moved above dropzone */}
            {uploadedFiles.length > 0 && (
              <Box sx={{ mb: 3 }}>
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
                            width: 32,  // Reduced from 40
                            height: 32,  // Reduced from 40
                            borderRadius: '10px',  // Reduced from 14px
                            backgroundColor: 'rgba(9, 132, 227, 0.08)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mr: 1.5,  // Reduced from 2
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          }}
                        >
                          <ArticleIcon 
                            className="file-icon"
                            sx={{ 
                              color: 'rgba(9, 132, 227, 0.6)',
                              fontSize: 16,  // Reduced from 20
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
                              mb: 0.25,  // Reduced from 0.5
                              textAlign: 'left',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                              fontSize: '0.8125rem'  // Added smaller font size
                            }}
                          >
                            {file.name}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>  {/* Reduced gap from 2 */}
                            <Typography 
                              className="file-type"
                              variant="caption" 
                              sx={{ 
                                color: 'text.secondary',
                                backgroundColor: 'rgba(0, 0, 0, 0.04)',
                                px: 1,  // Reduced from 1.5
                                py: 0.25,  // Reduced from 0.5
                                borderRadius: '12px',  // Reduced from 20px
                                fontWeight: 500,
                                textTransform: 'uppercase',
                                letterSpacing: '0.02em',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                fontSize: '0.65rem'  // Added smaller font size
                              }}
                            >
                              {file.name.split('.').pop().toUpperCase()}
                            </Typography>
                            <Typography 
                              variant="caption" 
                              color="text.secondary"
                              sx={{ 
                                flexShrink: 0,
                                fontSize: '0.65rem'  // Added smaller font size
                              }}
                            >
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', gap: 0.5 }}>  {/* Reduced gap from 1 */}
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
                              width: 28,  // Reduced from 32
                              height: 28,  // Reduced from 32
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
                              fontSize: 16,  // Reduced from 18
                              transition: 'all 0.2s ease',
                            }} />
                          </IconButton>
                        </Tooltip>

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

            {/* Dropzone Section */}
            <StyledPaper
              {...getRootProps()}
              sx={{
                cursor: 'pointer',
                textAlign: 'center',
                py: uploadedFiles.length > 0 ? 1.5 : 3,
                px: uploadedFiles.length > 0 ? 2 : 3,
                minHeight: uploadedFiles.length > 0 ? '48px' : '200px',
                maxHeight: uploadedFiles.length > 0 ? '48px' : '300px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 1,
                background: isDragActive 
                  ? 'rgba(9, 132, 227, 0.04)' 
                  : 'rgba(255, 255, 255, 0.7)',
                border: `2px dashed ${
                  isDragActive 
                    ? '#0984E3' 
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
              <input 
                {...getInputProps()} 
                accept={inputType === 'DigiMap' 
                  ? ".zip,.jpg,.jpeg,.png,.jgw,.jpgw"
                  : ".zip,.tif,.tiff"
                }
                multiple={true}
                onClick={(e) => {
                  // Reset the input value to ensure onChange fires even if same file is selected
                  e.target.value = '';
                }}
              />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: uploadedFiles.length > 0 ? 'row' : 'column',
                  alignItems: 'center',
                  justifyContent: 'center',  // Changed to center
                  gap: uploadedFiles.length > 0 ? 2 : 1,
                  width: '100%',
                  maxWidth: uploadedFiles.length > 0 ? '180px' : '240px',  // Reduced max width
                  margin: '0 auto'
                }}
              >
                <Box
                  sx={{
                    width: uploadedFiles.length > 0 ? 24 : 36,
                    height: uploadedFiles.length > 0 ? 24 : 36,
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, rgba(9, 132, 227, 0.1) 0%, rgba(116, 185, 255, 0.1) 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <UploadIcon sx={{ 
                    fontSize: uploadedFiles.length > 0 ? 14 : 18,
                    color: 'rgba(9, 132, 227, 0.6)',
                  }} />
                </Box>
                <Box sx={{ 
                  textAlign: 'center',  // Changed to center
                  flex: 'initial'  // Changed to initial
                }}>
                  <Typography 
                    variant="subtitle2" 
                    sx={{ 
                      fontWeight: 600,
                      color: 'text.primary',
                      fontSize: uploadedFiles.length > 0 ? '0.75rem' : '0.875rem',
                      mb: uploadedFiles.length > 0 ? 0 : 0.25
                    }}
                  >
                    {uploadedFiles.length > 0 ? 'Add more files' : 'Upload Files'}
                  </Typography>
                  {(!uploadedFiles.length || isDragActive) && (
                    <Typography 
                      variant="caption" 
                      color="text.secondary" 
                      sx={{ 
                        display: 'block',
                        fontSize: '0.7rem'
                      }}
                    >
                      {uploadedFiles.length > 0 ? 'or drop them here' : 'Drag and drop files here or click to browse'}
                    </Typography>
                  )}
                </Box>
              </Box>
              {!uploadedFiles.length && (
                <Typography variant="caption" color="text.secondary" sx={{ opacity: 0.8, mt: 1 }}>
                  {inputType === 'DigiMap' 
                    ? 'Supported formats: ZIP, JPG/JPEG, PNG + JGW/JPGW files'
                    : 'Supported formats: ZIP, TIF/TIFF files'}
                </Typography>
              )}
            </StyledPaper>
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

  // Replace the renderProgressCircle function with a loading animation
  const renderProgressCircle = () => (
          <Box
            sx={{
              position: 'relative',
        width: { xs: '200px', md: '220px' },
        height: { xs: '200px', md: '220px' },
              display: 'flex',
              alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {/* Simple background circle */}
      <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
        <svg width="100%" height="100%" viewBox="0 0 100 100">
          {/* Background track */}
          <circle
            cx="50"
            cy="50"
            r="46"
            fill="none"
            stroke="#F8FAFC"
            strokeWidth="6"
          />
          
          {/* Loading arc - simpler design */}
          <circle
            cx="50"
            cy="50"
            r="46"
            fill="none"
            stroke="#4DA3FF"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray="70, 289"
            transform="rotate(-90 50 50)"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="-90 50 50"
              to="270 50 50"
              dur="1.5s"
              repeatCount="indefinite"
              additive="sum"
            />
          </circle>
        </svg>
      </Box>

      {/* Center content with three dots */}
      <Box
        sx={{
                  position: 'absolute',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%'
        }}
      >
            <Box
              sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            width: '60%',
            height: '60%',
            background: 'white',
            boxShadow: '0 2px 12px rgba(0, 0, 0, 0.06)'
          }}
        >
          {/* Three dots in a row */}
          <Box
                sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: '8px',
              mb: 1.5
            }}
          >
            {[0, 1, 2].map((i) => (
              <Box
                key={i}
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: '#4DA3FF',
                  animation: `dot-pulse 1.4s infinite ease-in-out both`,
                  animationDelay: `${i * 0.16}s`,
                  '@keyframes dot-pulse': {
                    '0%, 80%, 100%': {
                      opacity: 0.4,
                      transform: 'scale(0.8)'
                    },
                    '40%': {
                      opacity: 1,
                      transform: 'scale(1)'
                    }
                  }
                }}
              />
            ))}
          </Box>
          
              <Typography
            variant="caption"
                sx={{
              fontSize: '0.75rem',
              fontWeight: 500,
              color: '#64748B',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}
          >
            PROCESSING
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
            p: { xs: 4, md: 5 },
            background: 'white',
            position: 'relative',
            overflow: 'hidden',
            minHeight: '500px',
              display: 'flex',
              flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            gap: 4,
            borderRadius: '16px',
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

          {/* Loading Animation */}
                <Box
                  sx={{
              mb: 2,
              width: { xs: '200px', md: '220px' },
              height: { xs: '200px', md: '220px' },
                    display: 'flex',
                    alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {renderProgressCircle()}
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
              borderRadius: '8px',
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
    // Reset all state values to their defaults
    setUploadedFiles([]);
    setIsProcessing(false);
    setProcessSuccess(false);
    setProgress(0);
    setDisplayProgress(0);
    progressRef.current = 0;
    setApiError(null); // Clear any previous errors
    setTaskId(null);
    setDownloadToken(null);
    setProcessingStage('');
    setIsCancelling(false);
    setHasDetections(null);
    // Clear any active intervals
    if (statusCheckInterval) {
      clearInterval(statusCheckInterval);
      setStatusCheckInterval(null);
    }
    // Clear any animation frames
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
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
    let isComponentMounted = true;
    let hasBeenCancelled = false;  // Track if we've already sent a cancel request

    // Cleanup function
    return () => {
      isComponentMounted = false;
      
      // Only cleanup intervals and animations
      if (statusCheckInterval) {
        clearInterval(statusCheckInterval);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      // Only cancel task if explicitly processing and not completed
      // We don't need to cancel if the process has successfully completed
      if (taskId && isProcessing && !processSuccess && !hasBeenCancelled && !isCancelling) {
        hasBeenCancelled = true;  // Prevent duplicate cancel requests
        console.log('Canceling task on unmount:', taskId);
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
  }, [taskId, isProcessing, processSuccess, isCancelling]);

  // Modify the beforeunload handler
  React.useEffect(() => {
    let hasBeenCancelled = false;  // Track if we've already sent a cancel request

    const handleBeforeUnload = async (event) => {
      // Only cancel if actually processing and not completed
      // We don't need to cancel if the process has successfully completed
      if (taskId && isProcessing && !processSuccess && !hasBeenCancelled && !isCancelling) {
        hasBeenCancelled = true;  // Prevent duplicate cancel requests
        event.preventDefault();
        event.returnValue = '';
        
        try {
          console.log('Canceling task on page unload:', taskId);
          await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.cancel}/${taskId}`, {
            method: 'POST',
            keepalive: true
          });
        } catch (error) {
          console.error('Failed to cancel task on page unload:', error);
        }
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [taskId, isProcessing, processSuccess, isCancelling]);

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
        failed_tasks: parseInt(data.failed_tasks) || 0,
        cancelled_tasks: parseInt(data.cancelled_tasks) || 0,
        current_tasks: parseInt(data.current_tasks) || 0,
        queued_tasks: parseInt(data.queued_tasks) || 0,
        uptime_seconds: parseInt(data.uptime_seconds) || 0,
        max_concurrent_tasks: parseInt(data.max_concurrent_tasks) || 0,
        max_queue_size: parseInt(data.max_queue_size) || 0,
        cpu_usage_percent: Math.min(Math.max(parseFloat(data.cpu_usage_percent) || 0, 0), 100) // Ensure value is between 0-100
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
        <StatusIcon color={serverStatus.cpu_usage_percent > 80 ? '239, 68, 68' : serverStatus.cpu_usage_percent > 50 ? '245, 158, 11' : '9, 132, 227'}>
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            style={{ 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '100%'
            }}
          >
            <SettingsIcon sx={{ fontSize: 18 }} />
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
              color: serverStatus.cpu_usage_percent > 80 
                ? '#EF4444' 
                : serverStatus.cpu_usage_percent > 50 
                ? '#F59E0B' 
                : '#0984E3'
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
            <Grid 
              container 
              spacing={4} 
              sx={{ 
                minHeight: '700px',
                '& .MuiGrid-item': {
                  display: 'flex',
                  flexDirection: 'column'
                }
              }}
            >
              <Grid item xs={12} md={4}>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2, duration: 0.4 }}
                      style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                    >
                <StyledPaper 
                  sx={{ 
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    '& .MuiStepLabel-root': {
                      py: 1,
                    },
                    '& .MuiStepContent-root': {
                      ml: 2.5,
                    }
                  }}
                >
                  <Box sx={{ flex: '1 1 auto', overflowY: 'auto' }}>
                    <Stepper 
                      activeStep={activeStep} 
                      orientation="vertical"
                      sx={{
                        '.MuiStepConnector-line': {
                          display: 'none', // Hide the connector line
                        },
                        '.MuiStepConnector-root': {
                          marginLeft: '28px', // Adjust spacing where line was
                        },
                        '& .MuiStepLabel-label': {
                          fontSize: '0.9rem',
                        },
                        '& .MuiStepLabel-iconContainer': {
                          pr: 1.5,
                          mr: 0.5,
                          pl: 0.5,
                        },
                        '& .MuiStepLabel-root': {
                          padding: '8px 0',
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
                                initial={{ opacity: 0, height: 0, y: -10 }}
                                animate={{ opacity: 1, height: 'auto', y: 0 }}
                                exit={{ opacity: 0, height: 0, y: 10 }}
                                transition={{ 
                                  duration: 0.3,
                                  opacity: { duration: 0.2 },
                                  height: { duration: 0.3 },
                                  y: { duration: 0.2 }
                                }}
                                style={{ overflow: 'hidden' }}
                              >
                                <Typography 
                                  variant="body2" 
                                  color="text.secondary"
                                  sx={{ 
                                    mt: 0.5,
                                    opacity: 0.8,
                                    transform: 'translateZ(0)', // Force GPU acceleration
                                    lineHeight: 1.5
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
              <Grid item xs={12} md={8} sx={{ display: 'flex', flexDirection: 'column' }}>
                    <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                        initial={{ opacity: 0, x: 20, scale: 0.98 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -20, scale: 0.98 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <StyledPaper sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
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
                    {hasDetections && (
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
                    )}
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
                          flex: hasDetections ? 1 : 'auto',
                          py: 1.5,
                          borderRadius: '10px',
                          maxWidth: hasDetections ? 280 : 320,
                        }}
                      >
                        Process New Files
                      </Button>
                      {hasDetections && (
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
                      )}
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
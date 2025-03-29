import { Container, Typography, Box, Grid, Collapse, IconButton, Chip, Divider, LinearProgress } from '@mui/material';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Psychology, DataObject, 
  Architecture, Speed,
  ExpandMore as ExpandMoreIcon,
  Memory, Layers, Settings, 
  Timeline, CloudQueue
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { GlassPaper, PageContainer } from '../components/StyledComponents';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

function AlgorithmGuide() {
  const [expandedSections, setExpandedSections] = useState({});

  const handleExpandClick = (index) => {
    setExpandedSections(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const modelMetrics = {
    accuracy: 0.8154,
    precision: 0.9128,
    recall: 0.9466,
    f1Score: 0.8891,
    inferenceTime: '342ms'
  };

  const sections = [
    {
      title: 'Model Architecture',
      icon: Memory,
      content: `Our system relies on two deep learning models for zebra crossing detection: a classification model for initial 
                screening and a YOLO-based detector for precise localization.`,
      points: [
        'Classification Model (Initial Screening)',
        'Object Detection Model (Precise Localization)',
        'Two-Stage Pipeline Approach'
      ],
      details: `Through our development process, we evolved our classification model architecture to optimize the balance between 
                accuracy and efficiency. Starting with VGG16's robust but computationally expensive 16-layer CNN (618MB), we 
                progressed to ResNet50's more efficient architecture with residual blocks (98MB), before finally implementing 
                MobileNetV3 with its depth-wise convolutions and inverted residual blocks (21.8MB).`,
      modelArchitecture: {
        classification: {
          model: 'MobileNetV3',
          purpose: 'Binary classification',
          inputSize: '256x256',
          output: 'Confidence score'
        },
        detection: {
          model: 'YOLO 11 OBB',
          purpose: 'Boundary detection',
          output: '4-point coordinates',
          inputSize: '1024x1024'
        }
      },
      evolution: [
        { name: 'VGG16', size: '618MB', accuracy: '99.7%', note: 'Initial Implementation' },
        { name: 'ResNet50', size: '98MB', accuracy: '99.7%', note: 'Intermediate Implementation' },
        { name: 'MobileNetV3', size: '21.8MB', accuracy: '99.7%', note: 'Current Implementation' },
        { name: 'MobileNetV3 (INT8)', size: '2.8MB', accuracy: '94.7%', note: 'Quantized Version' }
      ],
      additionalDetails: `To further optimize deployment efficiency, we implemented quantization-aware training for MobileNetV3, 
                          reducing the model size to just 2.8MB while maintaining most of its accuracy. This quantized version 
                          uses 8-bit integer weights and is specifically optimized for deployment on resource-constrained devices. 
                          However, it does compromise accuracy by 5% when compared to its non-quantized equivalent.
                          
                          Theoretically, YOLO 11 OBB alone can be used for the purpose of determining crossing locations. However, 
                          this is computationally expensive and too slow to rely on when provided satellite image chunks for large 
                          areas. To address this, we use the faster classification model to classify only image chunks that are 
                          likely to have crossings and pass these to YOLO. Essentially, the classification model approximates 
                          crossing likelihood, and YOLO finds their exact location if they're likely to be in the image.
                          
                          As YOLO, in our pipeline, only accepts regions accepted by the classification model, the accuracy of 
                          YOLO is dependent on the accuracy of the classification model. For this reason, we have emphasized high 
                          accuracy across both models, and factor in speed for the classification model.`
    },
    {
      title: 'Data Processing',
      icon: DataObject,
      content: `Our dataset comprises approximately 23,000 instances of zebra crossings from aerial imagery, with each image 
                precisely georeferenced using world files.`,
      points: [
        'Image Segmentation',
        'Context Window Creation',
        'Georeferencing Integration'
      ],
      details: `Our data preprocessing pipeline consists of three main stages:
                
                1. Image Segmentation: Input images are split into 256×256 pixel chunks in a non-overlapping grid pattern, 
                with position tracking for georeference preservation.
                
                2. Context Window Creation: Positive detections are expanded to 1024×1024 pixel windows, center-aligned with 
                the detected crossing, with special handling for image boundaries.
                
                3. Georeferencing Integration: We extract parameters from world files (.jgw) and GeoTIFF (.tiff) files, 
                working with the British National Grid coordinate system (EPSG:27700) and transforming to WGS84 (EPSG:4326).`,
      preprocessing: {
        segmentation: [
          'Input images split into 256×256 pixel chunks',
          'Non-overlapping grid pattern',
          'Position tracking for georeference preservation',
          'Efficient processing of large areas'
        ],
        georeferencing: [
          'World file (.jgw) parameter extraction',
          'GeoTIFF (.tiff) support',
          'British National Grid (EPSG:27700)',
          'Transformation to WGS84 (EPSG:4326)'
        ]
      },
      dataStats: {
        totalInstances: '~23,000',
        class: 'zebra_crossing',
        format: 'Aerial imagery + .jgw',
        resolution: 'Variable (256x256/1024x1024)'
      }
    },
    {
      title: 'Training Process',
      icon: Settings,
      content: `Our models were trained using carefully designed experiments with multiple training strategies and 
                hyperparameter configurations.`,
      points: [
        'Classification Model Development',
        'YOLO Model Training',
        'Transfer Learning Approach'
      ],
      details: `For the classification models, we used an 85-10-5 split (train-val-test) with transfer learning from ImageNet 
                weights. We employed Binary Cross Entropy as the loss function and Adam optimizer with a decaying learning rate.
                
                For the YOLO model, we trained for 150 epochs using SGD optimizer with an initial learning rate of 0.00066335 
                with decay and a batch size of 16. The model was evaluated on 5,335 instances, correctly classifying 4,604 
                crossings with 170 false positives and 561 false negatives.`,
      training: {
        classification: {
          split: '85-10-5 (train-val-test)',
          method: 'Transfer learning (ImageNet)',
          loss: 'Binary Cross Entropy',
          optimizer: 'Adam with decay'
        },
        yolo: {
          epochs: '150',
          optimizer: 'SGD',
          learningRate: '0.00066335 with decay',
          batchSize: '16'
        }
      },
      metrics: {
        mAP50: '81.54%',
        mAP5095: '69.11%',
        boxLoss: '0.59 (from 1.19)',
        classLoss: '0.37 (from 1.39)'
      },
      trainingMethods: [
        'Normal training (from scratch)',
        'Transfer learning (ImageNet weights)',
        'Partial transfer learning (classifier only)',
        'Gradual freezing (feature extraction after 3 epochs)'
      ],
      hyperparameters: {
        classification: [
          'Confidence threshold: 0.35',
          'Learning rate: 4e-3 with 0.95 decay per 5 epochs',
          'Batch normalization freezing: After 2 epochs'
        ],
        yolo: [
          'Bounding box threshold: 0.5',
          'Learning rate: 0.00066335 → 0.0000332',
          'Batch size: 16'
        ]
      }
    },
    {
      title: 'Performance Analysis',
      icon: Speed,
      content: `Our system demonstrates robust performance in pedestrian crossing detection with high precision and recall 
                in real-world testing.`,
      points: [
        'Classification Model Evolution',
        'YOLO Model Metrics',
        'Potential Limitations'
      ],
      details: `The classification model evolution shows consistent accuracy across VGG16, ResNet50, and MobileNetV3 (all ~99.7%), 
                with only the quantized MobileNetV3 showing a slight reduction to ~94.7%. The quantized model provides a 4-5x CPU 
                speedup while reducing the model size to just 2.8MB.
                
                The YOLO model achieves impressive metrics with 91.28% precision and 94.66% recall, with mAP50 of 81.54% and 
                mAP50-95 of 69.11%. Loss reduction was significant across box loss (1.19 → 0.59) and classification loss 
                (1.39 → 0.37).`,
      performance: {
        precision: '91.28%',
        recall: '94.66%',
        mAP50: '81.54%',
        mAP5095: '69.11%'
      },
      limitations: {
        classification: [
          'Sensitivity to lighting conditions',
          'Performance degradation with image quality variations',
          'Accuracy loss in quantized version',
          'Partial crossings at image boundaries'
        ],
        yolo: [
          'False positives in similar-looking road markings',
          'Obscured or faded markings',
          'Complex intersection layouts',
          'Geometric distortion in extreme viewing angles'
        ]
      },
      improvements: [
        'Enhanced data augmentation techniques',
        'Advanced model compression methods',
        'Improved quantization approaches',
        'Adaptive confidence thresholds',
        'Edge case handling mechanisms',
        'Synthetic data for rare scenarios'
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
              Algorithm Guide
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
              Understanding our computer vision approach to satellite image analysis
            </Typography>

            <Box sx={{ mb: 6, display: 'flex', justifyContent: 'center', gap: 3 }}>
              {Object.entries(modelMetrics).map(([key, value]) => (
                <Box
                  key={key}
                  sx={{
                    textAlign: 'center',
                    p: 2,
                    minWidth: 120,
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      color: 'primary.main',
                      mb: 1,
                    }}
                  >
                    {typeof value === 'number' ? (value * 100).toFixed(1) + '%' : value}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ textTransform: 'capitalize' }}
                  >
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>

          <Grid container spacing={4}>
            {sections.map((section, index) => (
              <Grid item xs={12} md={6} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <GlassPaper 
                    sx={{ 
                      p: 4, 
                      height: '100%',
                      transition: 'transform 0.2s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                      }
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: '14px',
                          backgroundColor: 'rgba(9, 132, 227, 0.08)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mr: 2,
                        }}
                      >
                        <section.icon sx={{ color: '#0984E3', fontSize: 24 }} />
                      </Box>
                      <Typography variant="h5" sx={{ fontWeight: 600 }}>
                        {section.title}
                      </Typography>
                    </Box>

                    <Typography color="text.secondary" sx={{ mb: 3, lineHeight: 1.7 }}>
                      {section.content}
                    </Typography>

                    <Box
                      sx={{
                        backgroundColor: 'rgba(9, 132, 227, 0.04)',
                        borderRadius: '12px',
                        p: 2,
                        mb: 2,
                      }}
                    >
                      {section.points.map((point, idx) => (
                        <Typography
                          key={idx}
                          variant="body2"
                          sx={{
                            color: 'text.secondary',
                            py: 0.5,
                            display: 'flex',
                            alignItems: 'center',
                            '&:before': {
                              content: '""',
                              width: 6,
                              height: 6,
                              borderRadius: '50%',
                              backgroundColor: '#0984E3',
                              marginRight: 2,
                            },
                          }}
                        >
                          {point}
                        </Typography>
                      ))}
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                      <Typography 
                        variant="button" 
                        sx={{ 
                          color: 'primary.main',
                          fontSize: '0.875rem',
                          fontWeight: 500,
                        }}
                      >
                        Technical Details
                      </Typography>
                      <ExpandMore
                        expand={expandedSections[index]}
                        onClick={() => handleExpandClick(index)}
                        aria-expanded={expandedSections[index]}
                        aria-label="show more"
                        size="small"
                      >
                        <ExpandMoreIcon />
                      </ExpandMore>
                    </Box>

                    <Collapse in={expandedSections[index]} timeout="auto" unmountOnExit>
                      <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid rgba(0, 0, 0, 0.06)' }}>
                        <Typography color="text.secondary" sx={{ lineHeight: 1.7, mb: 3 }}>
                          {section.details}
                        </Typography>

                        {section.additionalDetails && (
                          <Typography color="text.secondary" sx={{ lineHeight: 1.7, mb: 3 }}>
                            {section.additionalDetails}
                          </Typography>
                        )}

                        {section.modelArchitecture && (
                          <Box sx={{ mb: 3 }}>
                            <Typography variant="subtitle2" gutterBottom>
                              Model Architecture
                            </Typography>
                            <Grid container spacing={2}>
                              {Object.entries(section.modelArchitecture).map(([key, value]) => (
                                <Grid item xs={12} sm={6} key={key}>
                                  <Box sx={{ 
                                    p: 2, 
                                    borderRadius: '12px',
                                    backgroundColor: 'rgba(9, 132, 227, 0.04)',
                                    border: '1px solid rgba(9, 132, 227, 0.1)',
                                  }}>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: 'primary.main' }}>
                                      {key === 'classification' ? 'Classification Model' : 'Detection Model'}
                                    </Typography>
                                    {Object.entries(value).map(([subKey, subValue]) => (
                                      <Box 
                                        key={subKey}
                                sx={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                          py: 0.5,
                                  borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
                                }}
                              >
                                        <Typography variant="body2" color="text.secondary" sx={{ textTransform: 'capitalize' }}>
                                          {subKey}
                                </Typography>
                                <Typography variant="body2">
                                          {subValue}
                                </Typography>
                              </Box>
                            ))}
                          </Box>
                                </Grid>
                              ))}
                            </Grid>
                          </Box>
                        )}

                        {section.evolution && (
                          <Box sx={{ mb: 3 }}>
                            <Typography variant="subtitle2" gutterBottom>
                              Model Evolution
                            </Typography>
                            {section.evolution.map((model, idx) => (
                              <Box key={idx} sx={{ mb: 2 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                  <Typography variant="body2" sx={{ fontWeight: 500 }}>{model.name}</Typography>
                                  <Typography variant="body2" color="text.secondary">
                                    {model.size} | {model.accuracy}
                                  </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <LinearProgress
                                  variant="determinate"
                                    value={((idx + 1) / section.evolution.length) * 100}
                                    sx={{ height: 4, borderRadius: 2, flex: 1 }}
                                />
                                  <Typography variant="caption" color="text.secondary">
                                    {model.note}
                                  </Typography>
                                </Box>
                              </Box>
                            ))}
                          </Box>
                        )}

                        {section.trainingMethods && (
                          <Box sx={{ mb: 3 }}>
                            <Typography variant="subtitle2" gutterBottom>
                              Training Methods
                            </Typography>
                            <Box sx={{ 
                              p: 2, 
                              borderRadius: '12px',
                              backgroundColor: 'rgba(9, 132, 227, 0.04)',
                              border: '1px solid rgba(9, 132, 227, 0.1)',
                            }}>
                              {section.trainingMethods.map((method, idx) => (
                                <Typography key={idx} variant="body2" sx={{ mb: 0.5 }}>
                                  • {method}
                                </Typography>
                              ))}
                            </Box>
                          </Box>
                        )}

                        {section.hyperparameters && (
                          <Box sx={{ mb: 3 }}>
                            <Typography variant="subtitle2" gutterBottom>
                              Hyperparameter Investigation
                            </Typography>
                            <Grid container spacing={2}>
                              <Grid item xs={12} sm={6}>
                                <Typography variant="caption" color="text.secondary">
                                  Classification Models
                                </Typography>
                                {section.hyperparameters.classification.map((param, idx) => (
                                  <Typography key={idx} variant="body2" sx={{ mb: 0.5 }}>
                                    • {param}
                                  </Typography>
                                ))}
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <Typography variant="caption" color="text.secondary">
                                  YOLO Model
                                </Typography>
                                {section.hyperparameters.yolo.map((param, idx) => (
                                  <Typography key={idx} variant="body2" sx={{ mb: 0.5 }}>
                                    • {param}
                                  </Typography>
                                ))}
                              </Grid>
                            </Grid>
                          </Box>
                        )}

                        {section.limitations && (
                          <Box sx={{ mb: 3 }}>
                            <Typography variant="subtitle2" gutterBottom>
                              Potential Causes of Failure
                            </Typography>
                            <Grid container spacing={2}>
                              <Grid item xs={12} sm={6}>
                                <Typography variant="caption" color="text.secondary">
                                  Classification Models
                                </Typography>
                                {section.limitations.classification.map((limitation, idx) => (
                                  <Typography key={idx} variant="body2" sx={{ mb: 0.5 }}>
                                    • {limitation}
                                  </Typography>
                                ))}
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <Typography variant="caption" color="text.secondary">
                                  YOLO Model
                                </Typography>
                                {section.limitations.yolo.map((limitation, idx) => (
                                  <Typography key={idx} variant="body2" sx={{ mb: 0.5 }}>
                                    • {limitation}
                                  </Typography>
                                ))}
                              </Grid>
                            </Grid>
                              </Box>
                        )}

                        {section.preprocessing && (
                          <Box sx={{ mb: 3 }}>
                            <Typography variant="subtitle2" gutterBottom>
                              Preprocessing Pipeline
                            </Typography>
                            <Grid container spacing={2}>
                              <Grid item xs={12} sm={6}>
                                <Typography variant="caption" color="text.secondary">
                                  Segmentation
                                </Typography>
                                {section.preprocessing.segmentation.map((segment, idx) => (
                                  <Typography key={idx} variant="body2" sx={{ mb: 0.5 }}>
                                    • {segment}
                                  </Typography>
                                ))}
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <Typography variant="caption" color="text.secondary">
                                  Georeferencing
                                </Typography>
                                {section.preprocessing.georeferencing.map((method, idx) => (
                                  <Typography key={idx} variant="body2" sx={{ mb: 0.5 }}>
                                    • {method}
                                  </Typography>
                                ))}
                              </Grid>
                            </Grid>
                          </Box>
                        )}

                        {section.dataStats && (
                          <Box>
                            <Typography variant="subtitle2" gutterBottom>
                              Data Statistics
                            </Typography>
                            <Grid container spacing={1}>
                              {Object.entries(section.dataStats).map(([key, value]) => (
                                <Grid item xs={6} key={key}>
                                  <Box
                                    sx={{
                                      p: 1,
                                      borderRadius: 1,
                                      bgcolor: 'rgba(9, 132, 227, 0.04)',
                                      textAlign: 'center',
                                    }}
                                  >
                                    <Typography variant="caption" color="text.secondary" display="block">
                                      {key.toUpperCase()}
                                    </Typography>
                                    <Typography variant="body2">
                                      {value}
                                    </Typography>
                                  </Box>
                                </Grid>
                              ))}
                            </Grid>
                          </Box>
                        )}
                      </Box>
                    </Collapse>
                  </GlassPaper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </PageContainer>
    </Container>
  );
}

export default AlgorithmGuide; 
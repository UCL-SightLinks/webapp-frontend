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
    accuracy: 0.95,
    precision: 0.92,
    recall: 0.89,
    f1Score: 0.90,
    inferenceTime: '150ms'
  };

  const sections = [
    {
      title: 'Core Concepts',
      icon: Psychology,
      content: `Our algorithm uses deep learning techniques to identify zebra crossings in satellite imagery. 
                The model is trained on a large dataset of annotated satellite images, focusing on urban areas 
                where pedestrian crossings are common.`,
      points: [
        'Convolutional Neural Networks (CNN)',
        'Object Detection Architecture',
        'Transfer Learning Approach'
      ],
      details: `Our CNN architecture is based on the latest research in computer vision, 
                utilizing transfer learning from pre-trained models on large-scale datasets. 
                The network is fine-tuned specifically for satellite imagery analysis, with 
                custom layers designed for zebra crossing detection.`,
      technicalSpecs: {
        architecture: 'ResNet50 + FPN',
        inputSize: '1024x1024px',
        channels: 'RGB + NIR',
        backbone: 'ImageNet pre-trained'
      },
      performance: {
        accuracy: 0.95,
        latency: '150ms',
        throughput: '10 images/s'
      }
    },
    {
      title: 'Technical Implementation',
      icon: Architecture,
      content: `The system employs a two-stage detection pipeline: first identifying potential regions of 
                interest, then performing detailed analysis on these regions to confirm and classify zebra 
                crossings.`,
      points: [
        'Region Proposal Network',
        'Feature Extraction',
        'Classification Head'
      ],
      details: `The Region Proposal Network (RPN) efficiently scans the entire image to 
                identify potential zebra crossing locations. These regions are then processed 
                by our feature extraction network, which analyzes spatial patterns and geometric 
                characteristics typical of zebra crossings.`,
      implementation: {
        framework: 'PyTorch 2.0',
        deployment: 'ONNX Runtime',
        optimization: 'TensorRT',
        hardware: 'NVIDIA A100'
      },
      pipeline: [
        { stage: 'Input Processing', time: '10ms' },
        { stage: 'Region Proposal', time: '50ms' },
        { stage: 'Feature Extraction', time: '60ms' },
        { stage: 'Classification', time: '30ms' }
      ]
    },
    {
      title: 'Data Processing',
      icon: DataObject,
      content: `Satellite images undergo several preprocessing steps to ensure optimal detection performance. 
                This includes normalization, augmentation, and resolution standardization.`,
      points: [
        'Image Preprocessing',
        'Data Augmentation',
        'Batch Processing'
      ],
      details: `Our preprocessing pipeline includes advanced techniques like adaptive histogram 
                equalization and multi-scale image analysis. The augmentation process creates 
                variations in lighting, orientation, and scale to improve model robustness.`,
      preprocessing: {
        techniques: [
          'Adaptive Histogram Equalization',
          'Multi-scale Analysis',
          'Geometric Corrections'
        ],
        augmentation: [
          'Random Rotation (0-360°)',
          'Scale Variation (±20%)',
          'Brightness/Contrast Adjustment'
        ]
      },
      dataStats: {
        trainingImages: '100,000+',
        validationSet: '10,000',
        avgFileSize: '25MB',
        resolution: '0.5m/pixel'
      }
    },
    {
      title: 'Performance Optimization',
      icon: Speed,
      content: `Our system is optimized for both accuracy and speed, utilizing various techniques to 
                maintain high performance while processing large satellite images.`,
      points: [
        'Model Quantization',
        'Parallel Processing',
        'Caching Strategy'
      ],
      details: `We employ model quantization to reduce inference time while maintaining accuracy. 
                Our parallel processing system can handle multiple image regions simultaneously, 
                and our smart caching strategy reduces redundant computations.`,
      optimizations: [
        { technique: 'INT8 Quantization', speedup: '2.5x' },
        { technique: 'Batch Processing', speedup: '4x' },
        { technique: 'Model Pruning', speedup: '1.5x' }
      ],
      resources: {
        gpu: 'NVIDIA A100 (40GB)',
        memory: '128GB RAM',
        storage: 'NVMe SSD',
        throughput: '100 images/min'
      }
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

                        {section.technicalSpecs && (
                          <Box sx={{ mb: 3 }}>
                            <Typography variant="subtitle2" gutterBottom>
                              Technical Specifications
                            </Typography>
                            {Object.entries(section.technicalSpecs).map(([key, value]) => (
                              <Box
                                key={key}
                                sx={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  py: 1,
                                  borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
                                }}
                              >
                                <Typography variant="body2" color="text.secondary">
                                  {key}
                                </Typography>
                                <Typography variant="body2">
                                  {value}
                                </Typography>
                              </Box>
                            ))}
                          </Box>
                        )}

                        {section.implementation && (
                          <Box sx={{ mb: 3 }}>
                            <Typography variant="subtitle2" gutterBottom>
                              Implementation Details
                            </Typography>
                            <Grid container spacing={1}>
                              {Object.entries(section.implementation).map(([key, value]) => (
                                <Grid item xs={6} key={key}>
                                  <Chip
                                    label={`${key}: ${value}`}
                                    size="small"
                                    variant="outlined"
                                    sx={{ width: '100%' }}
                                  />
                                </Grid>
                              ))}
                            </Grid>
                          </Box>
                        )}

                        {section.pipeline && (
                          <Box sx={{ mb: 3 }}>
                            <Typography variant="subtitle2" gutterBottom>
                              Processing Pipeline
                            </Typography>
                            {section.pipeline.map((stage, idx) => (
                              <Box key={idx} sx={{ mb: 1 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                  <Typography variant="body2">{stage.stage}</Typography>
                                  <Typography variant="body2" color="text.secondary">
                                    {stage.time}
                                  </Typography>
                                </Box>
                                <LinearProgress
                                  variant="determinate"
                                  value={((idx + 1) / section.pipeline.length) * 100}
                                  sx={{ height: 4, borderRadius: 2 }}
                                />
                              </Box>
                            ))}
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
                                  Techniques
                                </Typography>
                                {section.preprocessing.techniques.map((technique, idx) => (
                                  <Typography key={idx} variant="body2" sx={{ mb: 0.5 }}>
                                    • {technique}
                                  </Typography>
                                ))}
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <Typography variant="caption" color="text.secondary">
                                  Augmentation
                                </Typography>
                                {section.preprocessing.augmentation.map((aug, idx) => (
                                  <Typography key={idx} variant="body2" sx={{ mb: 0.5 }}>
                                    • {aug}
                                  </Typography>
                                ))}
                              </Grid>
                            </Grid>
                          </Box>
                        )}

                        {section.optimizations && (
                          <Box sx={{ mb: 3 }}>
                            <Typography variant="subtitle2" gutterBottom>
                              Optimization Techniques
                            </Typography>
                            {section.optimizations.map((opt, idx) => (
                              <Box
                                key={idx}
                                sx={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  py: 1,
                                  borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
                                }}
                              >
                                <Typography variant="body2">
                                  {opt.technique}
                                </Typography>
                                <Chip
                                  label={`${opt.speedup} speedup`}
                                  size="small"
                                  color="primary"
                                  variant="outlined"
                                />
                              </Box>
                            ))}
                          </Box>
                        )}

                        {section.resources && (
                          <Box>
                            <Typography variant="subtitle2" gutterBottom>
                              System Requirements
                            </Typography>
                            <Grid container spacing={1}>
                              {Object.entries(section.resources).map(([key, value]) => (
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
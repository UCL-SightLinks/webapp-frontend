import { Container, Typography, Grid, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { 
  Description, Code, LibraryBooks, 
  ChevronRight, School, Build, CheckCircle, Speed, Image 
} from '@mui/icons-material';
import { 
  GlassPaper, IconBox, 
  AnimatedButton, PageContainer, HeroSection 
} from '../components/StyledComponents';
import { useNavigate } from 'react-router-dom';

function Documentation() {
  const navigate = useNavigate();

  const mainSections = [
    {
      title: 'GitHub Setup',
      description: 'Get started in minutes with our setup guide. Learn how to install Python dependencies, configure the YOLO model, and process your first satellite image.',
      icon: Description,
      ctaText: 'View Setup Guide',
      path: '/github-setup'
    },
    {
      title: 'API Documentation',
      description: 'Access our REST API to detect crosswalks in satellite imagery. Supports both DigiMap (.jpg/.jgw) and GeoTIFF formats with real-time processing status.',
      icon: Code,
      ctaText: 'Explore API Docs',
      path: '/api-docs'
    },
    {
      title: 'Algorithm Guide',
      description: 'Discover how our YOLO-based model achieves 95% accuracy in crosswalk detection. Includes detailed parameter tuning guides and visualization options.',
      icon: School,
      ctaText: 'Read Algorithm Guide',
      path: '/algorithm-guide'
    }
  ];

  const features = [
    { 
      title: 'High Accuracy', 
      icon: CheckCircle, 
      description: '95% detection rate' 
    },
    { 
      title: 'Real-time', 
      icon: Speed, 
      description: 'Process in seconds' 
    },
    { 
      title: 'Multiple Formats', 
      icon: Image, 
      description: 'DigiMap & GeoTIFF' 
    },
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
          <HeroSection>
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
                Documentation
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
                Everything you need to know about our satellite image analysis platform
              </Typography>
            </Box>

            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: 3, 
              flexWrap: 'wrap', 
              mb: 8,
              mx: 'auto',
              maxWidth: '900px',
              '@keyframes float': {
                '0%, 100%': {
                  transform: 'translateY(0px)',
                },
                '50%': {
                  transform: 'translateY(-10px)',
                }
              },
              '@keyframes pulse': {
                '0%, 100%': {
                  transform: 'scale(1)',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.02)',
                },
                '50%': {
                  transform: 'scale(1.02)',
                  boxShadow: '0 4px 12px rgba(9, 132, 227, 0.08)',
                }
              }
            }}>
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5,
                    delay: index * 0.2,
                  }}
                >
                  <Box
                  sx={{ 
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      py: 1.5,
                    px: 3,
                      minWidth: '240px',
                      maxWidth: '280px',
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      borderRadius: '14px',
                      border: '1px solid rgba(0, 0, 0, 0.04)',
                      transition: 'all 0.3s ease-in-out',
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.02)',
                      animation: `float 3s ease-in-out infinite`,
                      animationDelay: `${index * 0.3}s`,
                    '&:hover': {
                        animation: `pulse 2s ease-in-out infinite`,
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        border: '1px solid rgba(9, 132, 227, 0.1)',
                        '& .feature-icon': {
                          backgroundColor: 'rgba(9, 132, 227, 0.1)',
                          transform: 'scale(1.1)',
                        }
                      }
                    }}
                  >
                    <Box
                      className="feature-icon"
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '10px',
                        backgroundColor: 'rgba(9, 132, 227, 0.06)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.3s ease-in-out',
                      }}
                    >
                      <feature.icon sx={{ 
                        fontSize: 20, 
                        color: '#0984E3',
                        transition: 'all 0.3s ease-in-out',
                      }} />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle2" sx={{ 
                        fontWeight: 600, 
                        lineHeight: 1.3,
                        fontSize: '0.9rem',
                        mb: 0.5
                      }}>
                        {feature.title}
                      </Typography>
                      <Typography 
                        variant="caption" 
                        color="text.secondary" 
                        sx={{ 
                          display: 'block',
                          fontSize: '0.75rem',
                          opacity: 0.85
                        }}
                      >
                        {feature.description}
                      </Typography>
                    </Box>
                  </Box>
                </motion.div>
              ))}
            </Box>
          </HeroSection>

          <Grid container spacing={4}>
            {mainSections.map((section, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  {...fadeInUp}
                  transition={{ delay: index * 0.1 }}
                  style={{ height: '100%' }}
                >
                  <GlassPaper sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    p: 4,
                    position: 'relative',
                    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 12px 40px rgba(0, 0, 0, 0.12)',
                      '& .arrow-button': {
                        opacity: 1,
                        transform: 'translate(0, 0)',
                      }
                    }
                  }}>
                    <IconBox sx={{ mb: 3 }}>
                      <section.icon sx={{ fontSize: 30 }} />
                    </IconBox>
                    
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
                      {section.title}
                    </Typography>
                    <Typography color="text.secondary" sx={{ mb: 4, flex: 1 }}>
                      {section.description}
                    </Typography>
                    
                    <Box 
                      className="arrow-button"
                          onClick={() => navigate(section.path)}
                          sx={{
                        position: 'absolute',
                        right: 20,
                        bottom: 20,
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                        backgroundColor: 'rgba(9, 132, 227, 0.8)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        opacity: 0,
                        transform: 'translate(4px, 4px)',
                        transition: 'all 0.2s ease-in-out',
                            '&:hover': {
                          backgroundColor: 'rgba(9, 132, 227, 0.9)',
                          transform: 'translate(0, 0) scale(1.1)',
                            }
                          }}
                        >
                      <ChevronRight sx={{ fontSize: 20, color: 'white' }} />
                    </Box>
                  </GlassPaper>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ mt: 8 }}>
            <GlassPaper sx={{ 
              p: 8, 
              textAlign: 'center',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%)',
              transition: 'transform 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-4px)',
              }
            }}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
                Project Report
              </Typography>
              <Typography 
                color="text.secondary" 
                sx={{ 
                  mb: 4, 
                  maxWidth: '600px', 
                  mx: 'auto',
                  fontSize: '1.1rem',
                  lineHeight: 1.8
                }}
              >
                Explore our comprehensive project report covering requirements, research, algorithms, design, implementation, testing, and evaluation.
              </Typography>
              <AnimatedButton 
                variant="contained" 
                size="large"
                href="http://students.cs.ucl.ac.uk/2024/group15/index.html"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ 
                  borderRadius: '30px',
                  px: 6,
                  py: 2,
                  background: 'linear-gradient(45deg, #0984E3 30%, #74B9FF 90%)',
                  boxShadow: '0 8px 24px rgba(9, 132, 227, 0.25)',
                }}
              >
                View Full Report
              </AnimatedButton>
            </GlassPaper>
          </Box>

          <Box sx={{ mt: 8 }}>
            <GlassPaper sx={{ 
              p: 8, 
              textAlign: 'center',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%)',
              transition: 'transform 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-4px)',
              }
            }}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
                Dataset & Model Repository
              </Typography>
              <Typography 
                color="text.secondary" 
                sx={{ 
                  mb: 4, 
                  maxWidth: '600px', 
                  mx: 'auto',
                  fontSize: '1.1rem',
                  lineHeight: 1.8
                }}
              >
                Access our trained YOLO model and satellite image dataset on Hugging Face. Explore model architecture, training details, performance metrics, and our annotated zebra crossing dataset.
              </Typography>
              <AnimatedButton 
                variant="contained" 
                size="large"
                href="https://huggingface.co/SightLinks"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ 
                  borderRadius: '30px',
                  px: 6,
                  py: 2,
                  background: 'linear-gradient(45deg, #0984E3 30%, #74B9FF 90%)',
                  boxShadow: '0 8px 24px rgba(9, 132, 227, 0.25)',
                }}
              >
                View on Hugging Face
              </AnimatedButton>
            </GlassPaper>
          </Box>

          <Box sx={{ mt: 8 }}>
            <GlassPaper sx={{ 
              p: 8, 
              textAlign: 'center',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%)',
              transition: 'transform 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-4px)',
              }
            }}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
                Need Help?
              </Typography>
              <Typography 
                color="text.secondary" 
                sx={{ 
                  mb: 4, 
                  maxWidth: '600px', 
                  mx: 'auto',
                  fontSize: '1.1rem',
                  lineHeight: 1.8
                }}
              >
                Can't find what you're looking for? Our support team is here to help.
              </Typography>
              <AnimatedButton 
                variant="contained" 
                size="large"
                sx={{ 
                  borderRadius: '30px',
                  px: 6,
                  py: 2,
                  background: 'linear-gradient(45deg, #0984E3 30%, #74B9FF 90%)',
                  boxShadow: '0 8px 24px rgba(9, 132, 227, 0.25)',
                }}
              >
                Contact Support
              </AnimatedButton>
            </GlassPaper>
          </Box>
        </motion.div>
      </PageContainer>
    </Container>
  );
}

export default Documentation; 
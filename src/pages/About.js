import { Container, Typography, Grid, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  Visibility, Speed, Security, 
  Timeline, Psychology, CloudDone,
  Rocket as RocketIcon,
  PeopleAlt as TeamIcon,
  Lightbulb as VisionIcon,
  Email as EmailIcon,
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
  Business as BusinessIcon,
  School as SchoolIcon,
  Cloud as CloudIcon,
  Map as MapIcon,
  Hearing as HearingIcon,
  Accessible as AccessibleIcon
} from '@mui/icons-material';
import { GlassPaper } from '../components/StyledComponents';

const FeatureCard = motion(GlassPaper);

// Team member component
const TeamMember = ({ name, roles, image, email, github, linkedin }) => (
  <GlassPaper 
    sx={{ 
      p: 4.5, 
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      transition: 'all 0.35s cubic-bezier(0.25, 0.1, 0.25, 1.0)',
      background: 'linear-gradient(145deg, rgba(255, 255, 255, 1) 0%, rgba(250, 250, 250, 0.95) 100%)',
      borderRadius: '24px',
      border: '1px solid rgba(230, 230, 230, 0.7)',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
      transform: 'translateZ(0)', // Hardware acceleration
      '&:hover': {
        transform: 'translateY(-10px)',
        boxShadow: '0 15px 35px rgba(9, 132, 227, 0.12)',
        border: '1px solid rgba(9, 132, 227, 0.1)'
      }
    }}
  >
    <Box 
      sx={{ 
        width: 120, 
        height: 120, 
        borderRadius: '50%', 
        overflow: 'hidden',
        mb: 3.5,
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8f9fa',
        transform: 'translateZ(0)', // Hardware acceleration
      }}
    >
      <img 
        src={`/team/${image}`} 
        alt={name} 
        style={{ 
          width: '100%', 
          height: '100%', 
          objectFit: 'cover',
          transform: 'translateZ(0)' // Hardware acceleration
        }} 
        onError={(e) => {
          e.target.onerror = null; // Prevent infinite loop
          e.target.src = 'https://via.placeholder.com/120?text=Team+Member';
        }}
      />
    </Box>
    
    <Typography 
      variant="h6" 
      sx={{ 
        fontWeight: 600, 
        mb: 1.5,
        fontSize: '1.2rem',
        color: '#2D3436',
      }}
    >
      {name}
    </Typography>
    
    <Box sx={{ mb: 2.5 }}>
      {roles.map((role, idx) => (
        <Typography 
          key={idx} 
          variant="body2" 
          color="text.secondary" 
          sx={{ 
            mb: 0.5,
            fontSize: '0.875rem',
            lineHeight: 1.3,
            fontWeight: 400,
            color: '#666666'
          }}
        >
          {role}
        </Typography>
      ))}
    </Box>
    
    <Box sx={{ 
      display: 'flex', 
      gap: 2.5, 
      mt: 'auto',
      pt: 2.5,
      justifyContent: 'center'
    }}>
      <Box 
        component="a" 
        href={`mailto:${email}`}
        sx={{ 
          color: '#666666',
          transition: 'all 0.25s ease-in-out',
          transform: 'translateZ(0)', // Hardware acceleration
          '&:hover': {
            color: '#0984E3',
            transform: 'translateY(-3px)',
          }
        }}
      >
        <EmailIcon sx={{ fontSize: 20 }} />
      </Box>
      
      <Box 
        component="a" 
        href={github}
        target="_blank"
        rel="noopener noreferrer"
        sx={{ 
          color: '#666666',
          transition: 'all 0.25s ease-in-out',
          transform: 'translateZ(0)', // Hardware acceleration
          '&:hover': {
            color: '#0984E3',
            transform: 'translateY(-3px)',
          }
        }}
      >
        <GitHubIcon sx={{ fontSize: 20 }} />
      </Box>
      
      <Box 
        component="a" 
        href={linkedin}
        target="_blank"
        rel="noopener noreferrer"
        sx={{ 
          color: '#666666',
          transition: 'all 0.25s ease-in-out',
          transform: 'translateZ(0)', // Hardware acceleration
          '&:hover': {
            color: '#0984E3',
            transform: 'translateY(-3px)',
          }
        }}
      >
        <LinkedInIcon sx={{ fontSize: 20 }} />
      </Box>
    </Box>
  </GlassPaper>
);

// Partner component
const Partner = ({ name, role, image, link, icon: Icon }) => {
  const [imageLoaded, setImageLoaded] = useState(true);
  
  return (
    <Box 
      component="a"
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      sx={{ 
        textDecoration: 'none',
        color: 'inherit',
        display: 'block',
        height: '100%'
      }}
    >
      <GlassPaper 
        sx={{ 
          p: 4.5, 
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          transition: 'all 0.35s cubic-bezier(0.25, 0.1, 0.25, 1.0)',
          background: 'linear-gradient(145deg, rgba(255, 255, 255, 1) 0%, rgba(250, 250, 250, 0.95) 100%)',
          borderRadius: '24px',
          border: '1px solid rgba(230, 230, 230, 0.7)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
          transform: 'translateZ(0)', // Hardware acceleration
          '&:hover': {
            transform: 'translateY(-10px)',
            boxShadow: '0 15px 35px rgba(9, 132, 227, 0.12)',
            border: '1px solid rgba(9, 132, 227, 0.1)'
          }
        }}
      >
        <Box 
          sx={{ 
            width: 130, 
            height: 90, 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 3.5,
            overflow: 'hidden',
            transform: 'translateZ(0)', // Hardware acceleration
          }}
        >
          {image && imageLoaded ? (
            <img 
              src={`/client/${image}`} 
              alt={name} 
              style={{ 
                maxWidth: '100%', 
                maxHeight: '100%', 
                objectFit: 'contain',
                transform: 'translateZ(0)' // Hardware acceleration
              }} 
              onError={() => setImageLoaded(false)}
            />
          ) : (
            <Box 
              sx={{ 
                width: 65, 
                height: 65, 
                borderRadius: '16px',
                backgroundColor: '#f8f9fa',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
              }}
            >
              <Icon sx={{ fontSize: 32, color: '#0984E3' }} />
            </Box>
          )}
        </Box>
        
        <Box>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 600, 
              mb: 1,
              fontSize: '1.2rem',
              color: '#2D3436',
            }}
          >
            {name}
          </Typography>
          <Typography 
            variant="body2" 
            sx={{
              fontWeight: 400,
              fontSize: '0.875rem',
              color: '#666666',
              lineHeight: 1.4
            }}
          >
            {role}
          </Typography>
        </Box>
      </GlassPaper>
    </Box>
  );
};

function About() {
  const features = [
    {
      icon: Visibility,
      title: 'Computer Vision',
      description: 'Cutting-edge computer vision for satellite image analysis',
      color: '#0984E3',
    },
    {
      icon: Speed,
      title: 'Real-time Processing',
      description: 'Fast and efficient processing of large-scale satellite data',
      color: '#00B894',
    },
    {
      icon: AccessibleIcon,
      title: 'Accessibility Mapping',
      description: 'Automated detection and georeferencing of accessibility features',
      color: '#6C5CE7',
    }
  ];

  const values = [
    {
      icon: RocketIcon,
      title: 'Innovation',
      description: 'Pushing boundaries in satellite imagery analysis',
    },
    {
      icon: TeamIcon,
      title: 'Collaboration',
      description: 'Working together to achieve excellence',
    },
    {
      icon: VisionIcon,
      title: 'Vision',
      description: 'Shaping the future of urban accessibility',
    },
  ];

  const teamMembers = [
    {
      name: 'Kostas Demiris',
      roles: ['Team Lead', 'Researcher', 'ML Engineer'],
      image: 'Kostas.jpg',
      email: 'konstantinos.a.demiris@gmail.com',
      github: 'https://github.com/KostasDemiris',
      linkedin: 'https://www.linkedin.com/in/kostas-agusti-demiris/'
    },
    {
      name: 'Aiden (Yiliu) Li',
      roles: ['Frontend Developer', 'Researcher', 'ML Engineer'],
      image: 'Aiden.jpg',
      email: 'yiliu.li@outlook.com',
      github: 'https://github.com/yiliu-li',
      linkedin: 'https://www.linkedin.com/in/aiden-li-510533261/'
    },
    {
      name: 'Edward Tandanu',
      roles: ['Client Liaison', 'Backend Developer', 'Data Engineer'],
      image: 'Edward.jpg',
      email: 'Edw00765@gmail.com',
      github: 'https://github.com/Edw00765',
      linkedin: 'https://www.linkedin.com/in/edward-tandanu-631b52313/'
    },
    {
      name: 'Arif Imtiaz Khan',
      roles: ['Data Engineer', 'Literature Researcher', 'Backend Developer'],
      image: 'Arif.jpg',
      email: 'Arifimtiaz012@gmail.com',
      github: 'https://github.com/arifimtiaz012',
      linkedin: 'https://www.linkedin.com/in/arif-imtiaz-khan-11b9bb22b/'
    }
  ];

  const partners = [
    {
      name: 'UCL Computer Science',
      role: 'Academic Partner',
      image: 'client-1.png',
      link: 'https://www.ucl.ac.uk/computer-science/',
      icon: SchoolIcon
    },
    {
      name: 'Wheelchair Alliance',
      role: 'Research Partner',
      image: 'client-2.png',
      link: 'https://www.wheelchair-alliance.co.uk',
      icon: AccessibleIcon
    },
    {
      name: 'Microsoft Azure',
      role: 'Cloud Service Provider',
      image: 'client-3.png',
      link: 'https://azure.microsoft.com/en-gb/',
      icon: CloudIcon
    },
    {
      name: 'Esri UK',
      role: 'Research Partner',
      image: 'client-4.png',
      link: 'https://www.esriuk.com/',
      icon: MapIcon
    },
    {
      name: 'Soundscape Community',
      role: 'Innovation Partner',
      image: 'client-5.png',
      link: 'https://www.microsoft.com/en-us/research/product/soundscape/',
      icon: HearingIcon
    },
    {
      name: 'GDI Hub',
      role: 'Research Partner',
      image: 'client-6.png',
      link: 'https://www.disabilityinnovation.com',
      icon: BusinessIcon
    }
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 8 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Hero Section */}
          <Box sx={{ textAlign: 'center', mb: 10 }}>
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
              About SightLinks
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
              Transforming satellite imagery analysis with advanced computer vision
            </Typography>
          </Box>

          {/* Features Section */}
          <Grid container spacing={5} sx={{ mb: 12 }}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <FeatureCard
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.4,
                    delay: index * 0.15,
                    ease: [0.25, 0.1, 0.25, 1.0]
                  }}
                  whileHover={{ 
                    y: -10,
                    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
                    transition: { duration: 0.3 }
                  }}
                  sx={{ 
                    textAlign: 'center', 
                    p: 4.5,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '24px',
                    border: '1px solid rgba(230, 230, 230, 0.7)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
                    background: 'linear-gradient(145deg, rgba(255, 255, 255, 1) 0%, rgba(250, 250, 250, 0.95) 100%)',
                  }}
                >
                  <Box
                    sx={{
                      width: 72,
                      height: 72,
                      borderRadius: '22px',
                      background: `linear-gradient(135deg, ${feature.color} 0%, ${feature.color}90 100%)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 3.5,
                      mx: 'auto',
                      boxShadow: `0 10px 25px ${feature.color}30`,
                      transform: 'translateZ(0)', // Hardware acceleration
                    }}
                  >
                    <feature.icon sx={{ 
                      fontSize: 32, 
                      color: 'white',
                      filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.1))'
                    }} />
                  </Box>
                  <Typography 
                    variant="h5" 
                    gutterBottom 
                    sx={{ 
                      fontWeight: 600,
                      mb: 1.5,
                      fontSize: '1.35rem',
                      color: '#2D3436'
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography 
                    color="text.secondary" 
                    sx={{ 
                      lineHeight: 1.7,
                      fontSize: '0.95rem',
                      maxWidth: '90%',
                      mx: 'auto'
                    }}
                  >
                    {feature.description}
                  </Typography>
                </FeatureCard>
              </Grid>
            ))}
          </Grid>

          {/* Mission Section */}
          <GlassPaper 
            sx={{ 
              p: 6, 
              mb: 10, 
              textAlign: 'center',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%)',
            }}
          >
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
              Our Mission
            </Typography>
            <Typography 
              variant="body1" 
              color="text.secondary" 
              sx={{ 
                maxWidth: '800px', 
                mx: 'auto',
                lineHeight: 1.8,
                fontSize: '1.1rem'
              }}
            >
              SightLinks is dedicated to revolutionizing the way we analyze and understand satellite imagery
              to enhance accessibility for impaired individuals. Our platform combines cutting-edge computer 
              vision technology with user-friendly interfaces to automate the detection and mapping of 
              accessibility features, making satellite data analysis accessible, efficient, and impactful.
            </Typography>
          </GlassPaper>

          {/* Problem & Solution Section - Optimized Design */}
          <Typography 
            variant="h4" 
            gutterBottom 
            sx={{ 
              textAlign: 'center', 
              mb: 4,
              fontWeight: 600,
            }}
          >
            The Problem & Our Solution
          </Typography>
          <Grid container spacing={5} sx={{ mb: 10 }}>
            <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                style={{ width: '100%' }}
              >
                <GlassPaper 
                  sx={{ 
                    p: 4.5, 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.35s cubic-bezier(0.25, 0.1, 0.25, 1.0)',
                    background: 'linear-gradient(145deg, rgba(255, 255, 255, 1) 0%, rgba(250, 250, 250, 0.95) 100%)',
                    borderRadius: '24px',
                    border: '1px solid rgba(230, 230, 230, 0.7)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
                    transform: 'translateZ(0)', // Hardware acceleration
                    '&:hover': {
                      boxShadow: '0 15px 35px rgba(236, 64, 122, 0.12)',
                      border: '1px solid rgba(236, 64, 122, 0.1)'
                    }
                  }}
                >
                  <Box
                    sx={{
                      width: 72,
                      height: 72,
                      borderRadius: '22px',
                      background: 'linear-gradient(135deg, #EC407A 0%, #EC407A90 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 3.5,
                      mx: 'auto',
                      boxShadow: '0 10px 25px rgba(236, 64, 122, 0.3)',
                      transform: 'translateZ(0)', // Hardware acceleration
                    }}
                  >
                    <HearingIcon sx={{ 
                      fontSize: 32, 
                      color: 'white',
                      filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.1))'
                    }} />
                  </Box>
                  
                  <Typography 
                    variant="h5" 
                    gutterBottom 
                    sx={{ 
                      fontWeight: 600,
                      mb: 2,
                      fontSize: '1.35rem',
                      color: '#2D3436',
                      textAlign: 'center'
                    }}
                  >
                    The Challenge
                  </Typography>
                  
                  <Typography 
                    color="text.secondary" 
                    sx={{ 
                      lineHeight: 1.7,
                      fontSize: '0.95rem',
                      mb: 3,
                      fontWeight: 500
                    }}
                  >
                    Impaired individuals face significant navigation challenges due to the lack of support tailored to their specific needs.
                  </Typography>
                  
                  <Box sx={{ mb: 3 }}>
                    <Typography 
                      variant="subtitle2" 
                      sx={{ 
                        fontWeight: 600, 
                        mb: 1.5, 
                        color: '#EC407A',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      Key Challenges
                    </Typography>
                    
                    {['Diverse impairment needs', 'Limited navigation support', 'Complex urban environments', 'Varying accessibility standards'].map((item, idx) => (
                      <Box 
                        key={idx} 
                        sx={{ 
                          display: 'flex', 
                          alignItems: 'flex-start',
                          mb: 1
                        }}
                      >
                        <Box 
                          sx={{ 
                            width: 6, 
                            height: 6, 
                            borderRadius: '50%', 
                            bgcolor: '#EC407A', 
                            mt: 0.8,
                            mr: 1.5,
                            flexShrink: 0
                          }} 
                        />
                        <Typography 
                          variant="body2" 
                          color="text.secondary"
                          sx={{ fontSize: '0.95rem' }}
                        >
                          {item}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                  
                  <Box sx={{ mt: 'auto' }}>
                    <Typography 
                      variant="subtitle2" 
                      sx={{ 
                        fontWeight: 600, 
                        mb: 1.5, 
                        color: '#EC407A',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      Current Limitations
                    </Typography>
                    
                    {[
                      'Manual mapping is time and resource intensive',
                      'Existing solutions lack georeferencing capabilities',
                      'Organizations struggle with large-scale implementation',
                      'Inconsistent data quality across different regions'
                    ].map((item, idx) => (
                      <Box 
                        key={idx} 
                        sx={{ 
                          display: 'flex', 
                          alignItems: 'flex-start',
                          mb: 1
                        }}
                      >
                        <Box 
                          sx={{ 
                            width: 6, 
                            height: 6, 
                            borderRadius: '50%', 
                            bgcolor: '#EC407A', 
                            mt: 0.8,
                            mr: 1.5,
                            flexShrink: 0
                          }} 
                        />
                        <Typography 
                          variant="body2" 
                          color="text.secondary"
                          sx={{ fontSize: '0.95rem' }}
                        >
                          {item}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </GlassPaper>
              </motion.div>
            </Grid>
            
            <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                style={{ width: '100%' }}
              >
                <GlassPaper 
                  sx={{ 
                    p: 4.5, 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.35s cubic-bezier(0.25, 0.1, 0.25, 1.0)',
                    background: 'linear-gradient(145deg, rgba(255, 255, 255, 1) 0%, rgba(250, 250, 250, 0.95) 100%)',
                    borderRadius: '24px',
                    border: '1px solid rgba(230, 230, 230, 0.7)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
                    transform: 'translateZ(0)', // Hardware acceleration
                    '&:hover': {
                      boxShadow: '0 15px 35px rgba(9, 132, 227, 0.12)',
                      border: '1px solid rgba(9, 132, 227, 0.1)'
                    }
                  }}
                >
                  <Box
                    sx={{
                      width: 72,
                      height: 72,
                      borderRadius: '22px',
                      background: 'linear-gradient(135deg, #0984E3 0%, #0984E390 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 3.5,
                      mx: 'auto',
                      boxShadow: '0 10px 25px rgba(9, 132, 227, 0.3)',
                      transform: 'translateZ(0)', // Hardware acceleration
                    }}
                  >
                    <AccessibleIcon sx={{ 
                      fontSize: 32, 
                      color: 'white',
                      filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.1))'
                    }} />
                  </Box>
                  
                  <Typography 
                    variant="h5" 
                    gutterBottom 
                    sx={{ 
                      fontWeight: 600,
                      mb: 2,
                      fontSize: '1.35rem',
                      color: '#2D3436',
                      textAlign: 'center'
                    }}
                  >
                    Our Solution
                  </Typography>
                  
                  <Typography 
                    color="text.secondary" 
                    sx={{ 
                      lineHeight: 1.7,
                      fontSize: '0.95rem',
                      mb: 3,
                      fontWeight: 500
                    }}
                  >
                    SightLinks is a computer vision system that automates the detection and mapping of accessibility features.
                  </Typography>
                  
                  <Box sx={{ mb: 3 }}>
                    <Typography 
                      variant="subtitle2" 
                      sx={{ 
                        fontWeight: 600, 
                        mb: 1.5, 
                        color: '#0984E3',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      Key Technologies
                    </Typography>
                    
                    {[
                      'Advanced image segmentation',
                      'Classification screening algorithms',
                      'Efficient memory management',
                      'Georeferenced data processing'
                    ].map((item, idx) => (
                      <Box 
                        key={idx} 
                        sx={{ 
                          display: 'flex', 
                          alignItems: 'flex-start',
                          mb: 1
                        }}
                      >
                        <Box 
                          sx={{ 
                            width: 6, 
                            height: 6, 
                            borderRadius: '50%', 
                            bgcolor: '#0984E3', 
                            mt: 0.8,
                            mr: 1.5,
                            flexShrink: 0
                          }} 
                        />
                        <Typography 
                          variant="body2" 
                          color="text.secondary"
                          sx={{ fontSize: '0.95rem' }}
                        >
                          {item}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                  
                  <Box sx={{ mt: 'auto' }}>
                    <Typography 
                      variant="subtitle2" 
                      sx={{ 
                        fontWeight: 600, 
                        mb: 1.5, 
                        color: '#0984E3',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      Key Benefits
                    </Typography>
                    
                    {[
                      'Modular pipeline for easy integration',
                      'Efficient resource distribution',
                      'Support for GeoTIFF and World files',
                      'Minimal human intervention required'
                    ].map((item, idx) => (
                      <Box 
                        key={idx} 
                        sx={{ 
                          display: 'flex', 
                          alignItems: 'flex-start',
                          mb: 1
                        }}
                      >
                        <Box 
                          sx={{ 
                            width: 6, 
                            height: 6, 
                            borderRadius: '50%', 
                            bgcolor: '#0984E3', 
                            mt: 0.8,
                            mr: 1.5,
                            flexShrink: 0
                          }} 
                        />
                        <Typography 
                          variant="body2" 
                          color="text.secondary"
                          sx={{ fontSize: '0.95rem' }}
                        >
                          {item}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </GlassPaper>
              </motion.div>
            </Grid>
          </Grid>

          {/* Values Section */}
          <Typography 
            variant="h4" 
            gutterBottom 
            sx={{ 
              textAlign: 'center', 
              mb: 4,
              fontWeight: 600,
            }}
          >
            Our Values
          </Typography>
          <Grid container spacing={4} sx={{ mb: 10 }}>
            {values.map((value, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <GlassPaper sx={{ 
                    textAlign: 'center',
                    p: 4,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: '16px',
                        backgroundColor: 'rgba(9, 132, 227, 0.08)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 2,
                      }}
                    >
                      <value.icon sx={{ fontSize: 28, color: '#0984E3' }} />
                    </Box>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                      {value.title}
                    </Typography>
                    <Typography color="text.secondary">
                      {value.description}
                    </Typography>
                  </GlassPaper>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          {/* Team Section */}
          <Typography 
            variant="h4" 
            gutterBottom 
            sx={{ 
              textAlign: 'center', 
              mb: 4,
              fontWeight: 600,
            }}
          >
            Our Team
          </Typography>
          <Grid container spacing={4} sx={{ mb: 10 }}>
            {teamMembers.map((member, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <TeamMember {...member} />
                </motion.div>
              </Grid>
            ))}
          </Grid>

          {/* Partners Section */}
          <Typography 
            variant="h4" 
            gutterBottom 
            sx={{ 
              textAlign: 'center', 
              mb: 4,
              fontWeight: 600,
            }}
          >
            Our Partners
          </Typography>
          <Grid container spacing={3} sx={{ mb: 10 }}>
            {partners.map((partner, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Partner {...partner} />
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Box>
    </Container>
  );
}

export default About; 
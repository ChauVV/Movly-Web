import { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

const heroConfig = {
  background: {
    color: '#000000'
  },
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800
      }
    },
    color: {
      value: '#ffffff'
    },
    shape: {
      type: 'circle'
    },
    opacity: {
      value: 0.5,
      random: true
    },
    size: {
      value: 3,
      random: true
    },
    links: {
      enable: true,
      distance: 150,
      color: '#ffffff',
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      speed: 2,
      direction: 'none',
      random: false,
      straight: false,
      outModes: {
        default: 'bounce'
      },
      attract: {
        enable: false
      }
    }
  },
  interactivity: {
    detectsOn: 'canvas',
    events: {
      onHover: {
        enable: true,
        mode: 'repulse'
      },
      onClick: {
        enable: true,
        mode: 'push'
      },
      resize: true
    }
  }
};

const tokenomicsConfig = {
  background: {
    color: '#0a0a0a'
  },
  particles: {
    number: {
      value: 60,
      density: {
        enable: true,
        value_area: 800
      }
    },
    color: {
      value: '#00cc6a'
    },
    shape: {
      type: 'circle'
    },
    opacity: {
      value: 0.5,
      random: true
    },
    size: {
      value: 4,
      random: true
    },
    links: {
      enable: true,
      distance: 150,
      color: '#00cc6a',
      opacity: 0.4,
      width: 1.2
    },
    move: {
      enable: true,
      speed: 2,
      direction: 'none',
      random: true,
      straight: false,
      outModes: {
        default: 'bounce'
      },
      attract: {
        enable: true,
        rotateX: 600,
        rotateY: 1200
      }
    }
  },
  interactivity: {
    detectsOn: 'canvas',
    events: {
      onHover: {
        enable: true,
        mode: 'repulse'
      },
      onClick: {
        enable: true,
        mode: 'push'
      },
      resize: true
    }
  }
};

export default function ParticlesBackground({ type = 'hero' }) {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const isMobile = window.innerWidth <= 768;
  const config = type === 'hero' ? heroConfig : tokenomicsConfig;

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        ...config,
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: {
              enable: !isMobile,
              mode: type === 'hero' ? ["grab", "bubble"] : ["repulse"],
            },
            onclick: {
              enable: !isMobile,
              mode: "push",
            },
            resize: true,
          },
          modes: {
            grab: {
              distance: 200,
              links: {
                opacity: 1,
              }
            },
            bubble: {
              distance: 200,
              size: 6,
              duration: 2,
              opacity: 0.8,
            },
            repulse: {
              distance: 100,
              duration: 0.4,
            },
            push: {
              particles_nb: 4,
            },
          },
        },
      }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: isMobile ? 'none' : 'auto'
      }}
    />
  );
}
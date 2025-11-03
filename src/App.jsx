import { useState, useEffect } from 'react'
import './App.css'
import portfolioData from './assets/data.json'
import ModelViewer from './ModelViewer'

function App() {
  const [activeSection, setActiveSection] = useState('hero')
  const [lightboxMedia, setLightboxMedia] = useState(null)
  const [lightboxType, setLightboxType] = useState(null)

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'projects', 'models', 'skills', 'motivation']
      const scrollPosition = window.scrollY + window.innerHeight / 3

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const openLightbox = (mediaPath) => {
    const isVideo = mediaPath.match(/\.(mp4|webm|ogg)$/i)
    setLightboxMedia(mediaPath)
    setLightboxType(isVideo ? 'video' : 'image')
  }

  const closeLightbox = () => {
    setLightboxMedia(null)
    setLightboxType(null)
  }

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeLightbox()
      }
    }
    
    if (lightboxMedia) {
      window.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      window.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [lightboxMedia])

  const renderMedia = (mediaPath) => {
    const isVideo = mediaPath.match(/\.(mp4|webm|ogg)$/i)
    const is3DModel = mediaPath.match(/\.(fbx|obj|glb|gltf)$/i)
    
    if (is3DModel) {
      return (
        <div className="media-wrapper model-wrapper">
          <ModelViewer modelPath={mediaPath} height="400px" />
        </div>
      )
    }
    
    if (isVideo) {
      return (
        <div className="media-wrapper" onClick={() => openLightbox(mediaPath)}>
          <video 
            className="project-media" 
            loop 
            muted
            playsInline
          >
            <source src={mediaPath} type={`video/${mediaPath.split('.').pop()}`} />
            Your browser does not support the video tag.
          </video>
          <div className="media-overlay"></div>
        </div>
      )
    }
    
    return (
      <div className="media-wrapper" onClick={() => openLightbox(mediaPath)}>
        <img 
          src={mediaPath} 
          alt="Project media" 
          className="project-media"
          onError={(e) => {
            e.target.style.display = 'none'
          }}
        />
        <div className="media-overlay"></div>
      </div>
    )
  }

  return (
    <div className="portfolio">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-content">
          <div className="nav-logo">{portfolioData.hero.name}</div>
          <div className="nav-links">
            <a 
              href="#hero" 
              className={activeSection === 'hero' ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); scrollToSection('hero') }}
            >
              Home
            </a>
            <a 
              href="#about" 
              className={activeSection === 'about' ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); scrollToSection('about') }}
            >
              About
            </a>
            <a 
              href="#projects" 
              className={activeSection === 'projects' ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); scrollToSection('projects') }}
            >
              Projects
            </a>
            <a 
              href="#models" 
              className={activeSection === 'models' ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); scrollToSection('models') }}
            >
              3D Models
            </a>
            <a 
              href="#skills" 
              className={activeSection === 'skills' ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); scrollToSection('skills') }}
            >
              Skills
            </a>
            <a 
              href="#motivation" 
              className={activeSection === 'motivation' ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); scrollToSection('motivation') }}
            >
              Motivation
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-name">{portfolioData.hero.name}</h1>
            <h2 className="hero-title">{portfolioData.hero.title}</h2>
          </div>
          <div className="hero-background">
            <div className="gradient-orb orb-1"></div>
            <div className="gradient-orb orb-2"></div>
            <div className="gradient-orb orb-3"></div>
          </div>
        </div>
        <div className="scroll-indicator" onClick={() => scrollToSection('about')}>
          <div className="mouse">
            <div className="wheel"></div>
          </div>
          <div className="arrow">
            <span></span>
            <span></span>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section section">
        <div className="container">
          <h2 className="section-title">{portfolioData.about.title}</h2>
          <div className="about-content">
            {portfolioData.about.paragraphs.map((paragraph, index) => (
              <p key={index} className="about-paragraph">{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects-section section">
        <div className="container">
          <h2 className="section-title">{portfolioData.projects.title}</h2>
          <div className="projects-grid">
            {portfolioData.projects.list.map((project, index) => (
              <div key={index} className="project-card">
                {project.media && project.media.length > 0 && (
                  <div className="project-media-container">
                    {project.media.length === 1 ? (
                      renderMedia(project.media[0])
                    ) : (
                      <div className="media-grid">
                        {project.media.map((mediaPath, mediaIndex) => (
                          <div key={mediaIndex} className="media-grid-item">
                            {renderMedia(mediaPath)}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                <div className="project-content">
                  <div className="project-header">
                    <h3 className="project-title">{project.title}</h3>
                    <span className="project-year">{project.year}</span>
                  </div>
                  {project.role && (
                    <p className="project-role">{project.role}</p>
                  )}
                  <p className="project-summary">{project.summary}</p>
                  
                  {project.highlights && (
                    <div className="project-highlights">
                      <h4>Highlights:</h4>
                      <ul>
                        {project.highlights.map((highlight, i) => (
                          <li key={i}>{highlight}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {project.examples && (
                    <div className="project-examples">
                      <h4>Examples:</h4>
                      <ul>
                        {project.examples.map((example, i) => (
                          <li key={i}>{example}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {project.skills && (
                    <div className="project-skills">
                      {project.skills.map((skill, i) => (
                        <span key={i} className="skill-tag">{skill}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3D Models Section */}
      {portfolioData.models && (
        <section id="models" className="models-section section">
          <div className="container">
            <h2 className="section-title">{portfolioData.models.title}</h2>
            <div className="models-grid">
              {portfolioData.models.list.map((model, index) => (
                <div key={index} className="model-card">
                  {model.modelPath && (
                    <div className="model-viewer-wrapper">
                      <ModelViewer modelPath={model.modelPath} height="400px" />
                    </div>
                  )}
                  <div className="model-content">
                    <div className="model-header">
                      <h3 className="model-title">{model.title}</h3>
                      <span className="model-year">{model.year}</span>
                    </div>
                    {model.description && (
                      <p className="model-description">{model.description}</p>
                    )}
                    {model.specs && (
                      <div className="model-specs">
                        <h4>Technical Details:</h4>
                        <ul>
                          {model.specs.map((spec, i) => (
                            <li key={i}>{spec}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {model.skills && (
                      <div className="model-skills">
                        {model.skills.map((skill, i) => (
                          <span key={i} className="skill-tag">{skill}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Skills Section */}
      <section id="skills" className="skills-section section">
        <div className="container">
          <h2 className="section-title">{portfolioData.skills.title}</h2>
          <div className="skills-grid">
            {Object.entries(portfolioData.skills.categories).map(([category, skillsList]) => (
              <div key={category} className="skill-category">
                <h3 className="category-title">{category}</h3>
                <div className="skills-list">
                  {skillsList.map((skill, index) => (
                    <div key={index} className="skill-item">
                      <span className="skill-name">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Motivation Section */}
      <section id="motivation" className="motivation-section section">
        <div className="container">
          <h2 className="section-title">{portfolioData.motivation.title}</h2>
          <div className="motivation-content">
            {portfolioData.motivation.paragraphs.map((paragraph, index) => (
              <p key={index} className="motivation-paragraph">{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} {portfolioData.hero.name} - Portfolio for Aalto Game Design Master's Program Application</p>
        </div>
      </footer>

      {/* Lightbox Modal */}
      {lightboxMedia && (
        <div className="lightbox" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox}>
            ✕
          </button>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            {lightboxType === 'video' ? (
              <video 
                className="lightbox-media" 
                controls 
                autoPlay
                loop
              >
                <source src={lightboxMedia} type={`video/${lightboxMedia.split('.').pop()}`} />
                Your browser does not support the video tag.
              </video>
            ) : (
              <img 
                src={lightboxMedia} 
                alt="Expanded view" 
                className="lightbox-media"
              />
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default App

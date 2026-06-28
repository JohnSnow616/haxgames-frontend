import { useParams, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { ChevronRight, Download, Star, Share2 } from 'lucide-react'
import Footer from '../components/Footer/Footer'
import './GameDetailPage.css'

export default function GameDetailPage() {
  const { gameId } = useParams()
  const navigate = useNavigate()

  // SCROLL TO TOP on page load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [gameId])

  // Mock game data - you'll fetch this from API later
  const game = {
    id: gameId,
    title: 'Sample Game Title',
    description: 'This is a detailed game description page.',
    longDescription: 'A comprehensive description of the game with more details...',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&h=600&fit=crop',
    screenshots: [
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop',
    ],
    rating: 9.2,
    downloads: '245.3K',
    size: '61 GB',
    platform: 'PC',
    releaseDate: '2023-09-15',
    publisher: 'Game Publisher Name',
    genre: 'Action RPG',
    systemRequirements: {
      os: 'Windows 10 64-bit',
      processor: 'Intel i7 or equivalent',
      ram: '16 GB',
      gpu: 'RTX 3070 or better',
      storage: '100 GB'
    }
  }

  return (
    <div className="game-detail-page">

      {/* BREADCRUMB */}
      <div className="detail-breadcrumb">
        <button onClick={() => navigate('/')} className="breadcrumb-link">Home</button>
        <ChevronRight size={16} />
        <span className="breadcrumb-current">{game.title}</span>
      </div>

      {/* HERO BANNER */}
      <div className="detail-hero">
        <img 
          src={game.image} 
          alt={game.title} className="detail-hero-image"
          loading="lazy"
          />
        <div className="detail-hero-overlay" />
        
        <div className="detail-hero-content">
          <h1 className="detail-title">{game.title}</h1>
          <p className="detail-meta">{game.genre} • {game.platform}</p>
          <button className="download-btn">
            <Download size={20} />
            Download Game
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="detail-container">
        <div className="detail-main">
          {/* DESCRIPTION */}
          <section className="detail-section">
            <h2 className="section-title">About This Game</h2>
            <p className="section-content">{game.longDescription}</p>
          </section>

          {/* SCREENSHOTS */}
          <section className="detail-section">
            <h2 className="section-title">Screenshots</h2>
            <div className="screenshots-grid">
              {game.screenshots.map((screenshot, idx) => (
                <img key={idx} src={screenshot} alt={`Screenshot ${idx + 1}`} />
              ))}
            </div>
          </section>

          {/* SYSTEM REQUIREMENTS */}
          <section className="detail-section">
            <h2 className="section-title">System Requirements</h2>
            <div className="requirements-list">
              <div className="requirement-item">
                <span>OS:</span>
                <span>{game.systemRequirements.os}</span>
              </div>
              <div className="requirement-item">
                <span>Processor:</span>
                <span>{game.systemRequirements.processor}</span>
              </div>
              <div className="requirement-item">
                <span>RAM:</span>
                <span>{game.systemRequirements.ram}</span>
              </div>
              <div className="requirement-item">
                <span>GPU:</span>
                <span>{game.systemRequirements.gpu}</span>
              </div>
              <div className="requirement-item">
                <span>Storage:</span>
                <span>{game.systemRequirements.storage}</span>
              </div>
            </div>
          </section>
        </div>

        {/* SIDEBAR */}
        <aside className="detail-sidebar">
          <div className="sidebar-card">
            <div className="card-stat">
              <span className="stat-label">Rating</span>
              <span className="stat-value">
                <Star size={16} className="rating-icon" />
                {game.rating}
              </span>
            </div>
            <div className="card-stat">
              <span className="stat-label">Downloads</span>
              <span className="stat-value">{game.downloads}</span>
            </div>
            <div className="card-stat">
              <span className="stat-label">File Size</span>
              <span className="stat-value">{game.size}</span>
            </div>
            <div className="card-stat">
              <span className="stat-label">Release Date</span>
              <span className="stat-value">{game.releaseDate}</span>
            </div>

            <button className="sidebar-download-btn">
              <Download size={18} />
              Download Now
            </button>

            <button className="sidebar-share-btn">
              <Share2 size={18} />
              Share Game
            </button>
          </div>
        </aside>
      </div>

      {/* FOOTER */}
      <Footer />
    </div>
  )
}
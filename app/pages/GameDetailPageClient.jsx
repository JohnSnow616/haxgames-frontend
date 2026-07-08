'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { ChevronRight, Download, Star, Share2 } from 'lucide-react'
import Footer from '../components/Footer/Footer'
import { fetchPostBySlug } from '../lib/wordpress'
import './GameDetailPage.css'

export default function GameDetailPageClient({ gameId, initialPost }) {
  const router = useRouter()
  const [game, setGame] = useState(null)
  const [loading, setLoading] = useState(!initialPost)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (initialPost) {
      const gameData = transformPostToGame(initialPost)
      setGame(gameData)
      window.scrollTo({ top: 0, behavior: 'auto' })
      return
    }

    async function loadPost() {
      try {
        setLoading(true)
        window.scrollTo({ top: 0, behavior: 'auto' })
        
        const post = await fetchPostBySlug(gameId)
        
        if (!post) {
          setError('Post not found')
          setLoading(false)
          return
        }
        
        const gameData = transformPostToGame(post)
        setGame(gameData)
        setLoading(false)
      } catch (err) {
        console.error('Error fetching post:', err)
        setError(err.message)
        setLoading(false)
      }
    }
    
    if (gameId) {
      loadPost()
    }
  }, [gameId, initialPost])

  const transformPostToGame = (post) => {
    return {
      id: post.id,
      title: post.title.rendered.replace(/<[^>]*>/g, ''),
      description: post.excerpt?.rendered?.replace(/<[^>]*>/g, '') || '',
      longDescription: post.content?.rendered || '',
      image: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || 
             'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&h=600&fit=crop',
      screenshots: post._embedded?.['wp:featuredmedia']?.slice(1)?.map(media => media.source_url) || [],
      rating: 8.5,
      downloads: '0',
      size: 'N/A',
      platform: post._embedded?.['wp:term']?.[0]?.[0]?.name || 'General',
      releaseDate: post.date ? new Date(post.date).toLocaleDateString() : 'N/A',
      publisher: post._embedded?.['author']?.[0]?.name || 'Unknown',
      genre: post._embedded?.['wp:term']?.[0]?.[0]?.name || 'General',
      systemRequirements: {
        os: 'Windows 10 64-bit',
        processor: 'Intel i7 or equivalent',
        ram: '16 GB',
        gpu: 'RTX 3070 or better',
        storage: '50 GB'
      }
    }
  }

  if (loading) {
    return (
      <div className="game-detail-page">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          background: '#000000',
          color: '#6b5ca5',
          fontFamily: 'Space Grotesk, sans-serif'
        }}>
          Loading...
        </div>
      </div>
    )
  }

  if (error || !game) {
    return (
      <div className="game-detail-page">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          background: '#000000',
          color: '#ff4444',
          fontFamily: 'Space Grotesk, sans-serif'
        }}>
          {error || 'Game not found'}
        </div>
      </div>
    )
  }

  return (
    <div className="game-detail-page">

      {/* BREADCRUMB */}
      <div className="detail-breadcrumb">
        <button onClick={() => router.push('/')} className="breadcrumb-link">Home</button>
        <ChevronRight size={16} />
        <span className="breadcrumb-current">{game.title}</span>
      </div>

      {/* HERO BANNER */}
      <div className="detail-hero">
        <Image 
          src={game.image} 
          alt={game.title}
          width={1200}
          height={600}
          quality={80}
          priority={true}
          className="detail-hero-image"
          style={{
            width: '100%',
            height: 'auto',
          }}
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
            <div 
              className="section-content" 
              dangerouslySetInnerHTML={{ __html: game.longDescription }} 
            />
          </section>

          {/* SCREENSHOTS */}
          {game.screenshots && game.screenshots.length > 0 && (
            <section className="detail-section">
              <h2 className="section-title">Screenshots</h2>
              <div className="screenshots-grid">
                {game.screenshots.map((screenshot, idx) => (
                  <Image 
                    key={idx} 
                    src={screenshot} 
                    alt={`Screenshot ${idx + 1}`}
                    width={400}
                    height={300}
                    quality={75}
                    style={{
                      width: '100%',
                      height: 'auto',
                    }}
                  />
                ))}
              </div>
            </section>
          )}

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
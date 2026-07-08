"use client"

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react'
import { fetchPosts } from '../../lib/wordpress'
import './LatestGamesSection.css'

const GAMES_PER_PAGE = 20

export default function LatestGamesSection() {
  const [games, setGames] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const sectionRef = useRef(null)

  // Fetch posts when page changes
  useEffect(() => {
    async function loadPosts() {
      try {
        setLoading(true)
        const { posts, totalPages: total } = await fetchPosts(GAMES_PER_PAGE, currentPage)
        
        // Transform WordPress posts to match component format
        const transformedGames = posts.map((post) => {
          // Try to get platform/category from first category
          const platform = post._embedded?.['wp:term']?.[0]?.[0]?.name || 'General'
          
          return {
            id: post.id,
            title: post.title.rendered.replace(/<[^>]*>/g, ''),
            description: post.excerpt?.rendered?.replace(/<[^>]*>/g, '').slice(0, 80) + '...' || '',
            platform: platform,
            image: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || 
                   'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop',
            path: `/${post.slug}`
          }
        })
        
        setGames(transformedGames)
        setTotalPages(total)
        setLoading(false)
      } catch (err) {
        console.error('Error fetching posts:', err)
        setLoading(false)
      }
    }
    
    loadPosts()
  }, [currentPage])

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
      scrollToSection()
    }
  }

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
      scrollToSection()
    }
  }

  const scrollToSection = () => {
    setTimeout(() => {
      if (sectionRef.current) {
        sectionRef.current.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start'
        })
      }
    }, 100)
  }

  const handleGameClick = (game) => {
    router.push(game.path)
  }

  const handleReadMore = (e, game) => {
    e.stopPropagation()
    router.push(game.path)
  }

  if (loading) {
    return (
      <section className="latest-games-section" ref={sectionRef}>
        <div className="latest-games-header">
          <h2 className="latest-games-title">
            Latest <span className="latest-games-title-accent">Games</span>
          </h2>
          <p className="latest-games-subtitle">
            Loading...
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="latest-games-section" ref={sectionRef}>
      <div className="latest-games-header">
        <h2 className="latest-games-title">
          Latest <span className="latest-games-title-accent">Games</span>
        </h2>
        <p className="latest-games-subtitle">
          Discover the newest and most popular games just released
        </p>
      </div>

      {/* GAMES GRID - 5 columns */}
      <div className="latest-games-grid">
        {games.map((game) => (
          <div 
            key={game.id} 
            className="game-card"
            onClick={() => handleGameClick(game)}
          >
            {/* IMAGE */}
            <div className="game-card-image">
              <img 
                src={game.image} 
                alt={game.title}
                loading="lazy"
              />
              <div className="game-card-overlay" />
            </div>

            {/* CONTENT */}
            <div className="game-card-content">
              <h3 className="game-card-title">{game.title}</h3>
              <p className="game-card-description">{game.description}</p>
              
              {/* META & BUTTON */}
              <div className="game-card-footer">
                <span className="game-card-platform">{game.platform}</span>
                <button 
                  className="read-more-btn"
                  onClick={(e) => handleReadMore(e, game)}
                >
                  Read More
                  <ArrowUpRight size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <div className="latest-games-pagination">
        <button 
          className="pagination-btn pagination-btn-prev"
          onClick={handlePrev}
          disabled={currentPage === 1}
        >
          <ChevronLeft size={18} />
          Previous
        </button>

        <div className="pagination-info">
          <span>Page {currentPage} of {totalPages}</span>
        </div>

        <button 
          className="pagination-btn pagination-btn-next"
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          Next
          <ChevronRight size={18} />
        </button>
      </div>
    </section>
  )
}
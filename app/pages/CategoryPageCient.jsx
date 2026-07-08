'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { ChevronRight, ChevronLeft, Star } from 'lucide-react'
import CategoryHero from '../components/CategoryHero/CategoryHero'
import Footer from '../components/Footer/Footer'
import { fetchPostsByCategory } from '../lib/wordpress'
import './CategoryPage.css'

const GAMES_PER_PAGE = 12

export default function CategoryPageClient({ category, initialData }) {
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(1)
  const [categoryData, setCategoryData] = useState(initialData || { category: null, posts: [] })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (currentPage === 1) {
      return
    }

    async function loadPosts() {
      try {
        setLoading(true)
        window.scrollTo({ top: 0, behavior: 'auto' })
        
        const result = await fetchPostsByCategory(category, GAMES_PER_PAGE, currentPage)
        setCategoryData(result)
        setLoading(false)
      } catch (err) {
        console.error('Error fetching category:', err)
        setError(err.message)
        setLoading(false)
      }
    }
    
    loadPosts()
  }, [category, currentPage])

  const games = categoryData.posts.map((post) => ({
    id: post.id,
    title: post.title.rendered.replace(/<[^>]*>/g, ''),
    description: post.excerpt?.rendered?.replace(/<[^>]*>/g, '').slice(0, 100) || '',
    subcategory: post._embedded?.['wp:term']?.[0]?.[0]?.name || '',
    size: 'N/A',
    rating: 8.5,
    downloads: post.comment_count ? `${post.comment_count}K` : '0',
    image: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || 
           'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&h=400&fit=crop',
    gameId: post.slug
  }))

  const totalPages = Math.ceil((categoryData.category?.count || 0) / GAMES_PER_PAGE)

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  if (error) {
    return (
      <div className="category-page">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          background: '#000000',
          color: '#ff4444',
          fontFamily: 'Space Grotesk, sans-serif'
        }}>
          Error: {error}
        </div>
      </div>
    )
  }

  return (
    <div className="category-page">
      <CategoryHero
        title={categoryData.category?.name || category}
        description={categoryData.category?.description || `Browse all ${category} games`}
        image="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&h=700&fit=crop"
      />

      <div className="category-content">
        {games.length > 0 ? (
          <>
            <div className="games-grid">
              {games.map((game) => (
                <div
                  key={game.id}
                  className="game-item"
                  onClick={() => router.push(`/${game.gameId}`)}
                >
                  <div className="game-item-image">
                    <Image
                      src={game.image}
                      alt={game.title}
                      width={600}
                      height={400}
                      quality={75}
                      priority={false}
                      style={{
                        width: '100%',
                        height: 'auto',
                      }}
                    />
                    <div className="game-item-overlay" />
                  </div>

                  <div className="game-item-info">
                    <h3 className="game-item-title">{game.title}</h3>
                    <p className="game-item-description">{game.description}</p>

                    <div className="game-item-meta">
                      <div className="meta-left">
                        <span className="meta-item">
                          <Star size={14} className="rating-icon" />
                          {game.rating}
                        </span>
                        <span className="meta-item">{game.size}</span>
                      </div>
                      <div className="meta-right">
                        {game.downloads}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="category-pagination">
                <button
                  className="pagination-btn pagination-btn-prev"
                  onClick={handlePrevPage}
                  disabled={currentPage === 1 || loading}
                >
                  <ChevronLeft size={18} />
                  Previous
                </button>

                <div className="pagination-info">
                  <span>Page {currentPage} of {totalPages}</span>
                </div>

                <button
                  className="pagination-btn pagination-btn-next"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages || loading}
                >
                  Next
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="no-games">
            <p>No games found in this category.</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
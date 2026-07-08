'use client'

import { useState, useEffect } from 'react'
import { FocusRail } from './components/FocusRail/FocusRail'
import CategoriesSection from './components/CategoriesSection/CategoriesSection'
import LatestGamesSection from './components/LatestGamesSection/LatestGamesSection'
import Footer from './components/Footer/Footer'
import { fetchPosts } from './lib/wordpress'

function LoadingFallback() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: '#000000',
      color: '#6b5ca5',
      fontFamily: 'Space Grotesk, sans-serif',
      fontSize: '18px',
      fontWeight: '600'
    }}>
      Loading...
    </div>
  )
}

export default function Home() {
  const [popularGames, setPopularGames] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadPosts() {
      try {
        console.log('Fetching posts...')
        setLoading(true)
        const { posts } = await fetchPosts(8, 1)
        
        console.log('Posts fetched:', posts.length)
        
        const transformedPosts = posts.map((post) => ({
          id: post.id,
          title: post.title.rendered.replace(/<[^>]*>/g, ''),
          description: post.excerpt?.rendered?.replace(/<[^>]*>/g, '').slice(0, 100) || '',
          meta: post.date ? new Date(post.date).getFullYear().toString() : '',
          imageSrc: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || 
                    'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=450&fit=crop',
          href: `/${post.slug}`,
        }))
        
        setPopularGames(transformedPosts)
        setError(null)
        setLoading(false)
      } catch (err) {
        console.error('Error fetching posts:', err)
        setError(err.message)
        setLoading(false)
      }
    }
    
    loadPosts()
  }, [])

  if (loading) {
    return <LoadingFallback />
  }

  if (error) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: '#000000',
        color: '#ff4444',
        fontFamily: 'Space Grotesk, sans-serif',
        fontSize: '18px',
        padding: '20px'
      }}>
        <div>
          <h1>Error Loading Posts</h1>
          <p>{error}</p>
          <p>WordPress URL: {process.env.NEXT_PUBLIC_WORDPRESS_URL}</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div style={{ marginTop: '75px' }}>
        <div style={{
          padding: '2rem 5%',
          textAlign: 'center',
          maxWidth: '1400px',
          margin: '0 auto',
        }}>
          <div style={{
            fontSize: '10px',
            fontWeight: '600',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: '#6b5ca5',
            fontFamily: 'Space Grotesk',
            marginBottom: '0.5rem',
          }}>
            ✦ Trending Now ✦
          </div>
          <h1 style={{
            fontFamily: 'Space Grotesk',
            fontSize: 'clamp(28px, 3.5vw, 44px)',
            fontWeight: '800',
            color: 'white',
            letterSpacing: '-1px',
            marginBottom: '0.5rem',
          }}>
            Popular <span style={{ color: '#6b5ca5' }}>Games</span>
          </h1>
        </div>

        {popularGames.length > 0 && (
          <FocusRail
            items={popularGames}
            loop={true}
            autoPlay={true}
            interval={5000}
          />
        )}
      </div>

      <CategoriesSection />
      <LatestGamesSection />
      <Footer />
    </>
  )
}
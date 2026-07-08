"use client"

import { useRouter } from 'next/navigation'
import { TrendingUp } from 'lucide-react'
import MagicBento from '../MagicBento/MagicBento'
import './CategoriesSection.css'

const categoryCards = [
  {
    label: 'ACTION',
    title: 'Action Games',
    description: 'Fast-paced action games',
    icon: '🎮',
    color: '#1a1a2e',
    image: 'https://images.unsplash.com/photo-1552435365-5ada46dd6cb6?w=800&h=600&fit=crop',
    count: '14',
    path: '/category/action'
  },
  {
    label: 'ADVENTURE',
    title: 'Adventure Games',
    description: 'Epic adventure experiences',
    icon: '🕹️',
    color: '#16213e',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=600&fit=crop',
    count: '16',
    path: '/category/adventure-game'
  },
  {
    label: 'ANIME',
    title: 'Anime Games',
    description: 'Anime-inspired games',
    icon: '🎌',
    color: '#0f3460',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop',
    count: '1',
    path: '/category/anime'
  },
  {
    label: 'HORROR',
    title: 'Horror Games',
    description: 'Scary and thrilling games',
    icon: '👻',
    color: '#1a1a2e',
    image: 'https://images.unsplash.com/photo-1478144143081-80f7f84ca84d?w=800&h=600&fit=crop',
    count: '4',
    path: '/category/horror'
  },
  {
    label: 'INDIE',
    title: 'Indie Games',
    description: 'Unique indie experiences',
    icon: '💎',
    color: '#16213e',
    image: 'https://images.unsplash.com/photo-1483389127117-b6a2102724ae?w=800&h=600&fit=crop',
    count: '2',
    path: '/category/indie'
  },
  {
    label: 'SIMULATION',
    title: 'Simulation Games',
    description: 'Life and world simulations',
    icon: '🏗️',
    color: '#0f3460',
    image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&h=600&fit=crop',
    count: '3',
    path: '/category/simulation'
  },
]

export default function CategoriesSection() {
  const router = useRouter()

  const handleCardClick = (card) => {
    router.push(card.path)
  }

  return (
    <section className="categories-section">
      <div className="categories-header">
        <div className="categories-eyebrow">
          <TrendingUp size={14} />
          <span>EXPLORE CATEGORIES</span>
        </div>
        <h2 className="categories-title">
          Browse By <span className="categories-title-accent">Genre</span>
        </h2>
        <p className="categories-subtitle">
          Discover games across all your favorite genres
        </p>
      </div>

      <MagicBento
        cards={categoryCards}
        textAutoHide={true}
        enableStars={true}
        enableSpotlight={true}
        enableBorderGlow={true}
        enableTilt={false}
        clickEffect={true}
        enableMagnetism={true}
        spotlightRadius={320}
        particleCount={10}
        glowColor="107, 92, 165"
        onCardClick={handleCardClick}
      />
    </section>
  )
}
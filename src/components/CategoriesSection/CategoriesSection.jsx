import { useNavigate } from 'react-router-dom'
import { TrendingUp } from 'lucide-react'
import MagicBento from '../MagicBento/MagicBento'
import './CategoriesSection.css'

const categoryCards = [
  {
    label: 'NINTENDO',
    title: 'NSP Games',
    description: 'Download Nintendo Switch NSP files',
    icon: '🎮',
    color: '#1a1a2e',
    image: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=800&h=600&fit=crop',
    count: '2,450',
    path: '/nsp'
  },
  {
    label: 'CONSOLE',
    title: 'Switch Games',
    description: 'Latest Nintendo Switch releases',
    icon: '🕹️',
    color: '#16213e',
    image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800&h=600&fit=crop',
    count: '3,120',
    path: '/switch'
  },
  {
    label: 'DESKTOP',
    title: 'Mac Games',
    description: 'Premium games for macOS',
    icon: '🍎',
    color: '#0f3460',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop',
    count: '1,890',
    path: '/mac'
  },
  {
    label: 'WINDOWS',
    title: 'PC Games',
    description: 'AAA titles and indie gems',
    icon: '💻',
    color: '#1a1a2e',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=600&fit=crop',
    count: '5,670',
    path: '/pc'
  },
  {
    label: 'MOBILE',
    title: 'Android Games',
    description: 'Mobile gaming on the go',
    icon: '📱',
    color: '#16213e',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop',
    count: '4,320',
    path: '/android'
  },
  {
    label: 'UPDATES',
    title: 'Latest News',
    description: 'Gaming news and updates',
    icon: '📰',
    color: '#0f3460',
    image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&h=600&fit=crop',
    count: '890',
    path: '/news'
  }
]

export default function CategoriesSection() {
  const navigate = useNavigate()

  const handleCardClick = (card) => {
    navigate(card.path)
  }

  return (
    <section className="categories-section">
      <div className="categories-header">
        <div className="categories-eyebrow">
          <TrendingUp size={14} />
          <span>EXPLORE CATEGORIES</span>
        </div>
        <h2 className="categories-title">
          Browse By <span className="categories-title-accent">Platform</span>
        </h2>
        <p className="categories-subtitle">
          Discover thousands of games across all your favorite platforms
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
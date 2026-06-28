import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react'
import './LatestGamesSection.css'

const allGames = [
  {
    id: 1,
    title: 'Elden Ring',
    description: 'Action RPG set in the Lands Between.',
    platform: 'PC',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop',
    path: '/game/elden-ring'
  },
  {
    id: 2,
    title: 'Cyberpunk 2077',
    description: 'Open world action-adventure in Night City.',
    platform: 'PC',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=300&fit=crop',
    path: '/game/cyberpunk'
  },
  {
    id: 3,
    title: 'God of War',
    description: 'Kratos and Atreus journey through Norse realms.',
    platform: 'PC',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop',
    path: '/game/god-of-war'
  },
  {
    id: 4,
    title: 'Zelda: Tears of the Kingdom',
    description: 'Explore the skies and depths of Hyrule.',
    platform: 'Switch',
    image: 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=400&h=300&fit=crop',
    path: '/game/zelda'
  },
  {
    id: 5,
    title: 'Hogwarts Legacy',
    description: 'Live the life of a Hogwarts student.',
    platform: 'PC',
    image: 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=400&h=300&fit=crop',
    path: '/game/hogwarts'
  },
  {
    id: 6,
    title: 'Baldur\'s Gate 3',
    description: 'Epic fantasy RPG with countless possibilities.',
    platform: 'PC',
    image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400&h=300&fit=crop',
    path: '/game/baldurs-gate'
  },
  {
    id: 7,
    title: 'Starfield',
    description: 'Explore the vastness of space.',
    platform: 'PC',
    image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=300&fit=crop',
    path: '/game/starfield'
  },
  {
    id: 8,
    title: 'Final Fantasy XVI',
    description: 'The next chapter in the FF saga.',
    platform: 'PS5',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop',
    path: '/game/ff16'
  },
  {
    id: 9,
    title: 'Dragon\'s Dogma 2',
    description: 'Action fantasy with epic battles.',
    platform: 'PC',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop',
    path: '/game/dragons-dogma'
  },
  {
    id: 10,
    title: 'Diablo IV',
    description: 'Dark and intense hack-and-slash RPG.',
    platform: 'PC',
    image: 'https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?w=400&h=300&fit=crop',
    path: '/game/diablo4'
  },
  {
    id: 11,
    title: 'Street Fighter 6',
    description: 'The ultimate fighting game.',
    platform: 'PC',
    image: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=400&h=300&fit=crop',
    path: '/game/sf6'
  },
  {
    id: 12,
    title: 'Phantom Liberty',
    description: 'New mission pack for Cyberpunk 2077.',
    platform: 'PC',
    image: 'https://images.unsplash.com/photo-1486572788984-e8212f553d7f?w=400&h=300&fit=crop',
    path: '/game/phantom-liberty'
  },
  {
    id: 13,
    title: 'Tekken 8',
    description: 'Next generation fighting action.',
    platform: 'PC',
    image: 'https://images.unsplash.com/photo-1552672260-d305ca884d43?w=400&h=300&fit=crop',
    path: '/game/tekken8'
  },
  {
    id: 14,
    title: 'Palworld',
    description: 'Creature collecting adventure.',
    platform: 'PC',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    path: '/game/palworld'
  },
  {
    id: 15,
    title: 'Persona 5 Royal',
    description: 'Stylish JRPG masterpiece.',
    platform: 'PC',
    image: 'https://images.unsplash.com/photo-1538481143235-2cb00e6ddb2d?w=400&h=300&fit=crop',
    path: '/game/persona5'
  },
  {
    id: 16,
    title: 'Helldivers 2',
    description: 'Co-op sci-fi action shooter.',
    platform: 'PC',
    image: 'https://images.unsplash.com/photo-1552435365-5ada46dd6cb6?w=400&h=300&fit=crop',
    path: '/game/helldivers2'
  },
  {
    id: 17,
    title: 'Metaphor: ReFantazio',
    description: 'New Atlus RPG adventure.',
    platform: 'Multi',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b3f7?w=400&h=300&fit=crop',
    path: '/game/metaphor'
  },
  {
    id: 18,
    title: 'Like a Dragon: Infinite Wealth',
    description: 'Crime drama adventure.',
    platform: 'Multi',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=400&h=300&fit=crop',
    path: '/game/yakuza'
  },
  {
    id: 19,
    title: 'Cocoon',
    description: 'Unique puzzle adventure.',
    platform: 'Multi',
    image: 'https://images.unsplash.com/photo-1552589730-d3a5e7c4a1f7?w=400&h=300&fit=crop',
    path: '/game/cocoon'
  },
  {
    id: 20,
    title: 'Dave the Diver',
    description: 'Charming exploration game.',
    platform: 'PC',
    image: 'https://images.unsplash.com/photo-1498946059572-5d129b8ac4d0?w=400&h=300&fit=crop',
    path: '/game/dave-diver'
  },
  {
    id: 21,
    title: 'Final Fantasy VII Remake',
    description: 'Remake of the iconic classic.',
    platform: 'PS5',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f70504504?w=400&h=300&fit=crop',
    path: '/game/ff7-remake'
  },
  {
    id: 22,
    title: 'Forspoken',
    description: 'Magic action adventure.',
    platform: 'PS5',
    image: 'https://images.unsplash.com/photo-1535869422914-a5c0e77c62b2?w=400&h=300&fit=crop',
    path: '/game/forspoken'
  },
  {
    id: 23,
    title: 'Hi-Fi Rush',
    description: 'Rhythm action game.',
    platform: 'Multi',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop',
    path: '/game/hifi-rush'
  },
  {
    id: 24,
    title: 'Blasphemous 2',
    description: 'Dark pixel art platformer.',
    platform: 'Multi',
    image: 'https://images.unsplash.com/photo-1478144143081-80f7f84ca84d?w=400&h=300&fit=crop',
    path: '/game/blasphemous2'
  },
  {
    id: 25,
    title: 'Pizza Tower',
    description: 'Fast-paced platformer.',
    platform: 'Multi',
    image: 'https://images.unsplash.com/photo-1485640348112-96fad36c3a90?w=400&h=300&fit=crop',
    path: '/game/pizza-tower'
  },
  {
    id: 26,
    title: 'Dredge',
    description: 'Mysterious fishing horror.',
    platform: 'Multi',
    image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400&h=300&fit=crop',
    path: '/game/dredge'
  },
  {
    id: 27,
    title: 'Viewfinder',
    description: 'Puzzle game with perspective.',
    platform: 'Multi',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    path: '/game/viewfinder'
  },
  {
    id: 28,
    title: 'Oxenfree 2',
    description: 'Supernatural adventure.',
    platform: 'Multi',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop',
    path: '/game/oxenfree2'
  },
  {
    id: 29,
    title: 'A Space for the Unbound',
    description: 'Wholesome Indonesian RPG.',
    platform: 'Multi',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=300&fit=crop',
    path: '/game/space-unbound'
  },
  {
    id: 30,
    title: 'Sea of Stars',
    description: 'Turn-based RPG adventure.',
    platform: 'Multi',
    image: 'https://images.unsplash.com/photo-1483389127117-b6a2102724ae?w=400&h=300&fit=crop',
    path: '/game/sea-of-stars'
  },
]

const GAMES_PER_PAGE = 20

export default function LatestGamesSection() {
  const [currentPage, setCurrentPage] = useState(0)
  const navigate = useNavigate()
  const sectionRef = useRef(null)

  const totalPages = Math.ceil(allGames.length / GAMES_PER_PAGE)
  const startIndex = currentPage * GAMES_PER_PAGE
  const endIndex = startIndex + GAMES_PER_PAGE
  const visibleGames = allGames.slice(startIndex, endIndex)

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1)
      scrollToSection()
    }
  }

  const handlePrev = () => {
    if (currentPage > 0) {
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
    navigate(game.path)
  }

  const handleReadMore = (e, game) => {
    e.stopPropagation()
    navigate(game.path)
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
        {visibleGames.map((game) => (
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
          disabled={currentPage === 0}
        >
          <ChevronLeft size={18} />
          Previous
        </button>

        <div className="pagination-info">
          <span>Page {currentPage + 1} of {totalPages}</span>
        </div>

        <button 
          className="pagination-btn pagination-btn-next"
          onClick={handleNext}
          disabled={currentPage === totalPages - 1}
        >
          Next
          <ChevronRight size={18} />
        </button>
      </div>
    </section>
  )
}
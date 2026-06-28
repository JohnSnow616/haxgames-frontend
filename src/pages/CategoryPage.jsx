import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ChevronRight, ChevronLeft, Star } from 'lucide-react'
import CategoryHero from '../components/CategoryHero/CategoryHero'
import Footer from '../components/Footer/Footer'
import './CategoryPage.css'

// Mock data - games organized by category and subcategory
const gamesDatabase = {
  nsp: {
    label: 'NSP Games',
    description: 'Download Nintendo Switch NSP files for all your favorite games',
    games: [
      {
        id: 1,
        title: 'The Legend of Zelda: Breath of the Wild',
        description: 'Open-world adventure game',
        category: 'nsp',
        subcategory: 'adventure',
        size: '13.4 GB',
        rating: 9.5,
        downloads: '245.3K',
        image: 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=600&h=400&fit=crop',
        path: '/game/zelda-botw'
      },
      {
        id: 2,
        title: 'Super Mario Odyssey',
        description: 'Platformer adventure',
        category: 'nsp',
        subcategory: 'platformer',
        size: '5.2 GB',
        rating: 9.2,
        downloads: '189.2K',
        image: 'https://images.unsplash.com/photo-1485640348112-96fad36c3a90?w=600&h=400&fit=crop',
        path: '/game/mario-odyssey'
      },
      {
        id: 3,
        title: 'The Legend of Zelda: Tears of the Kingdom',
        description: 'Epic sequel adventure',
        category: 'nsp',
        subcategory: 'adventure',
        size: '16.2 GB',
        rating: 9.8,
        downloads: '312.5K',
        image: 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=600&h=400&fit=crop',
        path: '/game/zelda-totk'
      },
      {
        id: 4,
        title: 'Hollow Knight',
        description: 'Challenging platformer',
        category: 'nsp',
        subcategory: 'platformer',
        size: '3.1 GB',
        rating: 8.9,
        downloads: '156.7K',
        image: 'https://images.unsplash.com/photo-1478144143081-80f7f84ca84d?w=600&h=400&fit=crop',
        path: '/game/hollow-knight'
      },
      {
        id: 5,
        title: 'Celeste',
        description: 'Pixel platformer',
        category: 'nsp',
        subcategory: 'platformer',
        size: '0.5 GB',
        rating: 9.3,
        downloads: '203.4K',
        image: 'https://images.unsplash.com/photo-1552589730-d3a5e7c4a1f7?w=600&h=400&fit=crop',
        path: '/game/celeste'
      },
      {
        id: 6,
        title: 'Animal Crossing: New Horizons',
        description: 'Life simulation',
        category: 'nsp',
        subcategory: 'casual',
        size: '7.6 GB',
        rating: 8.7,
        downloads: '267.8K',
        image: 'https://images.unsplash.com/photo-1498946059572-5d129b8ac4d0?w=600&h=400&fit=crop',
        path: '/game/animal-crossing'
      },
      {
        id: 7,
        title: 'Splatoon 3',
        description: 'Team-based shooter',
        category: 'nsp',
        subcategory: 'action',
        size: '5.8 GB',
        rating: 8.5,
        downloads: '178.2K',
        image: 'https://images.unsplash.com/photo-1552435365-5ada46dd6cb6?w=600&h=400&fit=crop',
        path: '/game/splatoon3'
      },
      {
        id: 8,
        title: 'Fire Emblem: Three Houses',
        description: 'Tactical RPG',
        category: 'nsp',
        subcategory: 'rpg',
        size: '8.9 GB',
        rating: 9.0,
        downloads: '134.6K',
        image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&h=400&fit=crop',
        path: '/game/fire-emblem'
      },
      {
        id: 9,
        title: 'Mario Kart 8 Deluxe',
        description: 'Racing game',
        category: 'nsp',
        subcategory: 'racing',
        size: '5.3 GB',
        rating: 9.1,
        downloads: '298.5K',
        image: 'https://images.unsplash.com/photo-1485640348112-96fad36c3a90?w=600&h=400&fit=crop',
        path: '/game/mario-kart8'
      },
      {
        id: 10,
        title: 'Super Smash Bros Ultimate',
        description: 'Fighting game',
        category: 'nsp',
        subcategory: 'action',
        size: '16.1 GB',
        rating: 9.3,
        downloads: '267.3K',
        image: 'https://images.unsplash.com/photo-1552672260-d305ca884d43?w=600&h=400&fit=crop',
        path: '/game/smash-ultimate'
      },
      {
        id: 11,
        title: 'Stardew Valley',
        description: 'Farming sim RPG',
        category: 'nsp',
        subcategory: 'rpg',
        size: '0.3 GB',
        rating: 9.4,
        downloads: '189.7K',
        image: 'https://images.unsplash.com/photo-1483389127117-b6a2102724ae?w=600&h=400&fit=crop',
        path: '/game/stardew-valley'
      },
      {
        id: 12,
        title: 'The Witcher 3',
        description: 'Open-world RPG',
        category: 'nsp',
        subcategory: 'rpg',
        size: '28.8 GB',
        rating: 9.0,
        downloads: '156.4K',
        image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=400&fit=crop',
        path: '/game/witcher3'
      },
      {
        id: 13,
        title: 'Elden Ring',
        description: 'Action RPG',
        category: 'nsp',
        subcategory: 'action',
        size: '61 GB',
        rating: 9.3,
        downloads: '512.3K',
        image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&h=400&fit=crop',
        path: '/game/elden-ring'
      },
    ]
  },
  switch: {
    label: 'Switch Games',
    description: 'Latest and greatest games for Nintendo Switch',
    games: [
      {
        id: 14,
        title: 'Mario Kart 8 Deluxe',
        description: 'Racing game',
        category: 'switch',
        subcategory: 'racing',
        size: '5.3 GB',
        rating: 9.1,
        downloads: '298.5K',
        image: 'https://images.unsplash.com/photo-1485640348112-96fad36c3a90?w=600&h=400&fit=crop',
        path: '/game/mario-kart8'
      },
      {
        id: 15,
        title: 'Super Smash Bros Ultimate',
        description: 'Fighting game',
        category: 'switch',
        subcategory: 'action',
        size: '16.1 GB',
        rating: 9.3,
        downloads: '267.3K',
        image: 'https://images.unsplash.com/photo-1552672260-d305ca884d43?w=600&h=400&fit=crop',
        path: '/game/smash-ultimate'
      },
      {
        id: 16,
        title: 'Stardew Valley',
        description: 'Farming sim RPG',
        category: 'switch',
        subcategory: 'rpg',
        size: '0.3 GB',
        rating: 9.4,
        downloads: '189.7K',
        image: 'https://images.unsplash.com/photo-1483389127117-b6a2102724ae?w=600&h=400&fit=crop',
        path: '/game/stardew-valley'
      },
      {
        id: 17,
        title: 'The Witcher 3',
        description: 'Open-world RPG',
        category: 'switch',
        subcategory: 'rpg',
        size: '28.8 GB',
        rating: 9.0,
        downloads: '156.4K',
        image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=400&fit=crop',
        path: '/game/witcher3'
      },
      {
        id: 18,
        title: 'Animal Crossing: New Horizons',
        description: 'Life simulation',
        category: 'switch',
        subcategory: 'casual',
        size: '7.6 GB',
        rating: 8.7,
        downloads: '267.8K',
        image: 'https://images.unsplash.com/photo-1498946059572-5d129b8ac4d0?w=600&h=400&fit=crop',
        path: '/game/animal-crossing'
      },
    ]
  },
  pc: {
    label: 'PC Games',
    description: 'The best PC games available for download',
    games: [
      {
        id: 19,
        title: 'Elden Ring',
        description: 'Action RPG',
        category: 'pc',
        subcategory: 'action',
        size: '61 GB',
        rating: 9.3,
        downloads: '512.3K',
        image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&h=400&fit=crop',
        path: '/game/elden-ring'
      },
      {
        id: 20,
        title: 'Cyberpunk 2077',
        description: 'Open-world action game',
        category: 'pc',
        subcategory: 'action',
        size: '140 GB',
        rating: 8.8,
        downloads: '438.2K',
        image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=400&fit=crop',
        path: '/game/cyberpunk'
      },
      {
        id: 21,
        title: 'Counter-Strike 2',
        description: 'Competitive FPS',
        category: 'pc',
        subcategory: 'fps',
        size: '35 GB',
        rating: 9.2,
        downloads: '623.7K',
        image: 'https://images.unsplash.com/photo-1552435365-5ada46dd6cb6?w=600&h=400&fit=crop',
        path: '/game/cs2'
      },
      {
        id: 22,
        title: 'Baldur\'s Gate 3',
        description: 'Fantasy RPG',
        category: 'pc',
        subcategory: 'rpg',
        size: '150 GB',
        rating: 9.5,
        downloads: '389.1K',
        image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&h=400&fit=crop',
        path: '/game/baldurs-gate3'
      },
      {
        id: 23,
        title: 'StarCraft II',
        description: 'Real-time strategy',
        category: 'pc',
        subcategory: 'strategy',
        size: '32 GB',
        rating: 9.1,
        downloads: '267.8K',
        image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=600&h=400&fit=crop',
        path: '/game/starcraft2'
      },
      {
        id: 24,
        title: 'The Sims 4',
        description: 'Life simulation',
        category: 'pc',
        subcategory: 'simulation',
        size: '20 GB',
        rating: 8.5,
        downloads: '345.2K',
        image: 'https://images.unsplash.com/photo-1498946059572-5d129b8ac4d0?w=600&h=400&fit=crop',
        path: '/game/sims4'
      },
    ]
  },
  mac: {
    label: 'Mac Games',
    description: 'Quality games optimized for macOS',
    games: [
      {
        id: 25,
        title: 'Civilization VI',
        description: 'Turn-based strategy',
        category: 'mac',
        subcategory: 'strategy',
        size: '21 GB',
        rating: 8.9,
        downloads: '123.4K',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
        path: '/game/civ6'
      },
      {
        id: 26,
        title: 'Disco Elysium',
        description: 'RPG adventure',
        category: 'mac',
        subcategory: 'rpg',
        size: '40 GB',
        rating: 9.3,
        downloads: '89.5K',
        image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop',
        path: '/game/disco-elysium'
      },
      {
        id: 27,
        title: 'Portal 2',
        description: 'Puzzle platformer',
        category: 'mac',
        subcategory: 'puzzle',
        size: '7.4 GB',
        rating: 9.4,
        downloads: '156.2K',
        image: 'https://images.unsplash.com/photo-1478144143081-80f7f84ca84d?w=600&h=400&fit=crop',
        path: '/game/portal2'
      },
      {
        id: 28,
        title: 'Stardew Valley',
        description: 'Farming sim RPG',
        category: 'mac',
        subcategory: 'rpg',
        size: '0.3 GB',
        rating: 9.4,
        downloads: '189.7K',
        image: 'https://images.unsplash.com/photo-1483389127117-b6a2102724ae?w=600&h=400&fit=crop',
        path: '/game/stardew-valley'
      },
    ]
  },
  android: {
    label: 'Android Games',
    description: 'Mobile gaming experiences for Android devices',
    games: [
      {
        id: 29,
        title: 'Genshin Impact',
        description: 'Action RPG',
        category: 'android',
        subcategory: 'action',
        size: '18 GB',
        rating: 8.7,
        downloads: '834.2K',
        image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop',
        path: '/game/genshin'
      },
      {
        id: 30,
        title: 'PUBG Mobile',
        description: 'Battle royale',
        category: 'android',
        subcategory: 'action',
        size: '2.2 GB',
        rating: 8.5,
        downloads: '945.3K',
        image: 'https://images.unsplash.com/photo-1552435365-5ada46dd6cb6?w=600&h=400&fit=crop',
        path: '/game/pubg-mobile'
      },
      {
        id: 31,
        title: 'Candy Crush',
        description: 'Puzzle game',
        category: 'android',
        subcategory: 'puzzle',
        size: '0.1 GB',
        rating: 8.2,
        downloads: '1200.5K',
        image: 'https://images.unsplash.com/photo-1478144143081-80f7f84ca84d?w=600&h=400&fit=crop',
        path: '/game/candy-crush'
      },
      {
        id: 32,
        title: 'Clash of Clans',
        description: 'Strategy game',
        category: 'android',
        subcategory: 'strategy',
        size: '0.2 GB',
        rating: 8.6,
        downloads: '987.4K',
        image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=600&h=400&fit=crop',
        path: '/game/clash-of-clans'
      },
    ]
  }
}

const GAMES_PER_PAGE = 12

export default function CategoryPage({ category: propCategory }) {
  const { category: paramCategory, subcategory } = useParams()
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(0)

  // Use prop first, then param, handle both ways
  const category = propCategory || paramCategory

  // SCROLL TO TOP on page load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [category, subcategory])

  // Get games for this category
  const categoryData = gamesDatabase[category] || { label: 'Category Not Found', games: [] }
  let allGames = categoryData.games

  // Filter by subcategory if provided
  if (subcategory) {
    allGames = allGames.filter(game => game.subcategory === subcategory)
  }

  // Pagination
  const totalPages = Math.ceil(allGames.length / GAMES_PER_PAGE)
  const startIndex = currentPage * GAMES_PER_PAGE
  const endIndex = startIndex + GAMES_PER_PAGE
  const games = allGames.slice(startIndex, endIndex)

  const pageTitle = subcategory 
    ? `${subcategory.charAt(0).toUpperCase() + subcategory.slice(1)} Games` 
    : categoryData.label

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <div className="category-page">
      {/* CATEGORY HERO */}
      <CategoryHero 
        title={pageTitle}
        description={categoryData.description}
        image="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&h=700&fit=crop"
      />

      {/* GAMES GRID */}
      <div className="category-content">
        {games.length > 0 ? (
          <>
            <div className="games-grid">
              {games.map((game) => (
                <div 
                  key={game.id} 
                  className="game-item"
                  onClick={() => navigate(game.path)}
                >
                  {/* IMAGE */}
                  <div className="game-item-image">
                    <img 
                      src={game.image} 
                      alt={game.title}
                      loading="lazy"
                    />
                    <div className="game-item-overlay" />
                  </div>

                  {/* INFO */}
                  <div className="game-item-info">
                    <h3 className="game-item-title">{game.title}</h3>
                    <p className="game-item-description">{game.description}</p>

                    {/* META */}
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

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div className="category-pagination">
                <button 
                  className="pagination-btn pagination-btn-prev"
                  onClick={handlePrevPage}
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
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages - 1}
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

      {/* FOOTER */}
      <Footer />
    </div>
  )
}
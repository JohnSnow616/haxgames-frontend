import { FocusRail } from '../components/FocusRail/FocusRail'
import CategoriesSection from '../components/CategoriesSection/CategoriesSection'
import LatestGamesSection from '../components/LatestGamesSection/LatestGamesSection'
import Footer from '../components/Footer/Footer'

const POPULAR_GAMES = [
  {
    id: 1,
    title: "Elden Ring",
    description: "Action RPG set in the Lands Between.",
    meta: "PC • Action RPG",
    imageSrc: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=450&fit=crop",
    href: "/game/elden-ring",
  },
  {
    id: 2,
    title: "Cyberpunk 2077",
    description: "Open world action-adventure in Night City.",
    meta: "PC • Action",
    imageSrc: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=450&fit=crop",
    href: "/game/cyberpunk",
  },
  {
    id: 3,
    title: "God of War",
    description: "Kratos and Atreus journey through Norse realms.",
    meta: "PC • Adventure",
    imageSrc: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=450&fit=crop",
    href: "/game/god-of-war",
  },
  {
    id: 4,
    title: "Zelda: Tears of the Kingdom",
    description: "Explore the skies and depths of Hyrule.",
    meta: "Switch • Adventure",
    imageSrc: "https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=800&h=450&fit=crop",
    href: "/game/zelda-totk",
  },
  {
    id: 5,
    title: "Hogwarts Legacy",
    description: "Live the life of a Hogwarts student.",
    meta: "PC • RPG",
    imageSrc: "https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=800&h=450&fit=crop",
    href: "/game/hogwarts",
  },
  {
    id: 6,
    title: "Baldur's Gate 3",
    description: "Epic fantasy RPG with countless possibilities.",
    meta: "PC • RPG",
    imageSrc: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&h=450&fit=crop",
    href: "/game/baldurs-gate",
  },
  {
    id: 7,
    title: "Starfield",
    description: "Explore the vastness of space.",
    meta: "PC • Sci-Fi",
    imageSrc: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800&h=450&fit=crop",
    href: "/game/starfield",
  },
  {
    id: 8,
    title: "Palworld",
    description: "Creature collecting adventure.",
    meta: "PC • Adventure",
    imageSrc: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=450&fit=crop",
    href: "/game/palworld",
  },
]

export default function Home() {
  return (
    <>
      {/* POPULAR GAMES SECTION */}
      <div style={{ marginTop: '75px' }}>
        {/* Optional Section Header */}
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
          <h2 style={{
            fontFamily: 'Space Grotesk',
            fontSize: 'clamp(28px, 3.5vw, 44px)',
            fontWeight: '800',
            color: 'white',
            letterSpacing: '-1px',
            marginBottom: '0.5rem',
          }}>
            Popular <span style={{ color: '#6b5ca5' }}>Games</span>
          </h2>
        </div>

        {/* Carousel */}
        <FocusRail
          items={POPULAR_GAMES}
          loop={true}
          autoPlay={true}
          interval={5000}
        />
      </div>

      {/* CATEGORIES SECTION */}
      <CategoriesSection />

      {/* LATEST GAMES SECTION */}
      <LatestGamesSection />

      {/* FOOTER */}
      <Footer />
    </>
  )
}
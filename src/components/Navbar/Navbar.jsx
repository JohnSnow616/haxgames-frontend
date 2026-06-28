import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Menu, X, ChevronDown } from 'lucide-react'
import './Navbar.css'

const parentCategories = [
  {
    label: 'NSP',
    path: '/nsp',
    subcategories: [
      { label: 'Action', path: '/nsp/action' },
      { label: 'RPG', path: '/nsp/rpg' },
      { label: 'Adventure', path: '/nsp/adventure' },
      { label: 'Sports', path: '/nsp/sports' },
      { label: 'Puzzle', path: '/nsp/puzzle' },
    ]
  },
  {
    label: 'Switch',
    path: '/switch',
    subcategories: [
      { label: 'Action', path: '/switch/action' },
      { label: 'RPG', path: '/switch/rpg' },
      { label: 'Adventure', path: '/switch/adventure' },
      { label: 'Platformer', path: '/switch/platformer' },
      { label: 'Indie', path: '/switch/indie' },
    ]
  },
  {
    label: 'PC',
    path: '/pc',
    subcategories: [
      { label: 'FPS', path: '/pc/fps' },
      { label: 'RPG', path: '/pc/rpg' },
      { label: 'Strategy', path: '/pc/strategy' },
      { label: 'MOBA', path: '/pc/moba' },
      { label: 'Simulation', path: '/pc/simulation' },
    ]
  },
  {
    label: 'Mac',
    path: '/mac',
    subcategories: [
      { label: 'Action', path: '/mac/action' },
      { label: 'Puzzle', path: '/mac/puzzle' },
      { label: 'Adventure', path: '/mac/adventure' },
      { label: 'Casual', path: '/mac/casual' },
    ]
  },
  {
    label: 'Android',
    path: '/android',
    subcategories: [
      { label: 'Action', path: '/android/action' },
      { label: 'Puzzle', path: '/android/puzzle' },
      { label: 'Casual', path: '/android/casual' },
      { label: 'Arcade', path: '/android/arcade' },
    ]
  },
]

const otherPages = [
  { label: 'About Us', path: '/about' },
  { label: 'Contact', path: '/contact' },
  { label: 'News', path: '/news' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setSearchOpen(false)
  }, [location])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const handleSearch = (e) => {
    e.preventDefault()
    console.log('Search query:', searchQuery)
  }

  const closeMobileMenu = () => {
    setMobileOpen(false)
  }

  return (
    <>
      {/* DESKTOP NAVBAR */}
      <motion.header
        className={`navbar ${scrolled ? 'scrolled' : ''} ${mobileOpen ? 'navbar-hidden' : ''}`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="navbar-container">
          
          {/* LOGO */}
          <Link to="/" className="navbar-logo">
            <div className="logo-icon-wrapper">
              <motion.div 
                className="logo-icon-animated"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <span className="logo-emoji">🎮</span>
                <div className="logo-shine" />
              </motion.div>
            </div>
            <span className="logo-text">HaxGames</span>
          </Link>

          {/* DESKTOP NAV LINKS */}
          <nav className="navbar-nav">
            
            {/* HOME */}
            <Link 
              to="/" 
              className={`nav-link ${isHome ? 'active' : ''}`}
            >
              Home
            </Link>

            {/* PARENT CATEGORIES WITH DROPDOWNS */}
            {parentCategories.map((category, idx) => (
              <div 
                key={idx}
                className="nav-dropdown"
                onMouseEnter={() => setActiveDropdown(idx)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link 
                  to={category.path}
                  className="nav-link dropdown-trigger"
                >
                  {category.label}
                  <motion.span
                    animate={{ rotate: activeDropdown === idx ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown size={14} />
                  </motion.span>
                </Link>

                <AnimatePresence>
                  {activeDropdown === idx && (
                    <motion.div
                      className="dropdown-menu"
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                    >
                      {category.subcategories.map((sub, subIdx) => (
                        <motion.div
                          key={sub.path}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: subIdx * 0.05 }}
                        >
                          <Link to={sub.path} className="dropdown-item">
                            <span>{sub.label}</span>
                          </Link>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            {/* OTHER PAGES - NO DROPDOWN */}
            {otherPages.map((page) => (
              <Link 
                key={page.path}
                to={page.path}
                className={`nav-link ${location.pathname === page.path ? 'active' : ''}`}
              >
                {page.label}
              </Link>
            ))}

          </nav>

          {/* SEARCH BAR */}
          <div className="navbar-search">
            <AnimatePresence mode="wait">
              {searchOpen ? (
                <motion.form
                  className="search-form"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 240, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  onSubmit={handleSearch}
                >
                  <Search size={16} className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search games..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                    autoFocus
                  />
                  <button
                    type="button"
                    className="search-close"
                    onClick={() => {
                      setSearchOpen(false)
                      setSearchQuery('')
                    }}
                  >
                    <X size={16} />
                  </button>
                </motion.form>
              ) : (
                <motion.button
                  className="search-toggle"
                  onClick={() => setSearchOpen(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Search size={18} />
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>

        </div>
      </motion.header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="mobile-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobileMenu}
              transition={{ duration: 0.2 }}
            />
            <motion.div
              className="mobile-menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              {/* MOBILE HEADER */}
              <div className="mobile-header">
                <div className="mobile-logo">
                  <span className="logo-emoji">🎮</span>
                  <span>HaxGames</span>
                </div>
                <button 
                  className="mobile-close" 
                  onClick={closeMobileMenu}
                  aria-label="Close menu"
                  type="button"
                >
                  <X size={20} />
                </button>
              </div>

              {/* MOBILE SEARCH */}
              <form className="mobile-search" onSubmit={handleSearch}>
                <Search size={16} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search games..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
              </form>

              {/* MOBILE LINKS */}
              <div className="mobile-links">
                {/* HOME */}
                <Link 
                  to="/" 
                  className={`mobile-link ${isHome ? 'active' : ''}`}
                  onClick={closeMobileMenu}
                >
                  Home
                </Link>

                {/* PARENT CATEGORIES WITH SUBCATEGORIES */}
                {parentCategories.map((category) => (
                  <div key={category.path} className="mobile-section">
                    <Link 
                      to={category.path}
                      className="mobile-section-title"
                      onClick={closeMobileMenu}
                    >
                      {category.label}
                    </Link>
                    {category.subcategories.map((sub) => (
                      <Link 
                        key={sub.path} 
                        to={sub.path} 
                        className="mobile-link"
                        onClick={closeMobileMenu}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                ))}

                {/* OTHER PAGES */}
                <div className="mobile-section">
                  <div className="mobile-section-title">Pages</div>
                  {otherPages.map((page) => (
                    <Link 
                      key={page.path} 
                      to={page.path} 
                      className="mobile-link"
                      onClick={closeMobileMenu}
                    >
                      {page.label}
                    </Link>
                  ))}
                </div>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
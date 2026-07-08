'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Menu, X, ChevronDown } from 'lucide-react'
import './Navbar.css'

const parentCategories = [
  {
    label: 'Action',
    path: '/category/action',
    subcategories: [
      { label: 'Action Games', path: '/category/action' },
      { label: 'Shooters', path: '/category/shooters' },
    ]
  },
  {
    label: 'Adventure',
    path: '/category/adventure-game',
    subcategories: [
      { label: 'Adventure Games', path: '/category/adventure-game' },
      { label: 'Horror', path: '/category/horror' },
      { label: 'Mystery', path: '/category/mystery' },
      { label: 'Thriller', path: '/category/thriller' },
    ]
  },
  {
    label: 'Simulation',
    path: '/category/simulation',
    subcategories: [
      { label: 'Simulation', path: '/category/simulation' },
      { label: 'Building', path: '/category/building' },
    ]
  },
  {
    label: 'Indie',
    path: '/category/indie',
    subcategories: [
      { label: 'Indie Games', path: '/category/indie' },
      { label: 'Casual', path: '/category/casual' },
    ]
  },
  {
    label: 'Anime',
    path: '/category/anime',
    subcategories: [
      { label: 'Anime Games', path: '/category/anime' },
      { label: 'Fantasy', path: '/category/fantasy' },
    ]
  },
]

const otherPages = [
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
  { label: 'News', path: '/news' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const pathname = usePathname()
  const isHome = pathname === '/'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setSearchOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const handleSearch = (e) => {
    e.preventDefault()
    console.log('Search query:', searchQuery)
    // TODO: Implement search functionality
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
          <Link href="/" className="navbar-logo">
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
            <span className="logo-text">GameVault</span>
          </Link>

          {/* DESKTOP NAV LINKS */}
          <nav className="navbar-nav">

            {/* HOME */}
            <Link
              href="/"
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
                  href={category.path}
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
                          <Link href={sub.path} className="dropdown-item">
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
                href={page.path}
                className={`nav-link ${pathname === page.path ? 'active' : ''}`}
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
                  type="button"
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
            type="button"
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
                  <span>GameVault</span>
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
                  href="/"
                  className={`mobile-link ${isHome ? 'active' : ''}`}
                  onClick={closeMobileMenu}
                >
                  Home
                </Link>

                {/* PARENT CATEGORIES WITH SUBCATEGORIES */}
                {parentCategories.map((category) => (
                  <div key={category.path} className="mobile-section">
                    <Link
                      href={category.path}
                      className="mobile-section-title"
                      onClick={closeMobileMenu}
                    >
                      {category.label}
                    </Link>
                    {category.subcategories.map((sub) => (
                      <Link
                        key={sub.path}
                        href={sub.path}
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
                      href={page.path}
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
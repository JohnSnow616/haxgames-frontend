"use client"

import './CategoryHero.css'

export default function CategoryHero({ title, description, image }) {
  return (
    <section className="category-hero">
      <div className="category-hero-container">
        
        {/* LEFT - TEXT ONLY */}
        <div className="category-hero-content">
          <h1 className="category-hero-title">{title}</h1>
          <p className="category-hero-description">{description}</p>
        </div>

        {/* RIGHT - IMAGE WITH FADE */}
        {image && (
          <div className="category-hero-image-wrapper">
            <img src={image} alt="Category" className="category-hero-image" />
            <div className="category-hero-fade" />
          </div>
        )}

      </div>
    </section>
  )
}
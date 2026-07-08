const WORDPRESS_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL

/**
 * Fetch posts from WordPress
 */
export async function fetchPosts(perPage = 20, page = 1) {
  const response = await fetch(
    `${WORDPRESS_URL}/wp-json/wp/v2/posts?per_page=${perPage}&page=${page}&_embed`
  )
  
  if (!response.ok) {
    throw new Error('Failed to fetch posts')
  }
  
  const posts = await response.json()
  const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '1')
  const totalPosts = parseInt(response.headers.get('X-WP-Total') || '0')
  
  return { posts, totalPages, totalPosts }
}

/**
 * Fetch single post by slug
 */
export async function fetchPostBySlug(slug) {
  const response = await fetch(
    `${WORDPRESS_URL}/wp-json/wp/v2/posts?slug=${slug}&_embed`
  )
  
  if (!response.ok) {
    throw new Error('Failed to fetch post')
  }
  
  const posts = await response.json()
  return posts[0] || null
}

/**
 * Fetch all categories
 */
export async function fetchCategories() {
  const response = await fetch(
    `${WORDPRESS_URL}/wp-json/wp/v2/categories?per_page=100`
  )
  
  if (!response.ok) {
    throw new Error('Failed to fetch categories')
  }
  
  return await response.json()
}

/**
 * Fetch posts by category slug
 */
export async function fetchPostsByCategory(categorySlug, perPage = 20, page = 1) {
  // First get the category ID from slug
  const categoryResponse = await fetch(
    `${WORDPRESS_URL}/wp-json/wp/v2/categories?slug=${categorySlug}`
  )
  
  if (!categoryResponse.ok) {
    throw new Error('Failed to fetch category')
  }
  
  const categories = await categoryResponse.json()
  
  if (!categories || categories.length === 0) {
    return { category: null, posts: [], totalPages: 0, totalPosts: 0 }
  }
  
  const category = categories[0]
  
  // Then get posts in that category
  const postsResponse = await fetch(
    `${WORDPRESS_URL}/wp-json/wp/v2/posts?categories=${category.id}&per_page=${perPage}&page=${page}&_embed`
  )
  
  if (!postsResponse.ok) {
    throw new Error('Failed to fetch posts by category')
  }
  
  const posts = await postsResponse.json()
  const totalPages = parseInt(postsResponse.headers.get('X-WP-TotalPages') || '1')
  const totalPosts = parseInt(postsResponse.headers.get('X-WP-Total') || '0')
  
  return { category, posts, totalPages, totalPosts }
}

/**
 * Fetch featured image URL from media ID
 */
export function getFeaturedImageUrl(post) {
  if (!post._embedded || !post._embedded['wp:featuredmedia']) {
    return null
  }
  
  const media = post._embedded['wp:featuredmedia'][0]
  
  if (!media) return null
  
  // Get the full size image
  return media.source_url || null
}

/**
 * Extract post excerpt
 */
export function getExcerpt(post) {
  if (post.excerpt && post.excerpt.rendered) {
    // Remove HTML tags from excerpt
    return post.excerpt.rendered.replace(/<[^>]*>/g, '').trim()
  }
  return ''
}
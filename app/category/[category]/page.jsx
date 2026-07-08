import { fetchPostsByCategory } from '../../lib/wordpress'
import CategoryPageClient from '../../pages/CategoryPageCient'

export async function generateMetadata({ params }) {
  // MUST await params
  const { category } = await params
  
  try {
    const { category: categoryData, posts } = await fetchPostsByCategory(category, 1, 1)
    
    if (!categoryData) {
      return {
        title: 'Category Not Found | HaxGames',
        description: 'The category you are looking for does not exist.',
      }
    }
    
    const firstGameImage = posts[0]?._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&h=630&fit=crop'
    
    return {
      title: `${categoryData.name} Games | HaxGames`,
      description: categoryData.description || 
        `Browse and download ${categoryData.name} games for PC, Switch, and Android.`,
      openGraph: {
        title: `${categoryData.name} Games`,
        description: categoryData.description || 
          `Download ${categoryData.name} games`,
        type: 'website',
        url: `https://staging.haxgames.net/category/${category}`,
        images: [
          {
            url: firstGameImage,
            width: 1200,
            height: 630,
            alt: `${categoryData.name} games`,
          }
        ],
        siteName: 'HaxGames',
      },
      twitter: {
        card: 'summary_large_image',
        title: `${categoryData.name} Games`,
        description: categoryData.description || 
          `Download ${categoryData.name} games`,
        images: [firstGameImage],
      },
      canonical: `https://staging.haxgames.net/category/${category}`,
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    return {
      title: 'Games | HaxGames',
      description: 'Browse and download games.',
    }
  }
}

export default async function CategoryPage({ params }) {
  // MUST await params
  const { category } = await params
  
  const categoryData = await fetchPostsByCategory(category, 20, 1)
  
  return <CategoryPageClient category={category} initialData={categoryData} />
}
import GameDetailPageClient from '../pages/GameDetailPageClient'

export async function generateMetadata({ params }) {
  const { gameId } = await params
  
  // Return basic metadata (without fetching)
  return {
    title: `Game | HaxGames`,
    description: 'Download games on HaxGames.',
    openGraph: {
      title: 'Game',
      type: 'article',
      url: `https://staging.haxgames.net/${gameId}`,
    },
  }
}

export default async function GameDetailPage({ params }) {
  const { gameId } = await params
  
  // Don't fetch on server - let client handle it
  return <GameDetailPageClient gameId={gameId} />
}
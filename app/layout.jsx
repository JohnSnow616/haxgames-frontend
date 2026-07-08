import Navbar from './components/Navbar/Navbar';
import './styles/globals.css'

export const metadata = {
  title: 'HaxGames - Free Game Downloads for PC, Switch & Android',
  description: 'Download the best games for PC, Switch, and Android. Free and premium game downloads.',
  openGraph: {
    siteName: 'HaxGames',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
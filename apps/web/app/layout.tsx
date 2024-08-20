import '../public/fonts/inter/inter.css'
import './globals.css'

export const metadata = {
  title: 'DASH Randomizer',
  description: 'Super Metroid Randomizer for competitive play',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

export const metadata = {
  title: 'Super Metroid DASH Randomizer',
  description: 'Super Metroid DASH Randomizer',
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

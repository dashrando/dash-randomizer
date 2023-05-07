export const metadata = {
  title: 'DASH Randomizer',
  description: 'DASH Randomizer Seed',
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

export const metadata = {
  title: 'Generate DASH Seed',
  description: 'Generate a DASH Seed',
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

export const metadata = {
  title: 'Readable Logic',
  description: 'DASH Logic in an easy to read format',
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

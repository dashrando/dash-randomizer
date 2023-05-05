export const metadata = {
  title: 'Readable Logic - DASH Recall',
  description: 'DASH Recall logic in a human readable format',
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

export const metadata = {
  title: "DASH Recall Tracker",
  description: "Item Tracker for DASH Recall",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

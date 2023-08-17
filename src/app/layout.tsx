import './globals.css'

export const metadata = {
  title: 'InvenTrack',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <div id='newinventorymodal'></div>
      </body>
    </html>
  )
}

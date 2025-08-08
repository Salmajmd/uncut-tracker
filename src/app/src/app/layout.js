import './globals.css'

export const metadata = {
  title: 'UNCUT Tracker',
  description: 'Raw. Unfiltered. Consistent.',
  manifest: '/manifest.json',
  themeColor: '#14b8a6',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#14b8a6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="UNCUT Tracker" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body className="font-obviously">{children}</body>
    </html>
  )
}

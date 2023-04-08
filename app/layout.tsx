import HydrationHandler from './components/HydrationHandler';
import RegisterModal from './components/modal/RegisterModal';
import Navbar from './components/navbar/Navbar';
import './globals.css'
import { Nunito } from 'next/font/google';
import ToastProvider from './providers/ToasterProvider';

export const metadata = {
  title: 'gostay',
  description: 'Ayoo Ngekos',
}

const font = Nunito({
  subsets: ['latin']
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <HydrationHandler>
          <ToastProvider />
          <RegisterModal />
          <Navbar />
        </HydrationHandler>
        {children}
      </body>
    </html>
  )
}

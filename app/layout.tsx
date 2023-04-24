import HydrationHandler from './components/HydrationHandler';
import RegisterModal from './components/modal/RegisterModal';
import Navbar from './components/navbar/Navbar';
import './globals.css'
import { Nunito } from 'next/font/google';
import ToastProvider from './providers/ToasterProvider';
import LoginModal from './components/modal/LoginModal';
import getCurrentUser from './actions/getCurrentUser';
import RentModal from './components/modal/RentModal';
import SearchModal from './components/modal/SearchModal';

export const metadata = {
  title: 'gostay',
  description: 'Find the most relaxing place',
}

const font = Nunito({
  subsets: ['latin']
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        <HydrationHandler>
          <ToastProvider />
          <SearchModal />
          <RentModal />
          <LoginModal />
          <RegisterModal />
          <Navbar currentUser={currentUser} />
        </HydrationHandler>
        <div className='pb-20 pt-28'>
          {children}
        </div>
      </body>
    </html>
  )
}

import React from 'react'
import Container from './Container'
import Logo from './Logo'
import HeaderMenu from './HeaderMenu'
import Searchbar from './Searchbar'
import CartIcon from "./CartIcon.jsx"
import FavouriteButton from './FavouriteButton'
import Signin from './Signin'
import MoblieMenu from './MobileMenu'
import { ClerkLoaded, SignedIn, UserButton,SignedOut } from '@clerk/nextjs'

const Header = () => {
  // const user = await currentUser();
  // console.log("header user", user);
  return (
    <header className='bg-white/70 py-5 sticky top-0 z-50 backdrop-blur-md'>
        <Container className="flex items-center justify-between text-lightColor">
            {/* logo */}
            <div className='w-auto md:w-1/3 flex items-center justify-start gap-2 md:gap-0'>
            <MoblieMenu />
              <Logo/>
              
            </div>
            {/* Navbutton */}
            <HeaderMenu/>
            <div className='w-auto md:w-1/3 flex items-center justify-end gap-5'>
              <Searchbar/>
              <CartIcon />
              <FavouriteButton />
              <ClerkLoaded>
                <SignedIn>
                  <UserButton afterSignOutUrl="/"/>
                </SignedIn>

                <SignedOut>
                <Signin />
                </SignedOut>
              </ClerkLoaded>
            </div>
            {/* NavAdmin */}
        </Container>
    </header>
  )
}

export default Header
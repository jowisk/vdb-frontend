import React from 'react'
import { Menu } from 'lucide-react'
const Navbar = ({handleOpenMenu}) => {
  return (
    <header className='w-full fixed z-10 backdrop-blur-md bg-white border-b h-10 flex items-center justify-between px-10'>
        <button onClick={handleOpenMenu}>
          <Menu/>
        </button>

        <p className='font-semibold'>VDB by Victoria Dominguez</p>

        <div className='w-1 h-full'>

        </div>
    </header>
  )
}

export default Navbar
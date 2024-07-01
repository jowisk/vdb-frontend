import { React, useState } from 'react'
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const Menu = ({ isOpen, handleOpenMenu }) => {

    const navigate = useNavigate()

    const menuVariants = {
        visible: { opacity: 1, x: 0 },
        hidden: { opacity: 1, x: -1000 }
      };

  return (
    <motion.div 
        variants={menuVariants}
        animate={isOpen ? 'visible' : 'hidden'}
        initial='hidden'
        transition={{ duration: 0.9 , delay: 0, ease: 'easeInOut'}}
        className='fixed z-30 h-screen w-96 border-r border-1 bg-white'
    >
        <div
            className='w-full flex justify-end p-3'
        >
            <button
                onClick={handleOpenMenu}
            >
                <X/>
            </button>
        </div>
        <div className='p-3'>

            <button className='bg-green-500 text-white w-full rounded-md p-3' onClick={() => navigate('/subirprenda')}>
                Subir Prenda
            </button>
        </div>
    </motion.div>
  )
}

export default Menu
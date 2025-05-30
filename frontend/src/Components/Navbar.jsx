import React, { useState } from 'react';
import { Mail, Menu, X, Home, Info, Bell, Settings } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Mail className="h-8 w-8" />
            </div>
            <div className="hidden md:block ml-3">
              <span className="font-bold text-xl">MailService</span>
            </div>
          </div>
        
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
import React from 'react';
import { useLocation } from 'react-router-dom';

function Footer() {
  const currentYear = new Date().getFullYear();
  const currentUrl = useLocation();
  const loginUrl = currentUrl.pathname === '/sign-in';
  const registerUrl = currentUrl.pathname === '/sign-up';
  return (
    <footer className="footer">
      {
        loginUrl || registerUrl ? '' : (<p className="footer__copyright">© {currentYear} Mesto Russia</p>)
      }
    </footer>
  );
}

export default Footer;

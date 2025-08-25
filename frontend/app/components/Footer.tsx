'use client';

import Link from 'next/link';
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'About',
      links: [
        { label: 'Our Story', href: '/about' },
        { label: 'Privacy Policy', href: '/privacy-policy' },
        { label: 'FAQ', href: '/faq' },
      ],
    },
    {
      title: 'Quick Links',
      links: [
        { label: 'Courses', href: '/courses' },
        { label: 'My Account', href: '/profile' },
        { label: 'Course Dashboard', href: '/course-dashboard' },
      ],
    },
    {
      title: 'Social Links',
      links: [
        { label: 'YouTube', href: 'https://www.youtube.com' },
        { label: 'Instagram', href: 'https://www.instagram.com/' },
        { label: 'GitHub', href: 'https://www.github.com' },
      ],
    },
  ];

  return (
    <footer className="bg-[#f4f7f8] mt-8 dark:bg-[#0e1111] border-t border-gray-200 dark:border-[#2d2f30] transition-all duration-300">
      <div className="max-w-screen-xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
        {footerLinks.map((section) => (
          <div key={section.title}>
            <h3 className="text-lg font-semibold text-[#4ea6a9] mb-4 tracking-wide uppercase">
              {section.title}
            </h3>
            <ul className="space-y-3">
              {section.links.map((link) => (
                <li key={link.href}>
                  {section.title === 'Social Links' ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gray-700 dark:text-gray-400 hover:text-[#4ea6a9] transition-all duration-200 ease-in-out cursor-pointer"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-sm text-gray-700 dark:text-gray-400 hover:text-[#4ea6a9] transition-all duration-200 ease-in-out cursor-pointer"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h3 className="text-lg font-semibold text-[#4ea6a9] mb-4 tracking-wide uppercase">
            Contact Info
          </h3>
          <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-400">
            <li>
              📞 Call:{' '}
              <span className="text-gray-800 dark:text-gray-200 hover:text-[#4ea6a9] transition-all cursor-pointer">
                +977-9864755254
              </span>
            </li>
            <li>
              📍 Address:{' '}
              <span className="text-gray-800 dark:text-gray-200 hover:text-[#4ea6a9] transition-all cursor-pointer">
                Dhangadhi, Kailali, Nepal
              </span>
            </li>
            <li>
              📧 Email:{' '}
              <span className="text-gray-800 dark:text-gray-200 hover:text-[#4ea6a9] transition-all cursor-pointer">
                lmsnepal.np@gmail.com
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="py-6 border-t border-gray-200 dark:border-[#2f2f2f] text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          © {currentYear}{' '}
          <span className="font-semibold text-[#4ea6a9]">LMS-Nepal</span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

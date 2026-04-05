"use client";
import React, { useState } from 'react';
import AnnouncementBar from './AnnouncementBar';
import Navbar from './Navbar';

export default function Header() {
  const [isBannerVisible, setIsBannerVisible] = useState(true);

  return (
    <>
      <AnnouncementBar isVisible={isBannerVisible} onClose={() => setIsBannerVisible(false)} />
      <Navbar isBannerVisible={isBannerVisible} />
    </>
  );
}

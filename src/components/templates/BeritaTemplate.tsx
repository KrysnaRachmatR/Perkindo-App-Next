"use client";
import React from "react";
import NewBeritaSection from "../organisms/NewBeritaSection";
import LatesBeritaSection from "../organisms/LatestBeritaSection";

const HomePage: React.FC = () => {
  // Menambahkan tipe React.FC
  return (
    <main>
      <NewBeritaSection />
      <LatesBeritaSection />
    </main>
  );
};

export default HomePage;

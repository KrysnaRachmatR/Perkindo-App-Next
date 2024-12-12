"use client";
import React from "react";
import NewBeritaSection from "../organisms/NewBeritaSection";
import OldBeritaSection from "../organisms/OldBeritaSection";

const HomePage: React.FC = () => {
  // Menambahkan tipe React.FC
  return (
    <main>
      <NewBeritaSection />
      <OldBeritaSection />
    </main>
  );
};

export default HomePage;

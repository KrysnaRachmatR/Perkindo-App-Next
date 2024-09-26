"use client";
import React from "react";
import TextBerita from "../atoms/TextBerita";
import CardBerita from "../molecules/CardBerita";

export default function LatestBeritaSection() {
  return (
    <section className="p-6">
      <div className="flex justify-between items-center">
        <TextBerita content="Berita Terakhir" className="text-2xl font-bold" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
        <CardBerita
          imageSrc="/images/konstruksi2.jpg"
          category="Movie"
          title="Agus lan Jono Gelut Perkoro Wedokan Chapter 35"
          source="Ngarang Dewe"
          time="30 Dino"
        />
        <CardBerita
          imageSrc="/images/konstruksi2.jpg"
          category="Movie"
          title="Agus lan Jono Gelut Perkoro Wedokan Chapter:30"
          source="Ngarang Dewe"
          time="30 Dino"
        />
        <CardBerita
          imageSrc="/images/konstruksi2.jpg"
          category="Movie"
          title="Agus lan Jono Gelut Perkoro Wedokan Chapter:25"
          source="Ngarang Dewe"
          time="30 Dino"
        />
        <CardBerita
          imageSrc="/images/konstruksi2.jpg"
          category="Movie"
          title="Agus lan Jono Gelut Perkoro Wedokan Chapter:20"
          source="Ngarang Dewe"
          time="30 Dino"
        />
      </div>
    </section>
  );
}

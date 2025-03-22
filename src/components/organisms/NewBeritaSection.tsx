"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import ImageAtom from "../atoms/ImageBerita";
import TextBerita from "../atoms/TextBerita";
import ButtonBerita from "../atoms/TombolBerita";
import PopupBerita from "../molecules/PopupBerita";

interface Berita {
  id: number;
  title: string;
  caption: string;
  image: string;
  created_at: string;
}

export default function NewBeritaSection() {
  const [showPopup, setShowPopup] = useState(false);
  const [latestBerita, setLatestBerita] = useState<Berita | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  const truncateCaption = (caption: string) => {
    const words = caption.split(" ");
    return words.slice(0, 20).join(" ") + (words.length > 20 ? "..." : "");
  };

  useEffect(() => {
    const fetchLatestBerita = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/berita");
        const allBerita: Berita[] = response.data;

        if (!Array.isArray(allBerita) || allBerita.length === 0) {
          console.warn("Data berita kosong atau tidak berbentuk array.");
          return;
        }

        const terbaru = allBerita.reduce((prev, current) => (prev.id > current.id ? prev : current));
        setLatestBerita(terbaru);
      } catch (error) {
        console.error("Error fetching berita:", error);
      }
    };

    fetchLatestBerita();
  }, []);

  if (!latestBerita) {
    return <div className="flex justify-center items-center h-screen text-gray-500">Loading...</div>;
  }

  return (
    <div className="relative">
      <div className={`grid grid-cols-1 lg:grid-cols-2 p-10 bg-gray-100 pt-24 gap-10 ${showPopup ? "blur-[75%]" : ""}`}>
        <ImageAtom
          src={`http://localhost:8000/storage/${latestBerita.image}`}
          alt={latestBerita.title || "Gambar Berita"}
          width={650}
          height={400}
          className="rounded-lg shadow-lg object-cover"
        />
        <div className="flex flex-col justify-center space-y-6">
          <TextBerita content="Berita Terbaru" className="text-red-500 text-lg" />
          <TextBerita content={latestBerita.title} className="text-3xl font-bold text-gray-900" />
          <TextBerita content={truncateCaption(latestBerita.caption)} className="text-gray-600 leading-relaxed" />

          <ButtonBerita
            label="Baca Selengkapnya"
            className="text-white bg-[#161D6F] px-4 py-2 rounded-md shadow-md hover:bg-[#0F1454] transition duration-300"
            onClick={() => setShowPopup(true)}
          />
        </div>
      </div>

      {/* Overlay dengan blur saat popup terbuka */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-lg flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <PopupBerita
                time={formatDate(latestBerita.created_at)}
                title={latestBerita.title}
                content={latestBerita.caption}
                imageSrc={`http://localhost:8000/storage/${latestBerita.image}`}
                onClose={() => setShowPopup(false)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

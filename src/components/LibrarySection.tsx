import React from 'react';
import { SectionHeader } from './SectionHeader';
import { WideCard } from './WideCard';

const continueData = [
  { title: "Iron Ghost", chapter: "Chapter 7 — The Reckoning", progress: 62, bgColor: "#14080a" },
  { title: "Void Runner", chapter: "Chapter 3 — Drift", progress: 28, bgColor: "#09091a" },
  { title: "Jade Empire", chapter: "Chapter 1 — Origins", progress: 8, bgColor: "#08120a" }
];

export const LibrarySection = () => (
  <section className="px-4 sm:px-6 md:px-8 lg:px-[52px] pt-8 sm:pt-9">
    <SectionHeader title="Continue reading" linkText="My library →" />
    <div className="flex gap-2 sm:gap-2.5 overflow-x-auto no-scrollbar pt-2 sm:pt-3 pb-4 sm:pb-6 -mt-0 sm:-mt-1">
      {continueData.map((comic, index) => (
        <WideCard key={index} {...comic} />
      ))}
    </div>
  </section>
);

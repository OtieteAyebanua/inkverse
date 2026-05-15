import React from 'react';
import { SectionHeader } from './SectionHeader';
import { ComicCard } from './ComicCard';

export const IndieCreatorsSection = () => (
  <section className="px-[52px] pt-9 pb-12">
    <SectionHeader title="New from indie creators" linkText="See all →" />
    <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-0.5">
      <ComicCard title="Silver Tide" chapter="Ch 1 of 12" genre="Romance" badge={{ text: 'New', color: 'bg-[#3b82f6] text-white' }} bgColor="#0c1410" />
      <ComicCard title="Hellbound" chapter="Ch 1 of 15" genre="Horror" badge={{ text: 'New', color: 'bg-[#3b82f6] text-white' }} bgColor="#140808" />
      <ComicCard title="Neon Saints" chapter="Ch 4 of 20" genre="Cyberpunk" bgColor="#0c0c14" />
      <ComicCard title="Echo Chamber" chapter="Ch 2 of 10" genre="Thriller" bgColor="#14140c" />
      <ComicCard title="The Pact" chapter="Ch 6 of 14" genre="Drama · Mystery" bgColor="#10100c" />
    </div>
  </section>
);

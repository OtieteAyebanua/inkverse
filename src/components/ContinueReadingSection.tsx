import { SectionHeader } from "./SectionHeader";
import { WideCard } from "./WideCard";

const CONTINUE_READING_DATA = [
  {
    title: "Iron Ghost",
    chapter: "Chapter 7 — The Reckoning",
    progress: 62,
    bgColor: "#14080a",
  },
  {
    title: "Void Runner",
    chapter: "Chapter 3 — Drift",
    progress: 28,
    bgColor: "#09091a",
  },
  {
    title: "Jade Empire",
    chapter: "Chapter 1 — Origins",
    progress: 8,
    bgColor: "#08120a",
  },
  {
    title: "Iron Ghost",
    chapter: "Chapter 7 — The Reckoning",
    progress: 62,
    bgColor: "#14080a",
  },
  {
    title: "Void Runner",
    chapter: "Chapter 3 — Drift",
    progress: 28,
    bgColor: "#09091a",
  },
  {
    title: "Jade Empire",
    chapter: "Chapter 1 — Origins",
    progress: 8,
    bgColor: "#08120a",
  },
  {
    title: "Iron Ghost",
    chapter: "Chapter 7 — The Reckoning",
    progress: 62,
    bgColor: "#14080a",
  },
  {
    title: "Void Runner",
    chapter: "Chapter 3 — Drift",
    progress: 28,
    bgColor: "#09091a",
  },
  {
    title: "Jade Empire",
    chapter: "Chapter 1 — Origins",
    progress: 8,
    bgColor: "#08120a",
  },
];

export const ContinueReadingSection = () => (
  <section className="px-4 sm:px-6 md:px-8 lg:px-[52px] pt-8 sm:pt-9">
    <SectionHeader title="Continue reading" linkText="My library →" />
    <div className="flex gap-2 sm:gap-2.5 overflow-x-auto no-scrollbar pb-0.5">
      {CONTINUE_READING_DATA.map((item) => (
        <WideCard
          key={item.title}
          title={item.title}
          chapter={item.chapter}
          progress={item.progress}
          bgColor={item.bgColor}
        />
      ))}
    </div>
  </section>
);

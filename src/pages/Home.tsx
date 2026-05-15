import { HeroCarousel } from '../components/HeroCarousel';
import { TrendingSection } from '../components/TrendingSection';
import { LibrarySection } from '../components/LibrarySection';
import { IndieSection } from '../components/IndieSection';
import { PlansSection } from '../components/PlansSection';

export const Home = () => {
  return (
    <>
      <HeroCarousel />
      <TrendingSection />
      <LibrarySection />
      <IndieSection />
      <PlansSection />
    </>
  );
};

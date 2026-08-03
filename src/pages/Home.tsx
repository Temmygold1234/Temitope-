import Hero from '../components/home/Hero';
import ShopByCategory from '../components/home/ShopByCategory';
import TrendingThisWeek from '../components/home/TrendingThisWeek';
import StyleByOccasion from '../components/home/StyleByOccasion';
import EditorsPicks from '../components/home/EditorsPicks';
import FlashSale from '../components/home/FlashSale';
import Features from '../components/home/Features';
import Reviews from '../components/home/Reviews';
import InstagramGallery from '../components/home/InstagramGallery';
import BannerRenderer from '../components/home/BannerRenderer';

export default function Home() {
  return (
    <>
      <BannerRenderer position="top" />
      <Hero />
      <ShopByCategory />
      <TrendingThisWeek />
      <BannerRenderer position="middle" />
      <StyleByOccasion />
      <EditorsPicks />
      <FlashSale />
      <Features />
      <BannerRenderer position="bottom" />
      <Reviews />
      <InstagramGallery />
    </>
  );
}

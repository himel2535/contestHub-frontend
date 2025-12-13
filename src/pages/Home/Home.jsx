import Contests from "../../components/Home/AllContests";
import ContestBanner from "../../components/Home/ContestBanner";
import FAQSection from "../../components/Home/FAQSection";
import HomeContestSearchResults from "../../components/Home/HomeContestSearchResults";
import PopularContests from "../../components/Home/PopularContests";
import UserTestimonials from "../../components/Home/UserTestimonials";
import WhyChooseUs from "../../components/Home/WhyChooseUs";
import WinnerLeaderboard from "../../components/Home/WinnerLeaderboard";

const Home = () => {
  return (
    <div>
      <ContestBanner></ContestBanner>
      <HomeContestSearchResults></HomeContestSearchResults>
      <PopularContests></PopularContests>
      <WinnerLeaderboard></WinnerLeaderboard>
      <WhyChooseUs></WhyChooseUs>
      <FAQSection></FAQSection>
      <UserTestimonials></UserTestimonials>
    </div>
  );
};

export default Home;

import Contests from '../../components/Home/AllContests'
import ContestBanner from '../../components/Home/ContestBanner'
import HomeContestSearchResults from '../../components/Home/HomeContestSearchResults'
import PopularContests from '../../components/Home/PopularContests'
import WinnerLeaderboard from '../../components/Home/WinnerLeaderboard'

const Home = () => {
  return (
    <div>
      <ContestBanner></ContestBanner>
       <HomeContestSearchResults></HomeContestSearchResults>
      <PopularContests></PopularContests>
      <WinnerLeaderboard></WinnerLeaderboard>
     

    </div>
  )
}

export default Home

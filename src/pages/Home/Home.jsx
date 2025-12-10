import Contests from '../../components/Home/AllContests'
import PopularContests from '../../components/Home/PopularContests'
import WinnerLeaderboard from '../../components/Home/WinnerLeaderboard'

const Home = () => {
  return (
    <div>
      <PopularContests></PopularContests>
      <WinnerLeaderboard></WinnerLeaderboard>
      {/* <Contests /> */}
      {/* More components */}
    </div>
  )
}

export default Home

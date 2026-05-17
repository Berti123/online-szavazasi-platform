import { Routes, Route } from 'react-router-dom'

import Header from './components/Header'
import Footer from './components/Footer'

import Home from './pages/Home'
import Polls from './pages/Polls'
import CreatePoll from './pages/CreatePoll'
import PollDetails from './pages/PollDetails'
import PollResults from './pages/PollResults'

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/polls" element={<Polls />} />
        <Route path="/create-poll" element={<CreatePoll />} />
        <Route path="/polls/:id" element={<PollDetails />} />
        <Route path="/polls/:id/results" element={<PollResults />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App
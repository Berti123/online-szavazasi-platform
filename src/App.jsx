import { Routes, Route } from 'react-router-dom'

import Header from './components/Header'
import Footer from './components/Footer'

import Home from './pages/Home'
import Polls from './pages/Polls'
import CreatePoll from './pages/CreatePoll'

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/polls" element={<Polls />} />
        <Route path="/create-poll" element={<CreatePoll />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App
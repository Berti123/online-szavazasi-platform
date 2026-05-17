import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import Header from './components/Header'
import Footer from './components/Footer'

import Home from './pages/Home'
import Polls from './pages/Polls'
import CreatePoll from './pages/CreatePoll'

function App() {
  const [polls, setPolls] = useState([
    {
      id: 1,
      question: 'Melyik a kedvenc programozási nyelved?',
      options: ['JavaScript', 'Python', 'C#']
    },
    {
      id: 2,
      question: 'Melyik a kedvenc játékod?',
      options: ['Minecraft', 'League of Legends', 'CS2']
    },
    {
      id: 3,
      question: 'Melyik frontend framework a legjobb?',
      options: ['React', 'Vue', 'Angular']
    },
    {
      id: 4,
      question: 'Melyik keresőmotor a kedvenced?',
      options: ['Google', 'Yahoo', 'Bing']
    }
  ])

  function addPoll(newPoll) {
    setPolls([...polls, newPoll])
  }

  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/polls" element={<Polls polls={polls} />} />
        <Route path="/create-poll" element={<CreatePoll addPoll={addPoll} />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App
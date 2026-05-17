import PollCard from '../components/PollCard'

function Polls() {
  return (
    <main className="polls-page">
      <h2>Aktív szavazások</h2>

      <div className="polls-container">
        <PollCard
          question="Melyik a kedvenc programozási nyelved?"
          options={['JavaScript', 'Python', 'C#']}
        />

        <PollCard
          question="Melyik a kedvenc játékod?"
          options={['Minecraft', 'League of Legends', 'CS2']}
        />

        <PollCard
          question="Melyik frontend framework a legjobb?"
          options={['React', 'Vue', 'Angular']}
        />

        <PollCard
          question="Melyik keresőmotor a kedvenced?"
          options={['Google', 'Yahoo', 'Bing']}
        />
      </div>
    </main>
  )
}

export default Polls
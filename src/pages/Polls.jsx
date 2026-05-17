import PollCard from '../components/PollCard'

function Polls(props) {
  return (
    <main className="polls-page">
      <h2>Aktív szavazások</h2>

      {props.polls.length === 0 ? (
        <p className="empty-text">
          Jelenleg nincs aktív szavazás.
        </p>
      ) : (
        <div className="polls-container">
          {props.polls.map((poll) => (
            <PollCard
              key={poll.id}
              question={poll.question}
              options={poll.options}
            />
          ))}
        </div>
      )}
    </main>
  )
}

export default Polls
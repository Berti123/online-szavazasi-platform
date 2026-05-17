function PollCard({ poll, onDelete }) {
  return (
    <div className="poll-card">
      <h2>{poll.title}</h2>
      <p>{poll.description}</p>

      <div className="poll-card-actions">
        <a href={`/polls/${poll.id}`} className="button">
          Szavazás megnyitása
        </a>

        <button
          className="delete-button"
          onClick={() => onDelete(poll.id)}
        >
          Törlés
        </button>
      </div>
    </div>
  )
}

export default PollCard
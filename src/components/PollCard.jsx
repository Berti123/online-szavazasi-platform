function PollCard(props) {
  return (
    <div className="poll-card">
      <h3>{props.question}</h3>

      <div className="vote-options">
        {props.options.map((option, index) => (
          <button key={index} className="vote-option">
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}

export default PollCard
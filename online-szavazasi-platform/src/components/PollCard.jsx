import { useState } from 'react'

function PollCard(props) {
  const [selectedOption, setSelectedOption] = useState(null)
  const [submittedVote, setSubmittedVote] = useState(null)

  function handleVoteSubmit() {
    if (selectedOption !== null) {
      setSubmittedVote(selectedOption)
    }
  }

  return (
    <div className="poll-card">
      <h3>{props.question}</h3>

      <div className="vote-options">
        {props.options.map((option, index) => (
          <button
            key={index}
            className={
              selectedOption === option
                ? 'vote-option selected'
                : 'vote-option'
            }
            onClick={() => setSelectedOption(option)}
            disabled={submittedVote !== null}
          >
            {option}
          </button>
        ))}
      </div>

      {submittedVote === null && (
        <button className="submit-vote-button" onClick={handleVoteSubmit}>
          Szavazat leadása
        </button>
      )}

      {submittedVote !== null && (
        <p className="selected-text">
          Sikeres szavazás: {submittedVote}
        </p>
      )}
    </div>
  )
}

export default PollCard
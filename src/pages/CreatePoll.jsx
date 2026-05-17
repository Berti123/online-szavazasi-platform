import { useState } from 'react'

function CreatePoll(props) {
  const [question, setQuestion] = useState('')
  const [optionOne, setOptionOne] = useState('')
  const [optionTwo, setOptionTwo] = useState('')
  const [optionThree, setOptionThree] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')


function handleSubmit(event) {
  event.preventDefault()

  if (!question || !optionOne || !optionTwo || !optionThree) {
    setErrorMessage('Minden mező kitöltése kötelező!')
    setSuccessMessage('')
    return
  }

  const newPoll = {
    id: Date.now(),
    question: question,
    options: [optionOne, optionTwo, optionThree]
  }

  props.addPoll(newPoll)

  setSuccessMessage('A szavazás sikeresen létrejött!')
  setErrorMessage('')

  setQuestion('')
  setOptionOne('')
  setOptionTwo('')
  setOptionThree('')
}


  return (
    <main className="create-poll-page">
      <h2>Új szavazás létrehozása</h2>

      <form className="create-poll-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Szavazás kérdése"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
        />

        <input
          type="text"
          placeholder="1. válaszlehetőség"
          value={optionOne}
          onChange={(event) => setOptionOne(event.target.value)}
        />

        <input
          type="text"
          placeholder="2. válaszlehetőség"
          value={optionTwo}
          onChange={(event) => setOptionTwo(event.target.value)}
        />

        <input
          type="text"
          placeholder="3. válaszlehetőség"
          value={optionThree}
          onChange={(event) => setOptionThree(event.target.value)}
        />

        <button type="submit">Szavazás létrehozása</button>
      </form>

      {successMessage && <p className="selected-text">{successMessage}</p>}
      {errorMessage && <p className="error-text">{errorMessage}</p>}
      {successMessage && <p className="selected-text">{successMessage}</p>}
    </main>
  )
}

export default CreatePoll
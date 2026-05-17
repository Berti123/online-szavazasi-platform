import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function CreatePoll() {
  const navigate = useNavigate()

  const [question, setQuestion] = useState('')
  const [optionOne, setOptionOne] = useState('')
  const [optionTwo, setOptionTwo] = useState('')
  const [optionThree, setOptionThree] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()

    if (!question || !optionOne || !optionTwo || !optionThree) {
      setErrorMessage('Minden mező kitöltése kötelező!')
      setSuccessMessage('')
      return
    }

    try {
      const response = await fetch('http://127.0.0.1:5000/polls', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: question,
          description: 'Felhasználó által létrehozott szavazás',
          options: [optionOne, optionTwo, optionThree],
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setErrorMessage(data.error)
        setSuccessMessage('')
        return
      }

      setSuccessMessage(data.message)
      setErrorMessage('')

      setQuestion('')
      setOptionOne('')
      setOptionTwo('')
      setOptionThree('')

      navigate('/polls')
    } catch (error) {
      setErrorMessage('Hiba történt a szavazás létrehozása közben.')
      setSuccessMessage('')
      console.error(error)
    }
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
    </main>
  )
}

export default CreatePoll
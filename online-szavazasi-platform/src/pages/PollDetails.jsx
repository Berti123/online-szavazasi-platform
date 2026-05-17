import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function PollDetails() {
  const { id } = useParams();
  const [poll, setPoll] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/polls/${id}`)
      .then((response) => response.json())
      .then((data) => setPoll(data))
      .catch((error) => console.error("Hiba a szavazás lekérésekor:", error));
  }, [id]);

  if (!poll) {
    return <main className="page">Betöltés...</main>;
  }

  async function Vote(option) {
  try {
    const response = await fetch("http://127.0.0.1:5000/votes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        poll_id: poll.id,
        selected_option: option,
      }),
    });

    const data = await response.json();

    alert(data.message);
    navigate(`/polls/${poll.id}/results`);
  } catch (error) {
    console.error("Hiba szavazás közben:", error);
  }
}

  return (
    <main className="page">
      <h1>{poll.title}</h1>
      <p>{poll.description}</p>

      <div className="option-list">
        {poll.options.map((option, index) => (
            <button
                key={index}
                className="button"
                onClick={() => Vote(option)}
            >
                    {option}
            </button>
        ))}
      </div>
    </main>
  );
}

export default PollDetails;
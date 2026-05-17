import { useEffect, useState } from "react";
import PollCard from "../components/PollCard";

function Polls() {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/polls")
      .then((response) => response.json())
      .then((data) => setPolls(data))
      .catch((error) => console.error("Hiba a szavazások lekérésekor:", error));
  }, []);


  async function DeletePoll(id) {
  const confirmDelete = confirm("Biztosan törölni szeretnéd ezt a szavazást?")

  if (!confirmDelete) {
    return
  }

  try {
    const response = await fetch(`http://127.0.0.1:5000/polls/${id}`, {
      method: "DELETE",
    })

    const data = await response.json()

    if (!response.ok) {
      alert(data.error)
      return
    }

    setPolls(polls.filter((poll) => poll.id !== id))
  } catch (error) {
    console.error("Hiba törlés közben:", error)
  }
}

  return (
    <main className="page">
      <h1>Aktív szavazások</h1>

      <div className="poll-list">
        {polls.map((poll) => (
          <PollCard key={poll.id} poll={poll} onDelete={DeletePoll}/>
        ))}
      </div>
    </main>
  );
}

export default Polls;
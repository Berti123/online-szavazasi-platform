import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function PollResults() {
  const { id } = useParams();
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/polls/${id}/results`)
      .then((response) => response.json())
      .then((data) => setResults(data))
      .catch((error) => console.error("Hiba az eredmények lekérésekor:", error));
  }, [id]);

  return (
    <main className="page">
      <h1>Szavazás eredményei</h1>

      <div className="result-list">
        {results.length === 0 ? (
          <p>Még nincs leadott szavazat.</p>
        ) : (
          results.map((result, index) => (
            <div key={index} className="poll-card">
              <h2>{result.selected_option}</h2>
              <p>Szavazatok száma: {result.vote_count}</p>
            </div>
          ))
        )}
      </div>
    </main>
  );
}

export default PollResults;
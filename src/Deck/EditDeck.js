import { Link, useParams, useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { readDeck, updateDeck } from "../utils/api/index";

export default function EditDeck() {
  const initialState = {
    id: "",
    name: "",
    description: "",
    cards: [],
  };

  const params = useParams();
  const [deck, setDeck] = useState(initialState);
  let history = useHistory();

  useEffect(() => {
    async function loadDeck() {
      const deckFromAPI = await readDeck(params.deckId);
      setDeck(deckFromAPI);
    }
    loadDeck();
  }, [params.deckId]);

  function handleChange({ target }) {
    setDeck({
      ...deck,
      [target.name]: target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    await updateDeck(deck);
    history.push(`/decks/${deck.id}`);
  }

  return (
    <div>
      <div>
        <nav>
          <ol>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>{deck.name}</li>
            <li>Edit Deck</li>
          </ol>
        </nav>
      </div>

      <div>
        <h1>Edit Deck</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder={deck.name}
              onChange={handleChange}
              value={deck.name}
            />
          </div>
          <div>
            <label>Description</label>
            <textarea
              id="description"
              placeholder="Brief Description of the Deck"
              name="description"
              onChange={handleChange}
              value={deck.description}
            ></textarea>
          </div>
          <button type="cancel" onClick={() => history.push("/")}>
            Cancel
          </button>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

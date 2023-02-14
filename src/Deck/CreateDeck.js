import React, { useState } from "react";
import { createDeck } from "../utils/api/index";
import { Link, useHistory } from "react-router-dom";

export default function CreateDeck({ decks, setDecks }) {
  const initialDeckState = {
    id: decks.length + 1,
    name: "",
    description: "",
  };

  const [deck, setDeck] = useState(initialDeckState);
  let history = useHistory();

  function handleChange({ target }) {
    setDeck({
      ...deck,
      [target.name]: target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    await createDeck(deck);
    setDecks([...decks, deck]);
    setDeck(initialDeckState);
    history.push(`/decks/${decks.length + 1}`);
  }
  return (
    <div>
      {/* nav bar */}
      <nav>
        <ol>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>Create Deck</li>
        </ol>
      </nav>

      <div>
        <h1>Create Deck</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Deck Name"
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

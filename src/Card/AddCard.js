import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { readDeck, createCard } from "../utils/api/index";

export default function AddCard() {
  const initialCardState = {
    id: "",
    front: "",
    back: "",
    deckId: "",
  };
  const initialDeckState = {
    id: "",
    name: "",
    description: "",
    cards: [],
  };
  const params = useParams();
  const [card, setCard] = useState(initialCardState);
  const [deck, setDeck] = useState(initialDeckState);
  let history = useHistory();

  useEffect(() => {
    async function loadDeck() {
      const deckFromAPI = await readDeck(params.deckId);
      setDeck(deckFromAPI);
    }
    loadDeck();
  }, [params.deckId]);

  function handleChange({ target }) {
    setCard({
      ...card,
      [target.name]: target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    await createCard(params.deckId, card);
    setCard(initialCardState);
  }

  return (
    <div>
      {/* this div is for nav bar */}
      <div>
        <nav>
          <ol>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>{deck.name}</li>
            <li>Add Card</li>
          </ol>
        </nav>
      </div>
      {/* this div is for the form tag */}
      <div>
        <h1>Add Card</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Front</label>
            <textarea
              id="front"
              name="front"
              placeholder={card.front}
              onChange={handleChange}
              value={card.front}
            ></textarea>
          </div>
          <div>
            <label>Back</label>
            <textarea
              id="back"
              name="back"
              placeholder={card.back}
              onChange={handleChange}
              value={card.back}
            ></textarea>
          </div>
          <button
            type="cancel"
            onClick={() => history.push(`/decks/${params.deckId}`)}
          >
            Done
          </button>
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
}

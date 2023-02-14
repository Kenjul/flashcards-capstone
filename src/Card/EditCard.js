import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { updateCard, readDeck, readCard } from "../utils/api";

export default function EditCard() {
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

  // load the deck data
  useEffect(() => {
    async function loadDeck() {
      const deckFromAPI = await readDeck(params.deckId);
      setDeck(deckFromAPI);
    }
    loadDeck();
  }, [params.deckId]);

  // load the card data
  useEffect(() => {
    async function loadCard() {
      const cardFromAPI = await readCard(params.cardId);
      setCard(cardFromAPI);
    }
    loadCard();
  }, [params.cardId]);

  async function handleSubmit(event) {
    event.preventDefault();
    await updateCard(card);
    history.push(`/decks/${deck.id}`);
  }

  function handleChange({ target }) {
    setCard({
      ...card,
      [target.name]: target.value,
    });
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
            <li>EditCard {card.id}</li>
          </ol>
        </nav>
      </div>
      {/* this div is for the form tag */}
      <div>
        <h1>EditCard {card.id}</h1>
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
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

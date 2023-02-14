import { Link, useParams, useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { readDeck, deleteCard, deleteDeck } from "../utils/api";

export default function Deck({ setDecks }) {
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

  async function handleCardDelete(cardId) {
    if (
      window.confirm("Delete this Card? You will not be able to recover it.")
    ) {
      await deleteCard(cardId);
      const newCards = deck.cards.filter((card) => card.id !== cardId);
      setDeck({ ...deck, cards: newCards });
    } else {
      return null;
    }
  }

  async function handleDeckDelete(deckId) {
    await deleteDeck(deckId);
    setDecks((currentDecks) =>
      currentDecks.filter((deck) => deck.id !== deckId)
    );
    history.push("/");
  }

  return (
    <div>
      {/* nav bar */}
      <div>
        <nav>
          <ol>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>{deck.name}</li>
          </ol>
        </nav>
      </div>
      {/* deck info */}
      <div>
        <h3>{deck.name}</h3>
        <p>{deck.description}</p>
        <Link to={`/decks/${deck.id}/edit`}>Edit</Link>
        <Link to={`/decks/${deck.id}/study`}>Study</Link>
        <Link to={`/decks/${deck.id}/cards/new`}>Add Cards</Link>
        <button type="delete" onClick={() => handleDeckDelete(deck.id)}>
          Delete
        </button>
        <h2>Cards</h2>
        {deck.cards.map((card, index) => {
          return (
            <div>
              <div>
                <p>{card.front}</p>
                <p>{card.back}</p>
                <Link to={`/decks/${deck.id}/cards/${card.id}/edit`}>Edit</Link>
                <button type="delete" onClick={() => handleCardDelete(card.id)}>
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteDeck, listDecks } from "../utils/api/index";

export default function Home() {
  const [decks, setDecks] = useState([]);
  // make a delete handler to serve as a onClick later
  async function handleDelete(deckId) {
    // use the function from api directory
    await deleteDeck(deckId);
    // use the prop setDecks and filter the deckIds to match
    setDecks((currentDecks) =>
      currentDecks.filter((deck) => deck.id !== deckId)
    );
  }
  // everytime setDecks is changed, this useEffect happens
  // AbortController is needed
  useEffect(() => {
    const abortController = new AbortController();
    async function loadDecks() {
      try {
        const decksData = await listDecks(abortController.signal);
        setDecks(decksData);
      } catch (e) {
        if (e.name === "AbortError") {
          console.log("Aborted");
        } else {
          throw e;
        }
      }
    }
    loadDecks();
  }, [setDecks]);

  return (
    <div>
      {/* button that links to the correct path */}
      <Link to="/decks/new">
        <button type="button">Create Deck</button>
      </Link>
      {/* also returning the decks here */}
      {decks.map((deck) => {
        return (
          <div>
            <div key={deck.id}>
              <h5>{deck.name}</h5>
              <p>{deck.description}</p>
              <p>{deck.cards.length} cards</p>
              <Link to={`/decks/${deck.id}`}>View</Link>
              <Link to={`/decks/${deck.id}/study`}>Study</Link>
              {/* use the onClick and pass through the delete handler for the appropriate button */}
              <button onClick={() => handleDelete(deck.id)}>Delete</button>
            </div>
          </div>
        );
        
      })}
    </div>
  );
}

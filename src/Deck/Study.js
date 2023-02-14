import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { readDeck } from "../utils/api/index";

export default function Study() {
  let history = useHistory();
  const { deckId } = useParams();
  const [deck, setDeck] = useState({ cards: [] });
  const [index, setIndex] = useState(0);
  const [flip, setFlip] = useState(false);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    const abortController = new AbortController();
    async function loadDeck() {
      try {
        const deckFromAPI = await readDeck(deckId, abortController.signal);
        setDeck(deckFromAPI);
      }
      catch(e){
        setError(e);
      }
    }
    loadDeck();
    return () => abortController.abort();
  }, [deckId]);
  
  function handleFlip() {
    setFlip(prevState => !prevState)
  }

  function handleNext() {
    if (index === deck.cards.length - 1) {
      const result = window.confirm("Do you want to restart the deck?");
      if (result) {
        setIndex(0);
      }
    } else {
      setIndex(index + 1);
    }
    setFlip((prevState) => !prevState);
  }
  // if cards in the deck aren't enough then display this
  // if not, ignore this and move on to the final return statement
  if (deck) {
    return (
      <div>
        {/* nav bar */}
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item" aria-current="page"><a href={`/decks/${deck.id}`}>{deck.name}</a></li>
            <li className="breadcrumb-item-active" aria-current="page">Study</li>
          </ol>
        </nav>
        <h1>Study: {deck.name}</h1>
        <div className="col-sm-12">
          {deck.cards.length > 2 ? (
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">
                  Card {index + 1} of {deck.cards.length}
                </h5>
                <p className="card-text">
                  {!flip
                    ? `${deck.cards[index].front}`
                    : `${deck.cards[index].back}`}
                </p>
                <button className="btn btn-secondary m-2" onClick={handleFlip}>
                  Flip
                </button>
                {flip && (
                  <button
                    className="btn btn-primary float-right"
                    onClick={handleNext}
                  >
                    Next
                  </button>
                )}
              </div>
        </div> ) : (
          <div>
            <h3>Not enough cards.</h3>
            <p>
                You need at least 3 cards to study. There are{" "}
                {deck.cards.length} cards in this deck.
              </p>
            <Link to={`/decks/${deck.id}/cards/new`} className="btn btn-primary">
              <button type="button">Add Cards</button>
            </Link>
        </div>
    )}
        </div>
        </div>
      );
  }

}

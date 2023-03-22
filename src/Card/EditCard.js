import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { updateCard, readDeck, readCard } from "../utils/api";
import Form from "./Form";

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

  const title = `Edit Card ${card.id}`;
  const buttonOne = "Cancel";
  const buttonTwo = "Submit";

  return (
    <Form
      card={card}
      deck={deck}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      params={params}
      title={title}
      buttonOne={buttonOne}
      buttonTwo={buttonTwo}
    />
  );
}

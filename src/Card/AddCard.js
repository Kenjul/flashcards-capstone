import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { readDeck, createCard } from "../utils/api/index";
import Form from "./Form";

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

  const title = "Add Card";
  const buttonOne = "Done";
  const buttonTwo = "Save";

  return (
    <Form
      card={card}
      deck={deck}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      params={params}
      history={history}
      title={title}
      buttonOne={buttonOne}
      buttonTwo={buttonTwo}
    />
  );
}


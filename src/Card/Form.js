import { Link, useHistory } from "react-router-dom";
import React from "react";

export default function Form({
    handleSubmit,
    handleChange,
    deck,
    card,
    params,
    title,
    buttonOne,
    buttonTwo,
}) {
    let history = useHistory();
  
    return (
      <>
        <div>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item text-primary">{deck.name}</li>
              <li className="breadcrumb-item text-secondary">{title}</li>
            </ol>
          </nav>
        </div>
        <div>
          <h1 className="text-white">{title}</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="front" className="text-white">Front</label>
              <textarea
                className="form-control"
                id="front"
                name="front"
                placeholder={card.front}
                rows="3"
                onChange={handleChange}
                value={card.front}
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="back" className="text-white">Back</label>
              <textarea
                className="form-control"
                id="back"
                placeholder={card.back}
                rows="3"
                name="back"
                onChange={handleChange}
                value={card.back}
              ></textarea>
            </div>
            <button
              type="cancel"
              className="btn btn-secondary"
              onClick={() => history.push(`/decks/${params.deckId}`)}
            >
              {buttonOne}
            </button>
            <button type="submit" className="btn btn-primary">
              {buttonTwo}
            </button>
          </form>
        </div>
      </>
    );
  }
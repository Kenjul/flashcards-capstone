import React, { useEffect, useState } from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import Study from "../Deck/Study";
import CreateDeck from "../Deck/CreateDeck";
import Deck from "../Deck/Deck";
import EditDeck from "../Deck/EditDeck";
import AddCard from "../Card/AddCard";
import EditCard from "../Card/EditCard";
import { listDecks } from "../utils/api";

function Layout() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    async function loadDecks() {
      try {
        const decksData = await listDecks(abortController.signal);
        setDecks(decksData);
      } catch (e) {
        if (e.name !== "AbortError") {
          throw e;
        }
      }
    }
    loadDecks();
    return () => abortController.abort();
  }, []);

  return (
    <div>
      <Header />
      <div className="container">
        {/* Order the Routes correctly while making sure exact path for / is true */}
        {/* Each Route generally speaking if it's a longer path while having paths that overlap/be similar to one another, make sure to order them appropriately or it won't work */}
        <Switch>
          <Route exact path="/">
            <Home decks={decks} setDecks={setDecks} />
          </Route>

          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>

          <Route path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>

          <Route path="/decks/:deckId/study">
            <Study />
          </Route>

          <Route path="/decks/:deckId/edit">
            <EditDeck />
          </Route>

          <Route path="/decks/new">
            <CreateDeck decks={decks} setDecks={setDecks} />
          </Route>

          <Route path="/decks/:deckId">
            <Deck setDecks={setDecks} />
          </Route>

          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Layout;

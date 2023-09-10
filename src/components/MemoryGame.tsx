import { useEffect, useMemo, useState } from "react";
import Card from "./Card";
import shuffleArray from "../misc/shuffle";
import "./MemoryGame.css";

interface Props {
  deckSize: number;
}

function MemoryGame({ deckSize }: Props) {
  //  Functions
  // ============

  // Create shuffled cards
  function createDeck() {
    let cards: number[] = [];

    for (let i = 0; i < Math.floor(deckSize / 2); i++) {
      cards.push(i + 1);
      cards.push(i + 1);
    }

    return cards;
  }

  function resetVisibility() {
    setVisibleCards(cards.map((_) => false));
    setNumberVisible(0);
    setIsEvaluationPending(false);
  }

  // Check if we have a match
  function checkPair() {
    if (selectedCards.length != 2) return;

    if (cards[selectedCards[0]] === cards[selectedCards[1]]) {
      console.log("Mamy parę!");

      let collectedCardsCopy = collectedCards;

      collectedCardsCopy[selectedCards[0]] = true;
      collectedCardsCopy[selectedCards[1]] = true;
      setCollectedCards([...collectedCardsCopy]);

      console.log(`Number collected: ${numberCollected}`);

      if (numberCollected == deckSize - 2) {
        console.log("Nowa gra!");
        setIsPlaying(false);
      }
    } else {
      console.log("Nietrafione");
    }

    setSelectedCards([]);
  }

  // Handle the selection of a card
  function onSelectCard(id: number) {
    // Kliknęliśmy w już odkrytą kartę
    if (visibleCards[id]) return;

    let selectedCardsCopy = selectedCards;
    selectedCardsCopy.push(id);
    setSelectedCards([...selectedCardsCopy]);

    setNumberVisible((prev) => prev + 1);

    // Dlaczego kurde? Dlaczego tak działą a dla ==2 nie działa?
    if (numberVisible == 1) {
      setIsEvaluationPending(true);
      checkPair();
      setTimeout(resetVisibility, 500);
    }

    console.log(`Number of visible cards: ${numberVisible}`);

    let visibleCardsCopy = visibleCards;
    visibleCardsCopy[id] = !visibleCardsCopy[id];

    setVisibleCards([...visibleCardsCopy]);
  }

  function resetGame() {
    let deck = createDeck();
    setIDs([...deck.map((_, id) => id)]);
    shuffleArray(deck);

    setCards(deck);
    setSelectedCards([]);
    setNumberVisible(0);
    setIsEvaluationPending(false);
    setVisibleCards(deck.map((_) => false));
    setCollectedCards(deck.map((_) => false));
    setIsPlaying(true);
  }

  const [isPlaying, setIsPlaying] = useState(true);

  // Run the deck creation only once
  useEffect(() => {
    resetGame();
  }, [isPlaying]);

  //  Variables
  // ===========

  const [cards, setCards] = useState<number[]>([]);
  const [IDs, setIDs] = useState<number[]>([]);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [numberVisible, setNumberVisible] = useState(0);
  const [isEvaluationPending, setIsEvaluationPending] = useState(false);
  const [visibleCards, setVisibleCards] = useState(cards.map((_) => false));
  const [collectedCards, setCollectedCards] = useState(cards.map((_) => false));

  const numberCollected = useMemo(
    () => collectedCards.filter(Boolean).length,
    [collectedCards]
  );

  return (
    <div className="grid-cols-4 grid gap-1 m-auto auto-rows-fr gameWindow">
      {cards.map((number, id) => (
        <Card
          cardValue={number}
          cardPlace={id}
          cardVisibility={visibleCards[id]}
          isCardCollected={collectedCards[id]}
          isEvaluationPending={isEvaluationPending}
          key={IDs[id]}
          onSelect={onSelectCard}
        />
      ))}
    </div>
  );
}

export default MemoryGame;

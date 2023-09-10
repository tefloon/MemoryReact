interface Props {
  cardValue: number;
  cardPlace: number;
  cardVisibility: boolean;
  isCardCollected: boolean;
  isEvaluationPending: boolean;
  onSelect: (clickedCardPlace: number) => void;
}

function Card({
  cardValue,
  cardPlace,
  cardVisibility,
  isCardCollected,
  isEvaluationPending,
  onSelect,
}: Props) {
  function handleClicked(): void {
    if (isCardCollected) return;
    if (isEvaluationPending) return;

    onSelect(cardPlace);
  }

  function setHiddenCardClass() {
    if (isCardCollected) {
      setTimeout(() => " invisible cursor-default", 700);
      return "transition ease-in-out opacity-0 duration-700";
    } else {
      return "cursor-pointer";
    }
  }

  return (
    <div
      onClick={handleClicked}
      className={
        "text-6xl bg-white flex justify-center items-center min-h-[60px] min-w-[40px] " +
        setHiddenCardClass()
      }
    >
      <div>{cardVisibility && cardValue}</div>
      {/* <div className="text-sm">{cardVisibility.toString()}</div> */}
    </div>
  );
}

export default Card;

import React, { useState, useEffect, useRef } from "react";
import OpenCard from "./OpenCard";
import { v4 } from "uuid";
function ListContainer(props) {
  let mainCardContainerRef = useRef();
  let editListTitleRef = useRef(null);
  let cardEditTitleContainerRef = useRef(null);
  let cardInputRef = useRef(null);

  const [addCard, setAddCard] = useState({
    title: "",
  });
  const [editCardTitle, setEditCardTitle] = useState({
    title: "",
  });
  const [cards, setCards] = useState([]);
  const [editCard, setEditCard] = useState(null);
  const [pencilIcon, setPencilIcon] = useState(null);
  const [openCard, setOpenCard] = useState(null);
  const [listTitle, setListTitle] = useState(null);

  // SAVE EDITED LIST TITLE
  const saveEditedListTitle = (e) => {
    e.preventDefault();
    const editedValue = {
      title: props.editListTitle,
    };

    const newListArr = [...props.lists];
    const index = props.lists.findIndex((_, i) => i === props.id);
    newListArr[index] = editedValue;
    props.setLists(newListArr);
    props.setEditList(null);
    props.setMoreIcon(false);
  };

  // ON CLICK SAVE EDITED CARD TITLE
  const onClickSaveEditedCardTitle = (e, id) => {
    e.preventDefault();
    const editedValue = {
      title: editCardTitle.title,
    };

    const newCardArr = [...cards];
    const index = cards.findIndex((_, i) => i === id);
    newCardArr[index] = editedValue.title;
    setCards(newCardArr);
    setEditCard(null);
  };

  // ON KEY PRESS SAVE EDITED CARD TITLE
  const onKeySaveEditedCardTitle = (e, id) => {
    const key = e.key;

    if (key === "Enter") {
      e.preventDefault();
      const editedValue = {
        title: editCardTitle.title,
      };

      const newCardArr = [...cards];
      const index = cards.findIndex((_, i) => i === id);
      newCardArr[index] = editedValue.title;
      setCards(newCardArr);
      setEditCard(null);
      return true;
    }
  };

  // HANDLE CHANGE CARD INPUT
  const onChangeCardTitle = (e, id) => {
    const { value, name } = e.target;
    setAddCard((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  // HANDLE CLICK PENCIL ICON
  const onClickPencilIcon = (e, id, card) => {
    setEditCard(id);
    props.setListOption(null);
    props.setIcons(null);
    editCardTitle.title = card;
  };

  // ADD CARD
  const onClickAddCard = (e) => {
    if (addCard.title.length !== 0) {
      setCards((prevCard) => {
        return [...prevCard, addCard.title];
      });
    } else {
      setCards((prevCard) => {
        return [...prevCard];
      });
    }
    addCard.title = "";
  };

  //HANDLE CLICK DISCARD CARD TITLE INPUT
  const onClickDiscardCard = (e, id) => {
    props.setCardInput(null);
    addCard.title = "";
  };

  // HANDLE CLICK OPEN CARD BUTTON
  const clickOpenCard = (e, id, list) => {
    e.preventDefault();
    setOpenCard(id);
    setListTitle(list.title);
    setEditCard(null);
  };

  // HANDLE CLICK CARD TITLE CONTAINER
  const onClickCardTitleContainer = (e, id, card, list) => {
    e.preventDefault();
    const link = e.target;
    const cardTitle = link.getAttribute("name");
    const cardTitleContainer = link.getAttribute("name");
    props.setEditList(null);
    props.setMoreIcon(false);
    props.setListOption(null);
    props.setIcons(null);

    if (
      cardTitle === "card-title" ||
      cardTitleContainer === "card_title_container"
    ) {
      setOpenCard(id);
      setListTitle(list.title);
      editCardTitle.title = card;
    }
  };

  // DELETE CARD
  const clickDeleteCard = (e, id) => {
    setCards((prevCard) => {
      return prevCard.filter((_, i) => {
        return i !== id;
      });
    });

    setEditCard(null);
  };

  //DISCARD CARD TITLE INPUT CHANGES
  useEffect(() => {
    let handleClick = (e) => {
      if (!mainCardContainerRef.current.contains(e.target)) {
        setEditCard(null);
        setPencilIcon(null);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  // HANDLE CHANGE EDIT CARD INPUT
  const onChangeEditCardTitle = (e) => {
    const { value, name } = e.target;

    setEditCardTitle((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  // HANDLE HOVER CARD TITLE CONTAINER
  const hoverCardTitleContainer = (e, id) => {
    setPencilIcon(id);
  };

  useEffect(() => {
    const editListTitle = document.querySelectorAll(`.edit-list-title`);

    let handleKeyUp = (e) => {
      e.preventDefault();
      editListTitle.forEach((elt) => {
        elt.style.height = `50px`;
        let height = e.target.scrollHeight;
        elt.style.height = `${height}px`;
      });
    };

    editListTitle.forEach((elt) => {
      elt.addEventListener("keyup", handleKeyUp);

      return () => {
        elt.removeEventListener("keyup", handleKeyUp);
      };
    });
  });

  const onKeySaveEditedListTitle = (e) => {
    const key = e.key;
    if (key === "Enter") {
      e.preventDefault();
      const editedValue = {
        title: props.editListTitle,
      };

      const newListArr = [...props.lists];
      const index = props.lists.findIndex((_, i) => i === props.id);
      newListArr[index] = editedValue;
      props.setLists(newListArr);
      props.setEditList(null);
      props.setMoreIcon(false);
    }
  };

  useEffect(() => {
    let handleClick = (e) => {
      if (
        editListTitleRef.current &&
        !editListTitleRef.current.contains(e.target)
      ) {
        props.setEditList(null);
        props.setMoreIcon(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  });

  useEffect(() => {
    let handleClick = (e) => {
      if (
        cardEditTitleContainerRef.current &&
        !cardEditTitleContainerRef.current.contains(e.target)
      ) {
        setEditCard(null);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  });

  useEffect(() => {
    let handleClick = (e) => {
      if (cardInputRef.current && !cardInputRef.current.contains(e.target)) {
        props.setCardInput(null);
        setAddCard({
          title: "",
        });
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  });

  // const useOutsideAlerter = (ref) => {
  //   useEffect(() => {
  //     let handleClick = (e) => {
  //       if (ref.current && !ref.current.contains(e.target)) {
  //         props.setEditList(null);
  //         props.setMoreIcon(false);
  //       }
  //     };

  //     document.addEventListener("mousedown", handleClick);
  //     return () => {
  //       document.removeEventListener("mousedown", handleClick);
  //     };
  //   }, [ref]);
  // };

  // useOutsideAlerter(editListTitleRef);
  // useOutsideAlerter(cardInputRef)

  return (
    <div className={`list__main__container`}>
      <div className="list_container">
        <div className="list_title_container">
          {props.editList === props.id ? (
            <div className="list_input_container" ref={editListTitleRef}>
              <textarea
                className="edit-list-title"
                type="text"
                name="title"
                value={props.editListTitle}
                onChange={(e) => props.editListChange(e, props.id)}
                onKeyDown={(e) => onKeySaveEditedListTitle(e, props.id)}
                autoFocus
              />
              <button onClick={(e) => saveEditedListTitle(e)}>
                <span>Save</span>
              </button>
            </div>
          ) : (
            <h1
              className="list-title"
              onClick={(e) => props.showEditList(e, props.id, props.list)}
            >
              {props.title}
            </h1>
          )}
          {props.icons === props.id ? (
            <img
              src={require("../images/close.png")}
              alt="close-icon"
              className={`list-icons close-icon`}
              onClick={(e) => props.hideOption(e, props.id)}
            />
          ) : (
            <img
              src={require("../images/more.png")}
              alt="more-icon"
              className={`list-icons more-icon ${
                props.moreIcon === props.id ? `inactive` : `active`
              }`}
              onClick={(e) => props.showOption(e, props.id)}
            />
          )}
        </div>
        <div
          className={`list_more_option_container
          ${props.listOption === props.id ? `show` : `hidden`}`}
        >
          <ul>
            <div className="list_option_container">
              <li>Add card</li>
              <img
                className={`list-option-icons`}
                src={require("../images/card.png")}
                alt="card-icon"
              />
            </div>
            <div
              className="list_option_container"
              onClick={(e) => props.deleteList(e, props.id)}
            >
              <li>Delete</li>
              <img
                className={`list-option-icons`}
                src={require("../images/trash.png")}
                alt="delete-icon"
              />
            </div>
          </ul>
        </div>
        <div className={`card__main__container`} ref={mainCardContainerRef}>
          {cards.map((card, i) => (
            <div className={`card_container`} key={i}>
              {editCard === i ? (
                <div
                  className="card_edit_title_container"
                  ref={cardEditTitleContainerRef}
                >
                  <textarea
                    className="edit-card-title"
                    type="text"
                    name="title"
                    value={editCardTitle.title}
                    onChange={onChangeEditCardTitle}
                    onKeyDown={(e) => onKeySaveEditedCardTitle(e, i)}
                    autoFocus
                  />
                  <div className={`card_more_option_container`}>
                    <ul className={`card_more_option_ul`}>
                      <div
                        className="card_option_container"
                        onClick={(e) => clickOpenCard(e, i, props.list)}
                      >
                        <img
                          className={"card-option-icons"}
                          src={require("../images/open-card.png")}
                          alt="card-icon"
                        />
                        <li>Open Card</li>
                      </div>
                      <div
                        className="card_option_container"
                        onClick={(e) => clickDeleteCard(e, i)}
                      >
                        <img
                          className={"card-option-icons"}
                          src={require("../images/trash.png")}
                          alt="delete-icon"
                        />
                        <li>Delete</li>
                      </div>
                    </ul>
                  </div>
                  <button
                    className="save-card-title-btn"
                    onClick={(e) => onClickSaveEditedCardTitle(e, i)}
                  >
                    <span>Save</span>
                  </button>
                </div>
              ) : (
                <div
                  className={`card_title_container`}
                  name="card_title_container"
                  onMouseEnter={(e) => hoverCardTitleContainer(e, i)}
                  onMouseLeave={() => setPencilIcon(!pencilIcon)}
                  onClick={(e) =>
                    onClickCardTitleContainer(e, i, card, props.list)
                  }
                >
                  <h1 className="card-title" name="card-title">
                    {card}
                  </h1>
                  <div className="pencil_icon_container">
                    <img
                      className={`pencil-icon ${
                        pencilIcon === i ? `show` : `hidden`
                      }`}
                      src={require("../images/pencil.png")}
                      alt="pencil-icon"
                      onClick={(e) => onClickPencilIcon(e, i, card)}
                    />
                  </div>
                </div>
              )}
              <OpenCard
                key={i}
                id={i}
                list={props.title}
                card={card}
                cards={cards}
                setCards={setCards}
                openCard={openCard}
                setOpenCard={setOpenCard}
                value={editCardTitle.title}
                onChangeEditCardTitle={onChangeEditCardTitle}
                listTitle={listTitle}
                setEditCardTitle={setEditCardTitle}
              />
            </div>
          ))}
          <div className="line"></div>
          {props.cardInput === props.id ? (
            <div className="card_input_container" ref={cardInputRef}>
              <input
                className={``}
                placeholder="Enter card"
                name="title"
                value={addCard.title}
                onChange={(e) => onChangeCardTitle(e, props.id)}
                autoFocus
              />
              <div className="card_input_button_container">
                <button
                  className="card-input-buttons add-card-btn"
                  onClick={(e) => onClickAddCard(e, props.id)}
                >
                  <span>Add card</span>
                </button>
                <button
                  className="card-input-buttons discard-card-btn"
                  onClick={(e) => onClickDiscardCard(e, props.id)}
                >
                  <span>Cancel</span>
                </button>
              </div>
            </div>
          ) : (
            <>
              <div
                className="add_a_card_container"
                onClick={(e) => props.clickAddCardContainer(e, props.id)}
              >
                <h1>Add a card</h1>
                <img
                  className="note-icon"
                  src={require("../images/note.png")}
                  alt="note-icon"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ListContainer;

/////////////////////

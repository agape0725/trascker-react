import React, { useState, useEffect, useRef, Fragment } from "react";
import ListContainer from "./ListContainer";
import { v4 } from "uuid";

export default function Board() {
  // FOR LIST //  // FOR LIST //  // FOR LIST //

  let inputListRef = useRef();
  const [addList, setAddList] = useState({
    title: "",
  });
  const [editListTitle, setEditListTitle] = useState({
    title: "",
  });
  const [lists, setLists] = useState([]);
  const [showInputList, setShowInputList] = useState(false);
  const [icons, setIcons] = useState(null);
  const [editList, setEditList] = useState(null);
  const [listOption, setListOption] = useState(null);
  const [moreIcon, setMoreIcon] = useState(null);
  const [cardInput, setCardInput] = useState(null);

  let HideInputList = (handler) => {
    let addListContainerRef = useRef();

    useEffect(() => {
      let bodyClicked = (e) => {
        const link = e.target;
        if (!addListContainerRef.current.contains(link)) {
          handler();
        }
      };

      document.addEventListener("mousedown", bodyClicked, true);
      return () => {
        document.removeEventListener("mousedown", bodyClicked, true);
      };
    }, []);

    return addListContainerRef;
  };

  // HANDLE CHANGE INPUT LIST
  const handleInputListChange = (e) => {
    e.preventDefault();
    const { value, name } = e.target;
    setAddList((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  // HANDLE CHANGE EDIT INPUT LIST
  const editListChange = (e) => {
    e.preventDefault();
    const { value, name } = e.target;
    setEditListTitle((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  // HANDLE CLICK ADD BUTTON TO ADD LIST
  const clickAddListButton = (e) => {
    if (addList.title.length !== 0) {
      setLists((prevList) => {
        return [...prevList, addList];
      });
      setAddList({
        title: "",
      });
    } else {
      setLists((prevList) => {
        return [...prevList];
      });
    }
  };

  // HANDLE CLICK SHOW INPUT LIST
  const handleShowInputListClick = (e) => {
    setShowInputList(true);
    inputListRef.current.focus();
  };

  // HANDLE CLICK BODY TO DISCARD INPUT LIST
  const addListContainerRef = HideInputList(() => {
    setShowInputList(false);
    setAddList({
      title: "",
    });
  });

  // HANDLE CLICK DISCARD BUTTON TO DISCARD INPUT LIST
  useEffect(() => {
    let discardListButtonClicked = (e) => {
      setShowInputList(false);
      setAddList({
        title: "",
      });
    };

    const discardBtn = document.querySelector(`.discard-list-btn`);
    discardBtn.addEventListener("mousedown", discardListButtonClicked, true);

    return () => {
      discardBtn.removeEventListener(
        "mousedown",
        discardListButtonClicked,
        true
      );
    };
  });

  // HANDLE CLICK SHOW EDIT LIST TITLE
  const showEditList = (e, id, list) => {
    setEditList(id);
    setEditListTitle(list);
    setMoreIcon(id);
    setIcons(null);
    setListOption(null);
  };

  // HANDLE CLICK SHOW MORE OPTION
  const showOption = (e, id) => {
    setIcons(id);
    setListOption(id);
  };

  // HANDLE CLICK HIDE MORE OPTION
  const hideOption = (e, id) => {
    setIcons(null);
    setListOption(null);
  };

  // HANDLE CLICK DELETE LIST
  const deleteList = (e, id) => {
    setLists((prevList) => {
      return prevList.filter((_, i) => {
        return id !== i;
      });
    });
    setIcons(null);
    setListOption(null);
  };

  // FOR CARD //  // FOR CARD //  // FOR CARD //  // FOR CARD //

  const clickAddCardContainer = (e, id) => {
    setCardInput(id);
  };

  return (
    <>
      <div id="main_board_container">
        <div className={`board_container`}>
          {lists.map((list, i) => (
            <div key={i}>
              <ListContainer
                key={i}
                id={i}
                list={list}
                lists={lists}
                title={list.title}
                setLists={setLists}
                icons={icons}
                setIcons={setIcons}
                editList={editList}
                setEditList={setEditList}
                showEditList={showEditList}
                showOption={showOption}
                hideOption={hideOption}
                listOption={listOption}
                deleteList={deleteList}
                editListTitle={editListTitle.title}
                editListChange={editListChange}
                moreIcon={moreIcon}
                setMoreIcon={setMoreIcon}
                cardInput={cardInput}
                setCardInput={setCardInput}
                clickAddCardContainer={clickAddCardContainer}
                setListOption={setListOption}
                uuid={v4()}
              />
            </div>
          ))}
          <div
            className={`add_list_container`}
            ref={addListContainerRef}
            onClick={(e) => handleShowInputListClick(e)}
          >
            <div className="visible_input_list">
              <img
                className="plus-icon"
                src={require("../images/plus.png")}
                alt="plus-icon"
              />
              <span>ADD LIST</span>
            </div>
            <div
              className={`hidden_input_list_container ${
                showInputList ? `visible` : `hidden`
              }`}
            >
              <input
                className="input-list"
                type="text"
                placeholder="Enter list"
                name="title"
                value={addList.title}
                onChange={handleInputListChange}
                ref={inputListRef}
              />
              <div className="hidden_input_button_container">
                <button
                  className={`input-btn add-list-btn`}
                  onClick={(e) => clickAddListButton(e)}
                >
                  ADD LIST
                </button>
                <button className={`input-btn discard-list-btn`}>CANCEL</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

///////////////////////////

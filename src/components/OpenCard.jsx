import React, { useState, useEffect, useRef } from "react";
import titleIcon from "../images/title-icon.png";
import descriptionIcon from "../images/description-icon.png";
import activityIcon from "../images/activity-icon.png";
import infoIcon from "../images/info.png";

function OpenCard(props) {
  let cardTitleRef = useRef(null);
  const [largeCardTitle, setLargeCardTitle] = useState(null);

  // DESCRIPTION VARIABLES

  const [addDescription, setAddDescription] = useState({
    description: "",
  });

  const [descriptionTextContainer, setDescriptionTextContainer] =
    useState(false);

  const [editDesriptionContainer, setEditDesriptionContainer] = useState(true);
  const [descriptions, setDescriptions] = useState([]);
  const [descriptionTextarea, setDescriptionTextarea] = useState(false);

  // ACTIVITY VARIABLES
  const [activityTextArea, setActivityTextArea] = useState(false);
  const [sendActivityBtn, setSendActivityBtn] = useState(false);
  const [sendActivityBtnDisable, setSendActivityBtnDisable] = useState(true);
  const [addActivity, setAddActivity] = useState({
    activity: "",
  });
  const [activities, setActivities] = useState([]);
  const [activitiesTab, setActivitiesTab] = useState(null);
  const [editActivityValue, setEditActivityValue] = useState({
    activity: "",
  });
  const [saveActivityBtnDisable, setSaveActivityBtnDisable] = useState(false);

  // CARD SECTION
  const clickCardTitle = (e, id) => {
    e.preventDefault();
    setLargeCardTitle(id);
  };

  let onClickSaveEditTitle = (e) => {
    e.preventDefault();
    const editedValue = {
      title: props.value,
    };

    const newListArr = [...props.cards];
    const index = props.cards.findIndex((_, i) => i === props.id);
    newListArr[index] = editedValue.title;
    props.setCards(newListArr);
    setLargeCardTitle(null);
  };

  const onClickCloseLargeCard = (e, id) => {
    props.setOpenCard(null);
  };

  // DESCRIPTION SECTION
  const onClickEditDescriptionButton = (value) => {
    setDescriptionTextContainer(false);
    setEditDesriptionContainer(true);
    addDescription.description = value.description;
  };

  const onChangeDescriptionTextArea = (e) => {
    const { value, name } = e.target;

    setAddDescription((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const onClickDescriptionTextArea = (id) => {
    setDescriptionTextarea(true);
    setDescriptionTextContainer(false);
    setEditDesriptionContainer(true);

    setDescriptions(() => {
      return [addDescription];
    });
  };

  const onClickSaveDescriptionTextArea = (id) => {
    setDescriptionTextContainer(true);
    setEditDesriptionContainer(false);
    setDescriptionTextarea(true);
    setDescriptions(() => {
      return [addDescription];
    });

    const editDescriptionText = document.querySelectorAll(
      `.edit-description-text`
    );

    if (addDescription.description.length <= 0) {
      setDescriptionTextContainer(false);
      setEditDesriptionContainer(true);
      setDescriptionTextarea(false);

      editDescriptionText.forEach((edt) => {
        edt.style.height = `100px`;
      });
    }
  };

  const onClickCancelDescriptionTextArea = (e) => {
    const link = e.target;
    const descriptionBodyContainer =
      link.parentElement.parentElement.parentElement;
    const mainDescriptionTextContainer = descriptionBodyContainer.children[0];
    const value = mainDescriptionTextContainer.children[0];

    const editDescriptionText = document.querySelectorAll(
      `.edit-description-text`
    );

    if (
      value.textContent.length === 0 &&
      addDescription.description.length >= 0
    ) {
      setDescriptionTextContainer(false);
      setEditDesriptionContainer(true);
      setDescriptionTextarea(false);
      editDescriptionText.forEach((edt) => {
        edt.style.height = `100px`;
      });
      addDescription.description = "";

      console.log("value length equals to 0, description length less than 0");
    } else if (value.textContent !== addDescription.description) {
      setDescriptionTextContainer(true);
      setEditDesriptionContainer(false);
      console.log("textcontent is not equal to description");
    } else if (value.textContent === addDescription.description) {
      setDescriptionTextContainer(true);
      setEditDesriptionContainer(false);
      console.log("textcontent is equal to description");
    }
  };

  const onClickDescriptionTextContainer = (id, value) => {
    setDescriptionTextContainer(false);
    setEditDesriptionContainer(true);
    addDescription.description = value.description;
  };

  useEffect(() => {
    const editDescriptionText = document.querySelectorAll(
      `.edit-description-text`
    );

    let onKeyUp = (e) => {
      e.preventDefault();
      editDescriptionText.forEach((edt) => {
        edt.style.height = `100px`;
        let height = e.target.scrollHeight;
        edt.style.height = `${height}px`;
      });
    };

    editDescriptionText.forEach((edt) => {
      edt.addEventListener("keyup", onKeyUp);
      return () => {
        edt.removeEventListener("keyup", onKeyUp);
      };
    });
  });

  // ACTIVITY SECTION

  const onChangeActivityTextArea = (e) => {
    e.preventDefault();
    const { value, name } = e.target;

    setAddActivity((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });

    if (value.length === 0) {
      setSendActivityBtnDisable(true);
    } else {
      setSendActivityBtnDisable(false);
    }
  };

  const onClickActivityTextArea = (e) => {
    e.preventDefault();
    setActivityTextArea(true);
    setSendActivityBtn(true);
  };

  const onClickSendActivity = (e) => {
    e.preventDefault();
    const activityInput = document.querySelectorAll(`.activity-input`);

    activityInput.forEach((ai) => {
      ai.style.height = `70px`;
    });

    if (addActivity.activity.length !== 0) {
      setAddActivity({
        activity: "",
      });

      setSendActivityBtnDisable(true);
      setActivities((prevValue) => {
        return [addActivity.activity, ...prevValue];
      });
    } else {
      setActivities((prevValue) => {
        return [...prevValue];
      });
    }
  };

  const onChangeEditActivityValue = (e, id) => {
    e.preventDefault();
    const { value, name } = e.target;

    setEditActivityValue((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });

    if (value.length !== 0) {
      setSaveActivityBtnDisable(false);
    } else {
      setSaveActivityBtnDisable(true);
    }
  };

  const onClickActivitySaveBtn = (e, id, value) => {
    e.preventDefault();

    if (editActivityValue.activity.length !== 0) {
      const editedValue = {
        activity: editActivityValue.activity,
      };

      const newActivityArr = [...activities];
      const index = activities.findIndex((_, i) => i === id);
      newActivityArr[index] = editedValue.activity;
      setActivities(newActivityArr);
      setActivitiesTab(null);
    } else {
      setActivitiesTab(id);
    }
  };

  const onClickActivityCancelBtn = (e, i, activity) => {
    e.preventDefault();
    setActivitiesTab(null);
  };

  const onClickEditActivityValue = (e, id, activity) => {
    e.preventDefault();
    setActivitiesTab(id);
    setSaveActivityBtnDisable(false);
    editActivityValue.activity = activity;
  };

  const onClickDeleteActivityValue = (e, id) => {
    e.preventDefault();
    setActivities((prevActivity) => {
      return prevActivity.filter((_, i) => {
        return i !== id;
      });
    });
  };

  useEffect(() => {
    const activityInput = document.querySelectorAll(`.activity-input`);

    let handleKeyUp = (e) => {
      e.preventDefault();

      activityInput.forEach((ai) => {
        ai.style.height = `70px`;
        let height = e.target.scrollHeight;
        ai.style.height = `${height}px`;
      });
    };

    activityInput.forEach((ai) => {
      ai.addEventListener("keyup", handleKeyUp);

      return () => {
        ai.removeEventListener("keyup", handleKeyUp);
      };
    });
  });

  useEffect(() => {
    const editActivityInput = document.querySelectorAll(`.edit-activity-input`);

    let handleKeyUp = (e) => {
      e.preventDefault();
      editActivityInput.forEach((eai) => {
        eai.style.height = `100px`;
        let height = e.target.scrollHeight;
        eai.style.height = `${height}px`;
      });
    };

    editActivityInput.forEach((eai) => {
      eai.addEventListener("keyup", handleKeyUp);

      return () => {
        eai.removeEventListener("keyup", handleKeyUp);
      };
    });
  });

  ////////////////////////

  let largeCardTitleRef = useRef(null);

  useEffect(() => {
    let handleClick = (e) => {
      if (
        largeCardTitleRef.current &&
        !largeCardTitleRef.current.contains(e.target)
      ) {
        setLargeCardTitle(null);
        // props.setEditCardTitle({
        //   title: props.card,
        // });
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  });


  return (
    <>
      <div
        className={`large_card_overlay ${
          props.openCard === props.id ? `active` : `inactive`
        }`}
      />
      <div
        className={`large_card_container
        ${props.openCard === props.id ? `show` : `hidden`}`}
      >
        <div
          className="large_close_icon_container"
          onClick={(e) => onClickCloseLargeCard(e, props.id)}
        >
          <img
            className=""
            src={require("../images/close.png")}
            alt="close-icon"
          />
        </div>
        <div className="large_card_title_container" ref={largeCardTitleRef}>
          <div
            className="large-card-icons title-icon"
            style={{ backgroundImage: `url(${titleIcon})` }}
          />
          {largeCardTitle === props.id ? (
            <>
              <input
                type="text"
                name="title"
                value={props.value}
                onChange={(e) => props.onChangeEditCardTitle(e)}
              />
              <button onClick={(e) => onClickSaveEditTitle(e)}>Save</button>
            </>
          ) : (
            <div
              className="click_card_title"
              onClick={(e) => clickCardTitle(e, props.id)}
            >
              <h1>{props.card}</h1>
            </div>
          )}
        </div>
        <div className="in_list_container">
          <p>
            in list <span>{props.listTitle}</span>
          </p>
        </div>

        {/* DESCRIPTION CONTAINER */}

        <div className="description_container">
          <div className="description_top_section">
            <div
              className="large-card-icons description-icon"
              style={{ backgroundImage: `url(${descriptionIcon})` }}
            />
            <h1>Description</h1>
            <div
              className="info-icon"
              style={{ backgroundImage: `url(${infoIcon})` }}
            />
          </div>

          <div className="description_body_container">
            <>
              {descriptions.map((value, i) => (
                <div
                  className={`main__description__text__container ${
                    descriptionTextContainer ? `show` : `hidden`
                  }`}
                  key={i}
                >
                  <div
                    className={`description_text_container`}
                    onClick={() =>
                      onClickDescriptionTextContainer(props.id, value)
                    }
                  >
                    <h1
                      className={`description-text`}
                      value={value.description}
                    >
                      {value.description}
                    </h1>
                  </div>
                  <button
                    className={`description-btn description-edit-btn`}
                    onClick={() => onClickEditDescriptionButton(value)}
                  >
                    Edit
                  </button>
                </div>
              ))}
            </>
            <div
              className={`edit_description_container ${
                editDesriptionContainer ? `show` : `hidden`
              }`}
            >
              <textarea
                className={`edit-description-text ${
                  descriptionTextarea ? `active` : `inactive`
                }`}
                name="description"
                value={addDescription.description}
                placeholder={`${
                  descriptionTextarea
                    ? `Note: You can type some Emojis!`
                    : `Add a more detailed description...`
                }`}
                rows={`${descriptionTextarea ? `10` : `5`}`}
                onChange={(e) => onChangeDescriptionTextArea(e)}
                onClick={() => onClickDescriptionTextArea(props.id)}
              />
              <div
                className={`description_button_container ${
                  descriptionTextarea ? `show` : `hidden`
                }`}
              >
                <button
                  className={`description-btn description-save-btn`}
                  onClick={() => onClickSaveDescriptionTextArea(props.id)}
                >
                  Save
                </button>
                <button
                  className={`description-btn description-cancel-btn`}
                  onClick={(e) => onClickCancelDescriptionTextArea(e)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ACTIVITY CONTAINER */}

        <div className="activity_container">
          <div className="activity_top_section">
            <div
              className="large-card-icons activity-icon"
              style={{ backgroundImage: `url(${activityIcon})` }}
            />
            <h1>Activity</h1>
          </div>
          <div className="activity_body_section">
            <div className="activity_input_container">
              <textarea
                className={`activity-input ${
                  activityTextArea ? `active` : `inactive`
                }`}
                name="activity"
                value={addActivity.activity}
                placeholder={`${
                  activityTextArea
                    ? `Note: You can type some Emojis!`
                    : `Write a comment...`
                }`}
                rows="10"
                onChange={(e) => onChangeActivityTextArea(e)}
                onClick={(e) => onClickActivityTextArea(e)}
              />
              <button
                className={`send-activity-btn ${
                  sendActivityBtn ? `show` : `hidden`
                } ${sendActivityBtnDisable && `disable`}`}
                onClick={(e) => onClickSendActivity(e)}
              >
                Send
              </button>
              <div className="main_activities_section">
                {activities.map((value, i) => (
                  <div className="activities_section" key={i}>
                    {activitiesTab === i ? (
                      <div className="edit_activity_tab">
                        <textarea
                          className="edit-activity-input"
                          name="activity"
                          value={editActivityValue.activity}
                          onChange={(e) => onChangeEditActivityValue(e, i)}
                        />
                        <div className="edit_activity_tab_button">
                          <button
                            className={`activity-btn activity-save-btn ${
                              saveActivityBtnDisable && `disable`
                            }`}
                            onClick={(e) => onClickActivitySaveBtn(e, i, value)}
                          >
                            Save
                          </button>
                          <button
                            className="activity-btn activity-cancel-btn"
                            onClick={(e) =>
                              onClickActivityCancelBtn(e, i, value)
                            }
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="activity_tab">
                        <h1 value={value.activity}>{value}</h1>
                        <div className="activity_tab_button">
                          <span
                            className="activity-edit-btn"
                            onClick={(e) =>
                              onClickEditActivityValue(e, i, value)
                            }
                          >
                            Edit
                          </span>
                          <span
                            onClick={(e) => onClickDeleteActivityValue(e, i)}
                          >
                            Delete
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OpenCard;

///////////////////

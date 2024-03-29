// React
import React, { useState, useEffect, useRef } from "react";
// Styled Component
import styled from "styled-components";
// Redux
import { useDispatch } from "react-redux";
import {
  delMtyTodo,
  onChangeTodo,
  createTodoThunk,
  updateTodoTiThunk,
  updateTodoCkThunk,
} from "../redux/modules/categTodoSlice.js";
import { getDayPlanetThunk } from "../redux/modules/planetSlice.js";
// React Icons
import { IoIosMore } from "react-icons/io";
// Imgs
import { check_icon } from "../static/images";

const TodoList = ({
  categId,
  todos,
  categIndex,
  onClickedSheet,
  clickedTodo,
  selectedDate,
  parsedToday,
  parsedCurrDate,
}) => {
  // Redux : dispatch
  const dispatch = useDispatch();

  // Specifying todo & memo info a new todo
  const handleFormChange = (index, event) => {
    let data = [...todos];

    data[index] = {
      [event.target.name]: event.target.value,
    };

    const chgTodoObj = {
      todoIndex: index,
      categIndex: categIndex,
      chgTodoTitle: data[index].title,
    };

    dispatch(onChangeTodo(chgTodoObj));
  };

  // When the enter key is pressed, add a new todo
  // & if there is no typed string, remove the empty todo
  const onMtyTodoKeyUp = (event, inputs, index, categId) => {
    if (event.keyCode === 13) {
      if (inputs.title === "") {
        const mtyTodo = {
          todoIndex: index,
          categIndex: categIndex,
        };
        dispatch(delMtyTodo(mtyTodo));
        event.target.blur = true;
      } else {
        const addTodoObj = {
          categId: categId,
          categIndex: categIndex,
          todoIndex: index,
          todoReq: {
            title: inputs.title,
            dueDate: selectedDate,
          },
        };

        dispatch(
          createTodoThunk({
            addTodoObj,
          })
        );

        const targetCheck = document.getElementById(
          `disable${clickedTodo.todoInfo.todoId}`
        );
        if (targetCheck !== null) targetCheck.disabled = true;
        event.target.blur = true;
      }
      // onLoginHandler();
    }
  };

  // When the enter key is pressed, edit the todo
  const naMtyTodoKeyUp = (event, inputs, index) => {
    if (event.keyCode === 13) {
      const updateTodoTiObj = {
        todoId: inputs.todoId,
        categIndex: categIndex,
        todoIndex: index,
        todoReq: {
          title: inputs.title,
          dueDate: selectedDate,
        },
      };
      dispatch(
        updateTodoTiThunk({
          updateTodoTiObj,
        })
      );

      const targetCheck = document.getElementById(
        `disable${clickedTodo.todoInfo.todoId}`
      );
      if (targetCheck !== null) targetCheck.disabled = true;
    }
  };

  // If it is an empty inputs, send dispatch data
  // else delete the empty UX
  const mtyTiOutFocus = (inputs, index, categId) => {
    if (inputs.title === "") {
      const mtyTodo = {
        todoIndex: index,
        categIndex: categIndex,
      };
      dispatch(delMtyTodo(mtyTodo));
    } else {
      const addTodoObj = {
        categId: categId,
        categIndex: categIndex,
        todoIndex: index,
        todoReq: {
          title: inputs.title,
          dueDate: selectedDate,
        },
      };

      dispatch(
        createTodoThunk({
          addTodoObj,
        })
      );

      const targetCheck = document.getElementById(
        `disable${clickedTodo.todoInfo.todoId}`
      );
      if (targetCheck !== null) targetCheck.disabled = true;
    }
  };

  // If there is an input that has been created before,
  // update from old title to new one
  const naMtyTiOutFocus = (inputs, index) => {
    const updateTodoTiObj = {
      todoId: inputs.todoId,
      categIndex: categIndex,
      todoIndex: index,
      todoReq: {
        title: inputs.title,
        dueDate: selectedDate,
      },
    };
    dispatch(
      updateTodoTiThunk({
        updateTodoTiObj,
      })
    );

    // document.getElementById(
    //   `disable${clickedTodo.todoInfo.todoId}`
    // ).disabled = true;
    const targetCheck = document.getElementById(
      `disable${clickedTodo.todoInfo.todoId}`
    );
    if (targetCheck !== null) targetCheck.disabled = true;
  };

  // Changing the clicked checkbox's check status & updating achievenment count and planet level
  // When the checkbox get checked or not, updating redux planet's state as well
  const onhandleCheckBox = (todo, categIndex, todoIndex) => {
    const updateTodoCkObj = {
      todoId: todo.todoId,
      categIndex: categIndex,
      todoIndex: todoIndex,
      todoReq: {
        isAchieved: document.getElementById(`checkbox${todo.todoId}`).checked,
      },
    };

    if (document.getElementById(`checkbox${todo.todoId}`).checked === true) {
      dispatch(updateTodoCkThunk({ updateTodoCkObj })).then((response) => {
        if (response.meta.requestStatus === "fulfilled") {
          dispatch(getDayPlanetThunk(selectedDate));
        }
      });
    } else {
      dispatch(updateTodoCkThunk({ updateTodoCkObj })).then((response) => {
        if (response.meta.requestStatus === "fulfilled") {
          dispatch(getDayPlanetThunk(selectedDate));
        }
      });
    }
  };

  return (
    <TodoListCon>
      {todos.map((inputs, index) => {
        return (
          <TodoItemCon key={`${inputs.todoId}`}>
            <TodoTitle>
              <CheckTxtboxWrap>
                <CustomCheck>
                  {inputs.isAchieved === true ? (
                    <input
                      id={`checkbox${inputs.todoId}`}
                      type="checkbox"
                      onChange={() =>
                        onhandleCheckBox(inputs, categIndex, index)
                      }
                      disabled={parsedCurrDate !== parsedToday ? true : false}
                      checked={true}
                    />
                  ) : (
                    <input
                      id={`checkbox${inputs.todoId}`}
                      type="checkbox"
                      onChange={() =>
                        onhandleCheckBox(inputs, categIndex, index)
                      }
                      disabled={parsedCurrDate !== parsedToday ? true : false}
                      checked={false}
                    />
                  )}
                  <div></div>
                </CustomCheck>
                {inputs.isAchieved === undefined ? (
                  <input
                    autoFocus
                    maxLength={20}
                    id={`disable${inputs.todoId}`}
                    name="title"
                    type="text"
                    placeholder="할 일을 입력하세요"
                    value={inputs.title}
                    onChange={(event) => handleFormChange(index, event)}
                    onBlur={() => mtyTiOutFocus(inputs, index, categId)}
                    onKeyUp={(event) =>
                      onMtyTodoKeyUp(event, inputs, index, categId)
                    }
                  />
                ) : (
                  <input
                    id={`disable${inputs.todoId}`}
                    name="title"
                    type="text"
                    maxLength={20}
                    placeholder="할 일을 입력하세요"
                    value={inputs.title}
                    onChange={(event) => handleFormChange(index, event)}
                    onBlur={() => naMtyTiOutFocus(inputs, index)}
                    onKeyUp={(event) => naMtyTodoKeyUp(event, inputs, index)}
                    disabled
                  />
                )}
              </CheckTxtboxWrap>
              <button
                type="button"
                onClick={() => onClickedSheet(inputs, index, categIndex)}
              >
                <IoIosMore></IoIosMore>
              </button>
            </TodoTitle>
          </TodoItemCon>
        );
      })}
    </TodoListCon>
  );
};

export default TodoList;

const TodoListCon = styled.ul`
  margin: 8px 0 0;
  padding: 8px 0;
  border-top: 1px solid #b1bdcf;
`;

const TodoItemCon = styled.li`
  width: 100%;
  &:not(:last-child) {
    margin-bottom: 5px;
  }
`;

const TodoTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    width: 20px;
    height: 18px;
    line-height: 1;
    font-size: 20px;
    color: #d9d9d9;
    background: transparent;
    border: none;
  }
`;

const CheckTxtboxWrap = styled.div`
  display: flex;
  align-items: center;
  width: calc(100% - 28px);

  input[type="text"] {
    width: calc(100% - 24px);
    height: 28px;
    font-size: 14px;
    color: #fff !important;
    margin-left: 8px;
    background: transparent;
    border: none;
    border-radius: 0;

    &:focus {
      border-bottom: 1px solid #b1bdcf;
    }
    &::placeholder {
      color: #fff;
      opacity: 50%;
    }
    &:disabled {
      opacity: 1;
      -webkit-text-fill-color: inherit;
    }
  }
`;

const CustomCheck = styled.div`
  position: relative;
  width: 16px;
  height: 16px;

  input[type="checkbox"] {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    z-index: 10;

    &:checked + div {
      background-color: #fff;
      background-image: url(${check_icon});
      background-repeat: no-repeat;
      background-position: center;
      opacity: 100%;
    }
  }
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    width: 100%;
    height: 100%;
    background: #aabce0;
    opacity: 40%;
    border-radius: 100px;
  }
`;

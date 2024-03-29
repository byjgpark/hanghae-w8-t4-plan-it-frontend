import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import {
  createCategThunk,
  deleteCategThunk,
  updateCategThunk,
} from "../../redux/modules/categTodoSlice";
import { select_arrow } from "../../static/images";
import CategoryColor from "./CategoryColor";
import ModalInner from "../../element/ModalInner";
import { useEffect } from "react";
import { apis } from "../../shared/api";

export default function CategoryDetailBox() {
  // Navigate
  const navigate = useNavigate();

  const dispatch = useDispatch();

  let { id } = useParams();

  const initialState = {
    categoryName: "",
    categoryColor: "#fff",
    isPublic: false,
    categoryStatus: "NOT_STOP",
    isEmpty: true,
  };

  const [category, setCategory] = useState(initialState);
  const [isScopeOpen, setScopeOpen] = useState(false);
  const [isColorOpen, setColorOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [select, setSelect] = useState(0);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setCategory({ ...category, [name]: value });
  };

  const onDeleteSelect = () => {
    if (category.isEmpty === true) {
      setSelect(1);
      setModal(true);
    } else {
      setSelect(3);
      setModal(true);
    }
  };

  const onDeleteHandler = () => {
    dispatch(deleteCategThunk(id));
  };

  const onUpdateHandler = () => {
    const copy = category;
    if (copy.categoryStatus === "NOT_STOP") {
      copy.categoryStatus = "STOP";
    } else {
      copy.categoryStatus = "NOT_STOP";
    }
    setCategory(copy);

    dispatch(updateCategThunk({ id, category }));
  };

  const onConfirmHandler = () => {
    if (Number(id) === 0) {
      dispatch(createCategThunk(category));
    } else {
      dispatch(updateCategThunk({ id, category }));
      setCategory(category);
    }
  };

  const onScopeSheetOpen = () => {
    setScopeOpen(true);
  };

  const onScopeSheetClose = (scope) => {
    const copy = category;
    copy.isPublic = scope;
    setCategory(copy);

    setScopeOpen(false);
  };

  const onColorSheetOpen = () => {
    setColorOpen(true);
  };
  const onColorSheetClose = (color) => {
    const copy = category;
    copy.categoryColor = color;
    setCategory(copy);
    setColorOpen(false);
  };

  const getCategoryDetail = () => {
    apis
      .getOnlyCategorie()
      .then((response) => {
        if (response.data.sucess === false) {
          return;
        } else {
          if (Number(id) !== 0) {
            const categoryDetail = response.data.data.find(
              (category) => category.categoryId === Number(id)
            );

            return setCategory(categoryDetail);
          } else {
            return;
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getCategoryDetail();
  }, []);

  return (
    <CategoryContainer>
      {/* 카테고리 modal창 */}
      {modal &&
        [
          <ModalInner
            text1={"목표를 종료할까요?"}
            text2={"나중에 다시 이어갈 수 있어요."}
            onConfirm={onUpdateHandler}
            onCancel={() => {
              setModal(false);
            }}
            onClose={() => {
              setModal(false);
            }}
          />,
          <ModalInner
            text1={"목표를 삭제할까요?"}
            text2={"이전에 달성한 투두까지 사라져요"}
            onConfirm={onDeleteHandler}
            onCancel={() => {
              setModal(false);
            }}
            onClose={() => {
              setModal(false);
            }}
          />,
          <ModalInner
            text1={"목표를 재개할까요?"}
            text2={"오늘부터 다시 이 목표를 사용할 수 있어요"}
            onConfirm={onUpdateHandler}
            onCancel={() => {
              setModal(false);
            }}
            onClose={() => {
              setModal(false);
            }}
          />,
          <ModalInner
            text1={"할 일이 있으면 삭제할 수 없어요."}
            onCancel={() => {
              setModal(false);
            }}
            onClose={() => {
              setModal(false);
            }}
          />,
        ][select]}
      {/* 카테고리 modal창 끝 */}
      <CategoryWrap>
        <InputBox>
          <input
            maxLength={10}
            style={{ color: `${category.categoryColor}` }}
            type={"text"}
            name="categoryName"
            value={category.categoryName}
            onChange={onChangeHandler}
          />
        </InputBox>
        <CategoryOption>
          {/* <CategoryOptionItem>
            <CategoryOptionTitle>공개 범위</CategoryOptionTitle>
            <button onClick={onScopeSheetOpen}>
              {category.isPublic ? "나만보기" : "전체공개"}
              <img src={select_arrow} alt="셀렉트 화살표 아이콘" />
            </button>
          </CategoryOptionItem> */}
          <CategoryOptionItem>
            <CategoryOptionTitle>색상</CategoryOptionTitle>
            <button onClick={onColorSheetOpen}>
              <PickedColor
                style={{ background: `${category.categoryColor}` }}
              ></PickedColor>
              <img src={select_arrow} alt="셀렉트 화살표 아이콘" />
            </button>
          </CategoryOptionItem>

          {Number(id) === 0 ? null : category.categoryStatus === "NOT_STOP" ? (
            <>
              <CategoryOptionItem>
                <button
                  onClick={() => {
                    setModal(true);
                    setSelect(0);
                  }}
                >
                  카테고리 종료하기
                </button>
              </CategoryOptionItem>
              <CategoryOptionItem>
                <button onClick={onDeleteSelect}>카테고리 삭제하기</button>
              </CategoryOptionItem>
            </>
          ) : (
            <>
              <CategoryOptionItem>
                <button
                  onClick={() => {
                    setModal(true);
                    setSelect(2);
                  }}
                >
                  카테고리 재개하기
                </button>
              </CategoryOptionItem>
              <CategoryOptionItem>
                <button onClick={onDeleteSelect}>카테고리 삭제하기</button>
              </CategoryOptionItem>
            </>
          )}
        </CategoryOption>
      </CategoryWrap>
      {category.categoryName === "" ? (
        <StySubmitButton onClick={onConfirmHandler} disabled>
          확인
        </StySubmitButton>
      ) : (
        <StySubmitButton onClick={onConfirmHandler}>확인</StySubmitButton>
      )}

      {/* <CategoryScope
        isOpen={isScopeOpen}
        onScopeSheetClose={onScopeSheetClose}
        isPublic={category.isPublic}
      /> */}
      <CategoryColor
        isOpen={isColorOpen}
        onColorSheetClose={onColorSheetClose}
        categoryColor={category.categoryColor}
      />
    </CategoryContainer>
  );
}

const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
`;

const CategoryWrap = styled.div`
  width: 100%;
`;

const CategoryOption = styled.div`
  color: #fff;
  margin-top: 25px;
`;

const CategoryOptionItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-align: left;
    font-weight: 600;
    font-size: 16px;
    color: #fff;
    padding: 14px 0;
    background: transparent;
    border: none;

    img {
      margin-left: 8px;
    }
  }
`;

const CategoryOptionTitle = styled.span``;

const InputBox = styled.div`
  input[type="text"] {
    width: 100%;
    height: 50px;
    font-weight: 400;
    font-size: 18px;
    color: #fff;
    padding: 0 15px;
    background: #343842;
    border: none;
    border-radius: 4px;

    &::placeholder {
      color: #fff;
    }
  }
`;

const StySubmitButton = styled.button`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 20px 0 40px;
  font-size: 20px;
  color: #fff;
  background: #1671fa;
  border: none;

  &:disabled {
    background: #8b98ac;
  }
`;

const PickedColor = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 100px;
  background: #fff;
`;

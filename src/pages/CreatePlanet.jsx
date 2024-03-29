// React
import React, { useState, useRef } from "react";
// Styled Component
import styled from "styled-components";
// React-Router-Dom
import { useNavigate } from "react-router-dom";
// React Icon
import { AiOutlineLeft } from "react-icons/ai";
// Redux
import { useDispatch } from "react-redux";
import { createPlanetThunk } from "../redux/modules/planetSlice";
// Planets Imgs
import {
  planet113,
  planet223,
  planet333,
  planet443,
  planet553,
} from "../static/images";

const CreatePlanet = () => {

  // Initial Opacity object, i.e., initial Opacity object for hook
  const initOpState = {
    firstOpa: 0.4,
    secondOpa: 0.4,
    thirdOpa: 0.4,
    fourthOpa: 0.4,
    fifthOpa: 0.4,
  };

  // Hook : To update the clicked planet's opacity
  const [opacity, setOpacity] = useState(initOpState);

  // Navigation
  const navigate = useNavigate();

  // Redux : dispatch
  const dispatch = useDispatch();

  // UseRef : Assigning the clicked planetType for API
  const planetTypeRef = useRef(0);

  // Creating current date's planet type => navigate to dlytodo page
  const onClickHandler = () => {
    const currDate = new Date();
    const parsedCurrDate = `${currDate.getFullYear()}-${String(
      currDate.getMonth() + 1
    ).padStart(2, "0")}-${String(currDate.getDate()).padStart(2, "0")}`;
    dispatch(
      createPlanetThunk({ planetType: planetTypeRef.current, parsedCurrDate })
    );

    navigate("/dlytodo")
  };

  // If one of planets get clicked,
  // assigning the corresponding planetType # to planetType Var
  // update the corresponding img's opacity from 0.4 to 1 with useState
  const onClickPlanetHandler = (type) => {
    if (type === 1) {
      planetTypeRef.current = 1;
      setOpacity({ firstOpa: 1 });
    } else if (type === 2) {
      planetTypeRef.current = 2;
      setOpacity({ secondOpa: 1 });
    } else if (type === 3) {
      planetTypeRef.current = 3;
      setOpacity({ thirdOpa: 1 });
    } else if (type === 4) {
      planetTypeRef.current = 4;
      setOpacity({ fourthOpa: 1 });
    } else {
      planetTypeRef.current = 5;
      setOpacity({ fifthOpa: 1 });
    }
  };

  return (
    <StyContainer>
      <StyHeader>
        <h1>오늘의 행성</h1>
      </StyHeader>
      <StyContent>오늘 키워갈 행성을 골라주세요.</StyContent>
      <StyPlanets>
        <button
          onClick={() => {
            onClickPlanetHandler(1);
          }}
        >
          <img
            src={planet113}
            alt="planet113"
            style={{ opacity: opacity.firstOpa }}
            className="first"
          />
        </button>
        <button
          onClick={() => {
            onClickPlanetHandler(2);
          }}
        >
          <img
            src={planet223}
            alt="planet223"
            style={{ opacity: opacity.secondOpa }}
            className="second"
          />
        </button>
        <button
          onClick={() => {
            onClickPlanetHandler(3);
          }}
        >
          <img
            src={planet333}
            alt="planet333"
            style={{ opacity: opacity.thirdOpa }}
            className="third"
          />
        </button>
        <button
          onClick={() => {
            onClickPlanetHandler(4);
          }}
        >
          <img
            src={planet443}
            alt="planet443"
            style={{ opacity: opacity.fourthOpa }}
            className="fourth"
          />
        </button>
        <button
          onClick={() => {
            onClickPlanetHandler();
          }}
        >
          <img
            src={planet553}
            alt="planet553"
            style={{ opacity: opacity.fifthOpa }}
            className="fifth"
          />
        </button>
      </StyPlanets>
      {opacity.firstOpa === 0.4 ||
      opacity.secondOpa === 0.4 ||
      opacity.thirdOpa === 0.4 ||
      opacity.fourthOpa === 0.4 ||
      opacity.fifthOpa === 0.4 ? (
        <StySubmitButton
          onClick={() => {
            onClickHandler();
          }}
          height="2em"
          border="none"
          color="#FFFFFF"
          disabled
        >
          확인
        </StySubmitButton>
      ) : (
        <StySubmitButton
          onClick={() => {
            onClickHandler();
          }}
          height="2em"
          border="none"
          color="#FFFFFF"
        >
          확인
        </StySubmitButton>
      )}
    </StyContainer>
  );
};

export default CreatePlanet;

const StyContainer = styled.div`
  color: #fff;
  padding: 0 16px;
`;

const StyHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 30px 0;

  .arrow {
    margin-right: ${(props) => props.theme.margins.small};
  }

  h1 {
    font-weight: ${(props) => props.theme.fontWeight.Bold};
    font-size: ${(props) => props.theme.fontSizes.xlll};
    margin-bottom: 0;
  }
`;

const StyContent = styled.div`
  text-align: center;
  color: #b1bdcf;
  font-size: 16px;
`;

const StyPlanets = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin-top: 15px;

  button {
    margin: 15px 0;
    background: transparent;
    border: none;

    img {
      height: 80px;
      opacity: 0.4;
    }
  }

  @media (max-width: 375px) {
    button img {
      height: 21.3333vw;
    }
  }
`;

const StySubmitButton = styled.button`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  font-size: 20px;
  color: #fff;
  padding: 20px 0 40px;
  background: #1671fa;
  border: none;
  transition: 0.2s;

  &:disabled {
    background: #8b98ac;
  }
`;

// React
import React, { useState, useEffect} from "react";
// React-Router-Dom
import { useNavigate } from "react-router-dom";
// Styled-Component
import styled, { css } from "styled-components";

const BtmFitNavi = ({name,wkPlanets}) => {

    // Navigate
    const navigate = useNavigate();

    // Hook : getting initial state from props & change state for the navigation
    // Depending on the state, the UX will be rendered differently
    const [activeTabs, setActiveTabs] = useState(name)

    // UseEffect : when activeTabs gets changed, useEffect will be triggered again
    useEffect(() => {
        switch (activeTabs) {
            case 'WklyTodo':
                navigate('/WklyTodo')
                break;
            default:
                navigate('/dlytodo')
                break;
        }
    }, [activeTabs])

    // When the day navi btn get clicked, find current date's planet
    // If the planet's planetType is 0, navigate to creatplanet page
    // Else navigate to dlytodo page
    const onClickDay = () =>{
    const currDate = new Date()
    const parsedCurrDate = `${currDate.getFullYear()}-${String(currDate.getMonth()+1).padStart(2,'0')}-${String(currDate.getDate()).padStart(2,'0')}`
    const currPlanet = wkPlanets?.planets.find(planet => planet.dueDate === parsedCurrDate)

    if(currPlanet?.planetType === 0){
        navigate("/createplanet")
    }
    else{
        setActiveTabs('dlytodo')
    }}

    return (
        <StyBtmNavi>
            <StyBtmTab 
                className="week"
                date={activeTabs}
                onClick={() => setActiveTabs('WklyTodo')}
            >
                    Week
              </StyBtmTab>
            <StyBtmTab
                className="day" 
                date={activeTabs}           
                onClick={() => onClickDay()}
            >
                    Day
              </StyBtmTab>
            </StyBtmNavi>
    )
}

export default BtmFitNavi

const StyBtmNaviBody = styled.div`
  padding: 0;
  box-sizing: border-box;
  border-radius: 13px;
`

const StyBtmNavi = styled(StyBtmNaviBody)`
  width: 90%;
  height: 50px;
  display: flex;
  align-items: center;
  position: fixed;
  bottom: 3%;
  background: rgba(56, 106, 202, 0.3);
  margin: auto;
  left: 0;
  right: 0;
`

const StyBtmTab = styled(StyBtmNaviBody)`
${(props) => {
    switch (props.date) {
      case "dlytodo":
        return css`
          width: 100%;
          height: 92%;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 12px;
              
          &.day{
            background: white;
            width: 100%;
            margin: 0.6%;
          }
        `;
      default:
        return css`
          width: 100%;
          height: 92%;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 12px;
              
          &.week{
            background: white;
            width: 100%;
            margin: 0.6%;
          }
        `;
    }
  }}
`;




// }
//   width: 100%;
//   height: 92%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   border-radius: 12px;

//   &.day{
//     background: white;
//     width: 100%;
//     margin: 0.6%;
//   }
// `
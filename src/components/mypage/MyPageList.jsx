import React from "react";
import styled from "styled-components";
import MyPageItem from "./MyPageItem.jsx";

export default function MyPageList() {
  return (
    <MyPageContainer>
      <MyPageItem id={1} text={"닉네임 변경"} />
      <MyPageItem id={2} text={"비밀번호 변경"} />
      <MyPageItem id={3} text={"로그아웃"} />
    </MyPageContainer>
  );
}

const MyPageContainer = styled.div`
  margin-top: 30px;
  padding: 0 24px;
`;
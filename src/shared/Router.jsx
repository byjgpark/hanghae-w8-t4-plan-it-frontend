import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LogInPage from "../pages/LogInPage";
import SignUp from "../pages/SignUp";
import DlyTodo from "../pages/DlyTodo";
import Kakao from "./Kakao";
import Search from "../pages/Search";
import Follow from "../pages/Follow";
import Category from "../pages/Category";
import CategoryDetail from "../pages/CategoryDetail";
import WklyTodo from "../pages/WklyTodo";
import CreatePlanet from "../pages/CreatePlanet"
import MyPage from "../pages/MyPage";
import NickName from "../components/mypage/NickName";
import Password from "../components/mypage/Password";


const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogInPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dlytodo" element={<DlyTodo />} />
        <Route path="/Wklytodo" element={<WklyTodo />} />
        <Route path="/kakao" element={<Kakao />} />
        <Route path="/search" element={<Search />} />
        <Route path="/follow" element={<Follow />} />
        <Route path="/category" element={<Category />} />
        <Route path="/createplanet" element={<CreatePlanet />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/nickname" element={<NickName />} />
        <Route path="/password" element={<Password />} />
        <Route path="/categorydetail/:id" element={<CategoryDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

// style
import styled from "styled-components";

// redux
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../actions/UserAction";

const HeaderStyled = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: flex-end;
`;

const Header = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { loggedIn } = useSelector((state: any) => state.user);

  const handleSignOut = (e: any) => {
    e.preventDefault();
    dispatch(signOut());
    router.push("/");
  };

  return (
    <HeaderStyled>
      <div>
        {loggedIn?.email} |{" "}
        <a href="#" onClick={handleSignOut}>
          Logout
        </a>
      </div>
    </HeaderStyled>
  );
};

export default Header;

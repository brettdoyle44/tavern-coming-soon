import React, { Component } from "react"
import { Nav, Brand, StyledContainer } from "./style"
import logo from "../../../images/tavern-logo.png"

export default class Navigation extends Component {
  render() {
    return (
      <Nav>
        <StyledContainer>
          <Brand>
            <img src={logo} width="150" />
          </Brand>
        </StyledContainer>
      </Nav>
    )
  }
}

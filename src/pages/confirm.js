import React from "react"
import SEO from "../components/common/layout/seo"
import styled from "styled-components"
import { Link } from "gatsby"

const ButtonWrapper = styled.div`
  display: flex;
  justify-items: center;
  justify-content: center;
  padding-top: 50px;
`

const HeaderButton = styled.button`
  font-weight: 500;
  font-size: 14px;
  color: white;
  letter-spacing: 1px;
  height: 58px;
  display: block;
  margin-left: 8px;
  width: 100%;
  text-transform: uppercase;
  cursor: pointer;
  white-space: nowrap;
  background: #5468ff;
  border-radius: 4px;
  padding: 0px 40px;
  border-width: 0px;
  border-style: initial;
  border-color: initial;
  border-image: initial;
  outline: 0px;
  &:hover {
    box-shadow: rgba(110, 120, 152, 0.22) 0px 2px 10px 0px;
  }
  @media (min-width: 40em) {
    width: initial;
  }
`

const HeaderText = styled.p`
  padding: 0px 25px;
  font-family: "HK Grotesk Normal";
  @media (min-width: 40em) {
    max-width: 40em;
    text-align: center;
    margin: auto;
  }
`

const ConfirmPage = () => (
  <div>
    <SEO title="Thank you for signing up for Tavern" />

    <div className={"confirm-header home"} id="header">
      <HeaderText>
        <h1>Thanks for signing up!</h1>
        Feel free to help us spread the word by sharing on social media.
      </HeaderText>
      <ButtonWrapper>
        <HeaderButton>
          <Link style={{ color: "#fff", textDecoration: "none" }} to="/">
            Return to Homepage
          </Link>
        </HeaderButton>
      </ButtonWrapper>
    </div>
  </div>
)

export default ConfirmPage

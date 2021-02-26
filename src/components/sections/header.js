import React, { useState } from "react"
import firebase from "gatsby-plugin-firebase"
import { navigate } from "gatsby"
import { v1 as uuidv1 } from "uuid"
import styled from "styled-components"
import { graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"

import { Container } from "../global"

const Header = () => {
  const data = useStaticQuery(graphql`
    query {
      file(
        sourceInstanceName: { eq: "product" }
        name: { eq: "new-green-skew" }
      ) {
        childImageSharp {
          fluid(maxWidth: 1000) {
            ...GatsbyImageSharpFluid_tracedSVG
          }
        }
      }
    }
  `)

  const [email, setEmail] = useState("")
  const [notValid, setNotValid] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    try {
      if (validateEmail(email)) {
        await writeUserData(uuidv1(), email)
        setEmail("")
        navigate("/confirm")
      }
      setEmail("")
      setNotValid(true)
    } catch (e) {
      console.error(e)
    }
  }

  function validateEmail(theEmail) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(theEmail)
  }

  function writeUserData(userId, theEmail) {
    firebase
      .database()
      .ref("users/" + userId)
      .set({
        email: theEmail,
      })
  }

  return (
    <HeaderWrapper id="top">
      <Container>
        <Flex>
          <HeaderTextGroup>
            <Subtitle></Subtitle>
            <h1>
              Drop-in Audio,
              <br />
              built for work.
            </h1>
            <h2>
              We're all tired of endless video meetings. Hang out with
              co-workers the way it's meant to be, laid back and simple.
              <br />
              <br /> Sign up for early access and you'll be the first to know
              when we're live.
            </h2>
            <HeaderForm onSubmit={handleSubmit}>
              {!notValid ? (
                <HeaderInput
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  placeholder="Your email"
                />
              ) : (
                <NotValidHeaderInput
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  placeholder="Please enter valid email"
                />
              )}
              <HeaderButton>Early access</HeaderButton>
            </HeaderForm>
          </HeaderTextGroup>
          <ImageWrapper>
            <StyledImage fluid={data.file.childImageSharp.fluid} />
            <br />
          </ImageWrapper>
        </Flex>
      </Container>
    </HeaderWrapper>
  )
}

export default Header

const HeaderWrapper = styled.header`
  background-color: #f8f8f8;
  padding: 25px 0 80px 0;
  position: relative;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - 5vw));
  @media (max-width: ${(props) => props.theme.screen.md}) {
  }
`
const Subtitle = styled.h5`
  font-size: 16px;
  color: ${(props) => props.theme.color.accent};
  letter-spacing: 0px;
  margin-bottom: 16px;
`

const HeaderTextGroup = styled.div`
  margin: 0;

  > div {
    width: 120%;
    margin-bottom: -4.5%;

    @media (max-width: ${(props) => props.theme.screen.md}) {
      margin: 0 16px;
    }
  }

  h1 {
    margin: 0 0 24px;
    color: ${(props) => props.theme.color.primary};
  }

  h2 {
    margin-bottom: 24px;
    ${(props) => props.theme.font_size.regular}
  }

  p {
    margin-bottom: 48px;
  }
`

const Flex = styled.div`
  display: grid;
  justify-content: space-between;
  align-content: center;
  grid-template-columns: 1fr 1fr;
  @media (max-width: ${(props) => props.theme.screen.md}) {
    grid-template-columns: 1fr;
    grid-gap: 64px;
  }
  @media (max-width: ${(props) => props.theme.screen.md}) {
    grid-template-columns: 1fr;
    grid-gap: 64px;
  }
`

const HeaderForm = styled.form`
  display: flex;
  flex-direction: row;
  padding-bottom: 16px;

  @media (max-width: ${(props) => props.theme.screen.sm}) {
    flex-direction: column;
  }
`

const HeaderInput = styled.input`
  font-weight: 500;
  font-size: 16px;
  color: ${(props) => props.theme.color.primary};
  line-height: 42px;
  width: 100%;
  text-align: left;
  height: 60px;
  border-width: 1px;
  border-style: solid;
  border-color: ${(props) => props.theme.color.secondary};
  border-image: initial;
  border-radius: 4px;
  padding: 8px 16px;
  outline: 0px;
  &:focus {
    box-shadow: inset ${(props) => props.theme.color.secondary} 0px 0px 0px 2px;
  }
  @media (max-width: ${(props) => props.theme.screen.md}) {
    margin-bottom: 8px;
  }
  @media (max-width: ${(props) => props.theme.screen.sm}) {
    display: block;
    width: 100%;
  }
`

const HeaderButton = styled.button`
  font-weight: 500;
  font-size: 14px;
  color: white;
  letter-spacing: 1px;
  height: 60px;
  display: block;
  margin-left: 8px;
  text-transform: uppercase;
  cursor: pointer;
  white-space: nowrap;
  background: ${(props) => props.theme.color.secondary};
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
  @media (max-width: ${(props) => props.theme.screen.md}) {
  }
  @media (max-width: ${(props) => props.theme.screen.sm}) {
    margin-left: 0;
  }
`
const ImageWrapper = styled.div`
  justify-self: end;
  align-self: center;
  @media (max-width: ${(props) => props.theme.screen.md}) {
    justify-self: center;
  }
`

const StyledImage = styled(Img)`
  width: 500px;
  @media (max-width: ${(props) => props.theme.screen.md}) {
    width: 400px;
  }
  @media (max-width: ${(props) => props.theme.screen.sm}) {
    width: 400px;
  }
`

const NotValidHeaderInput = styled.input`
  font-weight: 500;
  font-size: 16px;
  color: red;
  line-height: 42px;
  width: 100%;
  text-align: left;
  height: 40px;
  border-width: 1px;
  border-style: solid;
  border-color: red;
  border-image: initial;
  border-radius: 4px;
  padding: 8px 16px;
  outline: 0px;
  margin-bottom: 8px;
  @media (min-width: 40em) {
    max-width: 30em;
    margin: 0;
  }
`

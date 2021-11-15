import {signIn, signOut, useSession} from 'next-auth/react'

import AppLayout from '../common/components/layouts/AppLayout'
import {AppNavProfileImage} from '../common/components/navs/AppNav'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import FlavorText from '../modules/index/components/FlavorText/FlavorText'
import Head from 'next/head'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Navbar from 'react-bootstrap/Navbar'
import styled from 'styled-components'

const FlavorTextContainer = styled.div`
  min-height: 16vh;

  @media (min-width: 992px) {
    min-height: inherit;
  }
`

export default function Index() {
  const {data: session, status: authenticationStatus} = useSession()

  return (
    <div className="min-vh-100 text-center">
      <Head>
        <title>Your Bot Is</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="d-flex flex-column w-100 min-vh-100 mx-auto">
        <header className="mb-auto">
          <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
              <Navbar.Brand>Your Bot Is</Navbar.Brand>

              <>
                <Navbar.Toggle />
                <Navbar.Collapse>
                  <Nav className="ml-lg-5 me-auto">
                    <Nav.Link
                      href="https://github.com/YourBotIs/yourbot-client"
                      target="_blank"
                      rel="noopener noreferrer">
                      github
                    </Nav.Link>
                    <Nav.Link
                      href="https://discord.gg/xAk4pV5zYX"
                      target="_blank"
                      rel="noopener noreferrer">
                      discord
                    </Nav.Link>
                  </Nav>
                  {authenticationStatus === 'authenticated' && (
                    <NavDropdown
                      id="user-dropdown"
                      title={
                        <>
                          <AppNavProfileImage
                            alt={`${session.user.name}'s profile photo'`}
                            className="me-2"
                            src={session.user.image}
                            roundedCircle
                          />
                          {session.user.name}
                        </>
                      }>
                      <NavDropdown.Item
                        onClick={() => signOut({callbackUrl: '/'})}>
                        Log Out
                      </NavDropdown.Item>
                    </NavDropdown>
                  )}
                </Navbar.Collapse>
              </>
            </Container>
          </Navbar>
        </header>

        <main>
          <Container>
            <FlavorTextContainer>
              <h1>your bot is [{<FlavorText />}]</h1>
            </FlavorTextContainer>

            {authenticationStatus !== 'authenticated' && (
              <Button
                className="mt-3"
                onClick={() => {
                  signIn('discord')
                }}
                size="lg"
                variant="discord">
                Log in with Discord
              </Button>
            )}
          </Container>
        </main>

        <footer className="mt-auto text-muted">
          client by{' '}
          <a
            href="https://github.com/gulci"
            target="_blank"
            rel="noopener noreferrer">
            gulci
          </a>
        </footer>
      </div>
    </div>
  )
}

Index.getLayout = (page) => <AppLayout hideNav={true}>{page}</AppLayout>

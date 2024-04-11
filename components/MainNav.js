import { Container, Nav, Navbar, Form, Button, NavDropdown } from "react-bootstrap";

import Link from 'next/link';
import {useRouter} from 'next/router';
import {useState} from 'react';
import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";

import { addToHistory } from "@/lib/userData";
import { readToken, removeToken } from '@/lib/authenticate';

export default function MainNav(){

  const [searchField, setSearchField] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  const router = useRouter();
  let token = readToken();
  let userName = token ? token.userName : "";

  async function submitForm(e){
    e.preventDefault();

    if(searchField != ""){
      
      router.push(`/artwork?title=true&q=${searchField}`);
      setSearchField("");
      setIsExpanded(false);
      setSearchHistory(await addToHistory(`title=true&q=${searchField}`))
    }
    
  }

    function logout() {
      removeToken();
      router.push("/login");
    }


  return (
    <>
    <Navbar expand="lg" className="fixed-top navbar-dark bg-primary" expanded={isExpanded} >
      <Container>
        <Navbar.Brand>Kwai Fong Cheung</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={()=>setIsExpanded(e => !e)} />
        <Navbar.Collapse id="basic-navbar-nav" >
          <Nav className="me-auto">
             <Link href="/" passHref legacyBehavior><Nav.Link active={router.pathname === "/"} onClick={()=>setIsExpanded(false)} >Home</Nav.Link></Link>
            {token && <Link href="/search" passHref legacyBehavior>
              <Nav.Link active={router.pathname === "/search"} onClick={()=>setIsExpanded(false)} >Advanced Search</Nav.Link></Link>}
            
          </Nav>
          &nbsp;
          {token && <Form className="d-flex" onSubmit={submitForm}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={searchField} onChange={(e) => setSearchField(e.target.value)}
            />
            <Button type="submit" variant="success">Search</Button>
          </Form>}
          &nbsp;
          <Nav>
            {token && <NavDropdown title={userName}  id="basic-nav-dropdown"> 
          <NavDropdown.Item onClick={() => { setIsExpanded(false); router.push('/favourites'); }}>Favourites</NavDropdown.Item>
          <NavDropdown.Item onClick={() => { setIsExpanded(false); router.push('/history'); }}>Search History</NavDropdown.Item>
          <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
            </NavDropdown>}
            {!token && <Link href="/register" passHref legacyBehavior>
              <Nav.Link active={router.pathname === "/register"} onClick={()=>setIsExpanded(false)} >Register</Nav.Link></Link>
             }
            
            {!token && <Link href="/login" passHref legacyBehavior>
              <Nav.Link active={router.pathname === "/login"} onClick={()=>setIsExpanded(false)} >Login</Nav.Link></Link>
             }

            </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <br /><br /><br />
    </>
  );
}
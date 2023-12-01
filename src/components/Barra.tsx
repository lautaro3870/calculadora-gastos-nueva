import { Container, Nav, Navbar } from "react-bootstrap";

export default function Barra() {
  return (
    <>
      {/* <Navbar expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href={process.env.REACT_APP_URL}>TODO</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/calculadora">Calculadora</Nav.Link>
            <Nav.Link href="/reporte">Reporte</Nav.Link>
            <Nav.Link href="/grafico">Grafico</Nav.Link>
            <Nav.Link href="/graficoLinea">Grafico Linea</Nav.Link>
          </Nav>
        </Container>
      </Navbar> */}

      <Navbar expand="lg" bg="dark" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href={process.env.REACT_APP_URL}>
            TODO
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/calculadora">Calculadora</Nav.Link>
              <Nav.Link href="/reporte">Reporte</Nav.Link>
              <Nav.Link href="/grafico">Grafico</Nav.Link>
              <Nav.Link href="/graficoLinea">Grafico Linea</Nav.Link>
              <Nav.Link href="/reporteMensual">Reporte Mensual</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

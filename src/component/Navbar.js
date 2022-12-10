import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import axios from "axios";
import Offcanvas from "react-bootstrap/Offcanvas";
import Swal from "sweetalert2";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useHistory } from "react-router-dom";

export default function NavBar() {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [harga, setHarga] = useState(Number);
  const [image, setImage] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addList = async (e) => {
    e.preventDefault();
    e.persist();

    //try catch untuk memastikan terjadi kesalahan
    try {
      // library opensource yang digunakan untuk request data melalui http.
      await axios.post(" http://localhost:8000/list", {
        name: name,
        deskripsi: deskripsi,
        harga: Number(harga),
        image: image,
      });
      //Sweet Alert
      Swal.fire("Berhasil!", "Data Berhasil Ditambahkan", "success");
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.log(error);
    }
  };
  const history = useHistory();
  const logout = () => {
    window.location.reload();
    localStorage.clear();
    history.push("/");
  };
  return (
    <div className="fixed top-0 left-0 right-0">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Toko bar G</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto ">
              <Nav.Link href="/">Dasboard</Nav.Link>
              <Nav.Link href="/cart">Cart</Nav.Link>
              {localStorage.getItem("role") !== "admin" ? (
                <></>
              ) : (
                <>
                  <Nav.Link href="" onClick={handleShow}>
                    Tambah List
                  </Nav.Link>
                </>
              )}
              {localStorage.getItem("role") !== null ? (
                <>
                  <Nav.Link href="" onClick={logout}>
                    Log out
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link href="/login">Login</Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Tambah List</Modal.Title>
        </Modal.Header>
        <Form onSubmit={addList}>
          <Modal.Body>
            <div className="mb-3">
              <Form.Label htmlFor="judul">Nama Barang: </Form.Label>
              <br />
              <Form.Control
                placeholder="Nama Barang"
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <Form.Label htmlFor="deskripsi">Deskripsi: </Form.Label>
              <br />
              <Form.Control
                placeholder="Deskripsi"
                required
                type="text"
                value={deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <Form.Label htmlFor="pengarang">Harga: </Form.Label>
              <br />
              <Form.Control
                required
                type="number"
                value={harga}
                onChange={(e) => setHarga(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <Form.Label htmlFor="judul">Image: </Form.Label>
              <br />
              <Form.Control
                placeholder="Link Image"
                required
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>
            <br />
            <Button
              className="mx-1 button-btl btn"
              variant="danger"
              onClick={handleClose}
            >
              Close
            </Button>
            <Button
              className="mx-1 button-btl btn"
              type="submit"
              variant="primary"
            >
              Save
            </Button>
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Form>
      </Modal>
      <div>
        {[false].map((expand) => (
          <Navbar
            fixed="top"
            key={expand}
            bg="dark"
            variant="dark"
            expand={expand}
            className="mb-3"
          >
            <Container fluid>
              <img
                src="https://companieslogo.com/img/orig/GRAB-e42c2148.png?t=1643541585"
                width={"30px"}
                className="ml-[3%]"
                alt=""
              />
              <Navbar.Brand href="/" className="ml-[-80%]">
                Toko bar G
              </Navbar.Brand>
              <Navbar.Toggle
                aria-controls={`offcanvasNavbar-expand-${expand}`}
              />
              <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-${expand}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                placement="start"
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                    Toko bar G
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                    <Nav.Link href="/">Dasboard</Nav.Link>
                    <Nav.Link href="/cart">Cart</Nav.Link>
                    {localStorage.getItem("role") !== "admin" ? (
                      <></>
                    ) : (
                      <>
                        <Nav.Link href="" onClick={handleShow}>
                          Tambah List
                        </Nav.Link>
                      </>
                    )}
                    {localStorage.getItem("role") !== null ? (
                      <>
                        <Nav.Link href="" onClick={logout}>
                          Log out
                        </Nav.Link>
                      </>
                    ) : (
                      <>
                        <Nav.Link href="/login">Login</Nav.Link>
                      </>
                    )}
                  </Nav>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Container>
          </Navbar>
        ))}
      </div>
    </div>
  );
}

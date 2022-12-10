import axios from "axios";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useHistory, useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function Edit() {
  const param = useParams();
  const [name, setName] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [harga, setHarga] = useState(Number);
  const [image, setImage] = useState("");

  const history = useHistory();

  useEffect(() => {
    // library opensource yang digunakan untuk request data melalui http.
    axios
      .get("http://localhost:8000/list/" + param.id)
      .then((response) => {
        const newList = response.data;
        setName(newList.name);
        setDeskripsi(newList.deskripsi);
        setHarga(newList.harga);
        setImage(newList.image);
      })
      .catch((error) => {
        alert("Terjadi Kesalahan " + error);
      });
  }, []);
  const updateList = async (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Apakah Ingin Di Update?",
      text: "Data kamu yang lama tidak bisa dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Di Update!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.put("http://localhost:8000/list/" + param.id, {
          name: name,
          deskripsi: deskripsi,
          harga: Number(harga),
          image: image,
        });
        history.push("/data");
        Swal.fire("Berhasil!", "Data kamu berhasil di update.", "success");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
      history.push("/data");
    });
  };
  return (
    <div className="flex justifiy-center items-center bg-gradient-to-r from-sky-500 to-indigo-500 w-full h-screen ">
      <div className="bg-white w-[80%] m-auto h-[80%%]  p-[4%] rounded-[30px]">
        <Form className="" onSubmit={updateList}>
          <h5>Edit List</h5>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Nama</Form.Label>
            <Form.Control
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Deskripsi</Form.Label>
            <Form.Control
              required
              type="text"
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Harga</Form.Label>
            <Form.Control
              required
              type="number"
              value={harga}
              onChange={(e) => setHarga(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="judul">Image: </Form.Label>
            <br />
            <Form.Control
              required
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

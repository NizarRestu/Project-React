import Carousel from "react-bootstrap/Carousel";
import Side from "../component/Sidebar";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

export default function Dasboard() {
  const [list, setList] = useState([]);

  const getAll = async () => {
    // library opensource yang digunakan untuk request data melalui http.
    await axios
      .get("http://localhost:8000/list")
      .then((res) => {
        setList(res.data);
      })
      .catch((error) => {
        alert("terjadi kesalahan" + error);
      });
  };

  const buy = async (list) => {
    axios
      .get("http://localhost:8000/carts?cart.id=" + list.id)
      .then((res) => {
        console.log(res.data);
        if (res.data.length === 0) {
          const cart = {
            jumlah: 1,
            totalHarga: list.harga,
            cart: list,
          };

          axios
            .post("http://localhost:8000/carts", cart)
            .then((res) => {
              Swal.fire({
                icon: "success",
                title: "Berhasil memesan " + list.name,
                showConfirmButton: false,
                timer: 1500,
              });
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          const cart = {
            jumlah: res.data[0].jumlah + 1,
            totalHarga: res.data[0].totalHarga + list.harga,
            cart: list,
          };
          axios
            .put("http://localhost:8000/carts/" + res.data[0].id, cart)
            .then((res) => {
              Swal.fire({
                icon: "success",
                title: "Berhasil memesan " + list.name,
                showConfirmButton: false,
                timer: 1500,
              });
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <div className="flex static">
      <Side />
      <div className="w-full">
        <Carousel className="w-[80%] ml-[14%]">
          <Carousel.Item interval={800}>
            <img
              className="d-block w-100 h-80"
              src="https://assets.grab.com/wp-content/uploads/sites/9/2022/06/01144853/DANAMON-X-GRAB_KV_JULI_LP-1440-1.jpg"
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item interval={500}>
            <img
              className="d-block w-100  h-80"
              src="https://assets.grab.com/wp-content/uploads/sites/9/2021/05/07095346/BLOG1440x700_NEWUSER150.jpg"
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 h-80"
              src="https://assets.grab.com/wp-content/uploads/sites/9/2020/11/24143633/1440x700-Blog-GrabGift-x-Tokopedia.jpg"
              alt="Third slide"
            />
          </Carousel.Item>
        </Carousel>
        <div className="mt-[5%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 w-[80%] ml-[15%]">
          {list.map((list) => {
            return (
              <Card>
                <Card.Img variant="top" className="h-56" src={list.image} />
                <Card.Body>
                  <Card.Title>{list.name}</Card.Title>
                  <Card.Text>{list.deskripsi}</Card.Text>
                </Card.Body>
                <Card.Footer className="flex gap-4">
                  <Card.Title className="text-left m-auto">Rp.{list.harga}</Card.Title>
                  <Button
                    className="w-32"
                    variant="success"
                    onClick={() => buy(list)}
                  >
                    <i class="fa-solid fa-cart-plus"></i> Beli
                  </Button>
                </Card.Footer>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

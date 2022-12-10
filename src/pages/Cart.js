import React, { useEffect, useState } from "react";
import axios, { all } from "axios";
import Swal from "sweetalert2";
import Button from "react-bootstrap/Button";
import { numberWithCommas } from "../component/number";

export default function Cart() {
  const [cart, setCart] = useState([]);

  const totalBayar = cart.reduce(function (result, item) {
    return result + item.totalHarga;
  }, 0);
  const getAll = async () => {
    // library opensource yang digunakan untuk request data melalui http.
    await axios
      .get("http://localhost:8000/carts")
      .then((res) => {
        setCart(res.data);
      })
      .catch((error) => {
        alert("terjadi kesalahan" + error);
      });
  };

  const beli = async (id) => {
    Swal.fire({
      title: "Apakah Ingin Di Check out?",
      text: "Pesanan kamu tidak bisa dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Check out!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete("http://localhost:8000/carts/" + id);
        Swal.fire(
          "Berhasil!",
          "Pesanan kamu berhasil di check out.",
          "success"
        );
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    });
  };
  useEffect(() => {
    getAll();
  }, []);
  const deleteCarts = async (id) => {
    Swal.fire({
      title: "Apakah Ingin Di Hapus?",
      text: "Pesanan kamu tidak bisa dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Hapus!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete("http://localhost:8000/carts/" + id);
        Swal.fire("Berhasil!", "Pesanan kamu berhasil di hapus.", "success");
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    });
  };
  return (
    <div className="">
      <div>
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-white uppercase bg-indigo-700 dark:bg-gray-700 dark:text-gray-400">
              {cart.length !== 0 ? (
                <>
                  <tr>
                    <th scope="col" className="py-3 px-6 text-center">
                      No
                    </th>
                    <th scope="col" className="py-3 px-6 text-center">
                      Nama
                    </th>
                    <th scope="col" className="py-3 px-6 text-center">
                      Image
                    </th>
                    <th scope="col" className="py-3 px-6 text-center">
                      Harga
                    </th>
                    <th scope="col" className="py-3 px-6 text-center">
                      Jumlah
                    </th>
                    {localStorage.getItem("role") !== null ? (
                      <th scope="col" className="py-3 px-6 text-center">
                        Aksi
                      </th>
                    ) : (
                      <></>
                    )}
                  </tr>
                </>
              ) : (
                <></>
              )}
            </thead>
            <tbody>
              {cart.length !== 0 ? (
                <>
                  {cart.map((cart, index) => {
                    return (
                      <tr
                        key={cart.id}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                      >
                        <td className="py-4 px-6 text-center">{index + 1}</td>
                        <th
                          scope="row"
                          className="py-4 px-6 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {cart.cart.name}
                        </th>
                        <td className="py-4 px-6 text-center">
                          <img
                            className=""
                            src={cart.cart.image}
                            alt=""
                            width={"100px"}
                            height={"100px"}
                          />
                        </td>
                        <td className="py-4 px-6 text-center">
                          {numberWithCommas(cart.cart.harga)}
                        </td>
                        <td className="py-4 px-6 text-center">{cart.jumlah}</td>
                        {localStorage.getItem("role") !== null ? (
                          <td className="py-4 text-center">
                            <Button
                              onClick={() => {
                                beli(cart.id);
                              }}
                              variant="success"
                            >
                              <i className="fa-solid fa-cart-plus"></i> Beli
                            </Button>
                            <Button
                              variant="danger"
                              className="mx-1"
                              onClick={() => deleteCarts(cart.id)}
                            >
                              <i class="fa-solid fa-trash"></i>
                            </Button>
                          </td>
                        ) : (
                          <></>
                        )}
                      </tr>
                    );
                  })}
                </>
              ) : (
                <h4 className="text-center">Tidak ada Pesanan</h4>
              )}
            </tbody>
          </table>
          <h4 className="fixed p-3">
            Total Harga : Rp. {numberWithCommas(totalBayar)}
          </h4>
          <div className="fixed mt-[40px] p-3">
            <a href="/">
              <Button className="w-32 ml-[20px]" variant="primary">
                <i className="fa-solid fa-right-from-bracket"></i> Kembali
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

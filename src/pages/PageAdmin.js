import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Button from "react-bootstrap/Button";
import Nav from "../component/Navbar";
import { numberWithCommas } from "../component/number";

export default function Admin() {
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
  useEffect(() => {
    getAll();
  }, []);
  const deleteList = async (id) => {
    Swal.fire({
      title: "Apakah Ingin Di Hapus?",
      text: "Data kamu tidak bisa dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Hapus!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete("http://localhost:8000/list/" + id);
        Swal.fire("Berhasil!", "Data kamu berhasil di hapus.", "success");
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    });
  };
  return (
    <div>
      <div>
        <div className="mb-3 ">
          <Nav />
        </div>
        <div>
          <div className=" mt-[70px]  sm:rounded-lg container">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-white uppercase bg-[#B37D1B] dark:bg-gray-700 dark:text-gray-400 px-[10px]">
                <tr>
                  <th scope="col" className="py-3 px-6 text-center">
                    No
                  </th>
                  <th scope="col" className="py-3 px-6 text-center">
                    Nama
                  </th>
                  <th scope="col" className="py-3 px-6 text-center">
                    Deskripsi
                  </th>
                  <th scope="col" className="py-3 px-6 text-center">
                    Image
                  </th>
                  <th scope="col" className="py-3 px-6 text-center">
                    Harga
                  </th>
                  {localStorage.getItem("role") === "admin" ? (
                    <th scope="col" className="py-3 px-6 text-center">
                      Aksi
                    </th>
                  ) : (
                    <></>
                  )}
                </tr>
              </thead>
              <tbody>
                {list.length !== 0 ? (
                  <>
                    {list.map((list, index) => {
                      return (
                        <tr
                          key={list.id}
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                          <td className="py-4 px-6 text-center">{index + 1}</td>
                          <th
                            scope="row"
                            className="py-4 px-6 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            {list.name}
                          </th>
                          <td className="py-4 px-6 text-center">
                            {list.deskripsi}
                          </td>
                          <td className="py-4 px-6 text-center">
                            <img
                              className="ml-[100px]"
                              src={list.image}
                              alt=""
                              width={"100px"}
                              height={"100px"}
                            />
                          </td>
                          <td className="py-4 px-6 text-center">
                            {numberWithCommas (list.harga)}
                          </td>
                          {localStorage.getItem("role") === "admin" ? (
                            <td className="py-4 text-center">
                              <a href={"/edit/" + list.id}>
                                <Button variant="success" className="mx-1">
                                <i class="fa-solid fa-pen-to-square"></i>
                                </Button>
                              </a>
                              <Button
                                variant="danger"
                                className="mx-1"
                                onClick={() => deleteList(list.id)}
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
                  <h4>Tidak ada</h4>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

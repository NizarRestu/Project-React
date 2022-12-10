import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import { useHistory } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const addUser = async (e) => {
    e.preventDefault();
    e.persist();
    try {
      await axios.post("http://localhost:8000/users", {
        username: username,
        password: password,
        role: "user",
      }).then(() => {
        Swal.fire({
            icon: "success",
            title: "Berhasil Registrasi",
            showConfirmButton: false,
            timer: 1500,
          })
      history.push("/login");
      })
    } catch (error) {
    console.log(error)
    }
  };

  return (
    <div className=" flex justify-center  text-left bg-gradient-to-r from-sky-500 to-indigo-500 w-full h-screen">
      <div className="mt-[9%] w-full max-w-xs max-h-96 p-4 bg-white  border border-gray-200 rounded-lg shadow-md sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form className="space-y-6" onSubmit={addUser} method="POST">
          <h5 className="text-xl font-medium text-gray-900 dark:text-white text-center">
            Registrasi
          </h5>
          <div>
            <label className="ml-[10px] block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Email
            </label>
            <input
              type="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className=" ml-[10px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-5/6 p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="Masukan Email"
              required
            />
          </div>
          <div>
            <label
              className="  ml-[10px] block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className=" ml-[10px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-5/6 p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
            />
          </div>
          <button
            type="submit"
            className="w-5/6 ml-[10px] text-white bg-[#0066CC] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Register
          </button>
          <div className=" ml-[10px] text-sm font-medium text-black dark:text-gray-300 ">
            Sudah punya akun silahkan 
            <a
              href="/login"
              className="text-[#0000CC] hover:underline dark:text-blue-500 ml-[3px] no-underline"
            >
              login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

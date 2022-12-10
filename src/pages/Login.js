import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const login = async (e) => {
    e.preventDefault();
    axios.get("http://localhost:8000/users").then(({ data }) => {
      const user = data.find(
        (x) => x.username === username && x.password === password
      );
      if (user) {
        Swal.fire({
          icon: "success",
          title: "Masuk Sebagai " + user.role,
          showConfirmButton: false,
          timer: 1500,
        });
        localStorage.setItem("role", user.role);
        history.push("/");
      } else {
        Swal.fire({
          icon: "error",
          title: "Username atau password tidak valid!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };
  return (
    <div className=" flex justify-center  text-left bg-gradient-to-r from-sky-500 to-indigo-500 w-full h-screen">
      <div className="mt-[9%] w-full max-w-xs max-h-96 p-4 bg-white  border border-gray-200 rounded-lg shadow-md sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form className="space-y-6" onSubmit={login} method="POST">
          <h5 className="text-xl font-medium text-gray-900 dark:text-white text-center">
            Login
          </h5>
          <div>
            <label className=" ml-[10px] block mb-2 text-sm font-medium text-gray-900 dark:text-white">
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
            <label className=" ml-[10px] block mb-2 text-sm font-medium text-gray-900 dark:text-white">
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
            Login
          </button>
          <div className=" ml-[10px] text-sm font-medium text-black dark:text-gray-300 ">
            Belum punya akun silahkan
            <a
              href="/reg"
              className="text-[#0000CC] hover:underline dark:text-blue-500 ml-[3px] no-underline"
            >
              register
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

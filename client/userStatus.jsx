import * as React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchJSON } from "./lib/fetchJson";
import { FormInput } from "./lib/formInput";

export function LoginLinks() {
  return (
    <div>
      <Link to={"/login"}>Login</Link>
      <br></br>
      <Link to={"/register"}>Register new account</Link>
    </div>
  );
}

export function RegisterNewAccount() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    navigate("../");

    await fetchJSON("/api/login/register", {
      method: "post",
      json: { username, password, fullName },
    });
  }

  function handleSubmitBack() {
    navigate("/");
  }

  return (
    <div>
      <form onSubmit={handleSubmitBack}>
        <button>Go back to start page</button>
      </form>

      <hr></hr>

      <h1>Register new user account</h1>
      <form onSubmit={handleSubmit}>
        <FormInput
          label={"Username: "}
          value={username}
          onChangeValue={setUsername}
        />
        <FormInput
          label={"Full name: "}
          value={fullName}
          onChangeValue={setFullName}
        />
        <FormInput
          label={"Password: "}
          value={password}
          onChangeValue={setPassword}
        />
        <button>Log in</button>
      </form>
    </div>
  );
}

export function LogoutButton(reloadPage) {
  return (
    <button
      onClick={async () => {
        await fetch("/api/login", {
          method: "delete",
        });
        reloadPage();
      }}
    >
      Log out
    </button>
  );
}

// export function UserStatus() {
//   const loginApi = {
//     async tryUser() {
//       return await fetchJSON("/api/login");
//     },
//   };
//
//   return (
//     <Routes>
//       <Route path={"/"} element={<LoginLinks />} />
//       <Route path={"/login"} element={<Login loginApi={loginApi} />}></Route>
//     </Routes>
//   );
// }

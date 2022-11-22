import * as React from "react";
import { useState } from "react";
import { Form, Link, Route, Routes, useNavigate } from "react-router-dom";
import { fetchJSON } from "./fetchJson";

export function LoginLinks() {
  return (
    <div>
      <Link to={"/login"}>Login</Link>
      <br></br>
      <Link to={"/register"}>Register new account</Link>
    </div>
  );
}

function FormInput({ label, value, onChangeValue }) {
  return (
    <div>
      <label>
        <strong>{label}</strong>{" "}
        <input value={value} onChange={(e) => onChangeValue(e.target.value)} />
      </label>
      <br></br>
    </div>
  );
}

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    //POST Login
    const res = await fetch("/api/login", {
      method: "post",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      alert("Unauthorized");
    }
    if (res.ok) {
      navigate("/");
    }
  }

  function handleSubmitBack(e) {
    e.preventDefault();
    navigate("/");
  }

  return (
    <div>
      <form onSubmit={handleSubmitBack}>
        <button>Go back to start page</button>
      </form>

      <hr></hr>

      <h1>Please login!</h1>

      <form onSubmit={handleSubmit}>
        <FormInput
          label={"Username: "}
          value={username}
          onChangeValue={setUsername}
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

export function LoginForTest({ loginApi }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    loginApi.fakeLogin({ username, password }); //For test

    function handleSubmitBack(e) {
        e.preventDefault();
        navigate("/");
    }

    function handleSubmit(e) {
        e.preventDefault();

        loginApi.fakeLogin({ username, password })      //For test
    }

    return (
        <div>
            <form onSubmit={handleSubmitBack}>
                <button>Go back to start page</button>
            </form>

            <hr></hr>

            <h1>Please login!</h1>

            <form onSubmit={handleSubmit}>
                <FormInput
                    label={"Username: "}
                    value={username}
                    onChangeValue={setUsername}
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

      <form onSubmit={handleSubmit}>
        <h1>Register new user account</h1>
        <div>
          Username:{" "}
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          Full name:{" "}
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div>
          Password:{" "}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
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

export function UserStatus() {
  const loginApi = {
    async tryUser() {
      return await fetchJSON("/api/login");
    },
  };

  return (
    <Routes>
      <Route path={"/"} element={<LoginLinks />} />
      <Route path={"/login"} element={<Login loginApi={loginApi} />}></Route>
    </Routes>
  );
}

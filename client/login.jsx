import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormInput } from "./lib/formInput";
import {fetchJSON} from "./lib/fetchJson";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    //POST Login
    const res = await fetchJSON("/api/login", {
      method: "post",
      json: ({ username, password }),
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
import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchJSON } from "./lib/fetchJson";
import { FormInput } from "./lib/formInput";

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
        <button>Create user</button>
      </form>
    </div>
  );
}

export function RegisterNewAccountForTest({ registerApi }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    navigate("../");
  }

  registerApi.addUser({ username, fullName, password }); //For test

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

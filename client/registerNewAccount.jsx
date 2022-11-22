import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormInput } from "./lib/formInput";

export function RegisterNewAccount() {
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    navigate("../");

    await fetch("/api/login/register", {
      method: "post",
      body: JSON.stringify({ username, password, fullName }),
      headers: {
        "Content-Type": "application/json",
      },
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
        <FormInput label={"Role: "} value={role} onChangeValue={setRole} />

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
        <label>
          <strong>Password: </strong>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <button>Create user</button>
      </form>
    </div>
  );
}

export function RegisterNewAccountForTest({ registerApi }) {
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    navigate("../");
  }

  registerApi.addUser({ role, username, fullName, password }); //For test

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
        <FormInput label={"Role: "} value={role} onChangeValue={setRole} />
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

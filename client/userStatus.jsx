import * as React from "react";
import { Link } from "react-router-dom";

export function LoginLinks() {
  return (
    <div>
      <Link to={"/login"}>Login</Link>
      <br></br>
      <Link to={"/register"}>Register new account</Link>
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

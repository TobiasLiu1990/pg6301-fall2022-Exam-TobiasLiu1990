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

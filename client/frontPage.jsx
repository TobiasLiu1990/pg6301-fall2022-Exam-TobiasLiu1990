import * as React from "react";
import { useLoader } from "./lib/useLoader";
import { fetchJSON } from "./lib/fetchJson";
import { ShowMenu } from "./cateringApplication";
import { LoginLinks, LogoutButton } from "./userStatus";

/*
  Frontpage now shows different depending on if user is logged in.
 */
export function FrontPage() {
  const { loading, error, data, reloadPage } = useLoader(
    async () => await fetchJSON("/api/login")
  );
  const user = data;
  const logoutUser = LogoutButton(reloadPage);

  if (loading) {
    return <div>Page loading...</div>;
  }
  if (error) {
    return (
      <div style={{ border: "solid red 1px", background: "red" }}>
        An error occurred in Frontpage: {error.toString()}
      </div>
    );
  }

  return (
    <div>
      {user ? (
        <div>
          <h2>
            Welcome: {user.fullName} - {user.username}
          </h2>
          <hr></hr>
          <ShowMenu user={user} />
          {logoutUser}
        </div>
      ) : (
        <LoginLinks />
      )}
    </div>
  );
}

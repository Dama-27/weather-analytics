import { useAuth0 } from '@auth0/auth0-react';

function AuthButtons() {
  const {
    isAuthenticated,
    loginWithRedirect,
    logout,
    user,
  } = useAuth0();

  if (isAuthenticated) {
    return (
      <div className="user-profile">
        <span className="user-name">
          {user?.name || user?.email || 'Logged in'}
        </span>

        <button
          className="btn btn-secondary"
          onClick={() =>
            logout({
              logoutParams: {
                returnTo: window.location.origin,
              },
            })
          }
        >
          Log out
        </button>
      </div>
    );
  }

  return (
    <button className="btn btn-primary" onClick={() => loginWithRedirect()}>
      Log in
    </button>
  );
}

export default AuthButtons;
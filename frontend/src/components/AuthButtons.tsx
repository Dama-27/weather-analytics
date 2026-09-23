import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function getErrorMessage(error: Error): string {
  const msg = error.message || '';
  const lower = msg.toLowerCase();

  if (lower.includes('verify') || lower.includes('verification') || lower.includes('email')) {
    return 'Your email address is not verified.';
  }

  if (lower.includes('blocked') || lower.includes('too many attempts')) {
    return 'This account is blocked.';
  }

  if (lower.includes('access_denied') || lower.includes('unauthorized')) {
    return 'Access was denied.';
  }

  return msg || 'Unable to log in. Please try again.';
}

function AuthButtons() {
  const {
    isAuthenticated,
    isLoading,
    error,
    loginWithRedirect,
    logout,
    user,
  } = useAuth0();

  useEffect(() => {
    if (error && window.location.search) {
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [error]);

  const handleLoginAgain = () => {
    if (window.location.search) {
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    loginWithRedirect({
      authorizationParams: {
        prompt: 'login',
      },
    });
  };

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (error) {
    return (
      <div className="auth-error">
        <p className="error-message">
          {getErrorMessage(error)}
        </p>

        <button
          className="btn btn-primary"
          onClick={handleLoginAgain}
        >
          Log in again
        </button>
      </div>
    );
  }

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
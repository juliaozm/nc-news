import { Link } from "react-router-dom";

export const ErrorComponent = ({ error }) => {
  if (error && error.response) {
    return (
      <section className="error-section">
        <h1>Ooops... Not Found!</h1>
        <Link to="/articles" className="back-link link-border">
          Try again
        </Link>
      </section>
    );
  }
  return (
    <section className="error-section">
      <h1>404</h1>
      <h2>Ooops, we could not find this page</h2>
      <Link to="/articles" className="back-link link-border">
        Go to Home
      </Link>
    </section>
  );
};

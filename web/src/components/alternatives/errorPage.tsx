import { useRouteError } from "react-router-dom";
import restart from "../../styles/assets/restart.svg";

// Defines a custom error type that includes an optional statusText property.
interface CustomError extends Error {
  statusText?: string;
}

// Defines the ErrorPage component.
export default function ErrorPage() {
  // Get the current route error using react-router-dom's useRouteError hook.
  const error = useRouteError() as CustomError;
  // Log the error to the console for debugging.
  console.error(error);

  // Defines a function that refreshes the page.
  function refreshPage() {
    window.location.reload();
  }

  // Renders the error page component.
  return (
    <div className="errorpage">
      <h1>Oops!</h1>
      <p>Desculpe, um erro inesperado ocorreu.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      {/* Renders a button that calls the refreshPage function when clicked.*/}
      <button onClick={refreshPage} className="error">
        <img src={restart} width={25} alt="restart" />
      </button>
    </div>
  );
}
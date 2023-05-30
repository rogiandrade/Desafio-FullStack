import { useRouteError } from "react-router-dom";
import restart from "../../styles/assets/restart.svg";

interface CustomError extends Error {
  statusText?: string;
}

export default function ErrorPage() {
  const error = useRouteError() as CustomError;
  console.error(error);

  function refreshPage() {
    window.location.reload();
  }

  return (
    <div className="errorpage">
      <h1>Oops!</h1>
      <p>Desculpe, um erro inesperado ocorreu.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <button onClick={refreshPage} className="error">
        <img src={restart} width={25} alt="restart" />
      </button>
    </div>
  );
}
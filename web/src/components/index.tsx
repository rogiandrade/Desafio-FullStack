import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../lib/axios";
import { Loading } from "./alternatives/loading";
import ErrorPage from "./alternatives/errorPage";

export default function Root() {

  const [hasException, setHasException] = useState(false)

  const navigate = useNavigate()

  {/* this function confirms the connection status with the API */ }
  async function verifyStatus() {
    try {
      setHasException(false);
      const { data } = await api.get("/status");
      if (data.message === "API is up and running") {
        navigate("/login");
      }
      throw new Error("Unexpected response from API");
    } catch (error) {
      console.error(error);
      setHasException(true);
    }
  }

  useEffect(() => {
    verifyStatus()
  }, [])

  return (
    <div>
      {hasException && <ErrorPage />}
      {hasException ?? <Loading />}
    </div>
  )

}
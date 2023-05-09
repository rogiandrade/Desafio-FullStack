import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../lib/axios";
import { Loading } from "./loading";
import ErrorPage from "./errorPage";

export default function Root() {

    const [hasException, setHasException] = useState(false)

    const navigate = useNavigate()

    {/* this function confirms the connection status with the API */ }
    async function verifyStatus() {
        try {

            setHasException(false)

            const { data } = await api.get('/status')

            if (data.status == "API is up and running") {

                navigate("/login")

            }

            throw new DOMException()

        } catch (error) {

            setHasException(true)

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
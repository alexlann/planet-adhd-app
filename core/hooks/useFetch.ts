import { useCallback, useEffect, useState } from "react";
import useAuthApi from "./useAuthApi";
import { API_URL } from "@env"

const useFetch = (path: string, onSuccess?: (args0?: any) => void) => {
    const { authFetch } = useAuthApi();
    const [data, setData] = useState<any>();
    const [error, setError] = useState();

    const fetchData = useCallback(() => {
        let isCurrent = true;
        authFetch(`${API_URL}${path}`, {})
            .then((response: any) => {
                isCurrent
                if (response.ok) {
                    return response.json() as Promise<ResponseType>;
                }
                throw new Error(`Something went wrong with ${path}`);
            })
            .then((responseJson: any) => {
                onSuccess && onSuccess(responseJson);
                isCurrent && setData(responseJson as unknown);
            })
            //@ts-ignore
            .catch((error: any) => isCurrent && setError(String(error)));
        return () => (isCurrent = false);
    }, [path, authFetch]);

    const invalidate = () => {
        fetchData();
    };

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const isLoading = !error && !data;

    return {
        isLoading,
        data,
        error,
        invalidate,
    };
};

export default useFetch;

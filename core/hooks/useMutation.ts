import { useState } from "react";
import useAuthApi from "./useAuthApi";
import { FormMethods } from "../../types";

const useMutation = () => {
    const { authFetch } = useAuthApi();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const mutate = async (url: string, options: {"method": FormMethods, data?: object, onSuccess?: (arg0: any)=>void, jsonOnSuccess?: (arg0: any) => void, onError?: (arg0: any)=>void }) => {
        setIsLoading(true);

        const headers = {
            "accept": "application/json",
            "content-type": "application/json",
        };

        try {
            const response = <Response>await authFetch(url, {
                method: options.method ?? FormMethods.post,
                headers: headers,
                body: JSON.stringify(options.data ?? {}),
            });

            if(response.status === 200) {
                if (options.onSuccess) {
                    options.onSuccess(response);
                }
                if (options.jsonOnSuccess) {
                    options.jsonOnSuccess(await response.json());
                }
            } else {
                if (options.onError) {
                    options.onError(String(error));
                } else {
                    setError(String(error));
                }
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            if (options.onError) {
                options.onError(String(error));
            } else {
                setError(String(error));
            }
        }
    };

    return {
        isLoading,
        error,
        mutate,
    };
};

export default useMutation;

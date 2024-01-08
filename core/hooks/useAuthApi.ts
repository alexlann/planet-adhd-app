import { useCallback } from "react";
import { useAuthContext } from "../../authentication/AuthProvider";

const useAuthApi = () => {
    const authContext = useAuthContext();

    const authFetch = useCallback(
        (url: string, config: any) => {
            // add authorization header
            if (authContext?.auth && authContext?.auth.token) {
                config.headers = {
                    ...(config.headers || {}),
                    Authorization: `Bearer ${authContext?.auth.token}`,
                };
            }

            return fetch(url, config)
                .catch((error) => {
                    authContext?.logout();
                });
        },
        [authContext?.logout, authContext?.auth]
    );

    return {
        authFetch,
    };
};

export default useAuthApi;

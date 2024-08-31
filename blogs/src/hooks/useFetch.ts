import { useEffect, useState } from "react";

function useFetch<T>(url: string) : { data : T | null, loading : boolean, error : string | null} {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        setLoading(true);
        fetch(url, { signal })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Something went wrong');
                }
                return res.json();
            })
            .then((data: T) => {
                setData(data);
                setError(null);
                setLoading(false);
            })
            .catch(e => {
                setError(e.message);
                setLoading(false); // Ensure loading is false after an error
            });

        // Cleanup function
        return () => {
            abortController.abort();
        };
    }, [url]);

    return { data, loading, error };
}

export default useFetch;

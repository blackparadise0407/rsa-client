import { useEffect, useState } from 'react';

export default function useData<T>(
    fetcher: (...args: any) => Promise<T>,
    initialValue: T,
    ...args: any
) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(initialValue);
    const [error, setError] = useState<string>(null);

    useEffect(() => {
        let mounted = true;
        async function fetch() {
            setLoading(true);
            setError(null);
            try {
                const data = await fetcher(...args);
                setData(data);
                setLoading(false);
            } catch (e: any) {
                setError(e?.message);
            } finally {
                setLoading(false);
            }
        }
        if (mounted) {
            fetch();
        }
        return () => {
            mounted = false;
        };
    }, []);

    return {
        data,
        loading,
        error,
    };
}

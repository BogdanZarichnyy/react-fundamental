import { useState } from "react"

export const useFetching = (callback) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // const fetching = async () => {
    const fetching = async (...args) => { //другий варіант як уникнути запізнення зі станом зміни сторінок
        try {
            setIsLoading(true);
            // await callback();
            await callback(...args); //другий варіант як уникнути запізнення зі станом зміни сторінок
        }
        catch (error) {
            setError(error.message);
        }
        finally {
            setIsLoading(false);
        }
    }

    return [fetching, isLoading, error];
}
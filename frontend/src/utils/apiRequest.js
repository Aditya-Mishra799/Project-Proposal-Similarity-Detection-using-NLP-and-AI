const baseHeader = {
    'Content-Type': 'application/json',
};

// API request function
export const apiRequest = async (endpoint, messageBody, method = 'GET', headers = baseHeader) => {
    console.log(messageBody);
    const url = `${import.meta.env.VITE_BACKEND_URL}${endpoint}`;
    let data;
    let error;

    try {
        const response = await fetch(url, {
            method: method,
            headers: headers,
            credentials: 'include', 
            body: JSON.stringify(messageBody),
        });

        data = await response.json();

        if (!response.ok) {
            error = data.message || 'An unknown error occurred';
            throw new Error(error);
        }
    } catch (err) {
        error = err.message;
    }

    return { data, error };
};

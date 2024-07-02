export const fetchData = async () => {
    const response = await fetch('/api');
    const data = await response.json();
    return data;
};
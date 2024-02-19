export default async function fetchDataFromAPI(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Ошибка при получении данных из API:', error);
    }
    }
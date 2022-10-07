const isProduction = true;
const productionUrl = "https://jsonplaceholder.typicode.com";
const developmentUrl = "https://localhost:5050";

export const getUrl = () => {
    if (isProduction) return productionUrl;
    return developmentUrl;
};

console.log(getUrl);
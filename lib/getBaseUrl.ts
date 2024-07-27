const getBaseUrl = () => (process.env.NODE_ENV === "development" ? "http://localhost:3000" : `https://docsmart-rsujays-projects.vercel.app/`);

export default getBaseUrl;

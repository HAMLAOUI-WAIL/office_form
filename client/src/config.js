let BASE_URL = "";
let API_ENDPOINT = "";

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  BASE_URL = "http://localhost:4000/";
  API_ENDPOINT = 'http://localhost:4000/api/chatbot/sendMessage';
}

export { BASE_URL, API_ENDPOINT };

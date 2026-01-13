const ENV = import.meta.env.MODE;
export const BASE_URL = ENV === 'production' ? "/api" : 'http://localhost:7777/api'
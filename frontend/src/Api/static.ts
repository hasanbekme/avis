const BASE_STATIC_URL = "http://localhost:8000/"

const Static = (path: string): string => {
   return BASE_STATIC_URL + path; 
}

export default Static
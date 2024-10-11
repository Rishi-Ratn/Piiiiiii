import axios from "axios";
import { apibaseUrl } from "../constants/constants";

export const callAPI= async (method, url, data, headers) => {
     console.log("api Url: ", apibaseUrl);
     try {
          const options = {
               method,
               url: `${apibaseUrl}${url}`,
               headers: {
                 ...headers,
               },
             };
             if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
               options.data = data;
             }
             const response = await axios(options);
             return response.data;
          
     } catch (error) {
          console.log("Error in callAPI: ", error);
          
     }
     
};
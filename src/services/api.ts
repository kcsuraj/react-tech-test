import axios from 'axios';

const getLocalities = (suburb: string, state: string) =>
  axios.get(`${process.env.REACT_APP_API_URL}/localities`, {
    params: {
      suburb,
      state
    }
  });

export { getLocalities };

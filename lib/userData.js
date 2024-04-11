import { getToken } from "./authenticate";

    export async function makeRequest(url,method){
      const token = getToken();
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
          method: method,
          headers: {
              'Authorization': `JWT ${token}`,
              'Content-Type': 'application/json'
          },
      });
      if (res.status == 200) {
          return await res.json();
      } else {
          return [];
      }
    }

    export async function addToFavourites(id){
      return await makeRequest(`/favourites/${id}`, 'PUT');
    }

    export async function removeFromFavourites(id) {
      return await makeRequest(`/favourites/${id}`, 'DELETE');
    }

    export async function getFavourites() {
      return await makeRequest(`/favourites`, 'GET');
    }

    export async function addToHistory(id) {
      return await makeRequest(`/history/${id}`, 'PUT');
    }

    export async function removeFromHistory(id) {
      return await makeRequest(`/history/${id}`, 'DELETE');
    }

    export async function getHistory() {
      return await makeRequest(`/history`, 'GET');
    }
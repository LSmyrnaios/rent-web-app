const apiRoot = 'https://localhost:8443/api';
const usersEndpoint = apiRoot + '/users';
const hotelsEndpoint = apiRoot + '/hotels';

export const environment = {
  production: true,
  googleMapsKey: '',
  apiRoot,
  usersEndpoint,
  hotelsEndpoint,
  hotelPhotosEndpoint: hotelsEndpoint + '/photos'
};

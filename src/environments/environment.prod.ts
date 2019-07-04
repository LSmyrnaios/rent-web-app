const apiRoot = 'https://localhost:8443/api';
const usersEndpoint = apiRoot + '/users';
const hotelsEndpoint = apiRoot + '/hotels';
const businessesEndpoint = apiRoot + '/businesses';


export const environment = {
  production: true,
  googleMapsKey: '',
  apiRoot,
  usersEndpoint,
  hotelsEndpoint,
  businessEndpoint: businessesEndpoint,
  checkEndpoint: apiRoot + '/check'
};

/* eslint-disable no-console */
import axios from 'axios';
import { HubConnectionBuilder } from '@microsoft/signalr';
// eslint-disable-next-line import/no-cycle
import { authHeader } from './authHeader';

const API_URL = 'http://localhost:63850/';

export const authenticate = async (username, password) => {
  return axios
    .post(`${API_URL}api/Auth/CreateToken`, {
      username,
      password,
    })
    .then(response => {
      return response.data;
    })
    .catch(err => {
      console.log(err);
      return null;
    });
};

export const getFireFighters = async () => {
  return axios
    .get(`${API_URL}api/Notify/ListFighters`, {
      headers: authHeader(),
    })
    .then(response => {
      return response.data;
    })
    .catch(err => {
      console.log(err);
      return null;
    });
};
export const getFireDepartments = async () => {
  return axios
    .get(`${API_URL}api/Notify/ListDepartments`, {
      headers: authHeader(),
    })
    .then(response => {
      return response.data;
    })
    .catch(err => {
      console.log(err);
      return null;
    });
};

export const getFireDepartmentDetails = async id => {
  return axios
    .get(`${API_URL}api/Notify/DetailsFireDepartments?id=${id}`, {
      headers: authHeader(),
    })
    .then(response => {
      return response.data;
    })
    .catch(err => {
      console.log(err);
      return null;
    });
};

export const updateFireDepartment = async departmentModel => {
  return axios
    .post(
      `${API_URL}api/Notify/EditFireDepartment`,
      {},
      {
        headers: authHeader(),
        data: departmentModel,
      }
    )
    .then(response => {
      return response.data;
    })
    .catch(err => {
      console.log(err);
      return null;
    });
};

export const getFireFighter = async id => {
  return axios
    .get(`${API_URL}api/Notify/DetailsFighter?id=${id}`, {
      headers: authHeader(),
    })
    .then(response => {
      return response.data;
    })
    .catch(err => {
      console.log(err);
      return null;
    });
};

export const addFireFighter = async fighterModel => {
  return axios
    .post(
      `${API_URL}api/Notify/AddFireFighter`,
      {},
      {
        headers: authHeader(),
        data: fighterModel,
      }
    )
    .then(response => {
      return response.data;
    })
    .catch(err => {
      console.log(err);
      return null;
    });
};

export const hubConnection = () => {
  return new HubConnectionBuilder()
    .withUrl(`${API_URL}api/notifyhub`)
    .withAutomaticReconnect()
    .build();
};

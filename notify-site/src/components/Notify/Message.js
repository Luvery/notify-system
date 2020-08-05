/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import { useState } from 'react';
// import { HubConnectionState } from '@microsoft/signalr';
import { hubConnection } from '../../utils/apiServices';

const hub = hubConnection();

export const getHub = async () => {
  return hub;
};

export const connectHub = async () => {
  // if (hub.connectionState !== HubConnectionState.Connected) {
  await hub
    .start()
    .then(() => console.log('Connection started!'))
    .catch(err => console.log('Error while establishing connection :(', err));
  hub.onclose(() => {
    console.log('reconnected');
    hub
      .start()
      .then(() => console.log('Connection started!'))
      .catch(err => console.log('Error while establishing connection :(', err));
  });
  // }
};

export const sendMessage = async payload => {
  console.log(payload.description, payload.departmentOptions);
  await hub
    .invoke('sendToAll', payload.description, payload.departmentOptions)
    .catch(err => console.error(err));
};

// let response = { number: '', answer: '' };
export const receiveMessage = async () => {
  hub.on('onAnswer', (number, answer) => {
    let [response] = useState();
    response = {
      number,
      answer,
    };
    return response;
  });
};

export const disconnectHub = async () => {
  hub.stop();
};

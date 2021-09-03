import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from '@microsoft/signalr';

const API_URL = `${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_HUB_ENDPOINT}`;

const openSocketConnection = (): HubConnection => {
  const connection = new HubConnectionBuilder()
    .withUrl(API_URL)
    .withAutomaticReconnect([0, 1000, 10000, 100000])
    .configureLogging(LogLevel.Information)
    .build();

  return connection;
};

export default openSocketConnection;

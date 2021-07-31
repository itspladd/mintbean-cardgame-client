import makeSocketHandlers from './socket'
import makeUserHandlers from './users'

export default function makeSocketEventHandlers(appData) {
  makeUserHandlers(appData);
  makeSocketHandlers(appData);
}
import 'reflect-metadata';

import { Pretend } from 'pretend';
import { MatrixClient } from './cli';

let auth = '';

export const setAuth = (_auth: string) => (auth = _auth);

export const client: MatrixClient = Pretend.builder()
  .requestInterceptor(request => {
    request.options.headers = {
      'Content-Type': 'application/json;charset=UTF-8'
    };
    if (auth) {
      request.options.headers['Authorization'] = `Bearer ${auth}`;
    }
    return request;
  })
  // .target(MatrixClient, 'http://localhost:8008/');
  .target(MatrixClient, 'http://localhost:1234/');

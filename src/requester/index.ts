import axios from 'axios';
import { Prepare } from '../prepare';
import { IRequester } from '../types';

export class Requester implements IRequester {
  private prepare: Prepare;

  constructor(prepare: Prepare) {
    this.prepare = prepare;
  }

  public get(): Promise<string> {
    return axios
      .get(this.prepare.getUrl(), {
        headers: this.prepare.getConfig().headers,
      })
      .then((res) => res.data);
  }
}

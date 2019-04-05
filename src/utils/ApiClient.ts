import axios from 'axios';

export default class ApiClient {
  private static get apiKey(): string {
    // REACT_APP_API_KEYの型はstring | undefinedであるが、
    // stringを主張するため「!」（Non-null assertion operator）をつけている
    return process.env.REACT_APP_API_KEY!;
  }

  private static get endpointUrl(): string {
    return process.env.REACT_APP_ENDPOINT_URL!;
  }

  static async search(q: string, options = {}) {
    const { data } = await axios.get<gapi.client.youtube.SearchListResponse>(
      `${this.endpointUrl}/search`,
      {
        params: {
          ...options,
          q,
          part: 'snippet',
          type: 'video',
          key: this.apiKey
        }
      }
    );
    return data;
  }

  static async videos(id: string, options = {}) {
    const { data } = await axios.get<gapi.client.youtube.VideoListResponse>(
      `${this.endpointUrl}/videos`,
      {
        params: {
          ...options,
          id,
          part: 'snippet,player',
          key: this.apiKey
        }
      }
    );
    return data;
  }
}

export const REDDIT_CONFIG = {
  clientId: 'YOUR_CLIENT_SECRET',
  uri: 'https://www.reddit.com/api/v1/authorize.compact',
  oAuthApi: 'https://oauth.reddit.com',
  protocol: 'song',
  redirectUri: 'redirect',
  responseType: 'token',
  state: 'RANDOM_STRING',
  scope: ['vote', 'submit', 'read', 'identity', 'edit']
};

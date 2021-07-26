import dotenv from 'dotenv'
dotenv.config()

export default {
  twitterBaseUrl: process.env.TWITTER_BASE_URL || '',
  apiKey: process.env.API_KEY || '',
  apiSecret: process.env.API_SECRET || '',
  bearerToken: process.env.BEARER_TOKEN || '',
  accessToken: process.env.ACCESS_TOKEN || '',
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || ''
}

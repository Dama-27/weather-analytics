import { auth } from 'express-oauth2-jwt-bearer';
import { env } from '../config/env';

export const validateAccessToken = auth({
  issuerBaseURL: `https://${env.auth0Domain}`,
  audience: env.auth0Audience,
});


/// <reference types="vite/client" />
import { z } from 'zod'

const envSchema = z.object({
  VITE_APP_NAME: z.string().default('template'),
  VITE_APP_ENV: z.enum(['local', 'development', 'staging', 'production']).default('local'),
  VITE_API_BASE_URL: z.string().url().default('http://localhost:8080'),
  VITE_AUTH_PROVIDER: z.enum(['firebase', 'cognito']).default('firebase'),
  VITE_MOCK_API: z
    .string()
    .transform((v) => v === 'true')
    .default('false'),

  // Firebase
  VITE_FIREBASE_API_KEY: z.string().optional(),
  VITE_FIREBASE_AUTH_DOMAIN: z.string().optional(),
  VITE_FIREBASE_PROJECT_ID: z.string().optional(),
  VITE_FIREBASE_APP_ID: z.string().optional(),

  // Cognito
  VITE_COGNITO_REGION: z.string().optional(),
  VITE_COGNITO_USER_POOL_ID: z.string().optional(),
  VITE_COGNITO_CLIENT_ID: z.string().optional(),
  VITE_COGNITO_DOMAIN: z.string().optional(),
  VITE_COGNITO_REDIRECT_SIGN_IN: z.string().optional(),
  VITE_COGNITO_REDIRECT_SIGN_OUT: z.string().optional(),
})

export const env = envSchema.parse(import.meta.env)

export type Env = z.infer<typeof envSchema>

export const isFirebaseAuth = () => env.VITE_AUTH_PROVIDER === 'firebase'
export const isCognitoAuth = () => env.VITE_AUTH_PROVIDER === 'cognito'
export const isMockMode = () => env.VITE_MOCK_API === true
export const isDev = () => env.VITE_APP_ENV === 'local' || env.VITE_APP_ENV === 'development'
export const isProd = () => env.VITE_APP_ENV === 'production'

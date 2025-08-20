import Joi from 'joi';

const envSchema = Joi.object({
  FIREBASE_SERVICE_ACCOUNT: Joi.string().required(),
  FIREBASE_PROJECT_ID: Joi.string().required(),
  PORT: Joi.number().default(3000),
  NODE_ENV: Joi.string().valid('development', 'staging', 'production'),
  IOS_SCHEMA_LINK: Joi.string().required(),
  IOS_STORE_URL_CHROME: Joi.string().uri().required(),
  IOS_TIMEOUT_MS: Joi.number().default(5000),
  ANDROID_APP_LINK_HOST: Joi.string().required(),
  ANDROID_APP_LINK_PATH: Joi.string().required(),
  ANDROID_PACKAGE_NAME: Joi.string().required(),
  ANDROID_TIMEOUT_MS: Joi.number().default(5000),
  ANDROID_STORE_URL: Joi.string().uri().required(),
  // Add more variables and validation rules as needed
}).unknown();

const { value: envVars, error } = envSchema.validate(process.env, {
  abortEarly: false,
});

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const appConfig = {
  firestore: {
    project: envVars.FIREBASE_PROJECT_ID,
    serviceAccount: envVars.FIREBASE_SERVICE_ACCOUNT,
  },
  next: {
    url: envVars.NEXT_PUBLIC_API_URL,
    port: envVars.PORT,
  },
  ios: {
    installUrl: envVars.IOS_STORE_URL,
    installUrlChrome: envVars.IOS_STORE_URL_CHROME,
    universalLink: envVars.IOS_UNIVERSAL_LINK,
    schemaLink: envVars.IOS_SCHEMA_LINK,
    // schemaLink: envVars.IOS_UNIVERSAL_LINK,
    // universalLink: envVars.IOS_SCHEMA_LINK,
    timeout: envVars.IOS_TIMEOUT_MS,
  },
  android: {
    installUrl: envVars.ANDROID_STORE_URL,
    packageName: envVars.ANDROID_PACKAGE_NAME,
    host: envVars.ANDROID_APP_LINK_HOST,
    timeout: envVars.ANDROID_TIMEOUT_MS,
  },
  // Add more as needed
};

import { defineBackend } from '@aws-amplify/backend';

// (optional imports for resources go here, like Lambdas, APIs, auth, etc.)

export const backend = defineBackend({
  myFirstFunction,
});

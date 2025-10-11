import { defineBackend } from '@aws-amplify/backend';
import { myFirstFunction } from './my-first-function/resource';

// (optional imports for resources go here, like Lambdas, APIs, auth, etc.)

export const backend = defineBackend({
  myFirstFunction,
});

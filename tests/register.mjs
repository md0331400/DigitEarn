/* Loads module hooks so API handlers run against in-memory mocks (no Firebase needed). */
import { register } from 'node:module';
register(new URL('./hooks.mjs', import.meta.url));

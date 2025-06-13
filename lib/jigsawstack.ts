import { JigsawStack } from "jigsawstack";

/**
 * Singleton implementation of JigsawStack client.
 * This ensures only one instance is created and reused throughout the application.
 */
export const jigsawStackClient = JigsawStack({
  apiKey: process.env.JIGSAWSTACK_API_KEY,
});

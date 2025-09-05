import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  roots: ["<rootDir>"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};

export default config;

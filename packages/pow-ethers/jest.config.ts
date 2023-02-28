export default {
  coverageThreshold: {
      global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80 
    }
  },
  errorOnDeprecated: false,
  maxWorkers: "65%",
  testEnvironment: "jsdom",
  preset: "ts-jest",
};

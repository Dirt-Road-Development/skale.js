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
  preset: "ts-jest",
};

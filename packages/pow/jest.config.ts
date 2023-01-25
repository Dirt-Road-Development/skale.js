export default {
  coverageThreshold: {
      global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80 
    }
  },
  errorOnDeprecated: true,
  maxWorkers: "15%",
  preset: "ts-jest",
};

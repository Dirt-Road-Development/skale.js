export default {
  collectCoverage: true,

  // An object that configures minimum threshold enforcement for coverage results
  coverageThreshold: {
    global: {
    branches: 95,
    functions: 100,
    lines: 100,
    statements: 100
  }
},

  // Make calling deprecated APIs throw helpful error messages
  errorOnDeprecated: false,

  // The maximum amount of workers used to run your tests. Can be specified as % or a number. E.g. maxWorkers: 10% will use 10% of your CPU amount + 1 as the maximum worker number. maxWorkers: 2 will use a maximum of 2 workers.
  maxWorkers: "50%",

  // A preset that is used as a base for Jest's configuration
  preset: "ts-jest",
};

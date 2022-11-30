export default {
  coverageReporters: [
      "json-summary"
  ],
  maxWorkers: "75%",

  // A preset that is used as a base for Jest's configuration
  preset: "ts-jest",
  projects: ['<rootDir>/packages/*'],
};

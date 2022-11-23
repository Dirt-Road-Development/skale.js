export default {
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: [
      "json-summary"
  ],
  projects: ['<rootDir>/packages/*'],
};

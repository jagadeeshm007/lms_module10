// /** @type {import('ts-jest').JestConfigWithTsJest} */
// module.exports = {
//     preset: "ts-jest",
//     testEnvironment: "node",
//     transform: {
//       "^.+\\.ts?$": [
//         "ts-jest",
//         {
//           useESM: true, // Enable ES Modules
//         },
//       ],
//     },
//     extensionsToTreatAsEsm: [".ts"],
//     moduleNameMapper: {
//       "\\.(svg|jpg|jpeg|png|gif|ttf|woff|woff2|eot|otf)$": "<rootDir>/tests/__mocks__/fileMock.js",
//     },
//     moduleFileExtensions: ["ts", "js", "json", "node"],
//   };

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
};

  
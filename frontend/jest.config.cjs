// module.exports = {
//   preset: 'ts-jest',
//   testEnvironment: 'jest-environment-jsdom',
//   transform: {
//     '^.+\\.(ts|tsx)$': 'ts-jest'
//   },
//   moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
// };

module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(svg|jpg|jpeg|png|gif|ttf|woff|woff2|eot|otf)$": "<rootDir>/jestFileMock.js"
  }
};


// import { Config } from "jest";

// const config: Config = {
//   preset: "ts-jest",
//   testEnvironment: "jsdom",
//   moduleNameMapper: {
//     "\\.(css|less|scss|sass)$": "identity-obj-proxy"
//   }
// };

// export default config;


export default {
  testMatch: ['**/specs/homework8.spec.js'],
  "transform": {
    "^.+\\.[t|j]sx?$": "babel-jest"
  },
  reporters: [
    "default", 
    [
      "jest-html-reporters", {
        "publicPath": "./jest-html-report",
        "filename": "report.html"
      }
    ]
  ]
}
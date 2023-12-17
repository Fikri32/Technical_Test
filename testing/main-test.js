// main-test.js
const page1Test = require('./create-test');
const page2Test = require('./edit-test');
const page3Test = require('./delete-test');


async function runTests() {
  await page1Test.runTestCreate();
  await page2Test.runTestEdit();
  await page3Test.runTestDelete();
}

runTests();



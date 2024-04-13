import { expect, it } from "vitest";
import { generateToken, generateTokenPromise } from "./async-example";

//given valid input through the test to make sure the token function is working correctly
/*
because this function is have two parameters (doneFn[callback]) then we can't give it to a variable
  doneFn have two parameters (err, token).
  toBeDefined() => is a matcher function that checks whether a value is defined.
  It is typically used to write "assertions" in unit tests to verify that a value is not "undefined".
  call back function test
*/
/*
expect(token).toBeDefined(); => this is not the way to test callback function.
    This will pass if the input was a string But what if it was a number.
    With the following, the test will also pass which means the test is not working because the input was a number and not a string.
      expect(token).toBe(2);
      This can work with asynchronous code
*/
/*
To make the test work, when working with callback functions,
 we need to accept one extra parameter in the inner test function.
So that function you pass to it or the test function. And that parameter could be called "done".
This will actually be a function that you should call once you are done in your testing code.
-------------------
Note: Vitest or Jest won't wait for any inner callback functions to finish.
It will just invoke generateToken(testUserEmail, (err, token)) and it will not wait for the call back 
to be executed.
And it will therefore not find any expectation in the entire test code
And the test will be pass because there is no assertion at all.
That's why you will call done() in the place where you know that you will be done with all your
testing related work. 
Then Vitest and jest will wait until done() is called.
*/

it("should generate a token value", (done) => {
  const testUserEmail = "testuser@example.com";

  generateToken(testUserEmail, (err, token) => {
    /* 
    expect(token).toBeDefined(); //this way the test will work and the token will pass.
     To see an error for the wrong input then this will be the only case where you use try and catch code
    If the expectation within try has not met then you want call done(err) and forward the 
    error you caught. 
    
    Other wise you want to call done() without any arguments to be like the following:
    try {
        expect(token).toBe(2);
        done();
    } catch (err) {
        done(err);
    }
       
       */

    try {
      // expect(token).toBe(2); this to catch a wrong input
      expect(token).toBeDefined();
      done();
    } catch (err) {
      done(err);
    }
    done();
  });
});

it("should generate a token that have a defined value", (done) => {
  const testUserEmail = "testuser@example.com";

  generateToken(testUserEmail, (err, token) => {
    expect(token).toBeDefined();
    done();
  });
});

//----------------------------------------------------------------
/*
Writing asynchronous code for functions that yield promises.
You can expect(promise) from the function call to be something.
And instead of using toBe or anything like this.
You will need to add either "reject" or "resolve".
It means you expect the resolved value of the promise 
returned by the function generateTokenPromise(testUserEmail) "toBe" method.
ToBe method will refer to the value the promise you got back here, actually resolved to.
*/
it("should generate a token value", () => {
  const testUserEmail = "testuser@example.com";
  expect(generateTokenPromise(testUserEmail)).resolves.toBeDefined();
});

//different approach for testing promises
/*
You can use async in the inner it testing function then then get "token" by await the result of
"calling" and generateTokenPromisew with the testUserEmail a
*/

it("should generate a token value", async () => {
    const testUserEmail = "testuser@example.com";
    
  const token = await generateTokenPromise(testUserEmail);
  expect(token).toBeDefined();
});

/*
Note> If you didn't import generateTokenPromise from async-example.js then you will have to add
return the promise before expect(). This will ensure vitest / jest wait for the promise to be resolved.
You don't need to return when using async / await since a function annotated with async returns a 
promise implicitly.
*/
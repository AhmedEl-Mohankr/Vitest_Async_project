import { expect, it } from "vitest";
import { generateToken, generateTokenPromise } from "./async-example";

it("should generate a token value", (done) => {
  const testUserEmail = "testuser@example.com";

  generateToken(testUserEmail, (err, token) => {

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

it("should generate a token value", () => {
  const testUserEmail = "testuser@example.com";
  expect(generateTokenPromise(testUserEmail)).resolves.toBeDefined();
});


it("should generate a token value", async () => {
    const testUserEmail = "testuser@example.com";
    
  const token = await generateTokenPromise(testUserEmail);
  expect(token).toBeDefined();
});


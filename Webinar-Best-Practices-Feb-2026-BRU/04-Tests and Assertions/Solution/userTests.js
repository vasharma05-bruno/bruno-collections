/**
 * Reusable test suite for /users endpoint.
 * Consolidates Chai.js tests and Zod schema validation into a single JS file.
 *
 * Usage in any request's Script tab:
 *   const { runUserTests } = require("./userTests");
 *   runUserTests(res);
 */

const { z } = require("zod");

// --- Zod Schema ---

const UserSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1),
  username: z.string().min(1),
  email: z.string().email(),
  phone: z.string(),
  website: z.string(),
  address: z
    .object({
      street: z.string(),
      city: z.string(),
      zipcode: z.string(),
    })
    .passthrough(),
  company: z
    .object({
      name: z.string(),
    })
    .passthrough(),
});

// --- Test Functions ---

const runUserTests = (res) => {
  const body = res.getBody();

  // Standard Chai.js Tests
  test("Returns 200 OK", () => {
    expect(res.status).to.equal(200);
  });

  test("Response is an array of users", () => {
    expect(body).to.be.an("array");
    expect(body.length).to.be.greaterThan(0);
  });

  test("Each user has core fields", () => {
    body.forEach((user, i) => {
      expect(user, `User ${i}`).to.have.property("id");
      expect(user, `User ${i}`).to.have.property("name");
      expect(user, `User ${i}`).to.have.property("email");
    });
  });

  // Zod Schema Validation
  test("First user matches Zod schema", () => {
    const result = UserSchema.safeParse(body[0]);
    expect(result.success).to.be.true;
  });

  test("All users pass Zod schema validation", () => {
    body.forEach((user, i) => {
      const result = UserSchema.safeParse(user);
      expect(
        result.success,
        `User ${i} (${user.name}) failed validation`
      ).to.be.true;
    });
  });
};

module.exports = {
  runUserTests,
  UserSchema,
};


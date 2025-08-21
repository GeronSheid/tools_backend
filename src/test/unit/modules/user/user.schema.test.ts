import { ZodError } from "zod";
import { CreateUserSchema } from "../../../../modules/user/user.schema";

describe("User schema tests", () => {
  it("Should validate correct email", () => {
    const validInput = {
        email: "valid123@gmail.com",
        name: 'Name',
        password: 'goodPassword'
    };
    expect(() => CreateUserSchema.parse(validInput)).not.toThrow();
  }),
  it("Should invalidate bad email", () => {
    const validInput = {
        email: "not-valid-email",
        name: 'Name',
        password: 'goodPassword'
    };
    expect(() => CreateUserSchema.parse(validInput)).toThrow(ZodError);
  })
});
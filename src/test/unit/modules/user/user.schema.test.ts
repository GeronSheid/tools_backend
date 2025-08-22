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
  }),
  it("Should validate correct password", () => {
    const validInput = {
        email: "valid123@gmail.com",
        name: 'Name',
        password: 'goodPassword'
    };
    expect(() => CreateUserSchema.parse(validInput)).not.toThrow();
  }),
  it("Should invalidate short password", () => {
    const validInput = {
        email: "valid123@gmail.com",
        name: 'Name',
        password: ''
    };
    expect(() => CreateUserSchema.parse(validInput)).toThrow(ZodError);
  }),
  it("Should invalidate long password", () => {
    const validInput = {
        email: "valid123@gmail.com",
        name: 'Name',
        password: 'veryVeryVeryVeryLongPassword'
    };
    expect(() => CreateUserSchema.parse(validInput)).toThrow(ZodError);
  }),
   it("Should invalidate short name", () => {
    const validInput = {
        email: "valid123@gmail.com",
        name: '',
        password: '12345'
    };
    expect(() => CreateUserSchema.parse(validInput)).toThrow(ZodError);
  }),
  it("Should invalidate long name", () => {
    const validInput = {
        email: "valid123@gmail.com",
        name: 'VeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongName',
        password: '12345'
    };
    expect(() => CreateUserSchema.parse(validInput)).toThrow(ZodError);
  })
});
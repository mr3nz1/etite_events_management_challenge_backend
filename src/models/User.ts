import mongoose, { Schema, Document, InferSchemaType } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  admin: boolean;
  createJWT(): string;
  isPasswordCorrect(candidatePassword: string): boolean;
}

const userSchema = new Schema<UserDocument>(
  {
    name: String,
    email: {
      type: String,
      unique: true,
    },
    admin: {
      type: Boolean,
      default: false,
    },
    password: String,
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(this.password, salt);
  this.password = hash;
});

userSchema.methods.createJWT = function () {
  const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY!;
  return jwt.sign(
    {
      userId: this._id,
      admin: this.admin,
    },
    JWT_SECRET_KEY,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
};

userSchema.methods.isPasswordCorrect = async function (
  candidatePassword: string
) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  // console.log(candidatePassword, this.password, isMatch);
  return isMatch;
};

type UserSchemaType = InferSchemaType<typeof userSchema>;

const UserModel = mongoose.model<UserSchemaType | UserDocument>(
  "User",
  userSchema
);

export default UserModel;

import mongoose, { Document, Model, ObjectId, Schema } from "mongoose";
const bcrypt = require("bcrypt");

export interface IUser extends Document {
    _id: ObjectId;
    name: string;
    email: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
}

interface IUserModel extends Model<IUser> {
    register(name: string, email: string, password: string): Promise<IUser>;
}

const UserSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

UserSchema.statics.register = async function (name: IUser["name"], email: IUser["email"], password: IUser["password"]) : Promise<IUser>{
    const userExists = await this.findOne({ email: email });
    if (userExists) {
        throw new Error("User with this email already exists");
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user: IUser = new this({
        name: name,
        email: email,
        password: hashedPassword,
    });
    await user.save();
    return user;
};

const User: IUserModel = mongoose.model<IUser, IUserModel>("User", UserSchema);
export default User;

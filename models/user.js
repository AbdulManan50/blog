const { Schema, model } = require("mongoose");
const { createHmac, randomBytes } = require("crypto");

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    salt: {
      type: String,

    },
    password: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      default: "/images/default.png",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return;
  const salt = randomBytes(16).toString();
  const Hashpassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");
  this.salt = salt;
  this.password = Hashpassword;
  next();
});


userSchema.static('matchPassword', function(email,password){
  const user = this.find({email})
  if (!user) throw Error ("user no found")
  const salt = user.salt
  const hashPassword = user.password
  const userProvideHAsh = createHmac("sha256",salt).update(password).digest("hex")

  if (hashPassword !==userProvideHAsh)throw Error ("in correct password")

  return {...user, password:undefined,salt:undefined}
})



const User = model("User", userSchema);

module.exports = User;

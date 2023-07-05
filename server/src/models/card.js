const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const cardsSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Please Enter Your Name"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [3, "Name should have more than 4 characters"],
  },
  jobTitle: {
    type: String,
    trim: true,
    required: [true, "Please Enter job title"],
    maxLength: [30, "Country cannot exceed 30 characters"],
    minLength: [2, "Country should have more than 2 characters"],
  },
  company: {
    type: String,
    trim: true,
    required: [true, "Please Enter company"],
    maxLength: [30, "Province cannot exceed 30 characters"],
    minLength: [2, "Province should have more than 2 characters"],
  },
  title: {
    type: String,
    trim: true,
    maxLength: [30, "Title cannot exceed 30 characters"],
    minLength: [2, "Title should have more than 2 characters"],
  },
  location: {
    type: String,
    trim: true,
    maxLength: [30, "Location cannot exceed 30 characters"],
    minLength: [2, "Location should have more than 2 characters"],
  },
  bio: {
    type: String,
    trim: true,
    maxLength: [30, "Bio cannot exceed 100 characters"],
    minLength: [2, "Bio should have more than 2 characters"],
  },
  cardColor: {
    type: String,
    trim: true,
    default: "255,255,255",
  },
  phone: {
    type: Number,
    required: true,
    trim: true,
    minLength: 10,
  },
  cardDP: {
    type: String,
    required: [true, "Please upload a profile picture"],
    trim: true,
  },
  coverDP: {
    type: String,
    trim: true,
    default: "",
  },
  companyDP: {
    type: String,
    trim: true,
    default: "",
  },
  popCode: {
    codeColor: {
      type: String,
      trim: true,
      default: "0,0,0",
    },
    logo: {
      type: String,
      trim: true,
      default: "",
    },
  },
  emailSignature: {
    profile: {
      type: String,
      trim: true,
      default: "",
    },
    company: {
      type: String,
      trim: true,
      default: "",
    },
    popCode: {
      type: String,
      trim: true,
      default: "",
    },
  },
  virtualBackground: {
    picture: {
      type: String,
      trim: true,
      default: "",
    },
    color: {
      type: String,
      trim: true,
      default: "",
    },
    showPopCodeInTheOverlay: {
      type: Boolean,
      default: true,
    },
    condensedView: {
      type: Boolean,
      default: false,
    },
    name: {
      type: Boolean,
      default: true,
    },
    company: {
      type: Boolean,
      default: false,
    },
    jobTitle: {
      type: Boolean,
      default: false,
    },
    location: {
      type: Boolean,
      default: false,
    },
  },
  social: [
    {
      id: mongoose.Schema.Types.ObjectId,
      socialName: {
        type: String,
        trim: true,
        required: [true, "Social Name Missing"],
      },
      email: {
        type: String,
        trim: true,
        default: "",
      },
      username: {
        type: String,
        trim: true,
        default: "",
      },
      phoneNumber: {
        type: String,
        trim: true,
        default: "",
      },
      linkTitle: {
        type: String,
        trim: true,
        default: "",
      },
      socialIcon: {
        type: String,
        trim: true,
        default: "",
      },
      active: {
        type: Boolean,
        default: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const CardModel = new model("cards", cardsSchema);
module.exports = CardModel;

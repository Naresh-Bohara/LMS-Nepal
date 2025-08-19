import mongoose, { Document, Model, Schema, Types } from "mongoose";
import { IUser } from "./user.model";

export interface IComment extends Document {
  user: IUser | Types.ObjectId;  // reference or embedded user
  question: string;
  questionReplies: IComment[];
}

export interface IReview extends Document {
  user: IUser | Types.ObjectId;
  rating?: number;
  comment: string;
  commentReplies?: IReview[];
}

export interface ILink extends Document {
  title: string;
  url: string;
}

export interface ICourseData extends Document {
  title: string;
  description: string;
  videoUrl: string;
  videoThumbnail: {
    public_id: string;
    url: string;
  };
  videoSection: string;
  videoLength: number;
  videoPlayer: string;
  links: ILink[];
  suggestion: string;
  questions: IComment[];
}

export interface ICourse extends Document {
  name: string;
  description: string;
  categories: string[];    // changed to array
  price: number;
  estimatedPrice?: number;
  thumbnail: {
    public_id: string;
    url: string;
  };
  tags: string[];          // changed to array
  level: string;
  demoUrl: string;
  benefits: { title: string }[];
  prerequisites: { title: string }[];
  reviews: IReview[];
  courseData: ICourseData[];
  ratings?: number;
  purchased: number;
}

const reviewSchema = new Schema<IReview>(
  {
    user: { type: Object }, // or { type: Schema.Types.ObjectId, ref: "User" }
    rating: { type: Number, default: 0 },
    comment: { type: String },
    commentReplies: [Object],
  },
  { timestamps: true }
);

const linkSchema = new Schema<ILink>({
  title: { type: String },
  url: { type: String },
});

const commentSchema = new Schema<IComment>(
  {
    user: { type: Object }, // or { type: Schema.Types.ObjectId, ref: "User" }
    question: { type: String },
    questionReplies: [Object],
  },
  { timestamps: true }
);

const courseDataSchema = new Schema<ICourseData>({
  videoUrl: String,
  videoThumbnail: {
    public_id: String,
    url: String,
  },
  title: String,
  videoSection: String,
  description: String,
  videoLength: Number,
  videoPlayer: String,
  links: [linkSchema],
  suggestion: String,
  questions: [commentSchema],
});

const courseSchema = new Schema<ICourse>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    categories: { type: [String], required: true },
    price: { type: Number, required: true },
    estimatedPrice: { type: Number },
    thumbnail: {
      public_id: String,
      url: String,
    },
    tags: { type: [String], required: true },
    level: { type: String, required: true },
    demoUrl: { type: String, required: true },
    benefits: [{ title: String }],
    prerequisites: [{ title: String }],
    reviews: [reviewSchema],
    courseData: [courseDataSchema],
    ratings: { type: Number, default: 0 },
    purchased: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const CourseModel: Model<ICourse> = mongoose.model<ICourse>(
  "Course",
  courseSchema
);

export default CourseModel;

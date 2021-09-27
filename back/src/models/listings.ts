import mongoose, { Schema, Model, Document } from 'mongoose';

export interface Listing {
  title: string;
  author: string;
  context: string;
  pics: string[];
  tags: string[];
  views: number;
  address: string;
  category: string;
}

export interface ListingDocument extends Listing, Document {
  //method를 넣는다
  viewUp: () => void;
}
export interface ListingModel extends Model<ListingDocument> {}

const ListingSchema: Schema<ListingDocument> = new mongoose.Schema(
  {
    title: {
      type: String,
      index: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
    },
    context: String,
    address: String,
    notice: {
      type: Boolean,
      default: false,
    },
    category: {
      type: String,
      default: 'free',
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comments',
      },
    ],
    pics: {
      type: [String],
      default: [],
    },
    tags: {
      type: [String],
      default: [],
    },
    views: {
      type: Number,
      default: 0,
    },
    location: String,
  },
  {
    timestamps: true,
  }
);
ListingSchema.index({
  title: 'text',
  author: 'text',
  tags: 'text',
  context: 'text',
});

ListingSchema.methods.viewUp = async function () {
  this.views += 1;
  this.save();
};
const model = mongoose.model<ListingDocument, ListingModel>(
  'Listings',
  ListingSchema
);

export default model;

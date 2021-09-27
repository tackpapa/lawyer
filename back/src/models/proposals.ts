import mongoose, { Schema, Document, Model } from 'mongoose';

export interface Proposal {
  title: string;
  author: string;
  context: string;
  pics: string[];
  tags: string[];
  views: number;
  category: string;
  price: string;
}

export interface ProposalDocument extends Proposal, Document {
  //method를 넣는다
  viewUp: () => void;
}
export interface ProposalModel extends Model<ProposalDocument> {}

const ProposalSchema: Schema<ProposalDocument> = new mongoose.Schema(
  {
    title: {
      type: String,
      index: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comments',
      },
    ],
    context: String,
    category: {
      type: String,
      default: 'free',
    },
    notice: {
      type: Boolean,
      default: false,
    },
    pics: {
      type: [String],
      default: [],
    },
    tags: {
      type: [String],
      default: [],
    },
    price: {
      type: String,
      default: 0,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);
ProposalSchema.index({
  title: 'text',
  author: 'text',
  tags: 'text',
  context: 'text',
  location: 'text',
  price: 'text',
});

ProposalSchema.methods.viewUp = async function () {
  this.views += 1;
  this.save();
};
const model = mongoose.model<ProposalDocument, ProposalModel>(
  'Proposals',
  ProposalSchema
);

export default model;

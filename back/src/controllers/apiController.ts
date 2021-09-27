import db from 'db';
import { Controller } from './types';

const home: Controller = async (ctx) => {
  const posts = await db.posts.find().sort({ _id: -1 }).limit(5);
  const proposals = await db.proposals.find().sort({ _id: -1 }).limit(5);
  const listings = await db.listings.find().sort({ _id: -1 }).limit(5);
  ctx.body = { posts, proposals, listings };
};

const hotsearch: Controller = async (ctx) => {
  const words = await db.searches
    .find({ views: { $gt: 1 } })
    .sort({ views: 'descending' })
    .limit(10);
  ctx.body = words;
};

const tag: Controller = async (ctx) => {
  const { tag } = ctx.params;
  const posts = await db.posts
    .find({ tags: { $in: [tag] } })
    .sort({ _id: -1 })
    .limit(20);
  ctx.body = posts;
};

const proposals: Controller = async (ctx) => {
  const proposals = await db.proposals.find().sort({ date: -1 }).limit(20);
  ctx.body = proposals;
};

const listings: Controller = async (ctx) => {
  const listings = await db.listings.find().sort({ _id: -1 }).limit(20);
  ctx.body = listings;
};

export default {
  home,
  tag,
  proposals,
  hotsearch,
  listings,
};

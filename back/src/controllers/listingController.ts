import db from 'db';
import { Controller } from './types';
import upload from '../utils/s3';
import fs from 'fs';
import sharp from 'sharp';

const { PassThrough } = require('stream');

const create: Controller = async (ctx) => {
  const {
    title,
    context,
    tags,
    address,
    location,
    category,
  } = ctx.request.body;
  const author = ctx.state.user._id;
  const user = await db.users.findOneAndUpdate(
    { _id: author },
    { $inc: { exp: +10 } }
  );
  user?.save();

  const item = await db.listings.create({
    title,
    context,
    author,
    category,
    tags,
    address,
    location,
  });
  const post = await db.listings.findOne({ _id: item._id }).populate('author');
  if (ctx.request.files.pic === undefined) {
    return (ctx.status = 200), (ctx.body = post);
  }
  let arr = [];
  if (Array.isArray(ctx.request.files.pic) === false) {
    arr = [ctx.request.files.pic];
  } else {
    arr = ctx.request.files.pic;
  }
  const promises = arr.map(async ({ path }: { path: string }, i: number) => {
    const body = sharp(path).resize(800, 800).png();
    var param = {
      Bucket: 'lawyers',
      Key: `listingimage/${item._id + i}`,
      ACL: 'public-read',
      Body: body.pipe(PassThrough()),
      ContentType: 'image/png',
    };
    const uploadphoto = await upload(param);
    await (item as any).pics.push(uploadphoto.Location);
    if (i === arr.length - 1) {
      await item.save();
    }
  });
  await Promise.all(promises);

  const thepost = await db.listings
    .findOne({ _id: item._id })
    .populate('author');
  ctx.status = 200;
  ctx.body = thepost;
};

const update: Controller = async (ctx) => {
  const { id } = ctx.params;
  const { context, title, tags, price, location, category } = ctx.request.body;
  const newtag = JSON.parse(tags);
  const post = await db.listings.findOneAndUpdate(
    { _id: id },
    {
      context: context,
      tags: newtag,
      title: title,
      price: price,
      category: category,
      location: location,
    },
    { new: true }
  );
  ctx.status = 200;
  ctx.body = post;
};

const findone: Controller = async (ctx) => {
  const { id } = ctx.params;
  const post = await db.listings
    .findOne({ _id: id })
    .populate('author')
    .populate('comments');
  if (post) {
    post?.viewUp();
    ctx.status = 200;
    ctx.body = post;
  } else {
    ctx.status = 404;
    ctx.body = { id };
  }
};

const search: Controller = async (ctx) => {
  const { query } = ctx.params;
  const check = await db.searches.findOne({ query });
  if (check) {
    check.viewUp();
  } else {
    db.searches.create({ query });
  }
  const post = await db.listings
    .find({ $text: { $search: query } })
    .populate('author')
    .sort({ _id: -1 })
    .limit(10);
  ctx.status = 200;
  ctx.body = { data: post, type: 'result' };
};

const latest: Controller = async (ctx) => {
  const { last } = ctx.params;
  const posts = await db.listings
    .find({ createdAt: { $lt: last } })
    .populate('author')
    .sort({ _id: -1 })
    .limit(15);
  ctx.status = 200;
  ctx.body = posts;
};

const alllisting: Controller = async (ctx) => {
  const { last } = ctx.params;
  const posts = await db.listings
    .find({ createdAt: { $lt: last } })
    .populate('author')
    .sort({ _id: -1 })
    .limit(15);
  ctx.status = 200;
  ctx.body = posts;
};

const listingpage: Controller = async (ctx) => {
  const { page } = ctx.params;
  const row = 15;
  const skip = (parseInt(page, 10) - 1) * row;
  const allpost = await db.listings.countDocuments({});
  const posts = await db.listings
    .find({})
    .skip(skip)
    .populate('author')
    .sort({ _id: -1 })
    .limit(row);
  ctx.status = 200;
  ctx.body = { allpost, posts, page };
};

const newones: Controller = async (ctx) => {
  const { last } = ctx.params;
  const posts = await db.listings
    .find({ createdAt: { $gt: last } })
    .populate('author')
    .sort({ _id: -1 });
  ctx.status = 200;
  ctx.body = posts;
};

const byCategory: Controller = async (ctx) => {
  const { query, last } = ctx.params;
  const post = await db.listings
    .find({ category: query })
    .where('createdAt')
    .lt(last)
    .populate('author')
    .sort({ _id: -1 })
    .limit(10);
  ctx.status = 200;
  ctx.body = { data: post, type: query };
};

const deleteone: Controller = async (ctx) => {
  const { id } = ctx.params;
  const item = await db.listings.findOneAndRemove({ _id: id });
  if (!item) {
    ctx.status = 400;
    ctx.body = { id };
    return;
  }
  await db.comments.deleteMany({ post: id }).exec;
  ctx.status = 200;
  ctx.body = { id: id, category: item?.category };
};

export default {
  create,
  deleteone,
  alllisting,
  listingpage,
  update,
  search,
  newones,
  byCategory,
  findone,
  latest,
};

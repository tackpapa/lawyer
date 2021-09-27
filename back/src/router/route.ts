import Router from 'koa-router';
import userRouter from './userRouter';
import postRouter from './postRouter';
import commentRouter from './commentRouter';
import listingRouter from './listingRouter';
import apiRouter from './apiRouter';
import bannerRouter from './bannerRouter';
import proposalRouter from './proposalRouter';

const router = new Router();
router.use(userRouter.routes());
router.use(postRouter.routes());
router.use(commentRouter.routes());
router.use(listingRouter.routes());
router.use(apiRouter.routes());
router.use(bannerRouter.routes());
router.use(proposalRouter.routes());

router.get('/', (ctx) => {
  ctx.body = 'welcome to spicylawyer';
});

export default router;

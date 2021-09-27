import Router from 'koa-router';
import TipController from 'controllers/proposalController';
import { requireAuth } from 'utils/jwt';

const router = new Router({
  prefix: '/proposal',
});

router.post('/create', requireAuth, TipController.create);
router.get('/deleteone/:id', requireAuth, TipController.deleteone);
router.get('/findone/:id', TipController.findone);
router.get('/search/:query', TipController.search);
router.get('/bycategory/:query/:last', TipController.byCategory);
router.get('/latest/:last', TipController.latest);
router.get('/allproposal/:last', TipController.allproposal);
router.get('/proposalpage/:page', TipController.proposalpage);
router.get('/newones/:last', TipController.newones);
router.post('/update/:id', requireAuth, TipController.update);

export default router;

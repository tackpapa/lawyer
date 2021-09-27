import Router from 'koa-router';
import listingController from 'controllers/listingController';
import { requireAuth } from 'utils/jwt';

const router = new Router({
  prefix: '/listing',
});

router.post('/create', requireAuth, listingController.create);
router.get('/deleteone/:id', requireAuth, listingController.deleteone);
router.get('/findone/:id', listingController.findone);
router.get('/search/:query', listingController.search);
router.get('/bycategory/:query/:last', listingController.byCategory);
router.get('/latest/:last', listingController.latest);
router.get('/listingpage/:page', listingController.listingpage);
router.get('/alllisting/:last', listingController.alllisting);
router.get('/newones/:last', listingController.newones);
router.post('/update/:id', requireAuth, listingController.update);

export default router;

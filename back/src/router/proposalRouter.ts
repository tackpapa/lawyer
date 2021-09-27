import Router from 'koa-router';
import ProposalController from 'controllers/proposalController';
import { requireAuth } from 'utils/jwt';

const router = new Router({
  prefix: '/proposals',
});

router.post('/create', requireAuth, ProposalController.create);
router.get('/deleteone/:id', requireAuth, ProposalController.deleteone);
router.get('/findone/:id', ProposalController.findone);
router.get('/search/:query', ProposalController.search);
router.get('/bycategory/:query/:last', ProposalController.byCategory);
router.get('/latest/:last', ProposalController.latest);
router.get('/allproposal/:last', ProposalController.allproposal);
router.get('/proposalpage/:page', ProposalController.proposalpage);
router.get('/newones/:last', ProposalController.newones);
router.post('/update/:id', requireAuth, ProposalController.update);

export default router;

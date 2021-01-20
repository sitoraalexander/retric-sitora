const router = require('express').Router();
const commentsController = require('../../controllers/commentsController');
const auth = require('../../middlewares/auth');

// Matches with "/api/comments"
router
  .route('/')
  .get(commentsController.findAll)
  .post(auth, commentsController.create);

router.route('/approveRequest').post(commentsController.approveRequest);

// Matches with "/api/comments/:id"
router
  .route('/:id')
  .get(commentsController.findById)
  .put(commentsController.update)
  .delete(commentsController.remove);

module.exports = router;

let express = require("express");
const { getTopics, getTopicById, createTopic, updateTopic, deleteTopic} = require('../controllers/TopicController')
const router = express.Router();

router.get('/topics', getTopics);
router.get('/topics/:id', getTopicById);
router.post('/topics', createTopic);
router.patch('/topics/:id', updateTopic);
router.delete('/topics/:id', deleteTopic);
 
module.exports = router;
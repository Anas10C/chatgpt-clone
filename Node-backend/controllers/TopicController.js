let Topic =  require("../models/Topic");

exports.getTopics = async(req, res) => {
    const topics = await Topic.find();
    res.status(200).json(topics);
};

exports.getTopicById = async(req, res) => {
    const topic = await Topic.findById(req.params.id);
    res.status(200).json(topic);
};

exports.createTopic = async(req, res, next) => {

    const topic = await Topic.create({
      name: req.body.name,
      history: req.body.history,
      temperature: req.body.temperature,
    });

    res.status(200).json(topic)

};

exports.updateTopic = async(req, res, next) => {
    const id = req.params.id;
    const newData = req.body.history
    console.log(newData)

    const topic = await Topic.findById(id);
    const updatedTopic = await Topic.findByIdAndUpdate(id, {
      $set: { 
        history: topic.history.concat(newData)
      }
    }, { new: true });
    res.status(200).json(updatedTopic);
}

exports.deleteTopic = async(req, res, next) => {
  const id = req.params.id
    Topic.findByIdAndDelete(id, (err, topic) => {
        if (err) {
          console.error(err);
        } else if (!topic) {
          console.log(`Topic with ID ${id} not found`);
        } else {
          console.log(`Deleted document: ${topic}`);
          res.status(200).json(topic);
        }
      });
}
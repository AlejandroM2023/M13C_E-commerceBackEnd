const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
router.get('/', async(req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try{
    const tagData = await Tag.findAll({
      include: [{model: Product}]
    });
    res.status(200).json(tagData);

  }catch(err){
    res.status(400).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try{
    const tagData = await Tag.findByPk(req.params.id, {
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(tagData);
  }catch (err){
    res.status(400).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try{
    const createdTag = Tag.create(req.body);
    res.status(400).json(createdTag);
  }catch (err){
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try{
    const updateTag = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    res.status(200).json(updateTag);
  }catch (err){
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try{
    const deletedTag = await Tag.destroy({where: {id: req.params.id}});
    res.status(200).json(deletedTag);
  }catch (err){
    res.status(400).json(err);
  }
});

module.exports = router;

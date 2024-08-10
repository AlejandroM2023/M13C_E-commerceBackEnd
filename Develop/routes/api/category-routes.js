const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async(req, res) => {
  // find all categories
  // be sure to include its associated Products
   try{
    const categoryData = await Category.findAll({
      include: [{model: Product}]
    });
    res.status(200).json(categoryData);
   }
   catch (err){
    res.status(400).json(err);
   }
  
});

router.get('/:id', async (req, res) => {
    try{
      const categoryData = await Category.findByPk(req.params.id, {
      include: [{model: Product}]
      })
      res.status(200).json(categoryData);
    }catch (err){
      res.status(400).json(err);
    }
});

router.post('/', (req, res) => {
  try{
    const createCategory = Category.create(req.body);
    res.status(200).json(createCategory);
  }catch (err){
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try{
    const updateCategory = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    res.status(200).json(updateCategory);
  }catch (err){
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try{
    const deletedCategory = await Category.destroy({
      where: {
        id: req.params.id
      }
    })
    res.status(200).json(deletedCategory);
  }catch(err){
    res.status(400).json(err);
  }
});

module.exports = router;

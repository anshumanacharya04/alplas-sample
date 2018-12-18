const Product = require('../../models/Products');

module.exports = (app) => {
  app.get('/api/Products', (req, res, next) => {
    Product.find()
      .exec()
      .then((Product) => res.json(Product))
      .catch((err) => next(err));
  });

  app.post('/api/Products', function (req, res, next) {
    //console.log(req.body);
    const Product = new Product();
    Product['name'] = req.body.name;
    Product['status'] = req.body.status;
    console.log(111,Product['name']);
    Product.save()
      .then(() => res.json(Product))
      .catch((err) => next(err));
  });

  app.delete('/api/Products/:id', function (req, res, next) {
    Product.findOneAndRemove({ _id: req.params.id })
      .exec()
      .then((Product) => res.json())
      .catch((err) => next(err));
  });

  app.put('/api/Products/:id/:name/changeName', (req, res, next) => {
    Product.findById(req.params.id)
      .exec()
      .then((Product) => {
        Product.name = req.params.name;
        Product.save()
          .then(() => res.json(Product))
          .catch((err) => next(err));
      })
      .catch((err) => next(err));
  });

  app.put('/api/Products/:id/:status/changeStatus', (req, res, next) => {
    Product.findById(req.params.id)
      .exec()
      .then((Product) => {
        Product.status = req.params.status;
        Product.save()
          .then(() => res.json(Product))
          .catch((err) => next(err));
      })
      .catch((err) => next(err));
  });
};

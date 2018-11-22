const Categorie = require('../../models/Categories');

module.exports = (app) => {
  app.get('/api/categories', (req, res, next) => {
    Categorie.find()
      .exec()
      .then((categorie) => res.json(categorie))
      .catch((err) => next(err));
  });

  app.post('/api/categories', function (req, res, next) {
    //console.log(req.body);
    const categorie = new Categorie();
    categorie['name'] = req.body.name;
    categorie['status'] = req.body.status;
    console.log(111,categorie['name']);
    categorie.save()
      .then(() => res.json(categorie))
      .catch((err) => next(err));
  });

  app.delete('/api/categories/:id', function (req, res, next) {
    Categorie.findOneAndRemove({ _id: req.params.id })
      .exec()
      .then((categorie) => res.json())
      .catch((err) => next(err));
  });

  app.put('/api/categories/:id/:name/changeName', (req, res, next) => {
    Categorie.findById(req.params.id)
      .exec()
      .then((categorie) => {
        categorie.name = req.params.name;
        categorie.save()
          .then(() => res.json(categorie))
          .catch((err) => next(err));
      })
      .catch((err) => next(err));
  });

  app.put('/api/categories/:id/:status/changeStatus', (req, res, next) => {
    Categorie.findById(req.params.id)
      .exec()
      .then((categorie) => {
        categorie.status = req.params.status;
        categorie.save()
          .then(() => res.json(categorie))
          .catch((err) => next(err));
      })
      .catch((err) => next(err));
  });
};

const SubSubCategorie = require('../../models/SubSubCategories');

module.exports = (app) => {
  app.get('/api/subsubcategories', (req, res, next) => {
    SubSubCategorie.find()
      .exec()
      .then((subsubcategorie) => res.json(subsubcategorie))
      .catch((err) => next(err));
  });

  app.post('/api/subsubcategories', function (req, res, next) {
    const subsubcategorie = new SubSubCategorie();

    subsubcategorie.save()
      .then(() => res.json(subsubcategorie))
      .catch((err) => next(err));
  });

  app.delete('/api/subsubcategories/:id', function (req, res, next) {
    SubSubCategorie.findOneAndRemove({ _id: req.params.id })
      .exec()
      .then((subsubcategorie) => res.json())
      .catch((err) => next(err));
  });

  app.put('/api/subsubcategories/:id/increment', (req, res, next) => {
    SubSubCategorie.findById(req.params.id)
      .exec()
      .then((subsubcategorie) => {
        subsubcategorie.count++;

        subsubcategorie.save()
          .then(() => res.json(subsubcategorie))
          .catch((err) => next(err));
      })
      .catch((err) => next(err));
  });

  app.put('/api/subsubcategories/:id/decrement', (req, res, next) => {
    SubSubCategorie.findById(req.params.id)
      .exec()
      .then((subsubcategorie) => {
        subsubcategorie.count--;

        subsubcategorie.save()
          .then(() => res.json(subsubcategorie))
          .catch((err) => next(err));
      })
      .catch((err) => next(err));
  });
};

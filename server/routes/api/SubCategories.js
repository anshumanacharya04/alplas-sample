const SubCategorie = require('../../models/SubCategories');

module.exports = (app) => {
  app.get('/api/subcategories', (req, res, next) => {
    SubCategorie.find()
      .exec()
      .then((subcategorie) => res.json(subcategorie))
      .catch((err) => next(err));
  });

  app.post('/api/subcategories', function (req, res, next) {
    //console.log(req.body);
    const subcategorie = new SubCategorie();
    subcategorie['name'] = req.body.name;
    subcategorie['status'] = req.body.status;
    subcategorie['categoryname'] = req.body.categoryname;
    console.log(111,subcategorie['name']);
    subcategorie.save()
      .then(() => res.json(subcategorie))
      .catch((err) => next(err));
  });

  app.delete('/api/subcategories/:id', function (req, res, next) {
    SubCategorie.findOneAndRemove({ _id: req.params.id })
      .exec()
      .then((subcategorie) => res.json())
      .catch((err) => next(err));
  });

  app.put('/api/subcategories/:id/increment', (req, res, next) => {
    SubCategorie.findById(req.params.id)
      .exec()
      .then((subcategorie) => {
        subcategorie.count++;

        subcategorie.save()
          .then(() => res.json(subcategorie))
          .catch((err) => next(err));
      })
      .catch((err) => next(err));
  });

  app.put('/api/subcategories/:id/decrement', (req, res, next) => {
    SubCategorie.findById(req.params.id)
      .exec()
      .then((subcategorie) => {
        subcategorie.count--;

        subcategorie.save()
          .then(() => res.json(subcategorie))
          .catch((err) => next(err));
      })
      .catch((err) => next(err));
  });
};

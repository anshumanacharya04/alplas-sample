const SubSubCategorie = require('../../models/SubSubCategories');

module.exports = (app) => {
  app.get('/api/SubSubCategories', (req, res, next) => {
    SubSubCategorie.find()
      .exec()
      .then((SubSubCategorie) => res.json(SubSubCategorie))
      .catch((err) => next(err));
  });

  app.post('/api/SubSubCategories', function (req, res, next) {
    //console.log(req.body);
    const subsubcategorie = new SubSubCategorie();
    subsubcategorie['name'] = req.body.name;
    subsubcategorie['status'] = req.body.status;
    subsubcategorie['subcategoryname'] = req.body.subcategoryname;
    console.log(111,subsubcategorie['name'],subsubcategorie['subcategoryname']);
    subsubcategorie.save()
      .then(() => res.json(subsubcategorie))
      .catch((err) => next(err));
  });

  app.delete('/api/SubSubCategories/:id', function (req, res, next) {
    SubSubCategorie.findOneAndRemove({ _id: req.params.id })
      .exec()
      .then((SubSubCategorie) => res.json())
      .catch((err) => next(err));
  });

  app.put('/api/SubSubCategories/:id/increment', (req, res, next) => {
    SubSubSubCategorie.findById(req.params.id)
      .exec()
      .then((SubSubCategorie) => {
        SubSubCategorie.count++;

        SubSubCategorie.save()
          .then(() => res.json(SubSubCategorie))
          .catch((err) => next(err));
      })
      .catch((err) => next(err));
  });

  app.put('/api/SubSubCategories/:id/decrement', (req, res, next) => {
    SubSubCategorie.findById(req.params.id)
      .exec()
      .then((SubSubCategorie) => {
        SubSubCategorie.count--;

        SubSubCategorie.save()
          .then(() => res.json(SubSubCategorie))
          .catch((err) => next(err));
      })
      .catch((err) => next(err));
  });
};

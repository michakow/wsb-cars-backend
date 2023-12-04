const Car = require('../models/car');

exports.getCars = (req, res, next) => {
  Car.find()
    .then((cars) => {
      res.status(200).json({
        message: 'lista samochodów',
        cars,
      });
    })
    .catch((err) => console.log(err));
};

exports.getCarById = (req, res, next) => {
  Car.findById(req.params.id)
    .then((car) => {
      res.status(200).json({
        message: `szczegóły samochodu o id ${req.params.id}`,
        car,
      });
    })
    .catch((err) =>
      res.status(404).json({
        message: `nie odnaleziono samochodu o id ${req.params.id}`,
      })
    );
};

exports.addCar = (req, res, next) => {
  const car = new Car({
    model: req.body.model,
    year: req.body.year,
    producent: req.body.producent,
    weight: req.body.weight,
    color: req.body.color,
  });
  car
    .save()
    .then(() => {
      res.status(201).json({
        message: 'dodano samochód',
        car,
      });
    })
    .catch((error) => {
      res.status(400).json({
        message: 'nie udało się dodać samochodu',
        error,
      });
    });
};

exports.updateCar = (req, res, next) => {
  const updatedCar = {
    model: req.body.model,
    year: req.body.year,
    producent: req.body.producent,
    weight: req.body.weight,
    color: req.body.color,
  };
  Car.findByIdAndUpdate(req.params.id, updatedCar)
    .then(() => {
      res.status(200).json({
        message: `zaktualizowano samochód o id ${req.params.id}`,
        car: updatedCar,
      });
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        res.status(400).json({
          message: `nie udało się zaktualizować samochodu o id ${req.params.id}`,
          error,
        });
      } else {
        res.status(404).json({
          message: `nie odnaleziono samochodu o id ${req.params.id}`,
          error,
        });
      }
    });
};

exports.deleteCar = (req, res, next) => {
  Car.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(200).json({
        message: `usunięto samochód o id ${req.params.id}`,
      });
    })
    .catch((error) =>
      res.status(404).json({
        message: `nie odnaleziono samochodu o id ${req.params.id}`,
        error,
      })
    );
};

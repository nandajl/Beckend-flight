const flightRepository = require('../repositories/flightRepository');

module.exports = {
  async getAll() {
    try {
      const fliht = await flightRepository.getAll();
      const count = await flightRepository.getTotalCount();

      return {
        data: fliht,
        count: count,
      };
    } catch (err) {
      throw err;
    }
  },

  create(body) {
    return flightRepository.create(body);
  },

  update(id, body) {
    return flightRepository.update(id, body);
  },

  delete(id) {
    return flightRepository.delete(id);
  },

  getByPk(id) {
    return flightRepository.getByPk(id);
  },

  async findFlight(condition){
    const {from_airport_id, to_airport_id, departing, returning}  = condition
    console.log("pergi : ",from_airport_id, to_airport_id, departing);
    try {
      if (returning == undefined) {
          const result = await flightRepository.findFlight({
            from_airport_id : from_airport_id,
            to_airport_id : to_airport_id,
            departure_time: departing
          })
          return result
      }
      else{
        const departureFlight = await flightRepository.findFlight({
          from_airport_id : from_airport_id,
          to_airport_id : to_airport_id,
          departure_time: departing
        });
        const returnFlight = await flightRepository.findFlight({
          from_airport_id : to_airport_id,
          to_airport_id : from_airport_id,
          departure_time: returning
        });

        return {
          departureFlight,
          returnFlight
        }
      }    
    } catch (err) {
      res.status(400).json({
        status: 'FAIL',
        messange: err.messange,
      });
    }

},
};

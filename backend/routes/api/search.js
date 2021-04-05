const express = require("express");
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
var isWithinInterval = require("date-fns/isWithinInterval");
const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { User, AvailabilityTable, CurrentTask } = require("../../db/models");

const router = express.Router();


router.get("/:type/:startTime/:endTime", asyncHandler( async (req, res) => {
  const {type, startTime: searchStart, endTime: searchEnd} = req.params

  const devs = await User.findAll({
    where: {
      specialty: type,
    },
    [Op.and]:{
      include: {
        model: AvailabilityTable,
        where: {
          startTime: {
            [Op.lte]: searchStart,
          },
          endTime: {
            [Op.gte]: searchEnd,
          },
        },
      },
      include: {
        model: CurrentTask,
        where: {
          [Op.and]:{
            startTime: {
              [Op.notBetween]: [searchStart, searchEnd],
            },
            endTime: {
              [Op.notBetween]: [searchStart, searchEnd],
            },
          }
        },
      },
    }
  });

 res.json({devs})
}))

module.exports = router

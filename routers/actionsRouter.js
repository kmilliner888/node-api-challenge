const express = require('express');
const Actions = require('../data//helpers/actionModel');

const router = express.Router();

router.get('/', (req, res) => {
    Actions.get(req.actions)
        .then(action => {
            res.status(201).json(action);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({message: "actions not found"})
        });
});

router.get('/:id', validateActionId, (req, res) => {
    Actions.get(req.params.id)
      .then(action => {
        res.status(201).json(action);
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({message: "action not found"})
      });
  });
  
router.delete('/:id', validateActionId, (req, res) => {
    Actions.remove(req.params.id)
      .then(count => {
        if (count > 0) {
          res.status(200).json({message: "action has been deleted"})
        } else {
          res.status(404).json({message: "action not found"})
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({ message: 'Error removing the action'});
      });
  });
  
router.put('/:id', validateActionId, (req, res) => {
    Actions.update(req.params.id, req.body)
      .then(action => {
        if (action) {
          res.status(200).json(action);
        } else {
          res.status(400).json({message: "action not found"});
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({message: "error updating action"});
      });
  });

function validateActionId(req, res, next) {
    const {id} = req.params;
  
    Actions.get(id)
      .then(action => {
        req.action = action;
        next();
      })
      .catch(error => {
        console.log(error);
        res.status(404).json({message: "invalid action id"})
      });
  }

module.exports = router;
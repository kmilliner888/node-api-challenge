const express = require('express');

const Projects = require('../data/helpers/projectModel');
const Actions = require('../data/helpers/actionModel');

const router = express.Router();

router.post('/', validateProject, (req, res) => {
    Projects.insert(req.body)
        .then(project => {
            res.status(201).json(project);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({message: "error adding project"})
        });
});

router.post('/:id/actions', validateId, (req, res) => {
    const actionInfo = {...req.body, project_id: req.params.id};

    Actions.insert(actionInfo)
        .then(action => {
            res.status(201).json(action);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({message: "error adding action"})
        });
});

router.get('/', (req, res) => {
    Projects.get(req.projects)
        .then(project => {
            res.status(201).json(project);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({message: "projects not found"})
        });
});

router.get('/:id', validateId, (req, res) => {
    Projects.get(req.params.id)
        .then(project => {
            res.status(201).json(project)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({message: "project not found"})
        });
});

router.get('/:id/actions', validateId, (req, res) => {
    Projects.getProjectActions(req.params.id)
        .then(action => {
            res.status(201).json(action)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({message: "actions not found"})
        });
});

router.delete('/:id', validateId, (req, res) => {
    Projects.remove(req.params.id)
        .then(count => {
            if(count > 0) {
                res.status(200).json({message: "project deleted"})
            } else {
                res.status(404).json({message: "project not found"})
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({message: "error deleting project"})
        });
});

router.put('/:id', validateId, validateProject, (req, res) => {
    Projects.update(req.params.id, req.body)
        .then(project => {
            if (project) {
                res.status(200).json(project);
            } else {
                res.status(404).json({message: "project not found"})
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({message: "error updating project"})
        });
});


function validateId(req, res, next) {
    const {id} = req.params;
  
    Projects.get(id)
      .then(project => {
        req.project = project;
        next();
      })
      .catch(error => {
        res.status(404).json({message: "invalid project id"})
      });
  };
  
  function validateProject(req, res, next) {
    const body = req.body;
  
    !body || body === {}?
      res.status(400).json({message: "missing project data"})
      :
    next();
  };
  


module.exports = router;
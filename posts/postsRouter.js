const express = require('express');

const blogPosts = require('../data/db.js');

const router = express.Router();

router.use(express.json());

router.get('/', (req, res) => {
    blogPosts.find()
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(err => {
        res.status(500).json({error: 'the post information could not be retrieved...'});
    })
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    blogPosts.findById(id)
    .then(p => {
        if(!id || p.length === 0) {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        } else {
            res.status(200).json(p);
        }
    })
    .catch(err => {
        res.status(500).json(err);
    })
});

router.get('/:id/comments', (req, res) => {
    const { id } = req.params;
    blogPosts.findPostComments(id)
    .then(c => {
        if (!id || c.length === 0) {
            res.status(404).json({ message: "The post with the specified ID does not exist." });
        } else {
            res.status(200).json(c);
        }
    })
    .catch(err => {
        res.status(500).json(err);
    })
});
 
router.post('/', (req, res) => {
    const { title, contents } = req.body;
    
    if (!title || !contents) {
        res.status(400).json({message: 'please provide title and content for the post.'});
    } else {
        blogPosts.insert(req.body)
        .then(post => {
            res.status(201).json(post);
            
        })
        .catch(err => {
            res.status(500).json(err);
        })
    }
});

//comment for post w id insertComment
router.post('/:id/comments', (req, res) => {
    const { id } = req.params;
    const { text } = req.body;
    /*if (!text) {
        res.status(400).json({message: 'please provide text for comment'});
    } else {
        blogPosts.insertComment(req.body)
        .then(c => {
            if(!id) {
                res.status(404).json({message: 'the post with the specicfied ID does not exist...'})
            } else {
                res.status(201).json(c);
            }
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
    }*/

    if (!id) {
        res.status(404).json({message: "the post with the specified ID does not exist"})
    } else if (!text) {
        res.status(400).json({message: "please provide text for the comment"})
    } else {
        blogPosts.insertComment(req.body)
        .then(c => {
            res.status(200).json(c)
        })
        .catch(err => {
            res.status(500).json(err)
        })}
    
});


router.delete('/:id', (req, res) => {
    const { id } = req.params;
    blogPosts.remove(id)
    .then(p => {
        if(!id) {
            res.status(404).json({message: "the post with the specified id does not exist"})
        } else {
             res.status(200).json()
        }
    })
    .catch(err => {
        res.status(500).json(err);
    })
});

router.put('/:id', (req, res) => {
    //update Updates the post with the specified `id` using data from the `request body`. Returns the modified document, **NOT the original**.                                           |
    const { id } = req.params;
    const { title, contents } = req.body;
    const a = Array.from(req.params)
    if (!title || !contents ) {
        res.status(400).json({message: 'please provide title and contents for post'})
    } else {
        blogPosts.update(id, req.body)
        .then(p => {
            console.log(p)//returning 1 or 0?
            if(p) {
                res.status(200).json(p);
            } else {
                res.status(404).json({message: 'post with that id does not exist'})
            }
            
        })
        .catch(err => {
            res.status(500).json(err);
        })
    
    }
});

module.exports = router;


const express = require('express');
const router = express.Router();

const {
    getAllStudents,
    addStudent,
    getStudentById,
    updateStudentById,
    deleteStudentById
} = require('../controllers/studentController');

router.get('/students', getAllStudents);
router.get('/students/:id', getStudentById);
router.post('/students', addStudent);
router.put('/students/:id', updateStudentById);
router.delete('/students/:id', deleteStudentById);

module.exports = router;

const StudentModel = require('../models/studentModel');
const mongoose = require('mongoose');

// GET all students
exports.getAllStudents = async (req, res) => {
    try {
        const students = await StudentModel.find().sort({ student_id: 1 });
        res.status(200).json({
            status: 'success',
            data: students
        });
    } catch (error) {
        console.error('Error in getAllStudents:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to fetch students',
            error: error.message
        });
    }
};

// GET single student by ID
exports.getStudentById = async (req, res) => {
    try {
        const { id } = req.params;
        
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                status: 'error',
                message: 'Invalid student ID format'
            });
        }

        const student = await StudentModel.findById(id);
        if (!student) {
            return res.status(404).json({
                status: 'error',
                message: 'Student not found'
            });
        }

        res.status(200).json({
            status: 'success',
            data: student
        });
    } catch (error) {
        console.error('Error in getStudentById:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to fetch student',
            error: error.message
        });
    }
};

// POST new student
exports.addStudent = async (req, res) => {
    try {
        const { student_id, full_name, email, /*class: className,*/ major, gpa, enroll_year, status } = req.body;

        // Validate required fields
        if (!student_id || !full_name || !email || !major || !gpa || !enroll_year || !status) {
            return res.status(400).json({
                status: 'error',
                message: 'Missing required fields'
            });
        }

        // Validate GPA range
        if (gpa < 0 || gpa > 4) {
            return res.status(400).json({
                status: 'error',
                message: 'GPA must be between 0 and 4'
            });
        }

        // Check if student_id already exists
        const existingStudent = await StudentModel.findOne({ student_id });
        if (existingStudent) {
            return res.status(400).json({
                status: 'error',
                message: 'Student ID already exists'
            });
        }

        const newStudent = new StudentModel({
            student_id,
            full_name,
            email,
            /*class: className,*/
            major,
            gpa,
            enroll_year,
            status
        });

        await newStudent.save();

        res.status(201).json({
            status: 'success',
            message: 'Student added successfully',
            data: newStudent
        });
    } catch (error) {
        console.error('Error in addStudent:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to create student',
            error: error.message
        });
    }
};

// PUT update student
exports.updateStudentById = async (req, res) => {
    try {
        const { id } = req.params;
        const { student_id, full_name, email, /*class: className,*/ major, gpa, enroll_year, status } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                status: 'error',
                message: 'Invalid student ID format'
            });
        }

        // Validate required fields
        if (!student_id || !full_name || !email || !major || !gpa || !enroll_year || !status) {
            return res.status(400).json({
                status: 'error',
                message: 'Missing required fields'
            });
        }

        // Validate GPA range
        if (gpa < 0 || gpa > 4) {
            return res.status(400).json({
                status: 'error',
                message: 'GPA must be between 0 and 4'
            });
        }

        // Check if student exists
        const student = await StudentModel.findById(id);
        if (!student) {
            return res.status(404).json({
                status: 'error',
                message: 'Student not found'
            });
        }

        // Check if new student_id already exists (if it's different from current)
        if (student_id !== student.student_id) {
            const existingStudent = await StudentModel.findOne({ student_id });
            if (existingStudent) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Student ID already exists'
                });
            }
        }

        const updatedStudent = await StudentModel.findByIdAndUpdate(
            id,
            { student_id, full_name, email, /*class: className,*/ major, gpa, enroll_year, status },
            { new: true, runValidators: true }
        );

        res.status(200).json({
            status: 'success',
            message: 'Student updated successfully',
            data: updatedStudent
        });
    } catch (error) {
        console.error('Error in updateStudentById:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to update student',
            error: error.message
        });
    }
};

// DELETE student
exports.deleteStudentById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                status: 'error',
                message: 'Invalid student ID format'
            });
        }

        const student = await StudentModel.findByIdAndDelete(id);
        if (!student) {
            return res.status(404).json({
                status: 'error',
                message: 'Student not found'
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Student deleted successfully'
        });
    } catch (error) {
        console.error('Error in deleteStudentById:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to delete student',
            error: error.message
        });
    }
};

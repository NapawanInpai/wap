const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    student_id: { 
        type: String, 
        required: true,
        unique: true
    },
    full_name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true 
    },
    class: { 
        type: String, 
        required: true 
    },
    major: { 
        type: String, 
        required: true 
    },
    gpa: { 
        type: Number, 
        required: true,
        min: 0,
        max: 4
    },
    enroll_year: { 
        type: Number, 
        required: true 
    },
    status: { 
        type: String, 
        required: true,
        enum: ['กำลังศึกษา', 'จบการศึกษา', 'พักการเรียน', 'ลาออก'],
        default: 'null'
    }
}, { 
    timestamps: true,
    versionKey: false 
});

module.exports = mongoose.model('students', StudentSchema);

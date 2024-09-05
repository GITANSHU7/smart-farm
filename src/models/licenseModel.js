import mongoose from 'mongoose';

const licenseSchema = new mongoose.Schema({
    licenseKey: {
        type: String,
        required: [true, 'License key is required'],
        unique: true
    },
    macId : {
        type: String,
        required: [true, 'Mac ID is required'],
        unique: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true, 'User reference is required']
    },
    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "users", // Corrected the reference to the 'users' collection
    //     required: [true, 'User reference is required']
    // },
    issuedAt: {
        type: Date,
        default: Date.now
    },
    start_date: {
        type: Date,
        required: [true, 'Start date is required']
    },
    end_date: {
        type: Date,
        required: [true, 'End date is required']
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const License = mongoose.models.licenses || mongoose.model('licenses', licenseSchema);

export default License;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lookupTypeSchema = new Schema({
    lookupType: { type: String },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false }
}, { timestamps: true });

const LookupType = mongoose.model('LookupType', lookupTypeSchema, 'LookupType');
module.exports = LookupType;
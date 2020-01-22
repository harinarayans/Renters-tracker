const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lookupSchema = new Schema({
    lookupTypeId: { type: Schema.Types.ObjectId, ref: 'LookupType', required: true },
    displayValue: { type: String },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false }
}, { timestamps: true });

const Lookup = mongoose.model('Lookup', lookupSchema, 'Lookup');
module.exports = Lookup;
const mongoose = require('mongoose');
const Counter = require('./Counter');

const scheduleSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  name: { type: String, required: true },
  personId: { type: Number, required: true },
  day: { type: mongoose.Schema.Types.Mixed, required: true }, // Accept both string and array of strings
  w: { type: Number, required: false },
  h: { type: Number, required: false },
  color: { type: String, required: true },
});

scheduleSchema.pre('save', async function(next) {
  const doc = this;
  try {
    const counter = await Counter.findOneAndUpdate(
      { id: 'schedule_id' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    doc.id = counter.seq;
    next();
  } catch (error) {
    console.error('Error finding and updating counter:', error);
    next(error);
  }
});

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const superadminSchema = new mongoose.Schema({
 username: { type: String, required: true, unique: true },
 password: { type: String, required: true },
});

superadminSchema.pre('save', async function (next) {
 if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
 }
 next();
});

  const Superadmin = mongoose.model('Superadmin', superadminSchema);

module.exports = Superadmin;



import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  company: {
    type: String,
    trim: true,
    default: ''
  },
  projectType: {
    type: String,
    required: true,
    enum: [
      'Web Application',
      'Mobile App', 
      'AI/ML Solution',
      'E-commerce Platform',
      'Custom Software',
      'Consulting'
    ]
  },
  budgetRange: {
    type: String,
    enum: [
      '$10K - $25K',
      '$25K - $50K', 
      '$50K - $100K',
      '$100K+',
      "Let's discuss"
    ]
  },
  projectDetails: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'qualified', 'proposal', 'closed'],
    default: 'new'
  },
  source: {
    type: String,
    enum: ['homepage', 'contact-page', 'other'],
    default: 'contact-page'
  },
  ipAddress: {
    type: String,
    trim: true
  },
  userAgent: {
    type: String,
    trim: true
  },
  notes: {
    type: String,
    trim: true,
    default: ''
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
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

// Update the updatedAt field on save
contactSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);

export default Contact; 
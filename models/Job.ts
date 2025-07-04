import mongoose, { Schema, Document } from 'mongoose';

export interface IJob extends Document {
  title: string;
  slug: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship' | 'Freelance';
  experience: string;
  salary: string;
  description: string;
  requirements: string[];
  benefits: string[];
  tags: string[];
  icon: string;
  color: string;
  featured: boolean;
  status: 'draft' | 'published' | 'archived' | 'closed';
  
  // Additional job details
  responsibilities?: string[];
  qualifications?: string[];
  skills?: string[];
  
  // Company information
  company: {
    name: string;
    description?: string;
    logo?: string;
    website?: string;
  };
  
  // Application details
  applicationDeadline?: Date;
  startDate?: Date;
  remoteWork: boolean;
  relocation?: boolean;
  visaSponsorship?: boolean;
  
  // Contact information
  contact: {
    name: string;
    email: string;
    phone?: string;
  };
  
  // Author information (who created the job posting)
  author: {
    id: mongoose.Types.ObjectId;
    name: string;
    role: string;
  };
  
  // SEO
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
  
  // Publishing
  publishedAt?: Date;
  expiresAt?: Date;
  
  // Statistics
  stats: {
    views: number;
    applications: number;
    shares: number;
    saves: number;
  };
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

const JobSchema = new Schema<IJob>({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  department: {
    type: String,
    required: true,
    trim: true,
    enum: ['Engineering', 'AI Research', 'Mobile', 'Infrastructure', 'Design', 'Data', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations', 'Other']
  },
  location: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  type: {
    type: String,
    required: true,
    enum: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Freelance'],
    default: 'Full-time'
  },
  experience: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  salary: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 2000
  },
  requirements: [{
    type: String,
    required: true,
    trim: true
  }],
  benefits: [{
    type: String,
    required: true,
    trim: true
  }],
  tags: [{
    type: String,
    trim: true
  }],
  icon: {
    type: String,
    required: true,
    trim: true
  },
  color: {
    type: String,
    required: true,
    trim: true,
    default: 'from-blue-500 to-indigo-600'
  },
  featured: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived', 'closed'],
    default: 'draft'
  },
  
  // Additional job details
  responsibilities: [{
    type: String,
    trim: true
  }],
  qualifications: [{
    type: String,
    trim: true
  }],
  skills: [{
    type: String,
    trim: true
  }],
  
  // Company information
  company: {
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      trim: true,
      maxlength: 1000
    },
    logo: {
      type: String,
      trim: true
    },
    website: {
      type: String,
      trim: true
    }
  },
  
  // Application details
  applicationDeadline: {
    type: Date
  },
  startDate: {
    type: Date
  },
  remoteWork: {
    type: Boolean,
    default: false
  },
  relocation: {
    type: Boolean,
    default: false
  },
  visaSponsorship: {
    type: Boolean,
    default: false
  },
  
  // Contact information
  contact: {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true
    },
    phone: {
      type: String,
      trim: true
    }
  },
  
  // Author information
  author: {
    id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    name: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true
    }
  },
  
  // SEO
  seo: {
    metaTitle: {
      type: String,
      maxlength: 60
    },
    metaDescription: {
      type: String,
      maxlength: 160
    },
    keywords: [{
      type: String,
      trim: true
    }]
  },
  
  // Publishing
  publishedAt: {
    type: Date
  },
  expiresAt: {
    type: Date
  },
  
  // Statistics
  stats: {
    views: {
      type: Number,
      default: 0
    },
    applications: {
      type: Number,
      default: 0
    },
    shares: {
      type: Number,
      default: 0
    },
    saves: {
      type: Number,
      default: 0
    }
  }
}, {
  timestamps: true
});

// Indexes for better performance
JobSchema.index({ slug: 1 });
JobSchema.index({ status: 1, featured: 1 });
JobSchema.index({ department: 1 });
JobSchema.index({ location: 1 });
JobSchema.index({ type: 1 });
JobSchema.index({ publishedAt: -1 });
JobSchema.index({ createdAt: -1 });
JobSchema.index({ title: 'text', description: 'text', requirements: 'text' });

// Virtual for checking if job is active
JobSchema.virtual('isActive').get(function() {
  if (this.status !== 'published') return false;
  if (this.expiresAt && this.expiresAt < new Date()) return false;
  return true;
});

// Pre-save middleware to generate slug if not provided
JobSchema.pre('save', function(next) {
  if (!this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

export default mongoose.models.Job || mongoose.model<IJob>('Job', JobSchema); 
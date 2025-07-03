import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  category: string;
  tags: string[];
  image?: string;
  featured: boolean;
  metrics: {
    efficiency?: string;
    dataPoints?: string;
    uptime?: string;
    performance?: string;
    conversion?: string;
    revenue?: string;
    security?: string;
    transactions?: string;
    users?: string;
    accuracy?: string;
    patients?: string;
    diagnoses?: string;
    devices?: string;
    properties?: string;
  };
  client: string;
  duration: string;
  team: string;
  rating: number;
  status: 'draft' | 'published' | 'archived';
  color: string;
  liveUrl?: string;
  githubUrl?: string;
  caseStudyUrl?: string;
  technologies: string[];
  author: {
    id: mongoose.Types.ObjectId;
    name: string;
    role: string;
  };
  publishedAt?: Date;
  stats: {
    views: number;
    likes: number;
    shares: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  description: {
    type: String,
    required: true,
    maxlength: 1000
  },
  category: {
    type: String,
    required: true,
    enum: ['AI/ML', 'E-commerce', 'FinTech', 'Healthcare', 'IoT', 'Real Estate', 'Technology', 'Other']
  },
  tags: [{
    type: String,
    trim: true
  }],
  image: {
    type: String,
    default: '/placeholder.svg?height=300&width=500'
  },
  featured: {
    type: Boolean,
    default: false
  },
  metrics: {
    efficiency: String,
    dataPoints: String,
    uptime: String,
    performance: String,
    conversion: String,
    revenue: String,
    security: String,
    transactions: String,
    users: String,
    accuracy: String,
    patients: String,
    diagnoses: String,
    devices: String,
    properties: String
  },
  client: {
    type: String,
    required: true,
    trim: true
  },
  duration: {
    type: String,
    required: true,
    trim: true
  },
  team: {
    type: String,
    required: true,
    trim: true
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  color: {
    type: String,
    default: 'from-blue-500 to-indigo-600'
  },
  liveUrl: String,
  githubUrl: String,
  caseStudyUrl: String,
  technologies: {
    type: [String],
    default: [],
    trim: true
  },
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
  publishedAt: Date,
  stats: {
    views: {
      type: Number,
      default: 0
    },
    likes: {
      type: Number,
      default: 0
    },
    shares: {
      type: Number,
      default: 0
    }
  }
}, {
  timestamps: true
});

// Index for better query performance
ProjectSchema.index({ status: 1, featured: 1, category: 1 });
ProjectSchema.index({ title: 'text', description: 'text' });

// Add pre-save middleware to debug
ProjectSchema.pre('save', function(next) {
  console.log('Saving project with technologies:', this.technologies);
  next();
});

export default mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema); 
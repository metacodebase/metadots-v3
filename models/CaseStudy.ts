import mongoose, { Schema, Document } from 'mongoose';

export interface ICaseStudy extends Document {
  title: string;
  slug: string;
  subtitle?: string;
  description: string;
  content: string;
  client: string;
  industry: string;
  status: 'draft' | 'published' | 'scheduled' | 'archived';
  featured: boolean;
  
  // Project details
  duration: string;
  team: string;
  budget: string;
  
  // Media
  heroImage?: string;
  gallery?: string[];
  
  // Metrics and results
  results: {
    efficiency?: string;
    dataPoints?: string;
    uptime?: string;
    costReduction?: string;
    timeToInsight?: string;
    userSatisfaction?: string;
    [key: string]: string | undefined;
  };
  
  // Technologies
  technologies: Array<{
    name: string;
    icon: string;
    category: string;
  }>;
  
  // Features and process
  keyFeatures: string[];
  process: Array<{
    phase: string;
    duration: string;
    description: string;
  }>;
  
  // Testimonials
  testimonials: Array<{
    name: string;
    role: string;
    content: string;
    avatar?: string;
  }>;
  
  // Challenge and solution
  challenge: string;
  solution: string;
  
  // Author information
  author: {
    id: string;
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
  scheduledAt?: Date;
  
  // Statistics
  stats: {
    views: number;
    likes: number;
    downloads: number;
    shares: number;
  };
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

const CaseStudySchema = new Schema<ICaseStudy>({
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
  subtitle: {
    type: String,
    trim: true,
    maxlength: 300
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500
  },
  content: {
    type: String,
    required: true
  },
  client: {
    type: String,
    required: true,
    trim: true
  },
  industry: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'scheduled', 'archived'],
    default: 'draft'
  },
  featured: {
    type: Boolean,
    default: false
  },
  
  // Project details
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
  budget: {
    type: String,
    required: true,
    trim: true
  },
  
  // Media
  heroImage: {
    type: String,
    trim: true
  },
  gallery: [{
    type: String,
    trim: true
  }],
  
  // Metrics and results
  results: {
    efficiency: String,
    dataPoints: String,
    uptime: String,
    costReduction: String,
    timeToInsight: String,
    userSatisfaction: String
  },
  
  // Technologies
  technologies: [{
    name: {
      type: String,
      required: true,
      trim: true
    },
    icon: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true,
      trim: true
    }
  }],
  
  // Features and process
  keyFeatures: [{
    type: String,
    trim: true
  }],
  process: [{
    phase: {
      type: String,
      required: true,
      trim: true
    },
    duration: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    }
  }],
  
  // Testimonials
  testimonials: [{
    name: {
      type: String,
      required: true,
      trim: true
    },
    role: {
      type: String,
      required: true,
      trim: true
    },
    content: {
      type: String,
      required: true,
      trim: true
    },
    avatar: {
      type: String,
      trim: true
    }
  }],
  
  // Challenge and solution
  challenge: {
    type: String,
    required: true,
    trim: true
  },
  solution: {
    type: String,
    required: true,
    trim: true
  },
  
  // Author information
  author: {
    id: {
      type: String,
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
  scheduledAt: {
    type: Date
  },
  
  // Statistics
  stats: {
    views: {
      type: Number,
      default: 0
    },
    likes: {
      type: Number,
      default: 0
    },
    downloads: {
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

// Indexes for better performance
CaseStudySchema.index({ slug: 1 });
CaseStudySchema.index({ status: 1 });
CaseStudySchema.index({ featured: 1 });
CaseStudySchema.index({ author: 1 });
CaseStudySchema.index({ industry: 1 });
CaseStudySchema.index({ publishedAt: -1 });
CaseStudySchema.index({ createdAt: -1 });

// Pre-save middleware to generate slug if not provided
CaseStudySchema.pre('save', function(next) {
  if (!this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  }
  next();
});

// Virtual for read time calculation
CaseStudySchema.virtual('readTime').get(function() {
  const wordsPerMinute = 200;
  const wordCount = this.content.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
});

export default mongoose.models.CaseStudy || mongoose.model<ICaseStudy>('CaseStudy', CaseStudySchema); 
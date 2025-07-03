import mongoose, { Schema, Document } from 'mongoose';

export interface IPodcast extends Document {
  name: string;
  podcastName: string;
  description: string;
  duration: string;
  plays: number;
  date: Date;
  link: string;
  status: 'draft' | 'published' | 'archived';
  featured: boolean;
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

const PodcastSchema = new Schema<IPodcast>({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  podcastName: {
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
  duration: {
    type: String,
    required: true,
    trim: true
  },
  plays: {
    type: Number,
    default: 0,
    min: 0
  },
  date: {
    type: Date,
    required: true
  },
  link: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  featured: {
    type: Boolean,
    default: false
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
PodcastSchema.index({ status: 1, featured: 1 });
PodcastSchema.index({ name: 'text', description: 'text' });

export default mongoose.models.Podcast || mongoose.model<IPodcast>('Podcast', PodcastSchema); 
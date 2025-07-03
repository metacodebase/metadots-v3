import mongoose, { Schema, Document } from 'mongoose';

export interface IReview extends Document {
  clientName: string;
  clientRole: string;
  clientCompany: string;
  image?: string;
  review: string;
  rating: number;
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

const ReviewSchema = new Schema<IReview>({
  clientName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  clientRole: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  clientCompany: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  image: {
    type: String,
    default: '/placeholder.svg?height=300&width=500'
  },
  review: {
    type: String,
    required: true,
    maxlength: 1000
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
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
ReviewSchema.index({ status: 1, featured: 1 });
ReviewSchema.index({ clientName: 'text', review: 'text' });

export default mongoose.models.Review || mongoose.model<IReview>('Review', ReviewSchema); 
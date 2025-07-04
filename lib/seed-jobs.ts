import { connectMongo } from './mongodb';
import Job from '@/models/Job';
import User from '@/models/User';

const jobData = [
  {
    title: "Senior Full-Stack Developer",
    department: "Engineering",
    location: "Remote / San Francisco",
    type: "Full-time" as const,
    experience: "5+ years",
    salary: "$120k - $180k",
    description: "Join our engineering team to build scalable web applications using modern technologies. You'll work on challenging projects that impact millions of users.",
    requirements: [
      "5+ years of experience with React, Node.js, and TypeScript",
      "Experience with cloud platforms (AWS, GCP, or Azure)",
      "Strong understanding of database design and optimization",
      "Experience with microservices architecture",
      "Excellent problem-solving and communication skills",
    ],
    benefits: [
      "Competitive salary and equity",
      "Health, dental, and vision insurance",
      "Flexible work arrangements",
      "Professional development budget",
      "Latest tech equipment",
    ],
    tags: ["React", "Node.js", "TypeScript", "AWS", "PostgreSQL"],
    icon: "Code",
    color: "from-blue-500 to-indigo-600",
    featured: true,
    status: "published" as const,
    company: {
      name: "Metadots",
      description: "Leading technology company building innovative solutions",
      logo: "/images/metadots-logo.svg",
      website: "https://metadots.com"
    },
    remoteWork: true,
    relocation: false,
    visaSponsorship: true,
    contact: {
      name: "HR Team",
      email: "careers@metadots.com",
      phone: "+1 (555) 123-4567"
    }
  },
  {
    title: "AI/ML Engineer",
    department: "AI Research",
    location: "Remote / New York",
    type: "Full-time" as const,
    experience: "3+ years",
    salary: "$130k - $200k",
    description: "Lead the development of cutting-edge AI solutions and machine learning models that power our intelligent applications.",
    requirements: [
      "3+ years of experience in machine learning and AI",
      "Proficiency in Python, TensorFlow, and PyTorch",
      "Experience with large language models and NLP",
      "Strong mathematical and statistical background",
      "Experience with MLOps and model deployment",
    ],
    benefits: [
      "Top-tier compensation package",
      "Research and conference budget",
      "Access to latest AI tools and platforms",
      "Flexible work schedule",
      "Health and wellness benefits",
    ],
    tags: ["Python", "TensorFlow", "PyTorch", "NLP", "MLOps"],
    icon: "Lightbulb",
    color: "from-purple-500 to-pink-600",
    featured: true,
    status: "published" as const,
    company: {
      name: "Metadots",
      description: "Leading technology company building innovative solutions",
      logo: "/images/metadots-logo.svg",
      website: "https://metadots.com"
    },
    remoteWork: true,
    relocation: true,
    visaSponsorship: true,
    contact: {
      name: "HR Team",
      email: "careers@metadots.com",
      phone: "+1 (555) 123-4567"
    }
  },
  {
    title: "Mobile App Developer (React Native)",
    department: "Mobile",
    location: "Remote / Austin",
    type: "Full-time" as const,
    experience: "4+ years",
    salary: "$110k - $160k",
    description: "Build beautiful and performant mobile applications that deliver exceptional user experiences across iOS and Android platforms.",
    requirements: [
      "4+ years of React Native development experience",
      "Strong knowledge of JavaScript/TypeScript",
      "Experience with native iOS and Android development",
      "Understanding of mobile app performance optimization",
      "Experience with app store deployment processes",
    ],
    benefits: [
      "Competitive salary and benefits",
      "Mobile device allowance",
      "Flexible working hours",
      "Learning and development opportunities",
      "Team building events",
    ],
    tags: ["React Native", "iOS", "Android", "JavaScript", "TypeScript"],
    icon: "Smartphone",
    color: "from-green-500 to-emerald-600",
    featured: false,
    status: "published" as const,
    company: {
      name: "Metadots",
      description: "Leading technology company building innovative solutions",
      logo: "/images/metadots-logo.svg",
      website: "https://metadots.com"
    },
    remoteWork: true,
    relocation: false,
    visaSponsorship: false,
    contact: {
      name: "HR Team",
      email: "careers@metadots.com",
      phone: "+1 (555) 123-4567"
    }
  },
  {
    title: "DevOps Engineer",
    department: "Infrastructure",
    location: "Remote / Seattle",
    type: "Full-time" as const,
    experience: "4+ years",
    salary: "$115k - $170k",
    description: "Design and maintain our cloud infrastructure, ensuring scalability, security, and reliability of our systems.",
    requirements: [
      "4+ years of DevOps and cloud infrastructure experience",
      "Expertise in AWS, Docker, and Kubernetes",
      "Experience with Infrastructure as Code (Terraform, CloudFormation)",
      "Strong knowledge of CI/CD pipelines",
      "Experience with monitoring and logging tools",
    ],
    benefits: [
      "Excellent compensation package",
      "Cloud certification support",
      "Home office setup allowance",
      "Flexible PTO policy",
      "Professional development budget",
    ],
    tags: ["AWS", "Docker", "Kubernetes", "Terraform", "CI/CD"],
    icon: "Settings",
    color: "from-orange-500 to-red-600",
    featured: false,
    status: "published" as const,
    company: {
      name: "Metadots",
      description: "Leading technology company building innovative solutions",
      logo: "/images/metadots-logo.svg",
      website: "https://metadots.com"
    },
    remoteWork: true,
    relocation: true,
    visaSponsorship: true,
    contact: {
      name: "HR Team",
      email: "careers@metadots.com",
      phone: "+1 (555) 123-4567"
    }
  },
  {
    title: "UX/UI Designer",
    department: "Design",
    location: "Remote / Los Angeles",
    type: "Full-time" as const,
    experience: "3+ years",
    salary: "$90k - $140k",
    description: "Create intuitive and beautiful user experiences that delight our users and drive business success.",
    requirements: [
      "3+ years of UX/UI design experience",
      "Proficiency in Figma, Sketch, and design systems",
      "Strong portfolio demonstrating design thinking",
      "Experience with user research and testing",
      "Understanding of front-end development principles",
    ],
    benefits: [
      "Competitive salary and equity",
      "Design tools and software licenses",
      "Conference and workshop attendance",
      "Flexible work environment",
      "Health and wellness benefits",
    ],
    tags: ["Figma", "UX Research", "Design Systems", "Prototyping", "User Testing"],
    icon: "PenTool",
    color: "from-pink-500 to-rose-600",
    featured: false,
    status: "published" as const,
    company: {
      name: "Metadots",
      description: "Leading technology company building innovative solutions",
      logo: "/images/metadots-logo.svg",
      website: "https://metadots.com"
    },
    remoteWork: true,
    relocation: false,
    visaSponsorship: false,
    contact: {
      name: "HR Team",
      email: "careers@metadots.com",
      phone: "+1 (555) 123-4567"
    }
  },
  {
    title: "Data Engineer",
    department: "Data",
    location: "Remote / Chicago",
    type: "Full-time" as const,
    experience: "4+ years",
    salary: "$120k - $175k",
    description: "Build and maintain data pipelines and infrastructure that power our analytics and machine learning capabilities.",
    requirements: [
      "4+ years of data engineering experience",
      "Expertise in Python, SQL, and data warehousing",
      "Experience with big data technologies (Spark, Kafka, Airflow)",
      "Knowledge of cloud data platforms (Snowflake, BigQuery, Redshift)",
      "Strong understanding of data modeling and ETL processes",
    ],
    benefits: [
      "Competitive compensation",
      "Data platform access and training",
      "Flexible work arrangements",
      "Professional development support",
      "Comprehensive health benefits",
    ],
    tags: ["Python", "SQL", "Spark", "Kafka", "Snowflake"],
    icon: "Database",
    color: "from-teal-500 to-cyan-600",
    featured: false,
    status: "published" as const,
    company: {
      name: "Metadots",
      description: "Leading technology company building innovative solutions",
      logo: "/images/metadots-logo.svg",
      website: "https://metadots.com"
    },
    remoteWork: true,
    relocation: true,
    visaSponsorship: true,
    contact: {
      name: "HR Team",
      email: "careers@metadots.com",
      phone: "+1 (555) 123-4567"
    }
  }
];

export async function seedJobs() {
  try {
    await connectMongo();

    // Get admin user for author field
    const adminUser = await User.findOne({ role: 'admin' });
    if (!adminUser) {
      console.error('No admin user found. Please create an admin user first.');
      return;
    }

    // Clear existing jobs
    await Job.deleteMany({});

    // Create jobs with admin user as author
    const jobs = jobData.map(job => {
      // Generate slug from title
      const slug = job.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

      return {
        ...job,
        slug,
        author: {
          id: adminUser._id,
          name: adminUser.name,
          role: adminUser.role
        },
        publishedAt: new Date(),
        seo: {
          metaTitle: job.title,
          metaDescription: job.description.substring(0, 160),
          keywords: job.tags
        }
      };
    });

    await Job.insertMany(jobs);

    console.log(`✅ Seeded ${jobs.length} jobs successfully`);
  } catch (error) {
    console.error('❌ Error seeding jobs:', error);
  }
}

// Run if called directly
if (require.main === module) {
  seedJobs().then(() => process.exit(0));
} 
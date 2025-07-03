import { config } from "dotenv";
config({ path: ".env.local" });
import { connectMongo } from "./mongodb";
import User from "../models/User";
import Project from "../models/Project";
import CaseStudy from "../models/CaseStudy";
import Podcast from "../models/Podcast";
import Blog from "../models/Blog";
import Review from "../models/Review";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const DEFAULT_IMAGE = "https://www.knowbe4.com/hubfs/Its%20Not%20About%20URL.jpg";

async function seedMockData() {
  await connectMongo();
  console.log("Connected to MongoDB");

  // Get or create admin user
  let adminUser = await User.findOne({ role: "admin" });
  if (!adminUser) {
    const hashedPassword = await bcrypt.hash("admin123", 10);
    adminUser = await User.create({
      email: "admin@metadots.com",
      password: hashedPassword,
      name: "Admin User",
      role: "admin",
      isActive: true
    });
    console.log("Admin user created");
  }

  const author = {
    id: adminUser._id,
    name: adminUser.name,
    role: adminUser.role
  };

  // Seed Projects (10 items, 1 featured)
  const projects = [
    {
      title: "AI-Powered Analytics Platform",
      description: "Revolutionary analytics platform that processes 10M+ data points daily, featuring real-time AI insights and predictive modeling.",
      category: "AI/ML",
      tags: ["AI", "Analytics", "Machine Learning"],
      image: DEFAULT_IMAGE,
      featured: true,
      metrics: { efficiency: "340%", dataPoints: "10M+", uptime: "99.9%" },
      client: "TechCorp",
      duration: "6 months",
      team: "8 developers",
      rating: 5,
      status: "published",
      color: "from-blue-500 to-indigo-600",
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example",
      technologies: ["React", "Node.js", "Python", "TensorFlow", "AWS", "PostgreSQL"]
    },
    {
      title: "E-commerce Mobile App",
      description: "Cross-platform mobile application with AI-powered recommendations and seamless payment integration.",
      category: "E-commerce",
      tags: ["Mobile", "E-commerce", "AI"],
      image: DEFAULT_IMAGE,
      featured: false,
      metrics: { performance: "95%", conversion: "25%", revenue: "$2.4M" },
      client: "ShopFlow",
      duration: "4 months",
      team: "6 developers",
      rating: 4,
      status: "published",
      color: "from-green-500 to-emerald-600",
      technologies: ["React Native", "Node.js", "MongoDB", "Stripe"]
    },
    {
      title: "Healthcare Management System",
      description: "Comprehensive healthcare platform with patient management, telemedicine, and AI diagnostics.",
      category: "Healthcare",
      tags: ["Healthcare", "AI", "Telemedicine"],
      image: DEFAULT_IMAGE,
      featured: false,
      metrics: { accuracy: "98.7%", patients: "50K+", diagnoses: "10K+" },
      client: "HealthCare Plus",
      duration: "8 months",
      team: "12 developers",
      rating: 5,
      status: "published",
      color: "from-red-500 to-pink-600",
      technologies: ["Vue.js", "Python", "PostgreSQL", "TensorFlow"]
    },
    {
      title: "FinTech Banking Solution",
      description: "Secure digital banking platform with blockchain integration and real-time fraud detection.",
      category: "FinTech",
      tags: ["FinTech", "Blockchain", "Security"],
      image: DEFAULT_IMAGE,
      featured: false,
      metrics: { security: "99%", transactions: "1M+", users: "100K+" },
      client: "SecureBank",
      duration: "10 months",
      team: "15 developers",
      rating: 5,
      status: "published",
      color: "from-purple-500 to-indigo-600",
      technologies: ["React", "Node.js", "Blockchain", "AWS", "Redis"]
    },
    {
      title: "IoT Smart Home Platform",
      description: "Connected home automation system with AI-powered energy optimization and security monitoring.",
      category: "IoT",
      tags: ["IoT", "Smart Home", "AI"],
      image: DEFAULT_IMAGE,
      featured: false,
      metrics: { devices: "50K+", energy: "30%", security: "100%" },
      client: "SmartHome Inc",
      duration: "7 months",
      team: "10 developers",
      rating: 4,
      status: "published",
      color: "from-orange-500 to-red-600",
      technologies: ["React", "Python", "MQTT", "TensorFlow", "AWS IoT"]
    },
    {
      title: "Real Estate Management System",
      description: "Property management platform with virtual tours, AI pricing, and automated tenant screening.",
      category: "Real Estate",
      tags: ["Real Estate", "VR", "AI"],
      image: DEFAULT_IMAGE,
      featured: false,
      metrics: { properties: "5K+", users: "25K+", efficiency: "200%" },
      client: "RealEstate Pro",
      duration: "5 months",
      team: "7 developers",
      rating: 4,
      status: "published",
      color: "from-yellow-500 to-orange-600",
      technologies: ["React", "Three.js", "Node.js", "MongoDB", "AWS"]
    },
    {
      title: "Educational Learning Platform",
      description: "AI-powered learning management system with personalized curriculum and progress tracking.",
      category: "Technology",
      tags: ["Education", "AI", "LMS"],
      image: DEFAULT_IMAGE,
      featured: false,
      metrics: { students: "100K+", courses: "500+", completion: "85%" },
      client: "EduTech Solutions",
      duration: "9 months",
      team: "14 developers",
      rating: 5,
      status: "published",
      color: "from-blue-500 to-cyan-600",
      technologies: ["React", "Node.js", "MongoDB", "TensorFlow", "AWS"]
    },
    {
      title: "Supply Chain Optimization",
      description: "End-to-end supply chain management with AI-driven demand forecasting and route optimization.",
      category: "Technology",
      tags: ["Supply Chain", "AI", "Logistics"],
      image: DEFAULT_IMAGE,
      featured: false,
      metrics: { efficiency: "250%", cost: "40%", delivery: "99%" },
      client: "LogiTech",
      duration: "12 months",
      team: "18 developers",
      rating: 5,
      status: "published",
      color: "from-green-500 to-teal-600",
      technologies: ["React", "Python", "PostgreSQL", "TensorFlow", "AWS"]
    },
    {
      title: "Social Media Analytics Tool",
      description: "Comprehensive social media monitoring and analytics platform with sentiment analysis.",
      category: "Technology",
      tags: ["Social Media", "Analytics", "AI"],
      image: DEFAULT_IMAGE,
      featured: false,
      metrics: { users: "50K+", posts: "10M+", accuracy: "95%" },
      client: "SocialMetrics",
      duration: "6 months",
      team: "9 developers",
      rating: 4,
      status: "published",
      color: "from-pink-500 to-purple-600",
      technologies: ["React", "Node.js", "MongoDB", "NLP", "AWS"]
    },
    {
      title: "Cybersecurity Dashboard",
      description: "Real-time cybersecurity monitoring and threat detection platform with automated response.",
      category: "Technology",
      tags: ["Cybersecurity", "AI", "Monitoring"],
      image: DEFAULT_IMAGE,
      featured: false,
      metrics: { threats: "1K+", response: "99.9%", uptime: "100%" },
      client: "CyberShield",
      duration: "8 months",
      team: "11 developers",
      rating: 5,
      status: "published",
      color: "from-gray-500 to-slate-600",
      technologies: ["React", "Python", "PostgreSQL", "ML", "AWS"]
    }
  ];

  // Seed Case Studies (10 items, 3 featured)
  const caseStudies = [
    {
      title: "AI-Powered Customer Service Transformation",
      slug: "ai-customer-service-transformation",
      subtitle: "How TechCorp increased customer satisfaction by 340%",
      description: "Complete transformation of customer service operations using AI chatbots and sentiment analysis.",
      content: "This case study explores how TechCorp revolutionized their customer service...",
      client: "TechCorp",
      industry: "Technology",
      featured: true,
      duration: "6 months",
      team: "8 developers",
      budget: "$500K",
      heroImage: DEFAULT_IMAGE,
      results: { efficiency: "340%", userSatisfaction: "95%", costReduction: "60%" },
      technologies: [{ name: "React", icon: "react", category: "Frontend" }],
      keyFeatures: ["AI Chatbots", "Sentiment Analysis", "Real-time Analytics"],
      challenge: "High customer service costs and long response times",
      solution: "Implemented AI-powered chatbots with human fallback"
    },
    {
      title: "E-commerce Platform Scaling",
      slug: "ecommerce-platform-scaling",
      subtitle: "ShopFlow's journey to handle 1M+ daily transactions",
      description: "Scaled e-commerce platform to handle massive traffic and transactions.",
      content: "ShopFlow needed to scale their platform to handle growing demand...",
      client: "ShopFlow",
      industry: "E-commerce",
      featured: true,
      duration: "8 months",
      team: "12 developers",
      budget: "$800K",
      heroImage: DEFAULT_IMAGE,
      results: { efficiency: "200%", transactions: "1M+", uptime: "99.9%" },
      technologies: [{ name: "Node.js", icon: "nodejs", category: "Backend" }],
      keyFeatures: ["Microservices", "Load Balancing", "CDN Integration"],
      challenge: "Platform couldn't handle peak traffic",
      solution: "Implemented microservices architecture with auto-scaling"
    },
    {
      title: "Healthcare AI Diagnostics",
      slug: "healthcare-ai-diagnostics",
      subtitle: "Revolutionizing medical diagnosis with AI",
      description: "AI-powered diagnostic system that improved accuracy and reduced diagnosis time.",
      content: "Healthcare Plus implemented AI diagnostics to improve patient care...",
      client: "Healthcare Plus",
      industry: "Healthcare",
      featured: true,
      duration: "12 months",
      team: "15 developers",
      budget: "$1.2M",
      heroImage: DEFAULT_IMAGE,
      results: { accuracy: "98.7%", timeToInsight: "80%", costReduction: "45%" },
      technologies: [{ name: "TensorFlow", icon: "tensorflow", category: "AI/ML" }],
      keyFeatures: ["Image Recognition", "Predictive Analytics", "Integration"],
      challenge: "Long diagnosis times and human error",
      solution: "AI-powered image analysis and predictive diagnostics"
    },
    {
      title: "FinTech Security Enhancement",
      slug: "fintech-security-enhancement",
      subtitle: "Building the most secure banking platform",
      description: "Enhanced security measures for digital banking platform.",
      content: "SecureBank needed to implement advanced security measures...",
      client: "SecureBank",
      industry: "FinTech",
      featured: false,
      duration: "10 months",
      team: "14 developers",
      budget: "$900K",
      heroImage: DEFAULT_IMAGE,
      results: { security: "99.9%", fraud: "0.01%", userTrust: "98%" },
      technologies: [{ name: "Blockchain", icon: "blockchain", category: "Security" }],
      keyFeatures: ["Multi-factor Auth", "Blockchain", "Real-time Monitoring"],
      challenge: "Increasing cyber threats and fraud",
      solution: "Multi-layered security with blockchain verification"
    },
    {
      title: "IoT Smart City Implementation",
      slug: "iot-smart-city-implementation",
      subtitle: "Connecting an entire city with IoT",
      description: "Comprehensive IoT implementation for smart city infrastructure.",
      content: "A major city implemented IoT solutions across infrastructure...",
      client: "SmartCity Corp",
      industry: "IoT",
      featured: false,
      duration: "18 months",
      team: "25 developers",
      budget: "$2.5M",
      heroImage: DEFAULT_IMAGE,
      results: { efficiency: "300%", energy: "40%", cost: "35%" },
      technologies: [{ name: "MQTT", icon: "mqtt", category: "IoT" }],
      keyFeatures: ["Traffic Management", "Energy Optimization", "Public Safety"],
      challenge: "Inefficient city infrastructure and high costs",
      solution: "IoT sensors and AI-powered optimization"
    },
    {
      title: "Real Estate Virtual Tours",
      slug: "real-estate-virtual-tours",
      subtitle: "Revolutionizing property viewing with VR",
      description: "Virtual reality platform for property tours and visualization.",
      content: "RealEstate Pro implemented VR technology for property viewing...",
      client: "RealEstate Pro",
      industry: "Real Estate",
      featured: false,
      duration: "7 months",
      team: "10 developers",
      budget: "$600K",
      heroImage: DEFAULT_IMAGE,
      results: { views: "500%", sales: "200%", efficiency: "150%" },
      technologies: [{ name: "Three.js", icon: "threejs", category: "3D" }],
      keyFeatures: ["VR Tours", "3D Modeling", "Interactive Features"],
      challenge: "Limited property viewing options during pandemic",
      solution: "Immersive VR property tours with 3D visualization"
    },
    {
      title: "Educational AI Tutoring",
      slug: "educational-ai-tutoring",
      subtitle: "Personalized learning with AI",
      description: "AI-powered tutoring system that adapts to individual learning styles.",
      content: "EduTech Solutions created an AI tutoring platform...",
      client: "EduTech Solutions",
      industry: "Education",
      featured: false,
      duration: "9 months",
      team: "13 developers",
      budget: "$750K",
      heroImage: DEFAULT_IMAGE,
      results: { completion: "85%", performance: "40%", satisfaction: "92%" },
      technologies: [{ name: "TensorFlow", icon: "tensorflow", category: "AI/ML" }],
      keyFeatures: ["Adaptive Learning", "Progress Tracking", "Personalization"],
      challenge: "One-size-fits-all education approach",
      solution: "AI-powered personalized learning paths"
    },
    {
      title: "Supply Chain Optimization",
      slug: "supply-chain-optimization",
      subtitle: "Streamlining global logistics with AI",
      description: "AI-driven supply chain optimization for global operations.",
      content: "LogiTech implemented AI optimization for their supply chain...",
      client: "LogiTech",
      industry: "Logistics",
      featured: false,
      duration: "11 months",
      team: "16 developers",
      budget: "$1.1M",
      heroImage: DEFAULT_IMAGE,
      results: { efficiency: "250%", cost: "40%", delivery: "99%" },
      technologies: [{ name: "Python", icon: "python", category: "Backend" }],
      keyFeatures: ["Route Optimization", "Demand Forecasting", "Real-time Tracking"],
      challenge: "Inefficient routes and poor demand forecasting",
      solution: "AI-powered route optimization and demand prediction"
    },
    {
      title: "Social Media Analytics",
      slug: "social-media-analytics",
      subtitle: "Understanding social media impact",
      description: "Comprehensive social media analytics and monitoring platform.",
      content: "SocialMetrics built an analytics platform for social media...",
      client: "SocialMetrics",
      industry: "Marketing",
      featured: false,
      duration: "6 months",
      team: "9 developers",
      budget: "$450K",
      heroImage: DEFAULT_IMAGE,
      results: { insights: "95%", engagement: "200%", ROI: "300%" },
      technologies: [{ name: "NLP", icon: "nlp", category: "AI/ML" }],
      keyFeatures: ["Sentiment Analysis", "Trend Detection", "ROI Tracking"],
      challenge: "Lack of actionable social media insights",
      solution: "AI-powered sentiment analysis and trend detection"
    },
    {
      title: "Cybersecurity Threat Detection",
      slug: "cybersecurity-threat-detection",
      subtitle: "Real-time threat detection and response",
      description: "Advanced cybersecurity platform with real-time threat detection.",
      content: "CyberShield implemented real-time threat detection...",
      client: "CyberShield",
      industry: "Cybersecurity",
      featured: false,
      duration: "8 months",
      team: "11 developers",
      budget: "$700K",
      heroImage: DEFAULT_IMAGE,
      results: { threats: "1K+", response: "99.9%", uptime: "100%" },
      technologies: [{ name: "ML", icon: "ml", category: "AI/ML" }],
      keyFeatures: ["Real-time Monitoring", "Threat Detection", "Automated Response"],
      challenge: "Increasing cyber threats and slow response times",
      solution: "AI-powered real-time threat detection and automated response"
    }
  ];

  // Seed Podcasts (10 items, 3 featured)
  const podcasts = [
    {
      name: "The Future of AI in Business",
      podcastName: "Tech Insights Podcast",
      description: "Exploring how artificial intelligence is transforming business operations and decision-making processes.",
      duration: "45 min",
      plays: 12500,
      date: "2024-01-15",
      link: "https://spotify.com/episode/ai-business-future",
      featured: true,
      status: "published"
    },
    {
      name: "Building Scalable Web Applications",
      podcastName: "Developer's Corner",
      description: "Deep dive into architectural patterns and best practices for building applications that scale.",
      duration: "52 min",
      plays: 9800,
      date: "2024-01-12",
      link: "https://spotify.com/episode/scalable-apps",
      featured: true,
      status: "published"
    },
    {
      name: "Cloud-Native Development Trends",
      podcastName: "Cloud Tech Talk",
      description: "Understanding the latest trends in cloud-native development and deployment strategies.",
      duration: "38 min",
      plays: 7200,
      date: "2024-01-10",
      link: "https://spotify.com/episode/cloud-native",
      featured: true,
      status: "published"
    },
    {
      name: "Mobile App Development Best Practices",
      podcastName: "Mobile Dev Weekly",
      description: "Essential strategies and best practices for creating successful mobile applications.",
      duration: "41 min",
      plays: 11300,
      date: "2024-01-08",
      link: "https://spotify.com/episode/mobile-best-practices",
      featured: false,
      status: "published"
    },
    {
      name: "Database Optimization Techniques",
      podcastName: "Data Deep Dive",
      description: "Advanced techniques for optimizing database performance and improving application speed.",
      duration: "48 min",
      plays: 6800,
      date: "2024-01-05",
      link: "https://spotify.com/episode/database-optimization",
      featured: false,
      status: "published"
    },
    {
      name: "The Rise of No-Code Development",
      podcastName: "No-Code Revolution",
      description: "How no-code platforms are democratizing software development and enabling citizen developers.",
      duration: "42 min",
      plays: 8700,
      date: "2024-01-03",
      link: "https://spotify.com/episode/no-code-rise",
      featured: false,
      status: "published"
    },
    {
      name: "Cybersecurity in the Modern Era",
      podcastName: "Security Matters",
      description: "Discussing the latest cybersecurity threats and defense strategies for modern applications.",
      duration: "55 min",
      plays: 9200,
      date: "2024-01-01",
      link: "https://spotify.com/episode/cybersecurity-modern",
      featured: false,
      status: "published"
    },
    {
      name: "DevOps and CI/CD Best Practices",
      podcastName: "DevOps Daily",
      description: "Streamlining development workflows with modern DevOps practices and continuous integration.",
      duration: "47 min",
      plays: 7600,
      date: "2023-12-28",
      link: "https://spotify.com/episode/devops-cicd",
      featured: false,
      status: "published"
    },
    {
      name: "Machine Learning in Production",
      podcastName: "ML in Practice",
      description: "Real-world challenges and solutions for deploying machine learning models in production.",
      duration: "50 min",
      plays: 8400,
      date: "2023-12-25",
      link: "https://spotify.com/episode/ml-production",
      featured: false,
      status: "published"
    },
    {
      name: "The Future of Web Development",
      podcastName: "Web Dev Trends",
      description: "Exploring emerging technologies and trends that will shape the future of web development.",
      duration: "44 min",
      plays: 7900,
      date: "2023-12-22",
      link: "https://spotify.com/episode/web-dev-future",
      featured: false,
      status: "published"
    }
  ];

  // Seed Blogs (10 items, 2 featured)
  const blogs = [
    {
      title: "Building Scalable Web Applications with Modern Architecture",
      slug: "building-scalable-web-applications",
      excerpt: "Discover the architectural patterns and best practices that enable applications to handle millions of users.",
      content: "In today's digital landscape, building scalable web applications is crucial for business success...",
      featuredImage: DEFAULT_IMAGE,
      category: "Development",
      tags: ["Architecture", "Scalability", "Best Practices"],
      featured: true,
      status: "published",
      readTime: "8 min",
      stats: { views: 2300, likes: 145, shares: 67, comments: 23 }
    },
    {
      title: "The Rise of Cloud-Native Applications",
      slug: "rise-of-cloud-native-applications",
      excerpt: "Understanding how cloud-native development is revolutionizing the way we build and deploy applications.",
      content: "Cloud-native applications represent a fundamental shift in how we approach software development...",
      featuredImage: DEFAULT_IMAGE,
      category: "Cloud Computing",
      tags: ["Cloud", "Microservices", "DevOps"],
      featured: true,
      status: "published",
      readTime: "6 min",
      stats: { views: 1800, likes: 98, shares: 45, comments: 18 }
    },
    {
      title: "AI-Powered Code Generation Tools",
      slug: "ai-powered-code-generation",
      excerpt: "Exploring how AI is transforming the development process through intelligent code generation.",
      content: "Artificial intelligence is revolutionizing the way developers write and maintain code...",
      featuredImage: DEFAULT_IMAGE,
      category: "AI/ML",
      tags: ["AI", "Code Generation", "Productivity"],
      featured: false,
      status: "published",
      readTime: "12 min",
      stats: { views: 3200, likes: 187, shares: 89, comments: 34 }
    },
    {
      title: "The Future of Mobile App Development",
      slug: "future-mobile-app-development",
      excerpt: "Emerging trends and technologies that will shape the future of mobile application development.",
      content: "Mobile app development continues to evolve with new technologies and user expectations...",
      featuredImage: DEFAULT_IMAGE,
      category: "Mobile Development",
      tags: ["Mobile", "React Native", "Flutter"],
      featured: false,
      status: "published",
      readTime: "10 min",
      stats: { views: 2100, likes: 123, shares: 56, comments: 21 }
    },
    {
      title: "Database Design Best Practices",
      slug: "database-design-best-practices",
      excerpt: "Essential principles and strategies for designing efficient and scalable database systems.",
      content: "Proper database design is the foundation of any successful application...",
      featuredImage: DEFAULT_IMAGE,
      category: "Database",
      tags: ["Database", "Design", "Performance"],
      featured: false,
      status: "published",
      readTime: "9 min",
      stats: { views: 1600, likes: 87, shares: 34, comments: 15 }
    },
    {
      title: "Cybersecurity Best Practices for Developers",
      slug: "cybersecurity-best-practices-developers",
      excerpt: "Essential security practices that every developer should implement in their applications.",
      content: "Security should be a top priority for every developer and development team...",
      featuredImage: DEFAULT_IMAGE,
      category: "Security",
      tags: ["Security", "Best Practices", "OWASP"],
      featured: false,
      status: "published",
      readTime: "11 min",
      stats: { views: 2800, likes: 156, shares: 78, comments: 29 }
    },
    {
      title: "Performance Optimization Techniques",
      slug: "performance-optimization-techniques",
      excerpt: "Advanced techniques for optimizing application performance and user experience.",
      content: "Performance optimization is crucial for providing a great user experience...",
      featuredImage: DEFAULT_IMAGE,
      category: "Performance",
      tags: ["Performance", "Optimization", "User Experience"],
      featured: false,
      status: "published",
      readTime: "7 min",
      stats: { views: 1400, likes: 76, shares: 32, comments: 12 }
    },
    {
      title: "DevOps Culture and Implementation",
      slug: "devops-culture-implementation",
      excerpt: "Building a successful DevOps culture and implementing effective CI/CD pipelines.",
      content: "DevOps is more than just tools and processes—it's a cultural shift...",
      featuredImage: DEFAULT_IMAGE,
      category: "DevOps",
      tags: ["DevOps", "CI/CD", "Culture"],
      featured: false,
      status: "published",
      readTime: "8 min",
      stats: { views: 1900, likes: 104, shares: 48, comments: 19 }
    },
    {
      title: "Machine Learning in Production",
      slug: "machine-learning-production",
      excerpt: "Challenges and solutions for deploying machine learning models in production environments.",
      content: "Deploying machine learning models in production presents unique challenges...",
      featuredImage: DEFAULT_IMAGE,
      category: "AI/ML",
      tags: ["Machine Learning", "Production", "MLOps"],
      featured: false,
      status: "published",
      readTime: "13 min",
      stats: { views: 2500, likes: 134, shares: 67, comments: 25 }
    },
    {
      title: "Modern JavaScript Frameworks Comparison",
      slug: "modern-javascript-frameworks-comparison",
      excerpt: "A comprehensive comparison of popular JavaScript frameworks and their use cases.",
      content: "Choosing the right JavaScript framework can significantly impact your project's success...",
      featuredImage: DEFAULT_IMAGE,
      category: "Frontend",
      tags: ["JavaScript", "React", "Vue", "Angular"],
      featured: false,
      status: "published",
      readTime: "10 min",
      stats: { views: 2200, likes: 118, shares: 52, comments: 20 }
    }
  ];

  // Seed Reviews (10 items, 3 featured)
  const reviews = [
    {
      clientName: "Sarah Johnson",
      clientRole: "CEO",
      clientCompany: "TechCorp",
      image: DEFAULT_IMAGE,
      review: "Metadots transformed our digital presence completely. Their team's expertise and dedication exceeded our expectations. The AI solutions they implemented increased our efficiency by 300%.",
      rating: 5,
      featured: true,
      status: "published"
    },
    {
      clientName: "Michael Chen",
      clientRole: "Founder",
      clientCompany: "StartupXYZ",
      image: DEFAULT_IMAGE,
      review: "The mobile app they developed for us has significantly improved our customer engagement and business growth. ROI increased by 250% within the first quarter.",
      rating: 5,
      featured: true,
      status: "published"
    },
    {
      clientName: "Emily Rodriguez",
      clientRole: "CTO",
      clientCompany: "InnovateLab",
      image: DEFAULT_IMAGE,
      review: "Professional, reliable, and innovative. Metadots delivered exactly what we needed on time and within budget. Their AI integration saved us 40 hours per week.",
      rating: 5,
      featured: true,
      status: "published"
    },
    {
      clientName: "David Kim",
      clientRole: "Product Manager",
      clientCompany: "DataFlow Inc",
      image: DEFAULT_IMAGE,
      review: "Exceptional work on our data analytics platform. The team's technical expertise and attention to detail resulted in a solution that exceeded our expectations.",
      rating: 5,
      featured: false,
      status: "published"
    },
    {
      clientName: "Lisa Wang",
      clientRole: "Director of Technology",
      clientCompany: "HealthTech Solutions",
      image: DEFAULT_IMAGE,
      review: "The healthcare management system they built for us has revolutionized our patient care processes. The AI diagnostics feature has improved accuracy significantly.",
      rating: 4,
      featured: false,
      status: "published"
    },
    {
      clientName: "Robert Taylor",
      clientRole: "VP of Engineering",
      clientCompany: "FinSecure",
      image: DEFAULT_IMAGE,
      review: "Outstanding security implementation for our banking platform. The team's expertise in cybersecurity and blockchain technology is truly impressive.",
      rating: 5,
      featured: false,
      status: "published"
    },
    {
      clientName: "Jennifer Lee",
      clientRole: "Operations Manager",
      clientCompany: "SmartCity Corp",
      image: DEFAULT_IMAGE,
      review: "The IoT implementation for our smart city project was flawless. The system has improved efficiency across all departments and reduced operational costs.",
      rating: 4,
      featured: false,
      status: "published"
    },
    {
      clientName: "Alex Thompson",
      clientRole: "CEO",
      clientCompany: "EduTech Pro",
      image: DEFAULT_IMAGE,
      review: "The AI-powered learning platform they developed has transformed our educational offerings. Student engagement and completion rates have increased dramatically.",
      rating: 5,
      featured: false,
      status: "published"
    },
    {
      clientName: "Maria Garcia",
      clientRole: "Head of Digital",
      clientCompany: "RetailMax",
      image: DEFAULT_IMAGE,
      review: "The e-commerce platform they built for us handles massive traffic seamlessly. The AI recommendations feature has significantly increased our sales.",
      rating: 4,
      featured: false,
      status: "published"
    },
    {
      clientName: "James Wilson",
      clientRole: "CTO",
      clientCompany: "LogiTech Global",
      image: DEFAULT_IMAGE,
      review: "The supply chain optimization system has streamlined our global operations. The AI-driven forecasting has reduced costs and improved delivery times.",
      rating: 5,
      featured: false,
      status: "published"
    }
  ];

  try {
    // Clear existing data
    await Project.deleteMany({});
    await CaseStudy.deleteMany({});
    await Podcast.deleteMany({});
    await Blog.deleteMany({});
    await Review.deleteMany({});
    console.log("Cleared existing data");

    // Seed Projects
    for (const projectData of projects) {
      await Project.create({
        ...projectData,
        author,
        publishedAt: new Date()
      });
    }
    console.log("✅ Projects seeded (10 items, 1 featured)");

    // Seed Case Studies
    for (const caseStudyData of caseStudies) {
      await CaseStudy.create({
        ...caseStudyData,
        author,
        publishedAt: new Date(),
        content: caseStudyData.content + " This is a detailed case study content that would normally be much longer and include comprehensive information about the project, challenges faced, solutions implemented, and results achieved. It would include technical details, methodologies used, and lessons learned throughout the project lifecycle.",
        process: [
          { phase: "Discovery", duration: "2 weeks", description: "Initial requirements gathering and analysis" },
          { phase: "Design", duration: "4 weeks", description: "System architecture and UI/UX design" },
          { phase: "Development", duration: "12 weeks", description: "Core development and implementation" },
          { phase: "Testing", duration: "3 weeks", description: "Comprehensive testing and quality assurance" },
          { phase: "Deployment", duration: "1 week", description: "Production deployment and go-live" }
        ],
        testimonials: [
          {
            name: "John Doe",
            role: "Project Manager",
            content: "The team delivered exceptional results that exceeded our expectations.",
            avatar: DEFAULT_IMAGE
          }
        ]
      });
    }
    console.log("✅ Case Studies seeded (10 items, 3 featured)");

    // Seed Podcasts
    for (const podcastData of podcasts) {
      await Podcast.create({
        ...podcastData,
        author,
        publishedAt: new Date()
      });
    }
    console.log("✅ Podcasts seeded (10 items, 3 featured)");

    // Seed Blogs
    for (const blogData of blogs) {
      await Blog.create({
        ...blogData,
        author,
        publishedAt: new Date(),
        content: blogData.content + " This is extended content that would normally be much longer and include detailed explanations, code examples, best practices, and real-world scenarios. The content would be comprehensive and provide valuable insights for readers interested in the topic.",
        seo: {
          metaTitle: blogData.title,
          metaDescription: blogData.excerpt,
          keywords: blogData.tags
        }
      });
    }
    console.log("✅ Blogs seeded (10 items, 2 featured)");

    // Seed Reviews
    for (const reviewData of reviews) {
      await Review.create({
        ...reviewData,
        author,
        publishedAt: new Date()
      });
    }
    console.log("✅ Reviews seeded (10 items, 3 featured)");

    console.log("\n🎉 Mock data seeding completed successfully!");
    console.log("📊 Summary:");
    console.log("   • Projects: 10 (1 featured)");
    console.log("   • Case Studies: 10 (3 featured)");
    console.log("   • Podcasts: 10 (3 featured)");
    console.log("   • Blogs: 10 (2 featured)");
    console.log("   • Reviews: 10 (3 featured)");

  } catch (error) {
    console.error("❌ Error seeding data:", error);
  } finally {
    await mongoose.connection.close();
    console.log("Database connection closed");
    process.exit(0);
  }
}

seedMockData(); 
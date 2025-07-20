import { config } from "dotenv";
config({ path: ".env.local" });
import { connectMongo } from "./mongodb";
import Blog from "../models/Blog";
import User from "../models/User";
import mongoose from "mongoose";

const DEFAULT_IMAGE = "/placeholder.svg?height=400&width=600";

async function seedBlogs() {
  await connectMongo();

  // Get admin user for author field
  const adminUser = await User.findOne({ role: 'admin' });
  if (!adminUser) {
    console.error('No admin user found. Please create an admin user first.');
    return;
  }

  const author = {
    id: adminUser._id,
    name: adminUser.name,
    avatar: "/placeholder.svg?height=40&width=40",
    role: adminUser.role,
    designation: adminUser.designation
  };

  const blogs = [
    {
      title: "Building Scalable Web Applications with Modern Architecture",
      slug: "building-scalable-web-applications",
      excerpt: "Discover the architectural patterns and best practices that enable applications to handle millions of users.",
      content: "<h2>Introduction</h2><p>In today's digital landscape, building scalable web applications is crucial for business success. This article explores the key architectural patterns and best practices that enable applications to handle millions of users while maintaining performance and reliability.</p><h2>Microservices Architecture</h2><p>Microservices architecture is one of the most effective patterns for building scalable applications. By breaking down your application into smaller, independent services, you can scale each component independently based on demand.</p><h2>Load Balancing</h2><p>Implementing proper load balancing ensures that traffic is distributed evenly across your servers, preventing any single server from becoming overwhelmed.</p><h2>Database Optimization</h2><p>Database performance is often the bottleneck in web applications. Implementing proper indexing, query optimization, and caching strategies can dramatically improve performance.</p><h2>Conclusion</h2><p>Building scalable web applications requires careful planning and implementation of proven architectural patterns. By following these best practices, you can create applications that grow with your business needs.</p>",
      featuredImage: DEFAULT_IMAGE,
      category: "Development",
      tags: ["Architecture", "Scalability", "Best Practices"],
      featured: true,
      status: "published",
      readTime: "8 min",
      stats: { views: 2300, likes: 145, shares: 67, comments: 23 },
      color: "from-blue-500 to-indigo-600"
    },
    {
      title: "The Rise of Cloud-Native Applications",
      slug: "rise-of-cloud-native-applications",
      excerpt: "Understanding how cloud-native development is revolutionizing the way we build and deploy applications.",
      content: "<h2>What are Cloud-Native Applications?</h2><p>Cloud-native applications are designed to take full advantage of cloud computing models. They are built using microservices architecture, deployed in containers, and managed through DevOps practices.</p><h2>Benefits of Cloud-Native</h2><p>Cloud-native applications offer several advantages including improved scalability, faster deployment, better resource utilization, and enhanced reliability.</p><h2>Containerization</h2><p>Containers provide a consistent environment for applications to run, making deployment and scaling much more efficient.</p><h2>Kubernetes and Orchestration</h2><p>Kubernetes has become the de facto standard for container orchestration, providing powerful tools for managing containerized applications.</p><h2>Future of Cloud-Native</h2><p>As cloud computing continues to evolve, cloud-native applications will become the standard for modern software development.</p>",
      featuredImage: DEFAULT_IMAGE,
      category: "Cloud Computing",
      tags: ["Cloud", "Microservices", "DevOps"],
      featured: true,
      status: "published",
      readTime: "6 min",
      stats: { views: 1800, likes: 98, shares: 45, comments: 18 },
      color: "from-green-500 to-emerald-600"
    },
    {
      title: "AI-Powered Code Generation Tools",
      slug: "ai-powered-code-generation",
      excerpt: "Exploring how AI is transforming the development process through intelligent code generation.",
      content: "<h2>The AI Revolution in Development</h2><p>Artificial intelligence is revolutionizing the way developers write and maintain code. AI-powered tools are becoming increasingly sophisticated, offering capabilities that were once thought impossible.</p><h2>Code Completion and Suggestions</h2><p>Modern IDEs now offer intelligent code completion that goes beyond simple syntax suggestions, providing context-aware recommendations based on your codebase.</p><h2>Automated Testing</h2><p>AI can generate comprehensive test cases, identify potential bugs, and even suggest fixes for common issues.</p><h2>Code Review Assistance</h2><p>AI tools can analyze code quality, suggest improvements, and help maintain consistent coding standards across teams.</p><h2>Looking Ahead</h2><p>As AI continues to advance, we can expect even more sophisticated tools that will further enhance developer productivity.</p>",
      featuredImage: DEFAULT_IMAGE,
      category: "AI/ML",
      tags: ["AI", "Code Generation", "Productivity"],
      featured: false,
      status: "published",
      readTime: "12 min",
      stats: { views: 3200, likes: 187, shares: 89, comments: 34 },
      color: "from-purple-500 to-pink-600"
    },
    {
      title: "The Future of Mobile App Development",
      slug: "future-mobile-app-development",
      excerpt: "Emerging trends and technologies that will shape the future of mobile application development.",
      content: "<h2>Cross-Platform Development</h2><p>Cross-platform frameworks like React Native and Flutter are becoming increasingly popular, allowing developers to build apps for multiple platforms with a single codebase.</p><h2>Progressive Web Apps</h2><p>PWAs offer a native app-like experience through web browsers, providing an alternative to traditional mobile apps.</p><h2>5G and Edge Computing</h2><p>The rollout of 5G networks and edge computing will enable new types of mobile applications that require high bandwidth and low latency.</p><h2>AI and Machine Learning</h2><p>AI integration in mobile apps is becoming more sophisticated, enabling features like intelligent personalization and predictive analytics.</p><h2>Conclusion</h2><p>The future of mobile app development is exciting, with new technologies constantly emerging to improve user experiences.</p>",
      featuredImage: DEFAULT_IMAGE,
      category: "Mobile Development",
      tags: ["Mobile", "React Native", "Flutter"],
      featured: false,
      status: "published",
      readTime: "10 min",
      stats: { views: 2100, likes: 123, shares: 56, comments: 21 },
      color: "from-orange-500 to-red-600"
    },
    {
      title: "Database Design Best Practices",
      slug: "database-design-best-practices",
      excerpt: "Essential principles and strategies for designing efficient and scalable database systems.",
      content: "<h2>Normalization</h2><p>Proper database normalization is crucial for maintaining data integrity and avoiding redundancy. Understanding the different normal forms helps create efficient database schemas.</p><h2>Indexing Strategies</h2><p>Effective indexing can dramatically improve query performance. Understanding when and how to create indexes is essential for database optimization.</p><h2>Data Types and Constraints</h2><p>Choosing appropriate data types and implementing proper constraints ensures data quality and prevents errors.</p><h2>Performance Considerations</h2><p>Database design decisions have a significant impact on performance. Understanding how queries are executed helps in making better design choices.</p><h2>Scalability Planning</h2><p>Designing for scalability from the beginning saves significant time and effort in the long run.</p>",
      featuredImage: DEFAULT_IMAGE,
      category: "Database",
      tags: ["Database", "Design", "Performance"],
      featured: false,
      status: "published",
      readTime: "9 min",
      stats: { views: 1600, likes: 87, shares: 34, comments: 15 },
      color: "from-teal-500 to-cyan-600"
    }
  ];

  try {
    // Clear existing blog data
    await Blog.deleteMany({});
    console.log("Cleared existing blog data");

    // Seed Blogs
    for (const blogData of blogs) {
      await Blog.create({
        ...blogData,
        author,
        status: "published",
        publishedAt: new Date(),
        seo: {
          metaTitle: blogData.title,
          metaDescription: blogData.excerpt,
          keywords: blogData.tags
        }
      });
    }
    console.log("✅ Blogs seeded successfully!");
    console.log(`📊 Created ${blogs.length} blog posts`);

  } catch (error) {
    console.error("❌ Error seeding blogs:", error);
  } finally {
    await mongoose.connection.close();
    console.log("Database connection closed");
    process.exit(0);
  }
}

seedBlogs(); 
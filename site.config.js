window.SITE_CONFIG = {
  name: "Abdul Wajid",
  role: "AI Engineer",
  location: "Karachi, Sindh, Pakistan",
  availability: "Open to opportunities",
  email: "engineer.wajid.ds79@gmail.com",
  phone: "+92-311-0351773",
  resumeUrl: "#",
  socials: [
    { name: "LinkedIn", url: "https://www.linkedin.com/in/wajidai/" },
    { name: "GitHub", url: "https://github.com/Ai-Engineer079" },
    { name: "Kaggle", url: "https://www.kaggle.com/abdulwajid79" },
    { name: "Hugging Face", url: "https://huggingface.co/engineerWajid" },
    { name: "Microsoft Learn", url: "https://learn.microsoft.com/en-us/users/abdulwajid/achievements" },
    { name: "Email", url: "mailto:engineer.wajid.ds79@gmail.com" }
  ],
  aboutHtml: `
    <strong>AI Engineer</strong> | <strong>NLP</strong> & <strong>Generative AI</strong> Specialist<br>
    I fine‑tune LLMs (Llama&nbsp;3.1&nbsp;8B, GPT‑4, Mistral) and build <strong>RAG chatbots</strong> and reliable ML pipelines.<br>
    At <a href="https://xflowresearch.com" target="_blank" rel="noopener"><strong>Bluescarf.ai</strong></a>, I ship scalable AI products that turn data into value.
  `,

  quickFacts: [
    { label: "Location", value: "Karachi, Sindh, Pakistan" },
    { label: "Phone", value: "+92-311-0351773" },
    { label: "Education", value: "B.E. Computer Systems Engineering" },
    { label: "Focus", value: "Code + No Code Solutions, Gen AI, Agentic AI, N8N" },
    { label: "Availability", value: "Open to opportunities" },
    { label: "Certifications", value: "DataCamp, HackerRank, Coursera & Hugging Face" }
  ],

  education: [
    {
      period: "2020 - 2024",
      institution: "Mehran University of Engineering & Technology (MUET), Jamshoro, Pakistan",
      degree: "B.E., Computer Systems Engineering",
      logo: "assets/images/muetLogo.svg",
      url: "https://www.muet.edu.pk"
    }
  ],

  certifications: [
    { name: "Introduction to Python", issuer: "DataCamp & HackerRank" },
    { name: "Foundations of Data Science", issuer: "Google (Coursera)" },
    { name: "AI Agents Fundamentals", issuer: "Hugging Face" }
  ],

  experience: [
    {
      period: "May 2025 - Present",
      company: "X Flow Software Technology LLC (Bluescarf AI)",
      title: "AI Engineer",
      logo: "assets/images/xflowLogo.svg",
      url: "https://xflowresearch.com",
      summary:
        "End-to-end ownership of LLM fine-tuning, RAG platform work, and ML pipeline reliability in production.",
      bullets: [
        "Fine-tuned LLMs (GPT, Claude, Llama, Mistral) using LoRA, QLoRA, PEFT; improved model efficiency by 28%",
        "Built data pipelines with Apache Spark and Databricks; reduced ETL processing time by 35%",
        "Delivered RAG systems using Pinecone and Chroma; boosted query accuracy by 40%",
        "Deployed ML pipelines with MLflow into CI/CD workflows; achieved 99.5% system uptime"
      ],
      tech: [
        "LangChain",
        "LoRA",
        "QLoRA",
        "PEFT",
        "OpenAI",
        "Claude",
        "Llama",
        "Mistral",
        "Spark",
        "Databricks",
        "Pinecone",
        "Chroma",
        "MLflow",
        "CI/CD"
      ]
    },
    {
      period: "2024 - 2025",
      company: "Abdul Majid Bhurgri Institute of Language Engineering (AMBILE)",
      title: "AI/NLP Engineer",
      logo: "assets/images/ambileLogo.svg",
      url: "https://ambile.pk",
      summary:
        "Under Culture, Tourism, Antiquities & Archives Department, Govt. of Sindh; delivered Sindhi language AI projects.",
      bullets: [
        "Sindhi Bhittai ChatBot — RAG-based chatbot using LangChain on Bhittai's works",
        "Sindhi Law Assistant (AI Wakeel) — Legal Q&A chatbot with custom NLP dataset",
        "Sindhi Speech-to-Text — Fine-tuned Transformer ASR for Sindhi transcription",
        "Sindhi OCR — Trained Tesseract 5 on 10K pairs; achieved 45% WER, 19% CER",
        "Data Cleaning Pipeline — Regex + Spark/Pandas workflows; boosted cleaning throughput by 75%",
        "Sindhi LLM Data Pipeline — Preprocessing/tokenization for a 118M-token corpus",
        "Curated and managed the AMBILE Sindhi dataset"
      ],
      tech: ["LangChain", "Transformers", "ASR", "Tesseract", "Spark", "Pandas", "Regex", "Pinecone", "Chroma"]
    }
  ],

  projects: [
    {
      name: "Automated Chest X-ray Report Generation",
      description:
        "Classifies CXRs (Normal/Pneumonia/TB/COVID-19) with VGG16 (92.58% test accuracy) and generates radiology reports using GPT-4; built clinician UI with Gradio.",
      image: "assets/images/project 1.jpg",
      tags: ["VGG16", "TensorFlow", "PyTorch", "GPT-4", "Gradio"],
      links: [{ label: "GitHub", url: "https://github.com/Ai-Engineer079/Automated-Chest-X-Ray-and-Report-Generation.git" }]
    },
    {
      name: "Prompt Optimization Engine",
      description:
        "Applies prompt engineering, LangChain, and GPT-4 to optimize AI responses against task criteria.",
      image: "assets/images/project-2.svg",
      tags: ["LangChain", "GPT-4", "Prompt Engineering"],
      links: [{ label: "GitHub", url: "#" }]
    },
    {
      name: "AI E-commerce Chatbot",
      description:
        "Shopping assistant with RAG for product Q&A and recommendations using LangChain + GPT-4.",
      image: "assets/images/project-3.svg",
      tags: ["RAG", "LangChain", "GPT-4", "E-commerce"],
      links: [{ label: "GitHub", url: "#" }]
    },
    {
      name: "Sindhi Support Chatbot (RAG)",
      description:
        "Support chatbot integrating Faiss vector DB with llama 3 for dynamic responses.",
      image: "assets/images/project 4.png",
      tags: ["RAG", "Faiss", "llama 3"],
      links: [{ label: "GitHub", url: "https://github.com/Ai-Engineer079/SindhiChatbot-Source-Code.git" }]
    },
    {
      name: "Personal Document Chat Model",
      description:
        "Local doc Q&A using LangChain + Chroma with Gemini as the LLM backend.",
      image: "assets/images/project-5.svg",
      tags: ["LangChain", "Chroma", "Gemini"],
      links: [{ label: "GitHub", url: "#" }]
    },
    {
      name: "Text-to-Image Generation Web App",
      description:
        "Web app built with Flask using DALL-E 3 for text-to-image generation.",
      image: "assets/images/project-6.svg",
      tags: ["DALL-E 3", "Flask"],
      links: [{ label: "GitHub", url: "#" }]
    }
  ],

  highlights: [
    { label: "28% LLM efficiency via LoRA/QLoRA", icon: "OpenAI" },
    { label: "40% RAG accuracy lift (LangChain)", icon: "LangChain" },
    { label: "99.5% uptime with MLflow CI/CD", icon: "MLflow" },
    { label: "35% faster ETL (Apache Spark)", icon: "Apache Spark" }
  ],

  certificatesGallery: [
    // Map your certificate images to their credential URLs
    {
      image: "assets/certificates/coursera.png",
      url: "https://www.coursera.org/account/accomplishments/verify/8DP5R0NRWDG9?utm_source=link&utm_medium=certificate&utm_content=cert_image&utm_campaign=sharing_cta&utm_product=course",
      alt: "Coursera Certificate"
    },
    { image: "assets/certificates/Screenshot 2025-09-22 161810.png", url: "#", alt: "Certificate" },
    { image: "assets/certificates/Screenshot 2025-09-22 161825.png", url: "#", alt: "Certificate" },
    {
      image: "assets/certificates/Screenshot 2025-09-22 161946.png",
      url: "https://www.hackerrank.com/certificates/iframe/bc68ae6df390",
      alt: "Certificate"
    }
  ],

  recommendations: [
    {
      name: "Sarfaraz Ahmed",
      title: "AI Software Engineer",
      company: "Chirp",
      avatar: "assets/images/sarfraz.jpeg",
      logo: "assets/images/trychirp_logo.jpeg",
      rating: 5,
      text:
        "Abdul is a great problem solving mind.He can tackle any challenges and solve them effectively with his skills and knowledge."
    },
    {
      name: "Umer Hanif",
      title: "Country Manager",
      company: "Bluescarf.ai",
      avatar: "assets/images/umer Hanif.jpeg",
      logo: "assets/images/bluescarf_logo.jpeg",
      rating: 5,
      text:
        "Strong engineering rigor and pragmatic approach. and time-to-value for our teams."
    },
    {
      name: "Aisha Khan",
      title: "Lead Engineer",
      company: "CloudScale",
      avatar: "assets/images/avatar.svg",
      logo: "assets/images/muetLogo.svg",
      rating: 5,
      text:
        "Strong engineering rigor and pragmatic approach. Abdul is a go-to for production ML pipelines."
    }
  ],

  effects: { shimmerHover: true, shimmerDuration: 1.2 },

  skills: [
    "Python",
    "Supervised Learning",
    "Unsupervised Learning",
    "Classification",
    "Regression",
    "Clustering",
    "Anomaly Detection",
    "CNNs",
    "RNNs",
    "LSTMs",
    "BERT",
    "GPT-3.5/4",
    "Gemini",
    "Word2Vec",
    "GPT-NER",
    "RAG",
    "LangChain",
    "Pinecone",
    "Chroma",
    "FAISS",
    "Weaviate",
    "Milvus",
    "AWS",
    "Azure",
    "Docker",
    "CI/CD",
    "Databricks",
    "MLflow",
    "PyTorch",
    "TensorFlow",
    "Flask",
    "Streamlit",
    "Gradio",
    "Spark",
    "PySpark",
    "SQL",
    "MySQL",
    "PostgreSQL",
    "Git",
    "GitHub",
    "VS Code",
    "Jupyter",
    "Google Colab",
    "Hugging Face"
  ]
};

// Optional export for tooling environments; safe in browser
if (typeof module !== 'undefined') {
  module.exports = window.SITE_CONFIG;
}

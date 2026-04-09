# NeuraPath - Visual AI/ML Learning Platform

A gamified, interactive learning platform that teaches AI and Machine Learning from Python basics to LLMs and AI Agents — with visual lessons, hands-on exercises, and a reward system.

## Live Demo

[https://pragarocks.github.io/Neropath/](https://pragarocks.github.io/Neropath/)

## Features

### 33 Interactive Visual Lessons
Animated, hands-on visualizations for core concepts:
- **Python for ML** — DataFrames, missing data handling, chart types
- **Math for ML** — Vectors, matrix multiplication, derivatives, gradient descent, probability distributions, Bayes' theorem
- **ML Fundamentals** — Train/test split, linear & logistic regression, decision trees, random forests, SVM, KNN, K-means, model evaluation
- **Deep Learning** — Perceptrons, activation functions, multi-layer networks, backpropagation, CNNs, RNNs & LSTM
- **NLP & Transformers** — Text preprocessing, word embeddings, attention mechanism, transformer architecture
- **LLMs & AI Agents** — RAG pipelines, embeddings & vector databases

### 65 Learning Modules Across 8 Phases
1. Python for ML (NumPy, Pandas, Matplotlib, OOP)
2. Math for ML (Linear Algebra, Calculus, Statistics)
3. ML Fundamentals (Regression, Trees, SVMs, Clustering)
4. Real-World ML Projects (Indian datasets — Crop Yield, Air Quality, Healthcare)
5. Deep Learning (Neural Networks, CNNs, RNNs, TensorFlow)
6. NLP & Transformers (TF-IDF, Embeddings, BERT, GPT, Hugging Face)
7. LLMs & AI Agents (APIs, RAG, Fine-Tuning, Agent Design)
8. Capstone Project & Certification

### AI-Powered Code Evaluation
- Write code in the built-in editor
- Test in Online Python Compiler or Google Colab
- Copy evaluation prompt to any AI (Claude, ChatGPT, Gemini)
- Paste the AI's score back — 70+ to pass
- Score tiers: Excellent, Great, Working, Partial, Needs Work

### Gamification & Rewards
- **XP & Levels** — Novice to Master (7 tiers)
- **Streak tracking** — Daily login streaks
- **14 Achievements** — First Flame, Sharpshooter, Data Whisperer, Neural Pioneer, and more
- **4 Certificates** — Bronze (ML Foundations), Silver (Practitioner), Gold (DL Engineer), Diamond (AI Engineer)

### Beginner-Friendly
- Every module includes a plain-English explanation of the concept
- Curated resource links (GeeksforGeeks, W3Schools, Khan Academy, 3Blue1Brown, etc.)
- Online compiler and Google Colab links for practice before submission

## Tech Stack

- **React 18** + TypeScript
- **Vite** — fast build tooling
- **Tailwind CSS** — utility-first styling
- **Lucide React** — icons
- **localStorage** — progress persistence (no backend needed)
- **GitHub Actions** — automated deployment to GitHub Pages

## Getting Started

```bash
# Clone the repo
git clone https://github.com/pragarocks/Neropath.git
cd Neropath

# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## Deployment

The app deploys automatically to GitHub Pages via GitHub Actions on every push to `main`.

**Setup:** Go to repo Settings > Pages > Source > select **GitHub Actions**.

## Project Structure

```
src/
  App.tsx        # Main application (all components, data, visual lessons)
  main.tsx       # React root render
  index.css      # Tailwind directives
index.html       # Entry point
vite.config.ts   # Vite config with base path for GitHub Pages
.github/
  workflows/
    deploy.yml   # GitHub Actions deployment workflow
```

## License

MIT

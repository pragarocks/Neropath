import { useState, useEffect, useCallback, useRef } from "react";
import { BookOpen, Code, Trophy, Star, Flame, Lock, ChevronRight, ChevronDown, Home, Award, Zap, Copy, CheckCircle, XCircle, Brain, Database, Cpu, Bot, GraduationCap, Target, Play, BarChart3, Clock, TrendingUp, Sparkles, ArrowRight, RefreshCw, Menu, X, Eye, FileText, ChevronLeft, Clipboard, AlertCircle, Settings, Layers, GitBranch, Download, ExternalLink } from "lucide-react";

// ═══════════════ DATA ═══════════════
const PHASES=[
{id:1,title:"Python for ML",icon:"🐍",color:"#3B82F6",modules:[
{id:"1.1",title:"NumPy Fundamentals",type:"lesson",hasEx:true,hasVisual:true},
{id:"1.2",title:"NumPy Advanced",type:"lesson",hasEx:true},
{id:"1.3",title:"Pandas DataFrames",type:"lesson",hasEx:true},
{id:"1.4",title:"Pandas Wrangling",type:"lesson",hasEx:true},
{id:"1.5",title:"Missing Data & Outliers",type:"lesson",hasEx:true},
{id:"1.6",title:"Matplotlib & Seaborn",type:"lesson",hasEx:true},
{id:"1.7",title:"Comprehensions & Generators",type:"lesson",hasEx:true},
{id:"1.8",title:"OOP for ML",type:"lesson",hasEx:true},
{id:"1.9",title:"🧪 Project: Census EDA",type:"project",hasEx:true},
]},
{id:2,title:"Math for ML",icon:"🧮",color:"#8B5CF6",modules:[
{id:"2.1",title:"Vectors & Matrices",type:"lesson",hasEx:true,hasVisual:true},
{id:"2.2",title:"Matrix Multiplication",type:"lesson",hasEx:true},
{id:"2.3",title:"Eigenvalues & PCA Preview",type:"lesson",hasEx:false},
{id:"2.4",title:"Derivatives as Slopes",type:"lesson",hasEx:false},
{id:"2.5",title:"Gradient Descent",type:"lesson",hasEx:true,hasVisual:true},
{id:"2.6",title:"Probability Distributions",type:"lesson",hasEx:true},
{id:"2.7",title:"Bayes' Theorem",type:"lesson",hasEx:true},
{id:"2.8",title:"Statistics for ML",type:"lesson",hasEx:true},
{id:"2.9",title:"🧪 Project: IMD Weather",type:"project",hasEx:true},
]},
{id:3,title:"ML Fundamentals",icon:"⚙️",color:"#10B981",modules:[
{id:"3.1",title:"What is ML?",type:"lesson",hasEx:false},
{id:"3.2",title:"ML Workflow",type:"lesson",hasEx:false},
{id:"3.3",title:"Train/Test Split",type:"lesson",hasEx:true,hasVisual:true},
{id:"3.4",title:"Linear Regression",type:"lesson",hasEx:true,hasVisual:true},
{id:"3.5",title:"Logistic Regression",type:"lesson",hasEx:true,hasVisual:true},
{id:"3.6",title:"Decision Trees",type:"lesson",hasEx:true,hasVisual:true},
{id:"3.7",title:"Random Forests",type:"lesson",hasEx:true,hasVisual:true},
{id:"3.8",title:"SVM",type:"lesson",hasEx:true},
{id:"3.9",title:"KNN",type:"lesson",hasEx:true,hasVisual:true},
{id:"3.10",title:"K-Means Clustering",type:"lesson",hasEx:true,hasVisual:true},
{id:"3.11",title:"Model Evaluation",type:"lesson",hasEx:true,hasVisual:true},
{id:"3.12",title:"Hyperparameter Tuning",type:"lesson",hasEx:true},
{id:"3.13",title:"XGBoost",type:"lesson",hasEx:true},
{id:"3.14",title:"🧪 Project: Compare Models",type:"project",hasEx:true},
]},
{id:4,title:"Real-World ML Projects",icon:"🇮🇳",color:"#F59E0B",modules:[
{id:"4.1",title:"Crop Yield Prediction",type:"project",hasEx:true},
{id:"4.2",title:"Air Quality Forecasting",type:"project",hasEx:true},
{id:"4.3",title:"Dropout Risk Predictor",type:"project",hasEx:true},
{id:"4.4",title:"Healthcare Allocation",type:"project",hasEx:true},
{id:"4.5",title:"Trade Pattern Analysis",type:"project",hasEx:true},
]},
{id:5,title:"Deep Learning",icon:"🧠",color:"#EC4899",modules:[
{id:"5.1",title:"The Perceptron",type:"lesson",hasEx:true,hasVisual:true},
{id:"5.2",title:"Activation Functions",type:"lesson",hasEx:false,hasVisual:true},
{id:"5.3",title:"Multi-Layer Networks",type:"lesson",hasEx:true,hasVisual:true},
{id:"5.4",title:"Backpropagation",type:"lesson",hasEx:true},
{id:"5.5",title:"NN from Scratch",type:"lesson",hasEx:true},
{id:"5.6",title:"TensorFlow / Keras",type:"lesson",hasEx:true},
{id:"5.7",title:"CNNs",type:"lesson",hasEx:true,hasVisual:true},
{id:"5.8",title:"Transfer Learning",type:"lesson",hasEx:true},
{id:"5.9",title:"RNNs & LSTM",type:"lesson",hasEx:true},
{id:"5.10",title:"🧪 Project: Image Classifier",type:"project",hasEx:true},
]},
{id:6,title:"NLP & Transformers",icon:"📝",color:"#06B6D4",modules:[
{id:"6.1",title:"Text Preprocessing",type:"lesson",hasEx:true},
{id:"6.2",title:"TF-IDF & BoW",type:"lesson",hasEx:true},
{id:"6.3",title:"Word Embeddings",type:"lesson",hasEx:true},
{id:"6.4",title:"Attention Mechanism",type:"lesson",hasEx:true,hasVisual:true},
{id:"6.5",title:"Transformer Architecture",type:"lesson",hasEx:true,hasVisual:true},
{id:"6.6",title:"BERT & GPT",type:"lesson",hasEx:true},
{id:"6.7",title:"Hugging Face",type:"lesson",hasEx:true},
{id:"6.8",title:"🧪 Project: Sentiment Analyzer",type:"project",hasEx:true},
]},
{id:7,title:"LLMs & AI Agents",icon:"🤖",color:"#F97316",modules:[
{id:"7.1",title:"LLM Fundamentals",type:"lesson",hasEx:false},
{id:"7.2",title:"LLM APIs",type:"lesson",hasEx:true},
{id:"7.3",title:"Embeddings & Vector DBs",type:"lesson",hasEx:true},
{id:"7.4",title:"RAG Pipelines",type:"lesson",hasEx:true,hasVisual:true},
{id:"7.5",title:"AI Agent Design",type:"lesson",hasEx:true},
{id:"7.6",title:"Fine-Tuning (LoRA)",type:"lesson",hasEx:true},
{id:"7.7",title:"🧪 Project: AI Assistant",type:"project",hasEx:true},
]},
{id:8,title:"Capstone",icon:"🏆",color:"#EF4444",modules:[
{id:"8.1",title:"Choose Capstone",type:"project",hasEx:false},
{id:"8.2",title:"Build & Submit",type:"project",hasEx:true},
{id:"8.3",title:"Final Certification",type:"project",hasEx:true},
]},
];

const ACHS=[
{id:"first",nm:"First Flame",ic:"🔥",ds:"Complete first exercise",ck:p=>(p.cm||[]).length>=1},
{id:"sharp",nm:"Sharpshooter",ic:"🎯",ds:"Score 95+",ck:p=>Object.values(p.sc||{}).some(s=>s>=95)},
{id:"data",nm:"Data Whisperer",ic:"📊",ds:"Complete all Pandas",ck:p=>["1.3","1.4","1.5"].every(m=>(p.cm||[]).includes(m))},
{id:"math",nm:"Math Mastered",ic:"🧮",ds:"Complete Phase 2",ck:p=>(p.up||[]).includes(3)},
{id:"forest",nm:"Forest Builder",ic:"🌲",ds:"Build Random Forest",ck:p=>(p.cm||[]).includes("3.7")},
{id:"neural",nm:"Neural Pioneer",ic:"🧠",ds:"First neural net",ck:p=>(p.cm||[]).includes("5.5")},
{id:"transformer",nm:"Transformer Tamer",ic:"🤖",ds:"Complete Transformers",ck:p=>(p.cm||[]).includes("6.5")},
{id:"desi",nm:"Desi Data Scientist",ic:"🇮🇳",ds:"Indian govt project",ck:p=>["4.1","4.2","4.3","4.4","4.5"].some(m=>(p.cm||[]).includes(m))},
{id:"streak7",nm:"Week Warrior",ic:"🔥",ds:"7-day streak",ck:p=>(p.st||0)>=7},
{id:"diamond",nm:"Diamond Mind",ic:"💎",ds:"Earn Diamond cert",ck:p=>(p.cm||[]).includes("8.3")},
{id:"night",nm:"Night Owl",ic:"🌙",ds:"Study after 11 PM",ck:p=>p.no},
{id:"early",nm:"Early Bird",ic:"☀️",ds:"Study before 7 AM",ck:p=>p.eb},
{id:"speed",nm:"Speed Demon",ic:"⚡",ds:"Score 90+ first try",ck:p=>Object.values(p.sc||{}).some(s=>s>=90)},
{id:"all5",nm:"Try Everything",ic:"🎪",ds:"All 5 real projects",ck:p=>["4.1","4.2","4.3","4.4","4.5"].every(m=>(p.cm||[]).includes(m))},
];

const LVLS=[{m:0,n:"Novice",i:"🌱"},{m:100,n:"Apprentice",i:"🔧"},{m:300,n:"Practitioner",i:"⚙️"},{m:600,n:"Engineer",i:"🔬"},{m:1000,n:"Specialist",i:"🎯"},{m:1500,n:"Expert",i:"🧠"},{m:2000,n:"Master",i:"💎"}];
const getLvl=xp=>{for(let i=LVLS.length-1;i>=0;i--)if(xp>=LVLS[i].m)return{...LVLS[i],idx:i,nx:LVLS[i+1]};return{...LVLS[0],idx:0,nx:LVLS[1]};};
const mkHash=id=>{const c="abcdefghijklmnopqrstuvwxyz0123456789";let h="";for(let i=0;i<6;i++)h+=c[Math.floor(Math.random()*c.length)];return`NP-${id}-${h}`;};

// ═══════════════ MODULE INFO (Explanations + Resources) ═══════════════
const MODULE_INFO={
"1.1":{d:"NumPy is the core library for working with numbers in Python. It lets you store data in arrays (like lists but much faster) and do math on entire arrays at once — this is the foundation of all ML work.",links:[{n:"GeeksforGeeks — NumPy Tutorial",u:"https://www.geeksforgeeks.org/numpy-tutorial/"},{n:"W3Schools — NumPy Introduction",u:"https://www.w3schools.com/python/numpy/numpy_intro.asp"},{n:"NumPy Official Guide",u:"https://numpy.org/doc/stable/user/absolute_beginners.html"}]},
"1.2":{d:"Advanced NumPy covers powerful operations like transposing matrices, computing eigenvalues, and fancy indexing. These operations are the building blocks for machine learning algorithms behind the scenes.",links:[{n:"Real Python — NumPy Advanced",u:"https://realpython.com/numpy-array-programming/"},{n:"NumPy Docs — Advanced Indexing",u:"https://numpy.org/doc/stable/user/basics.indexing.html"},{n:"GeeksforGeeks — NumPy Advanced",u:"https://www.geeksforgeeks.org/advanced-numpy/"}]},
"1.3":{d:"Pandas DataFrames are like Excel spreadsheets in Python. They let you organize data in rows and columns, filter it, sort it, and perform calculations — essential for any data analysis task.",links:[{n:"W3Schools — Pandas Tutorial",u:"https://www.w3schools.com/python/pandas/default.asp"},{n:"GeeksforGeeks — Pandas DataFrame",u:"https://www.geeksforgeeks.org/python-pandas-dataframe/"},{n:"Pandas Official Guide",u:"https://pandas.pydata.org/docs/getting_started/intro_tutorials/index.html"}]},
"1.4":{d:"Data wrangling means cleaning up and reshaping messy data into a format you can actually work with. In the real world, data is never perfect — you'll need to merge, pivot, and transform it constantly.",links:[{n:"GeeksforGeeks — Pandas Merge & Join",u:"https://www.geeksforgeeks.org/python-pandas-merging-joining-and-concatenating/"},{n:"Real Python — Pandas Merge",u:"https://realpython.com/pandas-merge-join-and-concat/"},{n:"TutorialsPoint — Pandas",u:"https://www.tutorialspoint.com/python_pandas/index.htm"}]},
"1.5":{d:"Real datasets always have missing values and outliers (extreme values). Learning to handle these properly is crucial — bad data leads to bad predictions. Think of it as cleaning ingredients before cooking.",links:[{n:"GeeksforGeeks — Handle Missing Data",u:"https://www.geeksforgeeks.org/working-with-missing-data-in-pandas/"},{n:"TutorialsPoint — Pandas Missing Data",u:"https://www.tutorialspoint.com/python_pandas/python_pandas_missing_data.htm"},{n:"Kaggle — Data Cleaning",u:"https://www.kaggle.com/learn/data-cleaning"}]},
"1.6":{d:"Visualization turns numbers into pictures. Matplotlib and Seaborn help you create charts, graphs, and plots that reveal patterns in your data — because humans understand pictures much better than spreadsheets.",links:[{n:"W3Schools — Matplotlib Tutorial",u:"https://www.w3schools.com/python/matplotlib_intro.asp"},{n:"GeeksforGeeks — Seaborn Tutorial",u:"https://www.geeksforgeeks.org/python-seaborn-tutorial/"},{n:"Matplotlib Official Tutorials",u:"https://matplotlib.org/stable/tutorials/index.html"}]},
"1.7":{d:"Comprehensions and generators are Python shortcuts for writing cleaner, faster code. Instead of writing 5 lines to transform a list, you can do it in 1 line. Generators also save memory by processing data lazily.",links:[{n:"W3Schools — List Comprehension",u:"https://www.w3schools.com/python/python_lists_comprehension.asp"},{n:"Real Python — Generators",u:"https://realpython.com/introduction-to-python-generators/"},{n:"GeeksforGeeks — Comprehensions",u:"https://www.geeksforgeeks.org/comprehensions-in-python/"}]},
"1.8":{d:"Object-Oriented Programming (OOP) lets you organize code into reusable classes. In ML, frameworks like scikit-learn use OOP heavily — understanding it helps you build your own models and extend existing ones.",links:[{n:"W3Schools — Python OOP",u:"https://www.w3schools.com/python/python_classes.asp"},{n:"Real Python — OOP in Python",u:"https://realpython.com/python3-object-oriented-programming/"},{n:"GeeksforGeeks — Python OOP",u:"https://www.geeksforgeeks.org/python-oops-concepts/"}]},
"1.9":{d:"Your first real project! You'll analyze Indian Census 2011 data to discover patterns about population, literacy, and urbanization across states. This is what data scientists actually do at work.",links:[{n:"data.gov.in — Census Data",u:"https://data.gov.in/sector/census"},{n:"GeeksforGeeks — EDA with Python",u:"https://www.geeksforgeeks.org/exploratory-data-analysis-in-python/"},{n:"Kaggle — India Census Dataset",u:"https://www.kaggle.com/datasets/danofer/india-census"}]},
"2.1":{d:"Vectors are lists of numbers that represent direction and magnitude, while matrices are grids of numbers. ML algorithms use these constantly — your data is stored as matrices and model parameters are vectors.",links:[{n:"3Blue1Brown — Linear Algebra",u:"https://www.3blue1brown.com/topics/linear-algebra"},{n:"GeeksforGeeks — Vectors & Matrices",u:"https://www.geeksforgeeks.org/vector-operations-in-numpy/"},{n:"Khan Academy — Vectors",u:"https://www.khanacademy.org/math/linear-algebra/vectors-and-spaces"}]},
"2.2":{d:"Matrix multiplication is how neural networks process data. When you feed data through a model, it's literally multiplying matrices together. Understanding this helps you see what's happening inside AI.",links:[{n:"3Blue1Brown — Matrix Multiplication",u:"https://www.youtube.com/watch?v=XkY2DOUCWMU"},{n:"GeeksforGeeks — Matrix Multiplication",u:"https://www.geeksforgeeks.org/multiplication-two-matrices-single-line-using-numpy-python/"},{n:"Khan Academy — Matrix Mult",u:"https://www.khanacademy.org/math/precalculus/x9e81a4f98389efdf:matrices/x9e81a4f98389efdf:multiplying-matrices-by-matrices/v/matrix-multiplication-intro"}]},
"2.3":{d:"Eigenvalues tell you the most important directions in your data. PCA uses them to reduce complex data to fewer dimensions while keeping the most useful information — like summarizing a book into key points.",links:[{n:"3Blue1Brown — Eigenvalues",u:"https://www.youtube.com/watch?v=PFDu9oVAE-g"},{n:"GeeksforGeeks — PCA in Python",u:"https://www.geeksforgeeks.org/principal-component-analysis-pca/"},{n:"StatQuest — PCA Explained",u:"https://www.youtube.com/watch?v=FgakZw6K1QQ"}]},
"2.4":{d:"A derivative tells you how fast something is changing — like a speedometer for math functions. In ML, derivatives help us figure out which direction to adjust our model to make it better.",links:[{n:"3Blue1Brown — Derivatives",u:"https://www.youtube.com/watch?v=9vKqVkMQHKk"},{n:"Khan Academy — Derivatives",u:"https://www.khanacademy.org/math/calculus-1/cs1-derivatives-definition-and-basic-rules"},{n:"GeeksforGeeks — Calculus for ML",u:"https://www.geeksforgeeks.org/calculus-in-machine-learning/"}]},
"2.5":{d:"Gradient descent is how ML models learn. Imagine you're blindfolded on a hill and need to reach the bottom — you feel which direction is downhill and take a step. That's gradient descent, step by step.",links:[{n:"GeeksforGeeks — Gradient Descent",u:"https://www.geeksforgeeks.org/gradient-descent-algorithm-and-its-variants/"},{n:"TutorialsPoint — Gradient Descent",u:"https://www.tutorialspoint.com/machine_learning_with_python/machine_learning_with_python_gradient_descent.htm"},{n:"3Blue1Brown — Gradient Descent",u:"https://www.youtube.com/watch?v=IHZwWFHWa-w"}]},
"2.6":{d:"Probability distributions describe how likely different outcomes are. The bell curve (Normal distribution) is everywhere in nature and data. Understanding distributions helps you make better predictions.",links:[{n:"GeeksforGeeks — Probability Distributions",u:"https://www.geeksforgeeks.org/mathematics-probability-distributions-set-1/"},{n:"Khan Academy — Distributions",u:"https://www.khanacademy.org/math/statistics-probability/modeling-distributions-of-data"},{n:"StatQuest — Distributions",u:"https://www.youtube.com/watch?v=rzFX5NWojp0"}]},
"2.7":{d:"Bayes' Theorem helps you update your beliefs when you get new evidence. It's the math behind spam filters, medical diagnosis, and many ML classifiers. Think: 'Given this email has these words, what's the probability it's spam?'",links:[{n:"3Blue1Brown — Bayes' Theorem",u:"https://www.youtube.com/watch?v=HZGCoVF3YvM"},{n:"GeeksforGeeks — Bayes' Theorem",u:"https://www.geeksforgeeks.org/bayes-theorem/"},{n:"StatQuest — Naive Bayes",u:"https://www.youtube.com/watch?v=O2L2Uv9pdDA"}]},
"2.8":{d:"Statistics gives you tools to summarize data and test whether patterns are real or just random noise. Mean, median, standard deviation, and hypothesis tests are essential for understanding any dataset.",links:[{n:"W3Schools — Python Statistics",u:"https://www.w3schools.com/python/python_ml_standard_deviation.asp"},{n:"GeeksforGeeks — Statistics with Python",u:"https://www.geeksforgeeks.org/python-statistics-module/"},{n:"Khan Academy — Statistics",u:"https://www.khanacademy.org/math/statistics-probability"}]},
"2.9":{d:"Analyze real weather data from India's Meteorological Department. You'll discover rainfall patterns, temperature trends, and test whether climate is actually changing — using the math you just learned.",links:[{n:"IMD — India Weather Data",u:"https://mausam.imd.gov.in/"},{n:"GeeksforGeeks — Time Series Analysis",u:"https://www.geeksforgeeks.org/python-time-series-analysis/"},{n:"Kaggle — India Weather Dataset",u:"https://www.kaggle.com/datasets/vanvalkenberg/historicalweatherdataforindiancities"}]},
"3.1":{d:"Machine Learning is teaching computers to learn from examples instead of being explicitly programmed. Instead of writing rules, you show the computer data and it figures out the patterns itself.",links:[{n:"GeeksforGeeks — What is ML?",u:"https://www.geeksforgeeks.org/ml-machine-learning/"},{n:"Google — ML Crash Course",u:"https://developers.google.com/machine-learning/crash-course"},{n:"TutorialsPoint — ML Introduction",u:"https://www.tutorialspoint.com/machine_learning/machine_learning_introduction.htm"}]},
"3.2":{d:"Every ML project follows the same workflow: collect data → clean it → pick a model → train it → evaluate it → improve it. Understanding this pipeline saves you from common mistakes.",links:[{n:"GeeksforGeeks — ML Pipeline",u:"https://www.geeksforgeeks.org/ml-machine-learning-pipeline/"},{n:"scikit-learn — ML Tutorial",u:"https://scikit-learn.org/stable/tutorial/basic/tutorial.html"},{n:"Kaggle — ML Course",u:"https://www.kaggle.com/learn/intro-to-machine-learning"}]},
"3.3":{d:"You split data into training and testing sets to check if your model actually learned or just memorized. It's like studying with flashcards, then testing yourself with new questions you haven't seen.",links:[{n:"GeeksforGeeks — Train Test Split",u:"https://www.geeksforgeeks.org/how-to-split-a-dataset-into-train-and-test-sets-using-python/"},{n:"scikit-learn — Cross Validation",u:"https://scikit-learn.org/stable/modules/cross_validation.html"},{n:"TutorialsPoint — Train/Test",u:"https://www.tutorialspoint.com/machine_learning_with_python/machine_learning_with_python_splitting_the_data.htm"}]},
"3.4":{d:"Linear regression finds the best straight line through your data points. It's the simplest ML model — predict a number (like house price) based on inputs (like square footage). Simple but powerful.",links:[{n:"GeeksforGeeks — Linear Regression",u:"https://www.geeksforgeeks.org/ml-linear-regression/"},{n:"W3Schools — Linear Regression",u:"https://www.w3schools.com/python/python_ml_linear_regression.asp"},{n:"scikit-learn — Linear Models",u:"https://scikit-learn.org/stable/modules/linear_model.html"}]},
"3.5":{d:"Logistic regression predicts yes/no outcomes — like 'will this customer buy?' or 'is this email spam?'. Despite the name, it's actually a classification model that outputs a probability between 0 and 1.",links:[{n:"GeeksforGeeks — Logistic Regression",u:"https://www.geeksforgeeks.org/understanding-logistic-regression/"},{n:"scikit-learn — Logistic Regression",u:"https://scikit-learn.org/stable/modules/generated/sklearn.linear_model.LogisticRegression.html"},{n:"StatQuest — Logistic Regression",u:"https://www.youtube.com/watch?v=yIYKR4sgzI8"}]},
"3.6":{d:"Decision trees make predictions by asking a series of yes/no questions, like a flowchart. 'Is temperature > 30°C? → Is humidity > 70%? → Predict rain.' They're easy to understand and visualize.",links:[{n:"GeeksforGeeks — Decision Tree",u:"https://www.geeksforgeeks.org/decision-tree/"},{n:"scikit-learn — Decision Trees",u:"https://scikit-learn.org/stable/modules/tree.html"},{n:"W3Schools — Decision Tree",u:"https://www.w3schools.com/python/python_ml_decision_tree.asp"}]},
"3.7":{d:"Random forests combine many decision trees and let them vote on the answer. Like asking 100 people instead of 1 — the group is usually smarter than any individual. One of the most reliable ML models.",links:[{n:"GeeksforGeeks — Random Forest",u:"https://www.geeksforgeeks.org/random-forest-algorithm-in-machine-learning/"},{n:"scikit-learn — Random Forests",u:"https://scikit-learn.org/stable/modules/ensemble.html#forest"},{n:"StatQuest — Random Forests",u:"https://www.youtube.com/watch?v=J4Wdy0Wc_xQ"}]},
"3.8":{d:"Support Vector Machines (SVM) find the best boundary line between categories. Imagine drawing the widest possible road between two groups of points — SVM finds that road. Works great for complex patterns.",links:[{n:"GeeksforGeeks — SVM",u:"https://www.geeksforgeeks.org/support-vector-machine-algorithm/"},{n:"scikit-learn — SVM",u:"https://scikit-learn.org/stable/modules/svm.html"},{n:"TutorialsPoint — SVM",u:"https://www.tutorialspoint.com/machine_learning_with_python/machine_learning_with_python_classification_algorithms_support_vector_machine.htm"}]},
"3.9":{d:"K-Nearest Neighbors is the simplest ML idea: to classify something, look at the K closest examples and go with the majority. Like asking your nearest neighbors what restaurant to go to.",links:[{n:"GeeksforGeeks — KNN",u:"https://www.geeksforgeeks.org/k-nearest-neighbours/"},{n:"W3Schools — KNN",u:"https://www.w3schools.com/python/python_ml_knn.asp"},{n:"scikit-learn — KNN",u:"https://scikit-learn.org/stable/modules/neighbors.html"}]},
"3.10":{d:"K-Means groups similar data points together without being told what the groups are. It's 'unsupervised learning' — like sorting laundry by color without anyone telling you the categories first.",links:[{n:"GeeksforGeeks — K-Means",u:"https://www.geeksforgeeks.org/k-means-clustering-introduction/"},{n:"W3Schools — K-Means",u:"https://www.w3schools.com/python/python_ml_k-means.asp"},{n:"scikit-learn — K-Means",u:"https://scikit-learn.org/stable/modules/clustering.html#k-means"}]},
"3.11":{d:"How do you know if your model is good? Accuracy alone isn't enough. You'll learn precision, recall, F1-score, and ROC curves — different ways to measure model quality for different situations.",links:[{n:"GeeksforGeeks — Model Evaluation",u:"https://www.geeksforgeeks.org/metrics-for-machine-learning-model/"},{n:"scikit-learn — Model Evaluation",u:"https://scikit-learn.org/stable/modules/model_evaluation.html"},{n:"TutorialsPoint — Confusion Matrix",u:"https://www.tutorialspoint.com/machine_learning_with_python/machine_learning_with_python_confusion_matrix.htm"}]},
"3.12":{d:"Hyperparameters are settings you choose before training (like how deep a tree can grow). Tuning them is like adjusting the knobs on a radio to get the clearest signal — small changes can make big differences.",links:[{n:"GeeksforGeeks — Hyperparameter Tuning",u:"https://www.geeksforgeeks.org/hyperparameter-tuning/"},{n:"scikit-learn — Grid Search",u:"https://scikit-learn.org/stable/modules/grid_search.html"},{n:"Kaggle — Hyperparameter Tuning",u:"https://www.kaggle.com/learn/intermediate-machine-learning"}]},
"3.13":{d:"XGBoost is one of the most powerful ML algorithms and wins many competitions. It builds trees one at a time, where each new tree fixes the mistakes of the previous ones — like learning from your errors.",links:[{n:"GeeksforGeeks — XGBoost",u:"https://www.geeksforgeeks.org/xgboost/"},{n:"XGBoost Official Docs",u:"https://xgboost.readthedocs.io/en/latest/"},{n:"StatQuest — XGBoost",u:"https://www.youtube.com/watch?v=OtD8wVaFm6E"}]},
"3.14":{d:"Time to put it all together! Compare Logistic Regression, Random Forest, and XGBoost on the same dataset. Learn which models work best and why — this is what ML engineers do in practice.",links:[{n:"scikit-learn — Model Comparison",u:"https://scikit-learn.org/stable/auto_examples/classification/plot_classifier_comparison.html"},{n:"GeeksforGeeks — Model Comparison",u:"https://www.geeksforgeeks.org/comparing-machine-learning-algorithms/"},{n:"Kaggle — ML Competition Tips",u:"https://www.kaggle.com/competitions"}]},
"4.1":{d:"Predict crop yields using real Indian agricultural data. Help farmers make better decisions by analyzing soil, weather, and historical yield data. A practical project with real social impact.",links:[{n:"data.gov.in — Agriculture",u:"https://data.gov.in/sector/agriculture"},{n:"GeeksforGeeks — Crop Prediction",u:"https://www.geeksforgeeks.org/crop-recommendation-system/"},{n:"Kaggle — India Agriculture",u:"https://www.kaggle.com/datasets/akshatgupta7/crop-yield-in-indian-states-dataset"}]},
"4.2":{d:"Build a model that forecasts air quality in Indian cities. With pollution being a major health concern, your model could help people plan outdoor activities and authorities take preventive action.",links:[{n:"CPCB Air Quality Data",u:"https://app.cpcbccr.com/ccr/"},{n:"GeeksforGeeks — Air Quality Prediction",u:"https://www.geeksforgeeks.org/air-quality-prediction-using-machine-learning/"},{n:"Kaggle — India Air Quality",u:"https://www.kaggle.com/datasets/rohanrao/air-quality-data-in-india"}]},
"4.3":{d:"Predict which students are at risk of dropping out using educational data. This kind of model helps schools intervene early and support students who need help — AI for social good.",links:[{n:"data.gov.in — Education",u:"https://data.gov.in/sector/education"},{n:"GeeksforGeeks — Student Performance",u:"https://www.geeksforgeeks.org/student-performance-prediction/"},{n:"Kaggle — Student Dropout",u:"https://www.kaggle.com/datasets/thedevastator/higher-education-predictors-of-student-retention"}]},
"4.4":{d:"Help optimize healthcare resource allocation across Indian districts. Analyze hospital capacity, disease patterns, and population data to suggest where medical resources are needed most.",links:[{n:"data.gov.in — Health",u:"https://data.gov.in/sector/health"},{n:"GeeksforGeeks — Healthcare ML",u:"https://www.geeksforgeeks.org/machine-learning-in-healthcare/"},{n:"Kaggle — India Healthcare",u:"https://www.kaggle.com/datasets/nehaprabhavalkar/indian-healthcare-dataset"}]},
"4.5":{d:"Discover patterns in India's international trade data. Which products does India export most? How have trade relationships changed? Use ML to find hidden trends in economic data.",links:[{n:"data.gov.in — Commerce",u:"https://data.gov.in/sector/commerce"},{n:"GeeksforGeeks — Trade Analysis",u:"https://www.geeksforgeeks.org/analyzing-selling-price-of-used-cars-using-python/"},{n:"Kaggle — Trade Data",u:"https://www.kaggle.com/datasets/unitednations/global-commodity-trade-statistics"}]},
"5.1":{d:"A perceptron is the simplest neural network — just one artificial brain cell. It takes inputs, multiplies them by weights, and makes a decision. Everything in deep learning builds on this tiny unit.",links:[{n:"GeeksforGeeks — Perceptron",u:"https://www.geeksforgeeks.org/perceptron-algorithm/"},{n:"TutorialsPoint — Perceptron",u:"https://www.tutorialspoint.com/machine_learning_with_python/machine_learning_with_python_perceptron.htm"},{n:"3Blue1Brown — Neural Networks",u:"https://www.youtube.com/watch?v=aircAruvnKk"}]},
"5.2":{d:"Activation functions decide whether a neuron should 'fire' or not. ReLU, Sigmoid, and Tanh each have different behaviors. Choosing the right one can make or break your neural network.",links:[{n:"GeeksforGeeks — Activation Functions",u:"https://www.geeksforgeeks.org/activation-functions-neural-networks/"},{n:"TutorialsPoint — Activation Functions",u:"https://www.tutorialspoint.com/machine_learning_with_python/machine_learning_with_python_activation_functions.htm"},{n:"Machine Learning Mastery",u:"https://machinelearningmastery.com/choose-an-activation-function-for-deep-learning/"}]},
"5.3":{d:"By stacking multiple layers of neurons together, you create a network that can learn incredibly complex patterns. Each layer transforms the data, building up from simple features to abstract concepts.",links:[{n:"3Blue1Brown — Deep Learning",u:"https://www.youtube.com/watch?v=aircAruvnKk"},{n:"GeeksforGeeks — Multi-Layer Perceptron",u:"https://www.geeksforgeeks.org/multi-layer-perceptron-learning-in-tensorflow/"},{n:"TensorFlow — Neural Nets",u:"https://www.tensorflow.org/tutorials/quickstart/beginner"}]},
"5.4":{d:"Backpropagation is how neural networks learn from mistakes. It calculates how much each neuron contributed to the error and adjusts weights accordingly — like tracing back through a chain of decisions.",links:[{n:"3Blue1Brown — Backpropagation",u:"https://www.youtube.com/watch?v=Ilg3gGewQ5U"},{n:"GeeksforGeeks — Backpropagation",u:"https://www.geeksforgeeks.org/backpropagation-in-neural-network/"},{n:"TutorialsPoint — Backpropagation",u:"https://www.tutorialspoint.com/machine_learning_with_python/machine_learning_with_python_backpropagation.htm"}]},
"5.5":{d:"Build a neural network from scratch using only NumPy — no frameworks! This gives you deep understanding of what TensorFlow and PyTorch do under the hood. The best way to truly understand neural nets.",links:[{n:"GeeksforGeeks — NN from Scratch",u:"https://www.geeksforgeeks.org/implementation-of-neural-network-from-scratch-using-numpy/"},{n:"Real Python — Neural Net Scratch",u:"https://realpython.com/python-ai-neural-network/"},{n:"Sentdex — NN from Scratch",u:"https://nnfs.io/"}]},
"5.6":{d:"TensorFlow and Keras are like power tools for building neural networks. Instead of coding everything from scratch, you can build complex models in just a few lines of code.",links:[{n:"TensorFlow Official Tutorial",u:"https://www.tensorflow.org/tutorials"},{n:"GeeksforGeeks — Keras Tutorial",u:"https://www.geeksforgeeks.org/keras-tutorial/"},{n:"W3Schools — TensorFlow",u:"https://www.w3schools.com/python/python_ml_tensorflow.asp"}]},
"5.7":{d:"CNNs (Convolutional Neural Networks) are designed for images. They scan images with small filters to detect edges, textures, and shapes — mimicking how our eyes process visual information.",links:[{n:"GeeksforGeeks — CNN",u:"https://www.geeksforgeeks.org/introduction-convolution-neural-network/"},{n:"TensorFlow — CNN Tutorial",u:"https://www.tensorflow.org/tutorials/images/cnn"},{n:"CS231n — CNN",u:"https://cs231n.github.io/convolutional-networks/"}]},
"5.8":{d:"Transfer learning lets you reuse a model trained on millions of images and adapt it to your specific problem. Instead of training from scratch, you start with a pre-trained model — saving weeks of work.",links:[{n:"GeeksforGeeks — Transfer Learning",u:"https://www.geeksforgeeks.org/ml-introduction-to-transfer-learning/"},{n:"TensorFlow — Transfer Learning",u:"https://www.tensorflow.org/tutorials/images/transfer_learning"},{n:"Keras — Fine Tuning",u:"https://keras.io/guides/transfer_learning/"}]},
"5.9":{d:"RNNs and LSTMs are designed for sequential data like text, time series, and speech. They have memory — they remember previous inputs to understand context, like how you understand a sentence word by word.",links:[{n:"GeeksforGeeks — RNN & LSTM",u:"https://www.geeksforgeeks.org/understanding-of-lstm-networks/"},{n:"TutorialsPoint — RNN",u:"https://www.tutorialspoint.com/machine_learning_with_python/machine_learning_with_python_recurrent_neural_network.htm"},{n:"Colah's Blog — LSTM",u:"https://colah.github.io/posts/2015-08-Understanding-LSTMs/"}]},
"5.10":{d:"Build an image classifier that can identify objects in pictures! This project combines everything from CNNs and transfer learning to create a real-world deep learning application.",links:[{n:"TensorFlow — Image Classification",u:"https://www.tensorflow.org/tutorials/images/classification"},{n:"GeeksforGeeks — Image Classifier",u:"https://www.geeksforgeeks.org/image-classifier-using-cnn/"},{n:"PyTorch — Image Tutorial",u:"https://pytorch.org/tutorials/beginner/blitz/cifar10_tutorial.html"}]},
"6.1":{d:"Before feeding text to ML models, you need to clean it — removing punctuation, converting to lowercase, splitting into words (tokenization). Raw text is messy, and computers need it structured.",links:[{n:"GeeksforGeeks — Text Preprocessing",u:"https://www.geeksforgeeks.org/nlp-text-preprocessing-techniques/"},{n:"Real Python — NLP with spaCy",u:"https://realpython.com/natural-language-processing-spacy-python/"},{n:"NLTK Official Guide",u:"https://www.nltk.org/book/ch03.html"}]},
"6.2":{d:"TF-IDF and Bag of Words convert text into numbers that ML models can understand. They count word frequencies to represent documents — like turning a paragraph into a numerical fingerprint.",links:[{n:"GeeksforGeeks — TF-IDF",u:"https://www.geeksforgeeks.org/understanding-tf-idf-term-frequency-inverse-document-frequency/"},{n:"scikit-learn — Text Features",u:"https://scikit-learn.org/stable/modules/feature_extraction.html#text-feature-extraction"},{n:"TutorialsPoint — Bag of Words",u:"https://www.tutorialspoint.com/natural_language_processing/natural_language_processing_bag_of_words.htm"}]},
"6.3":{d:"Word embeddings represent words as vectors where similar words are close together. 'King' and 'Queen' are nearby in this space, just like 'Cat' and 'Dog'. This captures meaning, not just spelling.",links:[{n:"GeeksforGeeks — Word Embeddings",u:"https://www.geeksforgeeks.org/word-embeddings-in-nlp/"},{n:"TensorFlow — Word2Vec",u:"https://www.tensorflow.org/text/tutorials/word2vec"},{n:"Jay Alammar — Word2Vec Visual",u:"https://jalammar.github.io/illustrated-word2vec/"}]},
"6.4":{d:"Attention lets models focus on the most relevant parts of the input — like how you pay more attention to key words in a long sentence. This breakthrough made modern AI language models possible.",links:[{n:"Jay Alammar — Attention",u:"https://jalammar.github.io/visualizing-neural-machine-translation-mechanics-of-seq2seq-models-with-attention/"},{n:"GeeksforGeeks — Attention",u:"https://www.geeksforgeeks.org/ml-attention-mechanism/"},{n:"The Illustrated Transformer",u:"https://jalammar.github.io/illustrated-transformer/"}]},
"6.5":{d:"Transformers are the architecture behind ChatGPT, BERT, and all modern AI. They process all words in parallel using attention, making them incredibly fast and powerful at understanding language.",links:[{n:"Jay Alammar — Illustrated Transformer",u:"https://jalammar.github.io/illustrated-transformer/"},{n:"GeeksforGeeks — Transformer",u:"https://www.geeksforgeeks.org/transformer-neural-network-in-deep-learning-overview/"},{n:"Harvard NLP — Annotated Transformer",u:"https://nlp.seas.harvard.edu/annotated-transformer/"}]},
"6.6":{d:"BERT reads text in both directions (left and right) to understand context. GPT generates text one word at a time. Together, they revolutionized NLP and power today's AI assistants and search engines.",links:[{n:"Jay Alammar — Illustrated BERT",u:"https://jalammar.github.io/illustrated-bert/"},{n:"GeeksforGeeks — BERT vs GPT",u:"https://www.geeksforgeeks.org/gpt-vs-bert/"},{n:"Hugging Face — Transformers Course",u:"https://huggingface.co/course/chapter1/1"}]},
"6.7":{d:"Hugging Face is like an app store for AI models. You can download pre-trained models for translation, summarization, sentiment analysis, and more — all with just a few lines of Python code.",links:[{n:"Hugging Face — Quickstart",u:"https://huggingface.co/docs/transformers/quicktour"},{n:"Hugging Face — NLP Course",u:"https://huggingface.co/course"},{n:"GeeksforGeeks — Hugging Face",u:"https://www.geeksforgeeks.org/hugging-face-transformers/"}]},
"6.8":{d:"Build a sentiment analyzer that determines if text is positive, negative, or neutral! This project combines text preprocessing, embeddings, and transformer models into a real NLP application.",links:[{n:"GeeksforGeeks — Sentiment Analysis",u:"https://www.geeksforgeeks.org/twitter-sentiment-analysis-using-python/"},{n:"Hugging Face — Sentiment",u:"https://huggingface.co/blog/sentiment-analysis-python"},{n:"Kaggle — Sentiment Analysis",u:"https://www.kaggle.com/learn/natural-language-processing"}]},
"7.1":{d:"Large Language Models (LLMs) like GPT-4 and Claude are trained on massive text data and can write, reason, code, and chat. Understanding how they work helps you use them effectively and build with them.",links:[{n:"OpenAI — GPT Guide",u:"https://platform.openai.com/docs/guides/text-generation"},{n:"Anthropic — Claude Docs",u:"https://docs.anthropic.com/"},{n:"GeeksforGeeks — LLM Overview",u:"https://www.geeksforgeeks.org/large-language-model-llm/"}]},
"7.2":{d:"LLM APIs let you send text to powerful AI models and get responses back — no GPU needed. You can build chatbots, content generators, code assistants, and more by just making API calls.",links:[{n:"OpenAI API — Quickstart",u:"https://platform.openai.com/docs/quickstart"},{n:"Anthropic API — Getting Started",u:"https://docs.anthropic.com/en/docs/getting-started"},{n:"GeeksforGeeks — LLM APIs",u:"https://www.geeksforgeeks.org/openai-api-tutorial/"}]},
"7.3":{d:"Embeddings turn text into numerical vectors, and vector databases store them for fast similarity search. This is how AI apps 'remember' information and find relevant content from millions of documents.",links:[{n:"Pinecone — What are Embeddings?",u:"https://www.pinecone.io/learn/vector-embeddings/"},{n:"GeeksforGeeks — Vector Database",u:"https://www.geeksforgeeks.org/vector-database/"},{n:"Chromadb — Getting Started",u:"https://docs.trychroma.com/getting-started"}]},
"7.4":{d:"RAG (Retrieval-Augmented Generation) lets AI answer questions using your own documents. It first searches for relevant information, then generates an answer — like an AI that can read your entire company's docs.",links:[{n:"GeeksforGeeks — RAG Pipeline",u:"https://www.geeksforgeeks.org/retrieval-augmented-generation-rag/"},{n:"LangChain — RAG Tutorial",u:"https://python.langchain.com/docs/tutorials/rag/"},{n:"Pinecone — RAG Guide",u:"https://www.pinecone.io/learn/retrieval-augmented-generation/"}]},
"7.5":{d:"AI Agents are LLMs that can take actions — browse the web, write code, use tools, and make decisions autonomously. They're the next frontier of AI, going beyond just chatting to actually doing tasks.",links:[{n:"LangChain — Agents Guide",u:"https://python.langchain.com/docs/concepts/agents/"},{n:"GeeksforGeeks — AI Agents",u:"https://www.geeksforgeeks.org/ai-agents/"},{n:"Anthropic — Agent SDK",u:"https://docs.anthropic.com/en/docs/agents"}]},
"7.6":{d:"Fine-tuning adapts a pre-trained LLM to your specific task. LoRA makes this efficient by only modifying a small number of parameters — like teaching a professor a new specialty without re-learning everything.",links:[{n:"Hugging Face — Fine-Tuning",u:"https://huggingface.co/docs/transformers/training"},{n:"GeeksforGeeks — LoRA",u:"https://www.geeksforgeeks.org/lora-low-rank-adaptation/"},{n:"Sebastian Raschka — LoRA",u:"https://magazine.sebastianraschka.com/p/lora-and-dora-from-scratch"}]},
"7.7":{d:"Build your own AI assistant that can answer questions, search documents, and use tools! This capstone project for the LLM module brings together APIs, RAG, and agent design into one application.",links:[{n:"LangChain — Build a Chatbot",u:"https://python.langchain.com/docs/tutorials/chatbot/"},{n:"OpenAI — Assistants",u:"https://platform.openai.com/docs/assistants/overview"},{n:"GeeksforGeeks — AI Chatbot",u:"https://www.geeksforgeeks.org/how-to-build-a-chatbot-using-openai-api/"}]},
"8.1":{d:"Choose a capstone project that excites you! Pick a real problem, define your approach, and plan your ML solution. This is your chance to apply everything you've learned to something meaningful.",links:[{n:"Kaggle — Project Ideas",u:"https://www.kaggle.com/datasets"},{n:"GeeksforGeeks — ML Projects",u:"https://www.geeksforgeeks.org/machine-learning-projects/"},{n:"data.gov.in — Indian Datasets",u:"https://data.gov.in/"}]},
"8.2":{d:"Build and submit your capstone project end-to-end: data collection, preprocessing, model training, evaluation, and a clear writeup. Show the world what you can build with ML!",links:[{n:"Kaggle — Notebook Tips",u:"https://www.kaggle.com/docs/notebooks"},{n:"GeeksforGeeks — ML Project Guide",u:"https://www.geeksforgeeks.org/how-to-start-a-machine-learning-project/"},{n:"GitHub — Project Structure",u:"https://drivendata.github.io/cookiecutter-data-science/"}]},
"8.3":{d:"Congratulations on reaching the final certification! Review your complete learning journey, submit your best work, and earn your NeuraPath certificate. You're now ready for real-world ML work.",links:[{n:"Kaggle — Certifications",u:"https://www.kaggle.com/learn/certification"},{n:"Google — ML Certification",u:"https://developers.google.com/machine-learning"},{n:"Coursera — ML Specialization",u:"https://www.coursera.org/specializations/machine-learning-introduction"}]},
};

// ═══════════════ EXERCISES (ALL DETAILED) ═══════════════
const EXERCISES={
"1.1":{t:"NumPy Array Operations",p:`Create a NumPy program that:\n1. Creates a 1D array of numbers 1-10\n2. Reshapes it into a 2x5 matrix\n3. Calculates the sum of each row\n4. Finds the element-wise product of the matrix with itself\n5. Extracts the second column\n\nWrite clean, commented Python code.`,r:`CORRECTNESS (40): Array creation, reshape, row sums, element-wise product, column extraction\nCODE_QUALITY (20): Clean variable names, proper comments\nCOMPLETENESS (25): All 5 tasks completed with print output\nUNDERSTANDING (15): Comments show WHY each operation works`},
"1.2":{t:"Advanced NumPy",p:`Write a program using NumPy that:\n1. Creates a 4x4 random matrix\n2. Computes its transpose and dot product with original\n3. Finds eigenvalues using np.linalg.eigvals\n4. Implements a function that normalizes any array to [0,1]\n5. Uses fancy indexing to extract diagonal elements`,r:`CORRECTNESS (40): All operations produce correct results\nCODE_QUALITY (20): Functions used, clean code\nCOMPLETENESS (25): All 5 tasks done\nUNDERSTANDING (15): Understands linear algebra operations`},
"1.3":{t:"Pandas DataFrame Mastery",p:`Using Pandas, write code that:\n1. Creates a DataFrame with columns: Name, Age, City, Salary (at least 8 rows)\n2. Filters rows where Salary > mean salary\n3. Groups by City and calculates average age and salary\n4. Adds a new column 'Tax' = Salary * 0.3\n5. Sorts by Salary descending and resets index`,r:`CORRECTNESS (40): All Pandas operations correct\nCODE_QUALITY (20): Method chaining used where appropriate\nCOMPLETENESS (25): All 5 tasks completed\nUNDERSTANDING (15): Shows Pandas fluency`},
"1.4":{t:"Pandas Data Wrangling",p:`Practise advanced Pandas transformations:\n1. Use groupby() to compute total and average revenue by region and product category\n2. Merge two DataFrames (orders and customers) on a common key using inner and left joins; explain the row-count difference\n3. Build a pivot table showing monthly sales per category with margins\n4. Use melt() to unpivot the pivot table back to long format\n5. Chain at least three operations (filter → groupby → sort) in a single expression`,r:`CORRECTNESS (40): groupby aggregations, merge keys, and pivot values match expected output\nCODE_QUALITY (20): operations are chained cleanly; no unnecessary intermediate copies\nCOMPLETENESS (25): all five tasks attempted with visible output\nUNDERSTANDING (15): brief comments explain why each join type or aggregation was chosen`},
"1.5":{t:"Handling Missing Data & Outliers",p:`Clean a dataset containing nulls and anomalies:\n1. Audit the dataset: report count and percentage of missing values per column\n2. Impute numerical nulls with median and categorical nulls with mode; justify choices\n3. Detect outliers using both IQR and Z-score methods; compare results\n4. Apply two outlier treatment strategies (capping, removal) and show before/after\n5. Write a reusable clean_dataframe() function that applies all steps`,r:`CORRECTNESS (40): imputation values are statistically correct; outlier boundaries computed accurately\nCODE_QUALITY (20): clean_dataframe() is modular and handles edge cases\nCOMPLETENESS (25): all five tasks completed with printed summaries\nUNDERSTANDING (15): rationale for each imputation and treatment strategy explained`},
"1.6":{t:"Matplotlib & Seaborn Visualization",p:`Create a comprehensive visual analysis:\n1. Plot a histogram with KDE curve; annotate mean and median lines\n2. Build a correlation heatmap; highlight strongest correlations\n3. Create a grouped bar chart comparing a metric across two categories\n4. Plot a time-series line chart with rolling average overlay\n5. Combine all four into a single 2x2 figure with proper labels`,r:`CORRECTNESS (40): statistical overlays are computed and placed correctly\nCODE_QUALITY (20): reusable plotting helpers; figure layout via subplots\nCOMPLETENESS (25): all four chart types present with labels\nUNDERSTANDING (15): brief narrative below each subplot explains the insight`},
"1.7":{t:"Comprehensions, Generators, Decorators",p:`Demonstrate Python's advanced functional features:\n1. Rewrite three nested for-loop transformations as list, dict, and set comprehensions\n2. Implement a generator function that lazily streams rows in configurable batch sizes\n3. Write a @timer decorator and a @validate_input decorator; stack both on a function\n4. Use a generator expression inside sum() to compute a running statistic efficiently\n5. Benchmark comprehension vs generator versions using timeit`,r:`CORRECTNESS (40): comprehensions produce identical output to loops; decorator behaviour is correct\nCODE_QUALITY (20): generators use yield correctly; decorators use functools.wraps\nCOMPLETENESS (25): all three comprehension types, both decorators, and benchmark present\nUNDERSTANDING (15): memory and speed trade-offs between approaches explained`},
"1.8":{t:"OOP for ML",p:`Design an object-oriented ML framework:\n1. Create an abstract BaseModel class with abstract fit(), predict(), evaluate() using abc\n2. Implement LinearModel and TreeModel subclasses with __repr__() and __str__()\n3. Add a HyperparameterMixin providing get_params() and set_params()\n4. Implement a ModelRegistry class using a class-level dict for registering models\n5. Write unit tests verifying the interface using unittest`,r:`CORRECTNESS (40): abstract interface enforced; mixin methods correctly get/set params\nCODE_QUALITY (20): SOLID principles followed; no code duplication\nCOMPLETENESS (25): all components (ABC, subclasses, mixin, registry, tests) present\nUNDERSTANDING (15): docstrings explain design choices and OOP benefits for ML`},
"1.9":{t:"Indian Census EDA Project",p:`Perform end-to-end EDA on India Census 2011 data (from data.gov.in):\n1. Load and audit: report shape, dtypes, missing values; clean as needed\n2. Analyse population distribution across states; identify top-5 and bottom-5\n3. Compute literacy rate, sex ratio per state; visualise as sorted bar charts\n4. Find correlations between urbanisation and literacy; plot scatter with regression line\n5. Summarise three actionable insights from the analysis`,r:`CORRECTNESS (40): computed ratios match expected census formulas\nCODE_QUALITY (20): analysis is reproducible; helper functions for repeated operations\nCOMPLETENESS (25): all five tasks with labelled visualisations and insights\nUNDERSTANDING (15): insights are specific and reference real socio-economic context`},
"2.1":{t:"Vectors & Matrices",p:`Implement core linear algebra operations:\n1. Create vectors u, v in R5; compute dot product, cosine similarity, and angle between them\n2. Build a 4x4 matrix; compute transpose, trace, determinant, and rank\n3. Implement vector projection of u onto v from scratch; verify with formula\n4. Check if three vectors form a basis for R3 using the determinant test\n5. Solve 4 linear equations using np.linalg.solve and Gaussian elimination by hand`,r:`CORRECTNESS (40): all values match NumPy reference within floating-point tolerance\nCODE_QUALITY (20): custom implementations are vectorised; no unnecessary loops\nCOMPLETENESS (25): all five tasks with printed verification\nUNDERSTANDING (15): comments explain geometric intuition behind operations`},
"2.2":{t:"Matrix Multiplication",p:`Explore matrix multiplication and its ML applications:\n1. Implement matrix multiplication from scratch with loops; verify against np.dot()\n2. Demonstrate that AB != BA; show when it is associative\n3. Apply three sequential transformations (scale, rotate, shear) to a 2D point cloud; plot\n4. Show how a neural network forward pass is matrix multiplications\n5. Benchmark loop vs np.dot vs np.matmul for sizes 10, 100, 1000`,r:`CORRECTNESS (40): custom matmul matches NumPy; transformations geometrically correct\nCODE_QUALITY (20): transformation matrices parameterised as functions\nCOMPLETENESS (25): all five tasks with point cloud plot and benchmark curve\nUNDERSTANDING (15): neural network forward pass correctly mapped to matrix operations`},
"2.5":{t:"Gradient Descent Implementation",p:`Implement gradient descent from scratch:\n1. Define a quadratic loss function f(x) = (x-3)^2 + 5\n2. Compute its derivative analytically\n3. Implement gradient descent with configurable learning rate and iterations\n4. Run it with lr=0.1 and lr=0.01, print each step\n5. Show that both converge to x=3 (the minimum)\n\nDo NOT use any ML libraries.`,r:`CORRECTNESS (40): GD implementation correct, converges to minimum\nCODE_QUALITY (20): Clean functions, good structure\nCOMPLETENESS (25): Both learning rates tested, steps printed\nUNDERSTANDING (15): Comments explain gradient descent intuition`},
"2.6":{t:"Probability Distributions",p:`Explore key probability distributions:\n1. Sample 10000 points from Normal, Binomial, Poisson, Exponential; plot PDFs side by side\n2. Verify Central Limit Theorem: draw increasing samples from skewed distribution, plot means\n3. Fit a Normal distribution to real data using MLE; overlay fitted PDF on histogram\n4. Compute KL divergence between two Gaussians with different means/variances\n5. Simulate Bayesian A/B test using Beta-Binomial conjugacy; plot posteriors`,r:`CORRECTNESS (40): distribution parameters and KL divergence computed correctly\nCODE_QUALITY (20): scipy.stats used appropriately; simulation seeded\nCOMPLETENESS (25): all five tasks with labelled plots and numerical results\nUNDERSTANDING (15): CLT observation and KL interpretation in plain language`},
"2.7":{t:"Bayes' Theorem",p:`Apply Bayesian reasoning to classification:\n1. Implement Naive Bayes text classifier from scratch on spam/ham data\n2. Demonstrate base rate fallacy with medical test (sensitivity, specificity, prevalence)\n3. Implement sequential Bayesian updating for coin-flip experiment\n4. Compare scratch Naive Bayes vs sklearn GaussianNB; report accuracy\n5. Plot prior, likelihood, and posterior for Beta-Binomial model`,r:`CORRECTNESS (40): Bayes calculations algebraically correct; scratch matches sklearn\nCODE_QUALITY (20): updating loop cleanly abstracted; prior/likelihood/posterior separated\nCOMPLETENESS (25): all five tasks with probabilities and distribution plots\nUNDERSTANDING (15): base rate fallacy explanation and ML relevance articulated`},
"2.8":{t:"Statistics for ML",p:`Apply statistics to a real dataset:\n1. Compute mean, median, mode, variance, std, skewness, kurtosis for 3 columns; interpret\n2. Perform two-sample t-test; state hypotheses and interpret p-value\n3. Compute Pearson and Spearman correlations; explain when each is appropriate\n4. Conduct chi-square test of independence; interpret in plain language\n5. Show effect of StandardScaler vs MinMaxScaler on a k-NN model's accuracy`,r:`CORRECTNESS (40): test statistics and p-values match scipy reference\nCODE_QUALITY (20): statistical tests wrapped in functions with clear I/O\nCOMPLETENESS (25): all five tasks with printed conclusions and visualisations\nUNDERSTANDING (15): plain-language interpretations of every statistical result`},
"2.9":{t:"IMD Weather Analysis Project",p:`Analyse Indian Meteorological Department weather data (from mausam.imd.gov.in):\n1. Load and clean: handle missing values, parse dates, standardise units\n2. Compute monthly/seasonal averages for temperature and rainfall across 5 cities; heatmap\n3. Identify 10 wettest and 10 driest years using annual rainfall totals\n4. Test whether monsoon rainfall has changed significantly over 30 years\n5. Build 12-month rolling average temperature plot; annotate anomalies (2-sigma)`,r:`CORRECTNESS (40): aggregations and trend test statistics computed correctly\nCODE_QUALITY (20): date parsing and aggregation logic reusable; notebook runs end-to-end\nCOMPLETENESS (25): all five tasks with multi-city visualisations and trend annotations\nUNDERSTANDING (15): conclusion discusses observed trends in Indian climate context`},
"3.3":{t:"Train/Test Split & Cross-Validation",p:`Implement robust model evaluation:\n1. Split dataset using train_test_split with stratification; verify class distribution\n2. Implement k-fold cross-validation from scratch; compare fold-level accuracy variance\n3. Use sklearn StratifiedKFold and compare against your manual implementation\n4. Demonstrate data leakage by scaling before vs inside Pipeline; quantify difference\n5. Plot learning curve (train/val score vs training size); diagnose under/overfitting`,r:`CORRECTNESS (40): manual k-fold indices non-overlapping; leakage demo shows score inflation\nCODE_QUALITY (20): Pipeline used to encapsulate preprocessing\nCOMPLETENESS (25): all five tasks with CV scores, variance, and learning curve\nUNDERSTANDING (15): leakage explanation and learning curve diagnosis clear`},
"3.4":{t:"Linear Regression from Scratch",p:`Implement Linear Regression:\n1. Generate synthetic data: y = 2x + 3 + noise\n2. Implement the normal equation: theta = (X^T X)^(-1) X^T y\n3. Also implement gradient descent version\n4. Compare both solutions (should be similar)\n5. Calculate R-squared score and MSE\n\nUse only NumPy.`,r:`CORRECTNESS (40): Both methods implemented correctly\nCODE_QUALITY (20): Clean separation of methods\nCOMPLETENESS (25): Both approaches + metrics\nUNDERSTANDING (15): Explains difference between approaches`},
"3.5":{t:"Logistic Regression",p:`Build a logistic regression classifier:\n1. Implement logistic regression using gradient descent from scratch; plot loss curve\n2. Train sklearn LogisticRegression on binary classification dataset\n3. Plot the sigmoid decision boundary on a 2D feature space\n4. Compute and interpret precision, recall, F1-score, and AUC-ROC\n5. Experiment with regularization (C parameter); plot decision boundaries for C=0.01, 1, 100`,r:`CORRECTNESS (40): scratch sigmoid/gradient correct; sklearn metrics computed properly\nCODE_QUALITY (20): scratch implementation uses vectorised NumPy operations\nCOMPLETENESS (25): all five tasks with loss curve, boundaries, and metrics table\nUNDERSTANDING (15): explains how regularization affects the decision boundary`},
"3.6":{t:"Decision Tree Classifier",p:`Using scikit-learn:\n1. Load the Iris dataset\n2. Split into train/test (80/20)\n3. Train a DecisionTreeClassifier with max_depth=3\n4. Print accuracy, classification report\n5. Show feature importances\n6. Explain: What would happen with max_depth=None? Why?`,r:`CORRECTNESS (40): Model trained and evaluated correctly\nCODE_QUALITY (20): Proper sklearn pipeline usage\nCOMPLETENESS (25): All steps including explanation\nUNDERSTANDING (15): Explains overfitting risk with unlimited depth`},
"3.7":{t:"Random Forests & Ensembles",p:`Build and compare ensemble methods:\n1. Train a RandomForestClassifier with 100 trees; report accuracy and feature importances\n2. Implement a simple bagging ensemble from scratch using 10 Decision Trees\n3. Compare your bagging ensemble vs sklearn RandomForest on the same dataset\n4. Visualise how accuracy changes with n_estimators (10, 50, 100, 200, 500)\n5. Explain and demonstrate the difference between bagging and boosting conceptually`,r:`CORRECTNESS (40): bagging implementation correctly resamples and votes; accuracy improves with more trees\nCODE_QUALITY (20): bagging loop is clean; comparison uses same train/test split\nCOMPLETENESS (25): all five tasks with accuracy plot and bagging vs boosting explanation\nUNDERSTANDING (15): explains why ensembles reduce variance and when boosting is preferred`},
"3.8":{t:"SVM Classifier",p:`Explore Support Vector Machines:\n1. Train a linear SVM on a 2D dataset; plot the decision boundary and support vectors\n2. Apply RBF kernel SVM on non-linearly separable data; compare accuracy vs linear\n3. Visualise the kernel trick: show how 2D data becomes linearly separable in 3D\n4. Tune the C and gamma parameters using GridSearchCV; report best parameters\n5. Compare SVM accuracy vs Logistic Regression and Decision Tree on the same dataset`,r:`CORRECTNESS (40): decision boundary plots are accurate; GridSearchCV configured correctly\nCODE_QUALITY (20): plotting functions are reusable; hyperparameter grid is well-structured\nCOMPLETENESS (25): all five tasks with boundary plots and comparison table\nUNDERSTANDING (15): explains the margin concept and why kernels enable non-linear separation`},
"3.9":{t:"KNN Classifier",p:`Build and analyse K-Nearest Neighbors:\n1. Implement KNN from scratch using Euclidean distance; test on Iris dataset\n2. Compare your implementation vs sklearn KNeighborsClassifier for K=3,5,7\n3. Plot the decision boundary for K=1 vs K=15; explain the visual difference\n4. Find optimal K using cross-validation; plot accuracy vs K (1 to 25)\n5. Demonstrate the curse of dimensionality by comparing KNN accuracy on 2D vs 50D data`,r:`CORRECTNESS (40): scratch KNN matches sklearn; optimal K found via CV\nCODE_QUALITY (20): distance computation vectorised; cross-validation loop clean\nCOMPLETENESS (25): all five tasks with boundary plots and accuracy-vs-K curve\nUNDERSTANDING (15): explains why high K smooths boundaries and curse of dimensionality`},
"3.10":{t:"K-Means Implementation",p:`Implement K-Means clustering:\n1. Generate 3 clusters of 2D points using np.random\n2. Implement K-Means from scratch (init centroids, assign, update, repeat)\n3. Run for 10 iterations, print centroid positions each step\n4. Compare with sklearn KMeans\n5. Calculate inertia (sum of squared distances to nearest centroid)`,r:`CORRECTNESS (40): K-Means algorithm works correctly\nCODE_QUALITY (20): Clean implementation\nCOMPLETENESS (25): From-scratch + sklearn comparison\nUNDERSTANDING (15): Explains convergence and initialization sensitivity`},
"3.11":{t:"Model Evaluation Deep Dive",p:`Master model evaluation metrics:\n1. Build a confusion matrix from scratch for a binary classifier; compute TP, FP, TN, FN\n2. Calculate precision, recall, F1-score, and accuracy manually; verify with sklearn\n3. Plot an ROC curve from scratch by varying the classification threshold\n4. Compute AUC-ROC and explain what a 0.5 vs 0.9 AUC means\n5. Compare metrics on an imbalanced dataset; explain why accuracy is misleading`,r:`CORRECTNESS (40): confusion matrix values correct; ROC curve smooth and AUC computed properly\nCODE_QUALITY (20): metric functions are reusable; threshold sweep is vectorised\nCOMPLETENESS (25): all five tasks with confusion matrix, ROC plot, and imbalanced analysis\nUNDERSTANDING (15): explains precision-recall tradeoff and when to use which metric`},
"3.12":{t:"Hyperparameter Tuning",p:`Systematically tune model hyperparameters:\n1. Train a baseline RandomForest; record default accuracy\n2. Implement GridSearchCV with 5 parameter combinations; report best params\n3. Implement RandomizedSearchCV with 20 iterations; compare to GridSearch\n4. Plot a validation curve for max_depth showing train/test scores\n5. Use cross_val_score to report mean and std of the best model; compare to baseline`,r:`CORRECTNESS (40): search spaces correctly defined; best params improve over baseline\nCODE_QUALITY (20): parameter grids stored as dicts; results aggregated in a DataFrame\nCOMPLETENESS (25): all five tasks with validation curve and comparison table\nUNDERSTANDING (15): explains overfitting risk of exhaustive search and when randomised is preferred`},
"3.13":{t:"XGBoost",p:`Build a gradient boosting model:\n1. Train an XGBClassifier with default params; report accuracy and log loss\n2. Implement early stopping using eval_set; plot training and validation loss curves\n3. Tune learning_rate, max_depth, n_estimators via RandomizedSearchCV\n4. Plot feature importance (gain, cover, weight); identify top-5 features\n5. Compare XGBoost vs RandomForest vs LogisticRegression on the same dataset`,r:`CORRECTNESS (40): XGBoost trained with correct objective; early stopping triggers properly\nCODE_QUALITY (20): eval_set configured cleanly; tuning pipeline is reproducible\nCOMPLETENESS (25): all five tasks with loss curves, feature importance, and model comparison\nUNDERSTANDING (15): explains boosting intuition and when XGBoost outperforms simpler models`},
"3.14":{t:"Compare 3 Models Project",p:`Build and compare three ML models on the same dataset:\n1. Choose a classification dataset; perform EDA and preprocessing\n2. Train Logistic Regression, Random Forest, and XGBoost\n3. Evaluate all three using cross-validation with 5 folds; report mean and std accuracy\n4. Plot confusion matrices and ROC curves for all three side by side\n5. Write a 200-word comparison explaining which model wins and why`,r:`CORRECTNESS (40): all three models trained correctly; CV scores are reproducible\nCODE_QUALITY (20): shared preprocessing pipeline; evaluation code is DRY\nCOMPLETENESS (25): all five tasks with side-by-side plots and written comparison\nUNDERSTANDING (15): comparison considers accuracy, interpretability, and training time`},
"4.1":{t:"Crop Yield Prediction",p:`Build a crop yield prediction model using Indian agricultural data (data.gov.in):\n1. Load crop production data; perform EDA on yield patterns across states and seasons\n2. Engineer features: rainfall, soil type indicators, historical yield trends, crop rotation\n3. Train regression models (Linear, Random Forest, XGBoost) to predict yield per hectare\n4. Evaluate using RMSE, MAE, and R-squared; identify which states/crops are hardest to predict\n5. Generate a policy recommendation: which crops should each state focus on for maximum yield?`,r:`CORRECTNESS (40): feature engineering is sound; regression metrics computed correctly\nCODE_QUALITY (20): data pipeline handles multiple crops/states cleanly\nCOMPLETENESS (25): all five tasks with EDA plots, model comparison, and policy output\nUNDERSTANDING (15): recommendations are grounded in data patterns, not assumptions`},
"4.2":{t:"Air Quality Forecasting",p:`Build an AQI forecasting system using CPCB data (cpcb.nic.in):\n1. Load air quality data for 5 Indian cities; perform EDA on pollutant distributions and seasonal patterns\n2. Engineer temporal features: hour, day-of-week, month, festival indicators, rolling averages\n3. Train time-series models to forecast next-day AQI (PM2.5)\n4. Evaluate with RMSE and MAE; plot predicted vs actual for a 30-day window\n5. Identify which features contribute most to poor AQI days; suggest intervention points`,r:`CORRECTNESS (40): temporal features correctly aligned; no data leakage from future\nCODE_QUALITY (20): time-series split used instead of random split\nCOMPLETENESS (25): all five tasks with forecast plots and feature importance analysis\nUNDERSTANDING (15): recommendations reference real Indian air quality policies`},
"4.3":{t:"Education Dropout Risk Predictor",p:`Predict student dropout risk using UDISE+ education data (data.gov.in):\n1. Load education statistics; perform EDA on enrollment, dropout rates across states\n2. Engineer risk factors: pupil-teacher ratio, infrastructure score, gender ratio, rural/urban\n3. Build a binary classifier for dropout risk (high/low) using multiple algorithms\n4. Identify top-5 risk factors using feature importance; validate with domain knowledge\n5. Build a risk dashboard: for each state, show predicted dropout hotspots and suggested interventions`,r:`CORRECTNESS (40): classification models trained correctly; risk factors align with education research\nCODE_QUALITY (20): feature engineering is documented and reproducible\nCOMPLETENESS (25): all five tasks with risk factor analysis and state-level dashboard\nUNDERSTANDING (15): interventions are specific and reference Indian education policy context`},
"4.4":{t:"Healthcare Resource Allocation",p:`Optimize healthcare resource allocation using NHP data (data.gov.in):\n1. Load health infrastructure data; EDA on hospital beds, doctors, equipment per capita by state\n2. Use clustering (K-Means, DBSCAN) to group districts by healthcare access level\n3. Apply PCA to reduce features; visualise clusters in 2D space\n4. Build a scoring model that ranks districts by resource need (most underserved first)\n5. Generate allocation recommendations: where should new hospitals/doctors be deployed?`,r:`CORRECTNESS (40): clustering produces meaningful groups; PCA variance explained is reported\nCODE_QUALITY (20): scoring model is transparent and reproducible\nCOMPLETENESS (25): all five tasks with cluster visualisations and ranked recommendations\nUNDERSTANDING (15): recommendations consider population density and existing infrastructure`},
"4.5":{t:"Trade Pattern Analysis",p:`Analyse India's import/export patterns using trade data (DGCIS/data.gov.in):\n1. Load trade data; EDA on top trading partners, commodity categories, trade balance trends\n2. Use clustering to group countries by trade similarity with India\n3. Build an anomaly detection model to flag unusual trade spikes or drops\n4. Forecast next-quarter trade volume for top-5 commodities using regression\n5. Visualise trade patterns as a network graph showing India's key trade relationships`,r:`CORRECTNESS (40): anomaly detection flags genuine outliers; forecasts use proper time-series methods\nCODE_QUALITY (20): trade data preprocessing handles currency and unit conversions\nCOMPLETENESS (25): all five tasks with network graph, anomalies, and forecast plots\nUNDERSTANDING (15): analysis connects patterns to real economic events and trade policies`},
"5.1":{t:"Perceptron from Scratch",p:`Build a single perceptron:\n1. Implement a Perceptron class with weights, bias, and step activation\n2. Implement the training loop (update rule)\n3. Train it to learn AND gate truth table\n4. Train it to learn OR gate truth table\n5. Try XOR — explain why it fails\n\nUse only NumPy.`,r:`CORRECTNESS (40): Perceptron learns AND and OR correctly\nCODE_QUALITY (20): Clean OOP implementation\nCOMPLETENESS (25): All gates attempted, XOR explained\nUNDERSTANDING (15): Explains linear separability limitation`},
"5.3":{t:"Multi-Layer Networks",p:`Build a multi-layer neural network:\n1. Implement a 2-layer network (input → hidden → output) with sigmoid activation\n2. Code the forward pass showing intermediate values at each layer\n3. Train on XOR problem (which a single perceptron cannot solve)\n4. Print weights before and after training; show they converge\n5. Experiment with hidden layer sizes (2, 4, 8); compare convergence speed`,r:`CORRECTNESS (40): network learns XOR; forward pass computes correct intermediate values\nCODE_QUALITY (20): layers are modular; weight initialisation uses standard practice\nCOMPLETENESS (25): all five tasks with weight evolution and hidden size comparison\nUNDERSTANDING (15): explains why a hidden layer enables non-linear decision boundaries`},
"5.4":{t:"Backpropagation",p:`Implement backpropagation from scratch:\n1. Derive the backprop equations for a 2-layer network with MSE loss on paper, then code them\n2. Implement gradient computation for each layer using the chain rule\n3. Verify gradients using numerical gradient checking (finite differences)\n4. Train the network on a simple regression task; plot the loss curve over 1000 epochs\n5. Visualise how gradients flow backward through layers; show gradient magnitudes at each layer`,r:`CORRECTNESS (40): analytical gradients match numerical gradients within 1e-5\nCODE_QUALITY (20): gradient computation separated from weight update; assertions validate shapes\nCOMPLETENESS (25): all five tasks with loss curve and gradient magnitude plot\nUNDERSTANDING (15): chain rule application at each layer is explained step-by-step`},
"5.5":{t:"Neural Net from Scratch",p:`Build a complete neural network library using only NumPy:\n1. Implement Layer class with forward() and backward() methods\n2. Implement sigmoid, ReLU, and softmax activations with their derivatives\n3. Build a Network class that stacks layers and runs full forward/backward passes\n4. Train on MNIST-like digit classification (use sklearn digits dataset)\n5. Achieve >85% accuracy; plot training loss and accuracy curves`,r:`CORRECTNESS (40): backprop computes correct gradients; accuracy exceeds 85%\nCODE_QUALITY (20): Layer and Network classes have clean interfaces\nCOMPLETENESS (25): all five tasks with loss/accuracy curves and sample predictions\nUNDERSTANDING (15): explains how batch training and learning rate affect convergence`},
"5.6":{t:"TensorFlow / Keras",p:`Build neural networks using TensorFlow/Keras:\n1. Build a Sequential model for binary classification; train on synthetic data\n2. Build a functional API model with multiple inputs (numerical + categorical)\n3. Implement custom callbacks: EarlyStopping, LearningRateScheduler, and a custom logger\n4. Save and load a model; verify predictions match before and after\n5. Compare Sequential vs Functional API approach on the same problem`,r:`CORRECTNESS (40): both models train correctly; saved model reproduces identical predictions\nCODE_QUALITY (20): callbacks are properly configured; model architectures are documented\nCOMPLETENESS (25): all five tasks with training curves and API comparison\nUNDERSTANDING (15): explains when to use Sequential vs Functional API`},
"5.7":{t:"CNNs - Convolutions",p:`Build and understand Convolutional Neural Networks:\n1. Implement a 2D convolution operation from scratch; verify against tf.nn.conv2d\n2. Apply edge detection, sharpen, and blur kernels to a sample image; display results\n3. Build a CNN in Keras (Conv2D → MaxPool → Conv2D → MaxPool → Dense) for digit classification\n4. Visualise feature maps from the first convolutional layer for 5 sample images\n5. Compare CNN accuracy vs a fully-connected network on the same image dataset`,r:`CORRECTNESS (40): scratch convolution matches TensorFlow output; CNN achieves >95% on digits\nCODE_QUALITY (20): kernel application is vectorised; model architecture is well-documented\nCOMPLETENESS (25): all five tasks with filter visualisations and accuracy comparison\nUNDERSTANDING (15): explains why CNNs outperform dense networks for spatial data`},
"5.8":{t:"Transfer Learning",p:`Apply transfer learning for image classification:\n1. Load a pre-trained MobileNetV2 without the top layer; freeze all base layers\n2. Add a custom classification head for your domain (e.g. 5 classes)\n3. Train only the new head for 5 epochs; report accuracy\n4. Unfreeze the last 20 layers and fine-tune for 5 more epochs; compare accuracy\n5. Explain when to freeze vs fine-tune; show the accuracy difference`,r:`CORRECTNESS (40): freezing correctly prevents weight updates; fine-tuning improves accuracy\nCODE_QUALITY (20): data augmentation pipeline included; proper learning rate for fine-tuning\nCOMPLETENESS (25): all five tasks with accuracy comparison (frozen vs fine-tuned)\nUNDERSTANDING (15): explains transfer learning intuition and the feature hierarchy concept`},
"5.9":{t:"RNNs & LSTM",p:`Build recurrent neural networks for sequence data:\n1. Implement a simple RNN cell from scratch; verify forward pass output shapes\n2. Train a Keras SimpleRNN on a sine wave prediction task; plot predicted vs actual\n3. Demonstrate vanishing gradient by plotting gradient magnitudes across 50 time steps\n4. Build an LSTM for the same task; compare accuracy against SimpleRNN\n5. Build a bidirectional LSTM for sentiment classification; compare vs unidirectional`,r:`CORRECTNESS (40): scratch RNN forward pass correct; LSTM outperforms vanilla RNN\nCODE_QUALITY (20): sequence generation is reusable; gradient logging via callback\nCOMPLETENESS (25): all five tasks with gradient plots and bidirectional comparison\nUNDERSTANDING (15): LSTM gating and its role in solving vanishing gradients explained`},
"5.10":{t:"Image Classifier Project",p:`Build an end-to-end image classification system:\n1. Use a publicly available image dataset; perform EDA on class distribution\n2. Build data pipeline with augmentation using tf.data or ImageDataGenerator\n3. Fine-tune MobileNetV2; use early stopping and learning rate scheduling\n4. Evaluate with classification report, confusion matrix, and sample Grad-CAM overlays\n5. Export model and write inference script accepting an image path → top-3 predictions`,r:`CORRECTNESS (40): fine-tuning procedure correct; inference script produces accurate outputs\nCODE_QUALITY (20): tf.data pipeline efficient; inference script self-contained\nCOMPLETENESS (25): all five tasks with training curves, confusion matrix, and Grad-CAM\nUNDERSTANDING (15): augmentation strategy justified with observations from EDA`},
"6.1":{t:"Text Preprocessing",p:`Build a robust NLP preprocessing pipeline:\n1. Implement tokenisation, lowercasing, punctuation removal, stop-word filtering with NLTK and spaCy\n2. Apply stemming (Porter) and lemmatisation (WordNet); compare vocabulary size reduction\n3. Handle domain noise: remove URLs, emails, HTML tags using regex\n4. Build a sklearn-compatible transformer (fit/transform) applying all steps\n5. Analyse effect of each step on vocabulary size; visualise as bar chart`,r:`CORRECTNESS (40): regex handles all noise types; lemmatisation uses correct POS tags\nCODE_QUALITY (20): pipeline transformer is sklearn-compatible and stateless\nCOMPLETENESS (25): all five tasks with vocabulary progression chart\nUNDERSTANDING (15): trade-offs between stemming and lemmatisation explained`},
"6.2":{t:"TF-IDF & Bag of Words",p:`Represent text numerically for classification:\n1. Build a Bag-of-Words vectoriser from scratch; verify against CountVectorizer\n2. Implement TF-IDF from scratch; compare against TfidfVectorizer\n3. Train Naive Bayes and Logistic Regression on BoW and TF-IDF; compare accuracy\n4. Visualise top-20 TF-IDF terms per class as horizontal bar charts\n5. Experiment with n-grams (uni, bi, tri); report vocabulary size and accuracy changes`,r:`CORRECTNESS (40): scratch BoW and TF-IDF match sklearn within tolerance\nCODE_QUALITY (20): scratch implementations are class-based with fit()/transform()\nCOMPLETENESS (25): all five tasks with accuracy table and n-gram analysis\nUNDERSTANDING (15): explains why TF-IDF outperforms BoW and when n-grams help`},
"6.3":{t:"Word Embeddings",p:`Explore word representations:\n1. Train Word2Vec (skip-gram) on a corpus using gensim; visualise 50 vectors with t-SNE\n2. Demonstrate word analogies (king - man + woman = queen); evaluate analogy accuracy\n3. Load pre-trained GloVe; build embedding matrix for Keras embedding layer\n4. Compare Word2Vec, GloVe, FastText on an OOV word; show FastText's advantage\n5. Use sentence-transformers for semantic similarity on 10 sentence pairs`,r:`CORRECTNESS (40): analogy arithmetic uses correct vector operations; embedding shapes match\nCODE_QUALITY (20): embedding matrix construction reusable; t-SNE seeded\nCOMPLETENESS (25): all five tasks with t-SNE plot, analogies, and similarity scores\nUNDERSTANDING (15): static vs contextual embeddings and OOV handling explained`},
"6.4":{t:"Attention Mechanism",p:`Implement scaled dot-product attention:\n1. Create random Q, K, V matrices (4 tokens, embedding dim 8)\n2. Compute attention scores: QK^T / sqrt(d_k)\n3. Apply softmax to get attention weights\n4. Compute output: weights * V\n5. Print the attention weight matrix and explain what it represents\n\nUse only NumPy.`,r:`CORRECTNESS (40): Attention computation is mathematically correct\nCODE_QUALITY (20): Clear variable naming, step-by-step\nCOMPLETENESS (25): All steps with printed outputs\nUNDERSTANDING (15): Explains what attention weights mean semantically`},
"6.5":{t:"Transformer Architecture",p:`Implement core Transformer components:\n1. Implement scaled dot-product attention from scratch; verify weights sum to 1\n2. Extend to multi-head attention; verify concatenation matches expected output dim\n3. Implement positional encoding using sinusoidal functions; visualise as heatmap\n4. Build a single Transformer encoder block (attention + FFN + LayerNorm + residual)\n5. Stack two encoder blocks; pass a tokenised sentence through and verify shapes`,r:`CORRECTNESS (40): attention scaled by sqrt(d_k); positional encoding matches original paper\nCODE_QUALITY (20): each component is standalone; shapes validated with assertions\nCOMPLETENESS (25): all five tasks with attention heatmaps and positional encoding plot\nUNDERSTANDING (15): residual connections and layer norm role in training stability explained`},
"6.6":{t:"BERT & GPT",p:`Fine-tune and use pre-trained language models:\n1. Load pre-trained BERT; run inference and visualise [CLS] attention weights\n2. Fine-tune BERT on binary sentiment classification for 3 epochs; report F1\n3. Load GPT-2; generate text with temperature 0.5, 1.0, 1.5; compare outputs\n4. Compare BERT vs GPT-2 tokenisation on the same sentence\n5. Profile memory and inference time: BERT vs DistilBERT on 1000 sentences`,r:`CORRECTNESS (40): fine-tuning uses correct loss; attention visualisation correct\nCODE_QUALITY (20): Trainer API or clean custom loop; temperature parameterised\nCOMPLETENESS (25): all five tasks with training curves, generated text, and profiling\nUNDERSTANDING (15): BERT vs GPT differences (encoder vs decoder) and task suitability explained`},
"6.7":{t:"Hugging Face Ecosystem",p:`Master the Hugging Face ecosystem:\n1. Use pipeline() for 5 tasks: sentiment, NER, QA, summarisation, translation\n2. Load tokeniser and model separately; replicate pipeline() output manually\n3. Fine-tune using Trainer API with custom compute_metrics\n4. Push model to Hub with a model card documenting dataset and metrics\n5. Use datasets library with map() and batched=True; compare processing time`,r:`CORRECTNESS (40): manual inference matches pipeline() within softmax tolerance\nCODE_QUALITY (20): Trainer config uses TrainingArguments correctly\nCOMPLETENESS (25): all five tasks with pipeline outputs and Hub model card\nUNDERSTANDING (15): when to use pipeline vs manual inference explained`},
"6.8":{t:"Sentiment Analyzer Project",p:`Build sentiment analysis for Indian product reviews:\n1. Use Indian e-commerce review dataset; EDA on rating distribution and language mix\n2. Compare three approaches: TF-IDF + LogReg, fine-tuned DistilBERT, zero-shot LLM\n3. Test on 20 Hinglish (code-switched) examples; analyse model handling\n4. Build a FastAPI inference endpoint returning sentiment with confidence\n5. Evaluate all three models; produce comparative report on accuracy, latency, cost`,r:`CORRECTNESS (40): fine-tuning loss decreases; API returns valid JSON\nCODE_QUALITY (20): three models share a common evaluation harness\nCOMPLETENESS (25): all five tasks with Hinglish results and comparative report\nUNDERSTANDING (15): trade-off analysis considers real deployment constraints`},
"7.2":{t:"Working with LLM APIs",p:`Build applications on LLM APIs:\n1. Call Chat Completions API; experiment with temperature, max_tokens, top_p\n2. Implement retry wrapper with exponential backoff for rate limits\n3. Implement prompt caching by hashing; measure token savings\n4. Build a multi-turn conversation manager with context window limits\n5. Compare GPT-4o vs open-source model on 5 benchmark prompts`,r:`CORRECTNESS (40): retry handles 429/500 errors; context truncation preserves recent turns\nCODE_QUALITY (20): API client abstracted behind common interface\nCOMPLETENESS (25): all five tasks with parameter table and model comparison\nUNDERSTANDING (15): cost-quality-latency trade-off clearly analysed`},
"7.3":{t:"Embeddings & Vector DBs",p:`Build semantic search with embeddings:\n1. Generate embeddings for 500 documents; store in FAISS index; search top-5\n2. Compare FAISS flat vs HNSW approximate index on recall and latency\n3. Implement metadata filtering in ChromaDB; retrieve matching documents\n4. Build semantic deduplication: find pairs with cosine similarity > 0.95\n5. Evaluate retrieval with Recall@K (K=1,5,10) on a labelled QA dataset`,r:`CORRECTNESS (40): FAISS returns correct neighbours; Recall@K computed accurately\nCODE_QUALITY (20): VectorStore class with add() and search() methods\nCOMPLETENESS (25): all five tasks with latency table and Recall@K curves\nUNDERSTANDING (15): HNSW trade-offs and embedding model selection explained`},
"7.4":{t:"RAG Pipeline Design",p:`Design a RAG system (pseudocode + explanation):\n1. Describe the document chunking strategy you'd use\n2. Explain your embedding model choice and why\n3. Write pseudocode for the retrieval step (similarity search)\n4. Write pseudocode for the augmented prompt construction\n5. Explain how you'd evaluate RAG quality (faithfulness, relevance)\n\nFocus on architecture understanding, not running code.`,r:`CORRECTNESS (40): RAG components correctly described\nCODE_QUALITY (20): Pseudocode is clear and logical\nCOMPLETENESS (25): All 5 components addressed\nUNDERSTANDING (15): Shows deep understanding of why each step matters`},
"7.5":{t:"AI Agent Design",p:`Design a tool-using AI agent:\n1. Build a ReAct agent loop calling 3 tools (search, calculator, code executor)\n2. Implement a tool registry with JSON schema from function signatures\n3. Add short-term (buffer) and long-term (vector DB) memory; demo in multi-turn session\n4. Implement planning: agent breaks complex task into sub-tasks before execution\n5. Add guardrails: detect prompt injection in tool outputs; log all tool calls`,r:`CORRECTNESS (40): ReAct loop alternates reasoning/action; tool schemas match signatures\nCODE_QUALITY (20): tool registry extensible; memory and guardrails are separate modules\nCOMPLETENESS (25): all five tasks with reasoning traces and injection refusal log\nUNDERSTANDING (15): memory architecture and guardrail strategy choices explained`},
"7.6":{t:"Fine-Tuning with LoRA",p:`Fine-tune an LLM efficiently using LoRA:\n1. Load base model in 4-bit quantisation; report memory before/after\n2. Apply LoRA (r=8, alpha=16) targeting attention matrices; count trainable params\n3. Prepare domain-specific instruction dataset in Alpaca format\n4. Fine-tune 3 epochs with SFTTrainer; plot loss curve; save adapter weights\n5. Merge adapter with base; compare before/after on 10 held-out prompts`,r:`CORRECTNESS (40): LoRA param count correct; merged model produces domain-specific responses\nCODE_QUALITY (20): training config in dataclass; adapter save/load tested\nCOMPLETENESS (25): all five tasks with memory stats, loss curve, and before/after comparison\nUNDERSTANDING (15): LoRA rank-accuracy trade-off and quantisation savings explained`},
"7.7":{t:"AI Assistant Project",p:`Build a domain-specific AI assistant for Indian context:\n1. Define use case (govt scheme advisor, agri helpdesk, tax FAQ); curate 100+ docs\n2. Build RAG pipeline: chunk, embed, store in ChromaDB, retrieve top-3\n3. Add conversational memory for 5+ turns; demo with session log\n4. Evaluate 20 test queries on faithfulness and relevance\n5. Build Gradio/Streamlit UI with feedback button logging to CSV`,r:`CORRECTNESS (40): retrieved chunks relevant; faithfulness score > 0.7\nCODE_QUALITY (20): RAG pipeline modular; UI feedback non-blocking\nCOMPLETENESS (25): all five tasks with retrieval demo, evaluation, and working UI\nUNDERSTANDING (15): knowledge base curation and evaluation metric choices justified`},
"8.2":{t:"Build & Submit Capstone",p:`Deliver an end-to-end ML project solving an Indian problem:\n1. Define problem, success metrics, and dataset (publicly available Indian data)\n2. Full EDA and feature engineering; document every decision\n3. Train 3+ models; select best via cross-validation with rationale\n4. Build inference API/UI and deploy; provide live demo URL\n5. Write project report: problem, methodology, results, limitations, future work`,r:`CORRECTNESS (40): chosen model outperforms baselines; API returns correct predictions\nCODE_QUALITY (20): repo has README, requirements.txt, modular structure\nCOMPLETENESS (25): all deliverables (proposal, EDA, models, demo, report) submitted\nUNDERSTANDING (15): report honestly discusses limitations and proposes improvements`},
"8.3":{t:"Final Certification",p:`Demonstrate mastery of the full ML curriculum:\n1. Complete a 90-minute coding assessment covering Python, ML, and DL\n2. Record a 10-minute capstone walkthrough video\n3. Conduct peer review of two capstone projects with 200+ word feedback each\n4. Respond to reviewer feedback on your capstone\n5. Complete 30-question theory exam (probability, linear algebra, evaluation, NLP)`,r:`CORRECTNESS (40): assessment solutions produce correct outputs; exam score > 70%\nCODE_QUALITY (20): assessment code is clean with brief inline comments\nCOMPLETENESS (25): all components (assessment, video, reviews, response, exam) submitted\nUNDERSTANDING (15): video clearly communicates design decisions; peer feedback is constructive`},
};

const defP={xp:0,st:1,cm:[],sc:{},up:[1],ach:[],ll:new Date().toDateString(),no:false,eb:false,name:""};

// ═══════════════ VISUAL LESSONS ═══════════════

function VisualLesson({moduleId, onComplete}){
  const [step,setStep]=useState(0);
  const [anim,setAnim]=useState("");
  useEffect(()=>{setAnim("opacity-0");const t=setTimeout(()=>setAnim("opacity-100"),50);return()=>clearTimeout(t);},[step]);

  // ─── 1.1 NumPy ───
  if(moduleId==="1.1"){
    const [op,setOp]=useState(0);
    const [rs,setRs]=useState(0);
    const G=({v,c="#3B82F6",l})=><div className="flex flex-col items-center gap-1">{l&&<div className="text-xs text-gray-400">{l}</div>}<div className="flex gap-1">{v.map((x,i)=><div key={i} className="w-11 h-11 rounded-lg flex items-center justify-center text-white font-bold text-sm transition-all duration-500" style={{background:c}}>{x}</div>)}</div></div>;
    const G2=({v,c="#8B5CF6",l})=><div className="flex flex-col items-center gap-1">{l&&<div className="text-xs text-gray-400">{l}</div>}<div className="flex flex-col gap-1">{v.map((r,i)=><div key={i} className="flex gap-1">{r.map((x,j)=><div key={j} className="w-11 h-11 rounded-lg flex items-center justify-center text-white font-bold text-sm" style={{background:c}}>{x}</div>)}</div>)}</div></div>;

    const steps=[
      {t:"What is a NumPy Array?",s:"The foundation of all ML data",v:()=>(
        <div className="flex flex-col items-center gap-5">
          <div className="flex items-center gap-4">
            <div className="text-center"><div className="text-xs text-gray-500 mb-2">Python List (slow)</div><div className="border-2 border-dashed border-gray-600 rounded-xl p-3 flex gap-1">{[1,2,3,4,5].map((v,i)=><div key={i} className="w-10 h-10 rounded bg-gray-700 flex items-center justify-center text-gray-400 text-sm">{v}</div>)}</div></div>
            <ArrowRight className="text-blue-400 animate-pulse" size={28}/>
            <div className="text-center"><div className="text-xs text-green-400 mb-2">NumPy Array (100x faster!)</div><div className="border-2 border-blue-500 rounded-xl p-3 flex gap-1 shadow-lg shadow-blue-500/20">{[1,2,3,4,5].map((v,i)=><div key={i} className="w-10 h-10 rounded bg-blue-600 flex items-center justify-center text-white font-bold text-sm">{v}</div>)}</div></div>
          </div>
          <div className="bg-gray-800/80 rounded-xl p-3 font-mono text-xs"><span className="text-purple-400">import</span> <span className="text-green-400">numpy</span> <span className="text-purple-400">as</span> <span className="text-green-400">np</span><br/>arr = np.array([<span className="text-yellow-300">1, 2, 3, 4, 5</span>])</div>
          <p className="text-gray-400 text-sm text-center max-w-md">NumPy stores data in <span className="text-blue-400 font-semibold">contiguous memory</span> — every ML library is built on top of it.</p>
        </div>
      )},
      {t:"Array Operations",s:"Element-wise math, no loops needed",v:()=>{
        const a=[1,2,3,4],b=[10,20,30,40];
        const ops=[{n:"Add",r:a.map((v,i)=>v+b[i]),s:"+"},{n:"Multiply",r:a.map((v,i)=>v*b[i]),s:"×"},{n:"Square",r:a.map(v=>v*v),s:"²"}];
        return(<div className="flex flex-col items-center gap-4">
          <div className="flex gap-2">{ops.map((o,i)=><button key={i} onClick={()=>setOp(i)} className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${op===i?'bg-blue-600 text-white':'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>{o.n}</button>)}</div>
          <div className="flex items-center gap-3"><G v={a} c="#3B82F6" l="A"/><div className="text-xl text-yellow-400 font-bold">{ops[op].s}</div>{op<2?<G v={b} c="#8B5CF6" l="B"/>:<span className="text-gray-500 text-xs">(each)</span>}<div className="text-xl text-yellow-400 font-bold">=</div><G v={ops[op].r} c="#10B981" l="Result"/></div>
          <div className="bg-gray-800/80 rounded-xl p-3 font-mono text-xs">result = a {op===0?"+":op===1?"*":"**"} {op===2?"2":"b"} <span className="text-gray-500"># → [{ops[op].r.join(", ")}]</span></div>
        </div>);
      }},
      {t:"2D Arrays (Matrices)",s:"Rows = samples, Columns = features",v:()=>(
        <div className="flex flex-col items-center gap-4">
          <G2 v={[[1,2,3],[4,5,6],[7,8,9]]} l="Shape: (3, 3)"/>
          <div className="bg-gray-800/80 rounded-xl p-3 font-mono text-xs">mat = np.array([[<span className="text-yellow-300">1,2,3</span>],[<span className="text-yellow-300">4,5,6</span>],[<span className="text-yellow-300">7,8,9</span>]])<br/><span className="text-gray-500"># mat[1,2] → 6 | mat[:,1] → [2,5,8]</span></div>
          <p className="text-gray-400 text-sm text-center">In ML: 1000 patients × 10 features = <span className="text-purple-400">shape (1000, 10)</span></p>
        </div>
      )},
      {t:"Reshaping",s:"Same data, different dimensions",v:()=>{
        const sh=[{a:[[1,2,3,4,5,6]],s:"(1,6)"},{a:[[1,2,3],[4,5,6]],s:"(2,3)"},{a:[[1,2],[3,4],[5,6]],s:"(3,2)"}];
        return(<div className="flex flex-col items-center gap-4">
          <div className="flex gap-2">{sh.map((s,i)=><button key={i} onClick={()=>setRs(i)} className={`px-3 py-1.5 rounded-lg text-xs font-medium ${rs===i?'bg-cyan-600 text-white':'bg-gray-700 text-gray-300'}`}>{s.s}</button>)}</div>
          <G2 v={sh[rs].a} c="#06B6D4" l={`Shape: ${sh[rs].s}`}/>
          <div className="bg-gray-800/80 rounded-xl p-3 font-mono text-xs">arr.reshape(<span className="text-cyan-300">{sh[rs].s.slice(1,-1)}</span>) <span className="text-gray-500"># total must stay 6</span></div>
        </div>);
      }},
    ];
    return <LessonShell steps={steps} step={step} setStep={setStep} anim={anim} onComplete={onComplete}/>;
  }

  // ─── 2.1 Vectors & Matrices ───
  if(moduleId==="2.1"){
    const [vx,setVx]=useState(3);const [vy,setVy]=useState(4);
    const mag=Math.sqrt(vx*vx+vy*vy);
    const steps=[
      {t:"Vectors — Arrows with Direction",s:"The language of data in ML",v:()=>(
        <div className="flex flex-col items-center gap-4">
          <svg viewBox="0 0 300 300" className="w-full max-w-xs bg-gray-800/50 rounded-xl">
            {Array.from({length:7},(_,i)=><><line x1={i*50} y1="0" x2={i*50} y2="300" stroke="#374151" strokeWidth="0.5"/><line x1="0" y1={i*50} x2="300" y2={i*50} stroke="#374151" strokeWidth="0.5"/></>)}
            <line x1="150" y1="0" x2="150" y2="300" stroke="#4B5563" strokeWidth="1"/><line x1="0" y1="150" x2="300" y2="150" stroke="#4B5563" strokeWidth="1"/>
            <line x1="150" y1="150" x2={150+vx*25} y2={150-vy*25} stroke="#3B82F6" strokeWidth="3" markerEnd="url(#arrowB)"/>
            <line x1="150" y1="150" x2={150+4*25} y2={150-2*25} stroke="#10B981" strokeWidth="2" strokeDasharray="4" opacity="0.6"/>
            <defs><marker id="arrowB" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#3B82F6"/></marker></defs>
            <text x={150+vx*12} y={150-vy*12-8} fill="#3B82F6" fontSize="10" textAnchor="middle">v=({vx},{vy})</text>
            <text x={150+4*12} y={150-2*12-8} fill="#10B981" fontSize="9" textAnchor="middle" opacity="0.6">u=(4,2)</text>
          </svg>
          <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
            <div className="text-center"><div className="text-xs text-gray-400 mb-1">x component</div><input type="range" min="-5" max="5" step="1" value={vx} onChange={e=>setVx(+e.target.value)} className="w-full"/><div className="text-xs text-blue-400">{vx}</div></div>
            <div className="text-center"><div className="text-xs text-gray-400 mb-1">y component</div><input type="range" min="-5" max="5" step="1" value={vy} onChange={e=>setVy(+e.target.value)} className="w-full"/><div className="text-xs text-blue-400">{vy}</div></div>
          </div>
          <div className="text-xs text-gray-400">Magnitude: <span className="text-purple-400 font-bold">{mag.toFixed(2)}</span> | In ML, each data point is a vector in feature space</div>
        </div>
      )},
      {t:"Matrix = Grid of Numbers",s:"Datasets are matrices: rows=samples, cols=features",v:()=>(
        <div className="flex flex-col items-center gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-800 rounded-xl p-3 text-center"><div className="text-xs text-gray-500 mb-2">Matrix A (2×3)</div>
              <div className="flex flex-col gap-1">{[[1,2,3],[4,5,6]].map((r,i)=><div key={i} className="flex gap-1 justify-center">{r.map((v,j)=><div key={j} className="w-9 h-9 rounded bg-blue-600 flex items-center justify-center text-white text-xs font-bold">{v}</div>)}</div>)}</div>
            </div>
            <div className="bg-gray-800 rounded-xl p-3 text-center"><div className="text-xs text-gray-500 mb-2">Transpose A^T (3×2)</div>
              <div className="flex flex-col gap-1">{[[1,4],[2,5],[3,6]].map((r,i)=><div key={i} className="flex gap-1 justify-center">{r.map((v,j)=><div key={j} className="w-9 h-9 rounded bg-purple-600 flex items-center justify-center text-white text-xs font-bold">{v}</div>)}</div>)}</div>
            </div>
          </div>
          <div className="bg-gray-800/80 rounded-xl p-3 font-mono text-xs">A.T <span className="text-gray-500"># rows become columns, columns become rows</span></div>
          <div className="text-xs text-gray-400 text-center max-w-sm">Operations: <span className="text-blue-400">transpose</span>, <span className="text-purple-400">determinant</span>, <span className="text-green-400">inverse</span>, <span className="text-yellow-400">eigenvalues</span> — all essential for ML algorithms</div>
        </div>
      )},
    ];
    return <LessonShell steps={steps} step={step} setStep={setStep} anim={anim} onComplete={onComplete}/>;
  }

  // ─── 2.5 Gradient Descent ───
  if(moduleId==="2.5"){
    const [lr,setLr]=useState(0.1);
    const [pos,setPos]=useState(8);
    const [trail,setTrail]=useState([8]);
    const [running,setRunning]=useState(false);
    const runRef=useRef(null);
    const f=x=>(x-3)**2+2;
    const df=x=>2*(x-3);
    const runGD=()=>{setRunning(true);let p=8;let tr=[8];let i=0;
      const tick=()=>{if(i>=20){setRunning(false);return;}p=p-lr*df(p);tr=[...tr,p];setPos(p);setTrail([...tr]);i++;runRef.current=setTimeout(tick,300);};tick();};
    const reset=()=>{clearTimeout(runRef.current);setPos(8);setTrail([8]);setRunning(false);};
    useEffect(()=>()=>clearTimeout(runRef.current),[]);

    const steps=[
      {t:"Gradient Descent",s:"How ML models learn — finding the minimum",v:()=>(
        <div className="flex flex-col items-center gap-4">
          <div className="text-sm text-gray-400 text-center max-w-md mb-2">Imagine a ball rolling down a hill. <span className="text-purple-400 font-semibold">Gradient descent</span> follows the slope to find the lowest point.</div>
          <svg viewBox="0 0 400 200" className="w-full max-w-lg">
            <defs><linearGradient id="gd" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.3"/><stop offset="50%" stopColor="#10B981" stopOpacity="0.3"/><stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.3"/></linearGradient></defs>
            <path d={`M 20 ${20+f(-2)*4} ${Array.from({length:50},(_,i)=>{const x=-2+i*0.24;return`L ${20+i*7.4} ${20+f(x)*4}`;}).join(" ")}`} fill="url(#gd)" stroke="#8B5CF6" strokeWidth="2"/>
            {trail.map((p,i)=>{const sx=20+((p+2)/12)*370;const sy=20+f(p)*4;return<circle key={i} cx={sx} cy={sy} r={i===trail.length-1?6:2} fill="#F59E0B" opacity={i===trail.length-1?1:0.4}/>;})}
            <circle cx={20+((3+2)/12)*370} cy={20+f(3)*4} r={4} fill="#10B981" opacity="0.5"/><text x={20+((3+2)/12)*370} y={20+f(3)*4-10} fill="#10B981" fontSize="10" textAnchor="middle">min</text>
          </svg>
          <div className="flex items-center gap-4">
            <div className="text-xs text-gray-400">Learning Rate:</div>
            {[0.05,0.1,0.3].map(l=><button key={l} onClick={()=>{reset();setLr(l);}} className={`px-3 py-1 rounded text-xs ${lr===l?'bg-purple-600 text-white':'bg-gray-700 text-gray-400'}`}>{l}</button>)}
          </div>
          <div className="flex gap-3">
            <button onClick={runGD} disabled={running} className="px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-semibold disabled:opacity-30 flex items-center gap-1"><Play size={14}/>Run GD</button>
            <button onClick={reset} className="px-4 py-2 rounded-lg bg-gray-700 text-gray-300 text-sm flex items-center gap-1"><RefreshCw size={14}/>Reset</button>
          </div>
          <div className="text-xs text-gray-500">Position: <span className="text-yellow-400">{pos.toFixed(2)}</span> | Loss: <span className="text-purple-400">{f(pos).toFixed(2)}</span> | Steps: {trail.length-1}</div>
        </div>
      )},
      {t:"Learning Rate Matters",s:"Too high = overshoot, too low = slow",v:()=>(
        <div className="flex flex-col items-center gap-4">
          <div className="grid grid-cols-3 gap-4 w-full max-w-lg">
            {[{lr:0.05,label:"Too Small",color:"#3B82F6",desc:"Very slow convergence"},{lr:0.1,label:"Just Right",color:"#10B981",desc:"Smooth convergence"},{lr:0.9,label:"Too Large",color:"#EF4444",desc:"Overshoots! May diverge"}].map(({lr,label,color,desc})=>(
              <div key={lr} className="bg-gray-800 rounded-xl p-3 text-center border" style={{borderColor:color+"44"}}>
                <div className="text-sm font-bold mb-1" style={{color}}>{label}</div>
                <div className="text-lg font-mono text-gray-200">lr={lr}</div>
                <div className="text-xs text-gray-500 mt-1">{desc}</div>
              </div>
            ))}
          </div>
          <div className="bg-gray-800/80 rounded-xl p-3 font-mono text-xs w-full max-w-lg">
            <span className="text-purple-400">def</span> <span className="text-blue-300">gradient_descent</span>(lr, steps):<br/>
            {"    "}x = <span className="text-yellow-300">8.0</span><br/>
            {"    "}<span className="text-purple-400">for</span> i <span className="text-purple-400">in</span> range(steps):<br/>
            {"        "}grad = <span className="text-yellow-300">2</span> * (x - <span className="text-yellow-300">3</span>)<br/>
            {"        "}x = x - lr * grad<br/>
            {"    "}<span className="text-purple-400">return</span> x
          </div>
        </div>
      )},
    ];
    return <LessonShell steps={steps} step={step} setStep={setStep} anim={anim} onComplete={onComplete}/>;
  }

  // ─── 3.3 Train/Test Split ───
  if(moduleId==="3.3"){
    const [splitDone,setSplitDone]=useState(false);
    const cards=Array.from({length:20},(_,i)=>({id:i,color:i<12?"#3B82F6":i<16?"#10B981":"#F59E0B"}));
    const steps=[{t:"Train/Test Split",s:"Why you must keep test data separate",v:()=>(
      <div className="flex flex-col items-center gap-4">
        <div className="text-sm text-gray-400 text-center mb-2">Click to split data into training (80%) and test (20%) sets</div>
        <div className="flex gap-8">
          <div className="text-center">
            <div className="text-xs text-gray-500 mb-2">{splitDone?"Training Set (80%)":"Full Dataset"}</div>
            <div className="grid grid-cols-4 gap-1">{(splitDone?cards.slice(0,16):cards).map(c=>(
              <div key={c.id} className="w-8 h-10 rounded" style={{background:splitDone?"#3B82F6":"#6B7280",transition:"all 0.5s"}}/>
            ))}</div>
          </div>
          {splitDone&&<div className="text-center">
            <div className="text-xs text-gray-500 mb-2">Test Set (20%)</div>
            <div className="grid grid-cols-2 gap-1">{cards.slice(16).map(c=>(
              <div key={c.id} className="w-8 h-10 rounded bg-red-500" style={{transition:"all 0.5s"}}/>
            ))}</div>
          </div>}
        </div>
        <button onClick={()=>setSplitDone(!splitDone)} className={`px-4 py-2 rounded-lg text-sm font-semibold ${splitDone?'bg-gray-700 text-gray-300':'bg-green-600 text-white'}`}>
          {splitDone?"Reset":"Split Data (80/20)"}
        </button>
        <div className="bg-gray-800/80 rounded-xl p-3 font-mono text-xs max-w-md">
          X_train, X_test, y_train, y_test = <span className="text-blue-300">train_test_split</span>(X, y, <span className="text-yellow-300">test_size=0.2</span>)
        </div>
        <p className="text-xs text-gray-500 text-center max-w-md">Never train on test data! The model must prove it works on <span className="text-red-400">unseen data</span> — this prevents overfitting.</p>
      </div>
    )}];
    return <LessonShell steps={steps} step={step} setStep={setStep} anim={anim} onComplete={onComplete}/>;
  }

  // ─── 3.4 Linear Regression ───
  if(moduleId==="3.4"){
    const [pts,setPts]=useState(()=>Array.from({length:12},()=>({x:Math.random()*10,y:Math.random()*10})));
    const addPt=(e)=>{const r=e.currentTarget.getBoundingClientRect();const x=((e.clientX-r.left)/r.width)*10;const y=(1-(e.clientY-r.top)/r.height)*10;setPts([...pts,{x,y}]);};
    const mx=pts.reduce((s,p)=>s+p.x,0)/pts.length;const my=pts.reduce((s,p)=>s+p.y,0)/pts.length;
    const num=pts.reduce((s,p)=>s+(p.x-mx)*(p.y-my),0);const den=pts.reduce((s,p)=>s+(p.x-mx)**2,0);
    const slope=den?num/den:0;const intercept=my-slope*mx;
    const steps=[
      {t:"Linear Regression",s:"Finding the best-fit line through data",v:()=>(
        <div className="flex flex-col items-center gap-3">
          <div className="text-sm text-gray-400">Click to add points. The line fits automatically!</div>
          <svg viewBox="0 0 300 300" className="w-full max-w-sm bg-gray-800/50 rounded-xl cursor-crosshair" onClick={addPt}>
            {Array.from({length:11},(_,i)=><line key={`g${i}`} x1={i*30} y1="0" x2={i*30} y2="300" stroke="#374151" strokeWidth="0.5"/>)}
            {Array.from({length:11},(_,i)=><line key={`h${i}`} x1="0" y1={i*30} x2="300" y2={i*30} stroke="#374151" strokeWidth="0.5"/>)}
            <line x1={0} y1={300-(intercept/10)*300} x2={300} y2={300-((slope*10+intercept)/10)*300} stroke="#EF4444" strokeWidth="2" strokeDasharray="4"/>
            {pts.map((p,i)=><circle key={i} cx={(p.x/10)*300} cy={300-(p.y/10)*300} r="5" fill="#3B82F6" opacity="0.8"/>)}
          </svg>
          <div className="flex gap-4 text-xs"><span className="text-gray-400">y = <span className="text-red-400">{slope.toFixed(2)}</span>x + <span className="text-red-400">{intercept.toFixed(2)}</span></span><button onClick={()=>setPts(Array.from({length:12},()=>({x:Math.random()*10,y:Math.random()*10})))} className="text-blue-400 hover:text-blue-300 flex items-center gap-1"><RefreshCw size={10}/>Reset</button></div>
        </div>
      )},
      {t:"The Math Behind It",s:"Ordinary Least Squares minimizes error",v:()=>(
        <div className="flex flex-col items-center gap-4 max-w-lg">
          <div className="bg-gray-800 rounded-xl p-4 text-center"><div className="font-mono text-lg text-yellow-400">θ = (X<sup>T</sup>X)<sup>-1</sup> X<sup>T</sup>y</div><div className="text-xs text-gray-500 mt-2">The Normal Equation — optimal weights in one step</div></div>
          <div className="grid grid-cols-2 gap-3 w-full">
            <div className="bg-gray-800 rounded-lg p-3"><div className="text-xs text-green-400 font-semibold">MSE</div><div className="text-xs text-gray-400 mt-1">Average (predicted - actual)² — what we minimize</div></div>
            <div className="bg-gray-800 rounded-lg p-3"><div className="text-xs text-blue-400 font-semibold">R² Score</div><div className="text-xs text-gray-400 mt-1">1.0 = perfect fit, 0 = no better than mean</div></div>
          </div>
        </div>
      )},
    ];
    return <LessonShell steps={steps} step={step} setStep={setStep} anim={anim} onComplete={onComplete}/>;
  }

  // ─── 3.5 Logistic Regression ───
  if(moduleId==="3.5"){
    const [thresh,setThresh]=useState(0.5);
    const sigmoid=x=>1/(1+Math.exp(-x));
    const steps=[{t:"Logistic Regression",s:"Sigmoid function maps anything to probability [0,1]",v:()=>(
      <div className="flex flex-col items-center gap-4">
        <svg viewBox="0 0 400 200" className="w-full max-w-lg bg-gray-800/50 rounded-xl">
          <line x1="0" y1="100" x2="400" y2="100" stroke="#374151" strokeWidth="1"/>
          <line x1="200" y1="0" x2="200" y2="200" stroke="#374151" strokeWidth="1"/>
          <path d={Array.from({length:81},(_,i)=>{const x=-8+i*0.2;const y=sigmoid(x);const sx=200+x*22;const sy=190-y*180;return(i===0?"M":"L")+` ${sx} ${sy}`;}).join(" ")} fill="none" stroke="#8B5CF6" strokeWidth="3"/>
          <line x1="0" y1={190-thresh*180} x2="400" y2={190-thresh*180} stroke="#F59E0B" strokeWidth="1" strokeDasharray="4"/>
          <text x="370" y={190-thresh*180-5} fill="#F59E0B" fontSize="9">threshold={thresh}</text>
          <rect x="200" y="10" width="200" height={190-thresh*180-10} rx="4" fill="#10B981" opacity="0.08"/>
          <rect x="0" y={190-thresh*180} width="200" height={thresh*180} rx="4" fill="#EF4444" opacity="0.08"/>
          <text x="300" y="30" fill="#10B981" fontSize="10" opacity="0.6">Class 1</text>
          <text x="50" y="185" fill="#EF4444" fontSize="10" opacity="0.6">Class 0</text>
        </svg>
        <div className="text-center"><div className="text-xs text-gray-400 mb-1">Decision Threshold</div>
          <input type="range" min="0.1" max="0.9" step="0.05" value={thresh} onChange={e=>setThresh(+e.target.value)} className="w-48"/>
          <div className="text-xs text-yellow-400">{thresh}</div>
        </div>
        <div className="bg-gray-800/80 rounded-xl p-3 font-mono text-xs">σ(z) = 1 / (1 + e<sup>-z</sup>) <span className="text-gray-500"># maps any real number to (0, 1)</span></div>
        <p className="text-xs text-gray-500 text-center max-w-md">Unlike linear regression, logistic regression outputs a <span className="text-purple-400">probability</span>. If P(y=1) ≥ threshold → predict class 1.</p>
      </div>
    )}];
    return <LessonShell steps={steps} step={step} setStep={setStep} anim={anim} onComplete={onComplete}/>;
  }

  // ─── 3.6 Decision Tree ───
  if(moduleId==="3.6"){
    const [depth,setDepth]=useState(0);
    const steps=[
      {t:"Decision Trees",s:"A tree of yes/no questions to classify data",v:()=>(
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-2 mb-2">{[0,1,2].map(d=><button key={d} onClick={()=>setDepth(d)} className={`px-3 py-1.5 rounded-lg text-xs font-medium ${depth>=d?'bg-purple-600 text-white':'bg-gray-700 text-gray-400'}`}>Depth {d}</button>)}</div>
          <svg viewBox="0 0 400 240" className="w-full max-w-lg">
            {depth>=0&&<><rect x="150" y="10" width="100" height="40" rx="8" fill="#8B5CF6" opacity="0.8"/><text x="200" y="35" fill="white" fontSize="8" textAnchor="middle">Petal Length &lt; 2.5?</text></>}
            {depth>=1&&<><line x1="200" y1="50" x2="80" y2="80" stroke="#444" strokeWidth="1.5"/><line x1="200" y1="50" x2="320" y2="80" stroke="#444" strokeWidth="1.5"/>
            <text x="130" y="70" fill="#10B981" fontSize="7">Yes</text><text x="260" y="70" fill="#EF4444" fontSize="7">No</text>
            <rect x="30" y="80" width="100" height="36" rx="8" fill="#10B981" opacity="0.8"/><text x="80" y="102" fill="white" fontSize="8" textAnchor="middle">🌸 Setosa</text>
            <rect x="270" y="80" width="100" height="36" rx="8" fill="#3B82F6" opacity="0.8"/><text x="320" y="100" fill="white" fontSize="7" textAnchor="middle">Petal Width &lt; 1.8?</text></>}
            {depth>=2&&<><line x1="320" y1="116" x2="260" y2="150" stroke="#444" strokeWidth="1.5"/><line x1="320" y1="116" x2="380" y2="150" stroke="#444" strokeWidth="1.5"/>
            <text x="280" y="140" fill="#10B981" fontSize="7">Yes</text><text x="355" y="140" fill="#EF4444" fontSize="7">No</text>
            <rect x="210" y="150" width="100" height="36" rx="8" fill="#F59E0B" opacity="0.8"/><text x="260" y="172" fill="white" fontSize="8" textAnchor="middle">🌺 Versicolor</text>
            <rect x="330" y="150" width="100" height="36" rx="8" fill="#EC4899" opacity="0.8"/><text x="380" y="172" fill="white" fontSize="8" textAnchor="middle">🌷 Virginica</text></>}
          </svg>
          <p className="text-sm text-gray-400 text-center max-w-md">Click depth buttons to grow the tree. Each split finds the <span className="text-purple-400 font-semibold">best feature and threshold</span>.</p>
        </div>
      )},
    ];
    return <LessonShell steps={steps} step={step} setStep={setStep} anim={anim} onComplete={onComplete}/>;
  }

  // ─── 3.7 Random Forests ───
  if(moduleId==="3.7"){
    const [numTrees,setNumTrees]=useState(1);
    const trees=[{pred:"A",conf:0.8},{pred:"B",conf:0.6},{pred:"A",conf:0.9},{pred:"A",conf:0.7},{pred:"B",conf:0.85}];
    const active=trees.slice(0,numTrees);
    const votes={};active.forEach(t=>{votes[t.pred]=(votes[t.pred]||0)+1;});
    const winner=Object.entries(votes).sort((a,b)=>b[1]-a[1])[0]?.[0]||"?";
    const steps=[{t:"Random Forests",s:"A forest of trees voting together",v:()=>(
      <div className="flex flex-col items-center gap-4">
        <div className="text-sm text-gray-400 text-center">Each tree sees a random subset of data and features. They <span className="text-green-400 font-semibold">vote</span> for the final prediction.</div>
        <div className="flex gap-2 mb-2">{[1,3,5].map(n=><button key={n} onClick={()=>setNumTrees(n)} className={`px-3 py-1.5 rounded-lg text-xs ${numTrees===n?'bg-green-600 text-white':'bg-gray-700 text-gray-400'}`}>{n} tree{n>1?"s":""}</button>)}</div>
        <div className="flex gap-3 justify-center flex-wrap">
          {active.map((t,i)=>(
            <div key={i} className="bg-gray-800 rounded-xl p-3 text-center border border-gray-700 w-16">
              <div className="text-lg mb-1">🌲</div>
              <div className="text-xs text-gray-400">Tree {i+1}</div>
              <div className={`text-sm font-bold mt-1 ${t.pred==="A"?"text-blue-400":"text-red-400"}`}>{t.pred}</div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <ArrowRight size={16} className="text-gray-600"/>
          <div className={`px-4 py-2 rounded-xl font-bold ${winner==="A"?"bg-blue-600/20 text-blue-400 border border-blue-600/30":"bg-red-600/20 text-red-400 border border-red-600/30"}`}>
            Vote: {winner} ({votes[winner]||0}/{numTrees})
          </div>
        </div>
        <div className="text-xs text-gray-500 text-center max-w-md">More trees = more stable predictions. Random Forests reduce <span className="text-yellow-400">variance</span> (overfitting) while keeping bias low.</div>
      </div>
    )}];
    return <LessonShell steps={steps} step={step} setStep={setStep} anim={anim} onComplete={onComplete}/>;
  }

  // ─── 3.9 KNN ───
  if(moduleId==="3.9"){
    const [k,setK]=useState(3);
    const [query,setQuery]=useState({x:5,y:5});
    const pts=[{x:2,y:3,c:"A"},{x:3,y:2,c:"A"},{x:1,y:4,c:"A"},{x:2.5,y:2.5,c:"A"},{x:7,y:8,c:"B"},{x:8,y:7,c:"B"},{x:9,y:8.5,c:"B"},{x:7.5,y:9,c:"B"},{x:5,y:8,c:"C"},{x:4,y:7,c:"C"},{x:6,y:9,c:"C"},{x:3.5,y:8.5,c:"C"}];
    const dists=pts.map(p=>({...p,d:Math.sqrt((p.x-query.x)**2+(p.y-query.y)**2)})).sort((a,b)=>a.d-b.d);
    const neighbors=dists.slice(0,k);
    const votes={};neighbors.forEach(n=>{votes[n.c]=(votes[n.c]||0)+1;});
    const pred=Object.entries(votes).sort((a,b)=>b[1]-a[1])[0]?.[0]||"?";
    const colors={A:"#3B82F6",B:"#EF4444",C:"#10B981"};
    const steps=[{t:"K-Nearest Neighbors",s:"Classify by asking your neighbors",v:()=>(
      <div className="flex flex-col items-center gap-3">
        <div className="flex gap-2">{[1,3,5,7].map(v=><button key={v} onClick={()=>setK(v)} className={`px-3 py-1 rounded text-xs ${k===v?'bg-blue-600 text-white':'bg-gray-700 text-gray-400'}`}>K={v}</button>)}</div>
        <svg viewBox="0 0 300 300" className="w-full max-w-sm bg-gray-800/50 rounded-xl cursor-crosshair" onClick={e=>{const r=e.currentTarget.getBoundingClientRect();setQuery({x:((e.clientX-r.left)/r.width)*10,y:(1-(e.clientY-r.top)/r.height)*10});}}>
          {pts.map((p,i)=><circle key={i} cx={(p.x/10)*300} cy={300-(p.y/10)*300} r={neighbors.find(n=>n.x===p.x&&n.y===p.y)?8:5} fill={colors[p.c]} opacity={neighbors.find(n=>n.x===p.x&&n.y===p.y)?1:0.4} stroke={neighbors.find(n=>n.x===p.x&&n.y===p.y)?"white":"none"} strokeWidth="2"/>)}
          <circle cx={(query.x/10)*300} cy={300-(query.y/10)*300} r="7" fill={colors[pred]||"#666"} stroke="white" strokeWidth="3"/>
          <text x={(query.x/10)*300} y={300-(query.y/10)*300-12} fill="white" fontSize="10" textAnchor="middle">?→{pred}</text>
          {neighbors.map((n,i)=><line key={i} x1={(query.x/10)*300} y1={300-(query.y/10)*300} x2={(n.x/10)*300} y2={300-(n.y/10)*300} stroke="white" strokeWidth="0.5" strokeDasharray="3" opacity="0.4"/>)}
        </svg>
        <div className="text-xs text-gray-400">Click to move query point. K={k} neighbors vote → <span className="font-bold" style={{color:colors[pred]}}>{pred}</span></div>
      </div>
    )}];
    return <LessonShell steps={steps} step={step} setStep={setStep} anim={anim} onComplete={onComplete}/>;
  }

  // ─── 3.10 K-Means ───
  if(moduleId==="3.10"){
    const [iter,setIter]=useState(0);
    const [data]=useState(()=>{const pts=[];
      [[2,2],[3,3],[2.5,1.5],[3.5,2.5],[1.5,3]].forEach(([cx,cy])=>pts.push({x:cx+Math.random()*.8-.4,y:cy+Math.random()*.8-.4}));
      [[7,7],[8,8],[7.5,6.5],[8.5,7.5],[6.5,8]].forEach(([cx,cy])=>pts.push({x:cx+Math.random()*.8-.4,y:cy+Math.random()*.8-.4}));
      [[7,2],[8,3],[7.5,1.5],[8.5,2.5],[6.5,3]].forEach(([cx,cy])=>pts.push({x:cx+Math.random()*.8-.4,y:cy+Math.random()*.8-.4}));
      return pts;});
    const cColors=["#3B82F6","#EF4444","#10B981"];
    const initC=[{x:1,y:8},{x:9,y:1},{x:5,y:5}];
    const runKM=(steps)=>{let cs=[...initC.map(c=>({...c}))];for(let s=0;s<steps;s++){const assign=data.map(p=>{const ds=cs.map((c,i)=>({i,d:(p.x-c.x)**2+(p.y-c.y)**2}));return ds.sort((a,b)=>a.d-b.d)[0].i;});for(let k=0;k<3;k++){const cl=data.filter((_,i)=>assign[i]===k);if(cl.length){cs[k]={x:cl.reduce((s,p)=>s+p.x,0)/cl.length,y:cl.reduce((s,p)=>s+p.y,0)/cl.length};}}}return cs;};
    const curC=runKM(iter);
    const assign=data.map(p=>{const ds=curC.map((c,i)=>({i,d:(p.x-c.x)**2+(p.y-c.y)**2}));return ds.sort((a,b)=>a.d-b.d)[0].i;});
    const steps=[{t:"K-Means Clustering",s:"Watch centroids find the clusters",v:()=>(
      <div className="flex flex-col items-center gap-3">
        <div className="flex items-center gap-2">
          <button onClick={()=>setIter(0)} className="px-3 py-1 rounded bg-gray-700 text-gray-300 text-xs"><RefreshCw size={12}/></button>
          {[0,1,2,3,5,10].map(i=><button key={i} onClick={()=>setIter(i)} className={`px-2 py-1 rounded text-xs ${iter===i?'bg-green-600 text-white':'bg-gray-700 text-gray-400'}`}>Iter {i}</button>)}
        </div>
        <svg viewBox="0 0 300 300" className="w-full max-w-sm bg-gray-800/50 rounded-xl">
          {data.map((p,i)=><circle key={i} cx={(p.x/10)*300} cy={300-(p.y/10)*300} r="5" fill={cColors[assign[i]]} opacity="0.6"/>)}
          {curC.map((c,i)=><g key={`c${i}`}><circle cx={(c.x/10)*300} cy={300-(c.y/10)*300} r="10" fill={cColors[i]} stroke="white" strokeWidth="3"/><text x={(c.x/10)*300} y={300-(c.y/10)*300+3} fill="white" fontSize="8" textAnchor="middle">C{i+1}</text></g>)}
        </svg>
        <div className="text-xs text-gray-400">Iteration {iter}: Centroids {iter===0?"at random positions":"moving toward cluster centers"}. {iter>=5&&<span className="text-green-400">Converged!</span>}</div>
      </div>
    )}];
    return <LessonShell steps={steps} step={step} setStep={setStep} anim={anim} onComplete={onComplete}/>;
  }

  // ─── 3.11 Model Evaluation ───
  if(moduleId==="3.11"){
    const [thresh,setThresh]=useState(0.5);
    const data=[{s:0.1,a:0},{s:0.2,a:0},{s:0.3,a:0},{s:0.35,a:1},{s:0.4,a:0},{s:0.45,a:0},{s:0.5,a:1},{s:0.55,a:1},{s:0.6,a:0},{s:0.65,a:1},{s:0.7,a:1},{s:0.75,a:1},{s:0.8,a:1},{s:0.85,a:1},{s:0.9,a:1},{s:0.95,a:1}];
    const tp=data.filter(d=>d.s>=thresh&&d.a===1).length;
    const fp=data.filter(d=>d.s>=thresh&&d.a===0).length;
    const tn=data.filter(d=>d.s<thresh&&d.a===0).length;
    const fn_=data.filter(d=>d.s<thresh&&d.a===1).length;
    const prec=tp+fp?tp/(tp+fp):0;const rec=tp+fn_?tp/(tp+fn_):0;
    const steps=[{t:"Confusion Matrix & Metrics",s:"How to measure if your model is actually good",v:()=>(
      <div className="flex flex-col items-center gap-3">
        <div className="text-center"><div className="text-xs text-gray-400 mb-1">Threshold</div>
          <input type="range" min="0.1" max="0.9" step="0.05" value={thresh} onChange={e=>setThresh(+e.target.value)} className="w-40"/>
          <div className="text-xs text-yellow-400">{thresh}</div>
        </div>
        <div className="grid grid-cols-2 gap-1 w-48">
          <div className="bg-green-600/30 border border-green-600/50 rounded-lg p-2 text-center"><div className="text-xs text-green-400">TP</div><div className="text-lg font-bold text-green-300">{tp}</div></div>
          <div className="bg-red-600/30 border border-red-600/50 rounded-lg p-2 text-center"><div className="text-xs text-red-400">FP</div><div className="text-lg font-bold text-red-300">{fp}</div></div>
          <div className="bg-yellow-600/30 border border-yellow-600/50 rounded-lg p-2 text-center"><div className="text-xs text-yellow-400">FN</div><div className="text-lg font-bold text-yellow-300">{fn_}</div></div>
          <div className="bg-blue-600/30 border border-blue-600/50 rounded-lg p-2 text-center"><div className="text-xs text-blue-400">TN</div><div className="text-lg font-bold text-blue-300">{tn}</div></div>
        </div>
        <div className="flex gap-4 text-xs">
          <span className="text-gray-400">Precision: <span className="text-green-400 font-bold">{(prec*100).toFixed(0)}%</span></span>
          <span className="text-gray-400">Recall: <span className="text-blue-400 font-bold">{(rec*100).toFixed(0)}%</span></span>
          <span className="text-gray-400">F1: <span className="text-purple-400 font-bold">{(prec+rec?(2*prec*rec/(prec+rec)):0).toFixed(2)}</span></span>
        </div>
        <p className="text-xs text-gray-500 text-center max-w-sm">Move the threshold to see how it affects the confusion matrix. Lower threshold = more positives (higher recall, lower precision).</p>
      </div>
    )}];
    return <LessonShell steps={steps} step={step} setStep={setStep} anim={anim} onComplete={onComplete}/>;
  }

  // ─── 5.1 Perceptron ───
  if(moduleId==="5.1"){
    const [w1,setW1]=useState(0.5);const[w2,setW2]=useState(0.5);const[bias,setBias]=useState(-0.7);
    const sigmoid=x=>1/(1+Math.exp(-x));
    const x1=1,x2=0;const z=x1*w1+x2*w2+bias;const out=sigmoid(z);
    const steps=[{t:"The Perceptron",s:"A single artificial neuron",v:()=>(
      <div className="flex flex-col items-center gap-3">
        <svg viewBox="0 0 400 200" className="w-full max-w-lg">
          <circle cx="60" cy="60" r="25" fill="#3B82F6" opacity="0.8"/><text x="60" y="64" fill="white" fontSize="12" textAnchor="middle">x₁={x1}</text>
          <circle cx="60" cy="140" r="25" fill="#3B82F6" opacity="0.8"/><text x="60" y="144" fill="white" fontSize="12" textAnchor="middle">x₂={x2}</text>
          <line x1="85" y1="60" x2="175" y2="100" stroke="#F59E0B" strokeWidth="2"/><text x="125" y="70" fill="#F59E0B" fontSize="9">w₁={w1.toFixed(1)}</text>
          <line x1="85" y1="140" x2="175" y2="100" stroke="#F59E0B" strokeWidth="2"/><text x="125" y="145" fill="#F59E0B" fontSize="9">w₂={w2.toFixed(1)}</text>
          <circle cx="200" cy="100" r="30" fill="#8B5CF6" opacity="0.9"/><text x="200" y="96" fill="white" fontSize="8" textAnchor="middle">Σ + bias</text><text x="200" y="108" fill="#F59E0B" fontSize="8" textAnchor="middle">σ(z)</text>
          <line x1="230" y1="100" x2="310" y2="100" stroke="#10B981" strokeWidth="2"/>
          <circle cx="340" cy="100" r="25" fill={out>0.5?"#10B981":"#EF4444"} opacity="0.9"/><text x="340" y="104" fill="white" fontSize="11" textAnchor="middle">{out.toFixed(2)}</text>
          <text x="200" y="155" fill="#888" fontSize="8" textAnchor="middle">z = {z.toFixed(2)}</text>
        </svg>
        <div className="grid grid-cols-3 gap-3 w-full max-w-md">
          <div className="text-center"><div className="text-xs text-gray-400 mb-1">Weight 1</div><input type="range" min="-2" max="2" step="0.1" value={w1} onChange={e=>setW1(+e.target.value)} className="w-full"/><div className="text-xs text-yellow-400">{w1.toFixed(1)}</div></div>
          <div className="text-center"><div className="text-xs text-gray-400 mb-1">Weight 2</div><input type="range" min="-2" max="2" step="0.1" value={w2} onChange={e=>setW2(+e.target.value)} className="w-full"/><div className="text-xs text-yellow-400">{w2.toFixed(1)}</div></div>
          <div className="text-center"><div className="text-xs text-gray-400 mb-1">Bias</div><input type="range" min="-2" max="2" step="0.1" value={bias} onChange={e=>setBias(+e.target.value)} className="w-full"/><div className="text-xs text-yellow-400">{bias.toFixed(1)}</div></div>
        </div>
        <div className="text-xs text-gray-400">Output {out>0.5?<span className="text-green-400">≥ 0.5 → Class 1</span>:<span className="text-red-400">&lt; 0.5 → Class 0</span>}</div>
      </div>
    )}];
    return <LessonShell steps={steps} step={step} setStep={setStep} anim={anim} onComplete={onComplete}/>;
  }

  // ─── 5.2 Activation Functions ───
  if(moduleId==="5.2"){
    const [fn,setFn]=useState(0);
    const fns=[
      {name:"ReLU",f:x=>Math.max(0,x),color:"#3B82F6",desc:"Most popular. Kills negative, keeps positive."},
      {name:"Sigmoid",f:x=>1/(1+Math.exp(-x)),color:"#8B5CF6",desc:"Squashes to (0,1). Used for binary output."},
      {name:"Tanh",f:x=>Math.tanh(x),color:"#10B981",desc:"Squashes to (-1,1). Zero-centered."},
      {name:"LeakyReLU",f:x=>x>0?x:0.1*x,color:"#F59E0B",desc:"Fixes 'dying ReLU' with small negative slope."},
    ];
    const steps=[{t:"Activation Functions",s:"Non-linearity makes deep learning work",v:()=>(
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-2">{fns.map((f,i)=><button key={i} onClick={()=>setFn(i)} className={`px-3 py-1.5 rounded-lg text-xs font-medium ${fn===i?'text-white':'bg-gray-700 text-gray-400'}`} style={fn===i?{background:f.color}:{}}>{f.name}</button>)}</div>
        <svg viewBox="0 0 300 200" className="w-full max-w-sm bg-gray-800/50 rounded-xl">
          <line x1="0" y1="100" x2="300" y2="100" stroke="#374151" strokeWidth="1"/><line x1="150" y1="0" x2="150" y2="200" stroke="#374151" strokeWidth="1"/>
          <path d={Array.from({length:61},(_,i)=>{const x=-3+i*0.1;const y=fns[fn].f(x);const sx=150+x*40;const sy=100-y*40;return(i===0?"M":"L")+` ${sx} ${Math.max(5,Math.min(195,sy))}`;}).join(" ")} fill="none" stroke={fns[fn].color} strokeWidth="3"/>
        </svg>
        <div className="text-sm text-center" style={{color:fns[fn].color}}>{fns[fn].desc}</div>
        <div className="text-xs text-gray-500 text-center max-w-md">Without activation functions, stacking layers is just linear transformations.</div>
      </div>
    )}];
    return <LessonShell steps={steps} step={step} setStep={setStep} anim={anim} onComplete={onComplete}/>;
  }

  // ─── 5.3 Multi-Layer Networks ───
  if(moduleId==="5.3"){
    const [activeLayer,setActiveLayer]=useState(-1);
    const layers=[{name:"Input",nodes:3,color:"#3B82F6"},{name:"Hidden 1",nodes:4,color:"#8B5CF6"},{name:"Hidden 2",nodes:4,color:"#EC4899"},{name:"Output",nodes:2,color:"#10B981"}];
    const steps=[{t:"Multi-Layer Neural Networks",s:"Signals flow through layers of neurons",v:()=>(
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-2 mb-2">{["All Layers","Input→H1","H1→H2","H2→Output"].map((l,i)=><button key={i} onClick={()=>setActiveLayer(i-1)} className={`px-2 py-1 rounded text-xs ${activeLayer===i-1?'bg-purple-600 text-white':'bg-gray-700 text-gray-400'}`}>{l}</button>)}</div>
        <svg viewBox="0 0 400 200" className="w-full max-w-lg">
          {layers.map((layer,li)=>{
            const x=50+li*100;
            return layer.nodes?Array.from({length:layer.nodes},(_,ni)=>{
              const y=100-(layer.nodes-1)*20+ni*40;
              const isActive=activeLayer===-1||activeLayer===li||activeLayer===li-1;
              return(<g key={`${li}-${ni}`}>
                <circle cx={x} cy={y} r="14" fill={layer.color} opacity={isActive?0.9:0.2}/>
                {li<layers.length-1&&Array.from({length:layers[li+1].nodes},(_,nj)=>{
                  const nx=50+(li+1)*100;const ny=100-(layers[li+1].nodes-1)*20+nj*40;
                  const connActive=activeLayer===-1||activeLayer===li;
                  return<line key={`w${li}-${ni}-${nj}`} x1={x+14} y1={y} x2={nx-14} y2={ny} stroke={layer.color} strokeWidth={connActive?1.5:0.5} opacity={connActive?0.4:0.1}/>;
                })}
              </g>);
            }):null;
          })}
          {layers.map((l,i)=><text key={i} x={50+i*100} y="195" fill="#888" fontSize="8" textAnchor="middle">{l.name}</text>)}
        </svg>
        <div className="text-xs text-gray-400 text-center max-w-md">Each connection has a <span className="text-yellow-400">weight</span>. Data flows forward through layers, with each neuron applying <span className="text-purple-400">weights + bias + activation</span>.</div>
      </div>
    )}];
    return <LessonShell steps={steps} step={step} setStep={setStep} anim={anim} onComplete={onComplete}/>;
  }

  // ─── 5.7 CNNs ───
  if(moduleId==="5.7"){
    const [filterPos,setFilterPos]=useState(0);
    const img=[[1,0,1,0,1],[0,1,0,1,0],[1,0,1,0,1],[0,1,0,1,0],[1,0,1,0,1]];
    const filter=[[1,0,-1],[1,0,-1],[1,0,-1]];
    const maxPos=2;
    const row=Math.floor(filterPos/(maxPos+1));const col=filterPos%(maxPos+1);
    let convVal=0;for(let i=0;i<3;i++)for(let j=0;j<3;j++)convVal+=img[row+i][col+j]*filter[i][j];
    const steps=[{t:"CNNs — Convolution",s:"A filter slides across the image detecting patterns",v:()=>(
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-6">
          <div className="text-center">
            <div className="text-xs text-gray-500 mb-1">Input Image (5×5)</div>
            <div className="grid gap-px" style={{gridTemplateColumns:"repeat(5, 1fr)"}}>
              {img.flatMap((r,i)=>r.map((v,j)=>{
                const inFilter=i>=row&&i<row+3&&j>=col&&j<col+3;
                return<div key={`${i}-${j}`} className="w-8 h-8 flex items-center justify-center text-xs font-mono" style={{background:inFilter?"#8B5CF644":"#1f2937",color:v?"#3B82F6":"#4B5563",border:inFilter?"1px solid #8B5CF6":"1px solid #374151"}}>{v}</div>;
              }))}
            </div>
          </div>
          <div className="text-xl text-yellow-400">*</div>
          <div className="text-center">
            <div className="text-xs text-gray-500 mb-1">Filter (3×3)</div>
            <div className="grid gap-px" style={{gridTemplateColumns:"repeat(3, 1fr)"}}>
              {filter.flatMap((r,i)=>r.map((v,j)=><div key={`f${i}-${j}`} className="w-8 h-8 flex items-center justify-center text-xs font-mono rounded" style={{background:"#8B5CF622",color:v>0?"#10B981":v<0?"#EF4444":"#4B5563",border:"1px solid #8B5CF644"}}>{v}</div>))}
            </div>
          </div>
          <div className="text-xl text-yellow-400">=</div>
          <div className="bg-gray-800 rounded-xl p-4 text-center">
            <div className="text-xs text-gray-500 mb-1">Output</div>
            <div className="text-2xl font-bold" style={{color:convVal>0?"#10B981":convVal<0?"#EF4444":"#888"}}>{convVal}</div>
          </div>
        </div>
        <div className="flex gap-2">{Array.from({length:(maxPos+1)*(maxPos+1)},(_,i)=><button key={i} onClick={()=>setFilterPos(i)} className={`w-6 h-6 rounded text-xs ${filterPos===i?'bg-purple-600 text-white':'bg-gray-700 text-gray-400'}`}>{i+1}</button>)}</div>
        <p className="text-xs text-gray-500 text-center max-w-md">The filter slides across the image (click positions above). At each position, it computes a <span className="text-purple-400">dot product</span> to detect features like edges.</p>
      </div>
    )}];
    return <LessonShell steps={steps} step={step} setStep={setStep} anim={anim} onComplete={onComplete}/>;
  }

  // ─── 6.4 Attention ───
  if(moduleId==="6.4"){
    const words=["The","cat","sat","on","the","mat"];
    const [selWord,setSelWord]=useState(1);
    const attn=words.map((_,i)=>{const d=Math.abs(i-selWord);return Math.exp(-d*0.5);});
    const sum=attn.reduce((a,b)=>a+b,0);const norm=attn.map(a=>a/sum);
    const steps=[{t:"Attention Mechanism",s:"How transformers decide what to focus on",v:()=>(
      <div className="flex flex-col items-center gap-4">
        <div className="text-sm text-gray-400 text-center mb-2">Click a word to see what it "attends" to:</div>
        <div className="flex gap-2">{words.map((w,i)=><button key={i} onClick={()=>setSelWord(i)} className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${selWord===i?'bg-purple-600 text-white ring-2 ring-purple-400':'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>{w}</button>)}</div>
        <svg viewBox="0 0 400 120" className="w-full max-w-lg">
          {words.map((w,i)=>{const x=30+i*60;return(<g key={i}>
            {i!==selWord&&<line x1={30+selWord*60} y1="25" x2={x} y2="85" stroke="#8B5CF6" strokeWidth={norm[i]*8} opacity={norm[i]}/>}
            <rect x={x-25} y={80} width="50" height="28" rx="6" fill={selWord===i?"#8B5CF6":"#374151"}/><text x={x} y="98" fill="white" fontSize="10" textAnchor="middle">{w}</text>
            <text x={x} y="75" fill="#F59E0B" fontSize="8" textAnchor="middle">{(norm[i]*100).toFixed(0)}%</text>
          </g>);})}
          <rect x={30+selWord*60-25} y={4} width="50" height="25" rx="6" fill="#8B5CF6" opacity="0.3"/><text x={30+selWord*60} y="20" fill="#8B5CF6" fontSize="9" textAnchor="middle" fontWeight="bold">Query</text>
        </svg>
        <div className="bg-gray-800/80 rounded-xl p-3 font-mono text-xs max-w-lg w-full">
          Attention(<span className="text-purple-400">Q</span>, <span className="text-blue-400">K</span>, <span className="text-green-400">V</span>) = softmax(<span className="text-purple-400">Q</span><span className="text-blue-400">K</span><sup>T</sup> / √d<sub>k</sub>) × <span className="text-green-400">V</span>
        </div>
      </div>
    )}];
    return <LessonShell steps={steps} step={step} setStep={setStep} anim={anim} onComplete={onComplete}/>;
  }

  // ─── 6.5 Transformer Architecture ───
  if(moduleId==="6.5"){
    const [highlight,setHighlight]=useState(0);
    const parts=[{name:"Input Embedding",color:"#3B82F6",desc:"Convert tokens to dense vectors + positional encoding"},
      {name:"Multi-Head Attention",color:"#8B5CF6",desc:"Each head learns different relationships between tokens"},
      {name:"Add & Norm",color:"#06B6D4",desc:"Residual connection + Layer Normalization for stable training"},
      {name:"Feed Forward",color:"#EC4899",desc:"Two linear layers with ReLU: expands then compresses dimensions"},
      {name:"Output",color:"#10B981",desc:"Linear projection + softmax for next-token probabilities"}];
    const steps=[{t:"Transformer Architecture",s:"The model behind GPT, BERT, and modern AI",v:()=>(
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-1 flex-wrap justify-center">{parts.map((p,i)=><button key={i} onClick={()=>setHighlight(i)} className={`px-2 py-1 rounded text-xs ${highlight===i?'text-white':'bg-gray-700 text-gray-400'}`} style={highlight===i?{background:p.color}:{}}>{p.name}</button>)}</div>
        <svg viewBox="0 0 200 280" className="w-full max-w-xs">
          {parts.map((p,i)=>{const y=10+i*55;const isActive=highlight===i;return(<g key={i}>
            <rect x="30" y={y} width="140" height="40" rx="8" fill={p.color} opacity={isActive?0.9:0.2} stroke={isActive?p.color:"none"} strokeWidth="2"/>
            <text x="100" y={y+24} fill="white" fontSize="9" textAnchor="middle" fontWeight={isActive?"bold":"normal"}>{p.name}</text>
            {i<parts.length-1&&<line x1="100" y1={y+40} x2="100" y2={y+55} stroke="#4B5563" strokeWidth="1.5" markerEnd="url(#arrT)"/>}
          </g>);})}
          <defs><marker id="arrT" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#4B5563"/></marker></defs>
          <path d="M 25 120 C 10 120 10 65 25 65" fill="none" stroke="#06B6D4" strokeWidth="1" strokeDasharray="3" opacity="0.5"/>
          <text x="8" y="95" fill="#06B6D4" fontSize="6" transform="rotate(-90 8 95)">skip</text>
        </svg>
        <div className="bg-gray-800 rounded-xl p-3 text-center max-w-sm" style={{borderLeft:`3px solid ${parts[highlight].color}`}}>
          <div className="text-sm font-semibold text-gray-200">{parts[highlight].name}</div>
          <div className="text-xs text-gray-400 mt-1">{parts[highlight].desc}</div>
        </div>
        <p className="text-xs text-gray-500 text-center max-w-md">This single encoder block is stacked 6-96 times. GPT-3 has 96 layers, each with multi-head attention and feed-forward networks.</p>
      </div>
    )}];
    return <LessonShell steps={steps} step={step} setStep={setStep} anim={anim} onComplete={onComplete}/>;
  }

  // ─── 7.4 RAG Pipeline ───
  if(moduleId==="7.4"){
    const [ragStep,setRagStep]=useState(0);
    const ragSteps=[
      {label:"1. Chunk",icon:"📄",color:"#3B82F6",desc:"Split documents into small, overlapping chunks"},
      {label:"2. Embed",icon:"🔢",color:"#8B5CF6",desc:"Convert chunks to vector embeddings"},
      {label:"3. Store",icon:"💾",color:"#06B6D4",desc:"Store vectors in a vector database"},
      {label:"4. Query",icon:"❓",color:"#F59E0B",desc:"User asks a question → embed it"},
      {label:"5. Retrieve",icon:"🔍",color:"#EC4899",desc:"Find most similar chunks via cosine similarity"},
      {label:"6. Generate",icon:"🤖",color:"#10B981",desc:"LLM answers using retrieved context"},
    ];
    const steps=[{t:"RAG Pipeline",s:"Retrieval Augmented Generation — give LLMs your data",v:()=>(
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-1 flex-wrap justify-center">{ragSteps.map((s,i)=><button key={i} onClick={()=>setRagStep(i)} className={`px-2 py-1 rounded text-xs font-medium transition-all ${ragStep===i?'text-white':'bg-gray-700 text-gray-400'}`} style={ragStep===i?{background:s.color}:{}}>{s.label}</button>)}</div>
        <div className="flex items-center gap-1 w-full max-w-lg justify-center">
          {ragSteps.map((s,i)=><React.Fragment key={i}>
            <div className={`flex flex-col items-center p-2 rounded-xl transition-all ${ragStep===i?'scale-110':ragStep>i?'opacity-60':'opacity-30'}`} style={{minWidth:50}}>
              <div className="text-2xl mb-1">{s.icon}</div>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{background:ragStep>=i?s.color+"33":"#1f2937"}}><div className="w-6 h-6 rounded" style={{background:ragStep>=i?s.color:"#374151"}}/></div>
            </div>
            {i<5&&<ArrowRight size={14} className={`shrink-0 ${ragStep>i?'text-gray-400':'text-gray-700'}`}/>}
          </React.Fragment>)}
        </div>
        <div className="bg-gray-800 rounded-xl p-4 text-center max-w-md" style={{borderLeft:`3px solid ${ragSteps[ragStep].color}`}}>
          <div className="text-lg mb-1">{ragSteps[ragStep].icon}</div>
          <div className="text-sm font-semibold text-gray-200">{ragSteps[ragStep].label}</div>
          <div className="text-xs text-gray-400 mt-1">{ragSteps[ragStep].desc}</div>
        </div>
        <p className="text-xs text-gray-500 text-center max-w-md">RAG solves the "LLMs don't know your private data" problem — retrieve relevant docs and include them in the prompt.</p>
      </div>
    )}];
    return <LessonShell steps={steps} step={step} setStep={setStep} anim={anim} onComplete={onComplete}/>;
  }

  // ─── Fallback ───
  return(
    <div className="flex flex-col items-center justify-center h-full text-center">
      <div className="text-5xl mb-4">🚧</div>
      <h2 className="text-xl font-bold text-gray-200 mb-2">Visual Lesson Coming Soon</h2>
      <p className="text-gray-500 mb-4 text-sm max-w-md">This lesson's interactive visual is being built. You can proceed to the exercise.</p>
      <button onClick={onComplete} className="px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-500 flex items-center gap-2"><ArrowRight size={16}/>Go to Exercise</button>
    </div>
  );
}

function LessonShell({steps,step,setStep,anim,onComplete}){
  return(<div className="h-full flex flex-col">
    <div className="flex items-center justify-between mb-3">
      <div><h2 className="text-lg font-bold text-white">{steps[step].t}</h2><p className="text-gray-500 text-xs">{steps[step].s}</p></div>
      <div className="flex gap-1">{steps.map((_,i)=><div key={i} className={`h-2 rounded-full transition-all ${i===step?'bg-blue-500 w-5':'w-2'} ${i<step?'bg-green-500':'bg-gray-700'}`}/>)}</div>
    </div>
    <div className={`flex-1 flex items-center justify-center transition-all duration-300 ${anim}`}>{steps[step].v()}</div>
    <div className="flex justify-between mt-3 pt-3 border-t border-gray-800">
      <button onClick={()=>step>0&&setStep(step-1)} disabled={step===0} className="flex items-center gap-1 px-4 py-2 rounded-lg bg-gray-800 text-gray-400 hover:bg-gray-700 disabled:opacity-20 text-sm"><ChevronLeft size={14}/>Prev</button>
      {step<steps.length-1?<button onClick={()=>setStep(step+1)} className="flex items-center gap-1 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500 text-sm">Next<ChevronRight size={14}/></button>
      :<button onClick={onComplete} className="flex items-center gap-1 px-5 py-2 rounded-lg bg-green-600 text-white hover:bg-green-500 text-sm font-semibold"><CheckCircle size={14}/>Complete → Exercise</button>}
    </div>
  </div>);
}

// ═══════════════ EVALUATOR ═══════════════
function Evaluator({mid,mname,onScore,onBack,onNext}){
  const [mode,setMode]=useState("code");
  const [code,setCode]=useState("");
  const [resp,setResp]=useState("");
  const [result,setResult]=useState(null);
  const [copied,setCopied]=useState(false);
  const ex=EXERCISES[mid]||{t:mname,p:`Complete the ${mname} exercise with working Python code.`,r:`Code Quality (50): Does the code run correctly and produce expected output?\nCompleteness (30): Are all tasks in the problem addressed?\nClarity (20): Is the code readable with good variable names?`};
  const PASS_SCORE=70;

  const prompt=`You are a friendly coding mentor evaluating a student's Python/ML exercise. Be encouraging but honest.\n\nEXERCISE: ${ex.t}\nMODULE: ${mid} — ${mname}\n\nPROBLEM:\n${ex.p}\n\nSTUDENT CODE:\n\`\`\`python\n${code}\n\`\`\`\n\nEVALUATION CRITERIA:\n${ex.r}\n\nInstructions:\n- Focus on whether the code actually works and solves the problem\n- Give partial credit for attempts that show understanding\n- Be encouraging, not harsh\n- Empty or completely wrong code = 0-30\n- Partial solution = 40-70\n- Working solution with minor issues = 70-84\n- Good working solution = 85-95\n- Excellent solution = 96-100\n\nRESPOND IN THIS EXACT FORMAT:\nSCORE: [number]/100\nFEEDBACK: [2-3 sentences about what works well and what could improve]\nTIP: [one specific improvement suggestion]`;

  const parse=(t)=>{
    try{
      const sm=t.match(/SCORE:\s*(\d+)\s*(?:\/\s*100)?/i);
      if(!sm)return{err:"Could not find a score. Make sure the AI response contains 'SCORE: XX/100'."};
      const sc=Math.min(100,Math.max(0,parseInt(sm[1])));
      const fb=t.match(/FEEDBACK:\s*(.+?)(?=\nTIP:|\n*$)/si);
      const tp=t.match(/TIP:\s*(.+?)$/si);
      return{sc,feedback:fb?fb[1].trim():"",tip:tp?tp[1].trim():"",ok:true};
    }catch(e){return{err:"Could not parse the response. Please paste the full AI response."};}
  };

  const submit=()=>{const r=parse(resp);setResult(r);if(r.ok)onScore(r.sc);setMode("result");};
  const cp=()=>{navigator.clipboard.writeText(prompt);setCopied(true);setTimeout(()=>setCopied(false),2e3);};

  const info=MODULE_INFO[mid];
  const pyUrl="https://www.programiz.com/python-programming/online-compiler/";
  const colabUrl="https://colab.research.google.com/#create=true";

  if(mode==="code")return(<div className="h-full flex flex-col overflow-auto">
    <div className="mb-3 flex items-start justify-between">
      <div><h2 className="text-lg font-bold text-white flex items-center gap-2"><Code size={18}/>Exercise: {ex.t}</h2><p className="text-gray-500 text-xs mt-0.5">Module {mid} • Score {PASS_SCORE}+ to pass</p></div>
      {onBack&&<button onClick={onBack} className="px-3 py-1.5 rounded-lg bg-gray-800 text-gray-400 text-xs hover:bg-gray-700 flex items-center gap-1 shrink-0"><ChevronLeft size={12}/>Back to Learn</button>}
    </div>
    <div className="bg-gray-800/80 rounded-xl p-3 mb-3 text-sm text-gray-300 whitespace-pre-wrap max-h-40 overflow-auto">{ex.p}</div>
    <div className="flex gap-2 mb-3 flex-wrap">
      <a href={pyUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-900/30 border border-green-700/40 text-green-400 text-xs hover:bg-green-900/50 transition-colors"><Play size={12}/>Try in Online Compiler</a>
      <a href={colabUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-yellow-900/30 border border-yellow-700/40 text-yellow-400 text-xs hover:bg-yellow-900/50 transition-colors"><ExternalLink size={12}/>Open Google Colab</a>
    </div>
    <textarea value={code} onChange={e=>setCode(e.target.value)} placeholder="Write your Python code here... (Test it in the online compiler first!)" className="flex-1 min-h-32 bg-gray-900 border border-gray-700 rounded-xl p-3 text-green-300 font-mono text-sm resize-none focus:outline-none focus:border-blue-500" spellCheck={false}/>
    <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-800">
      <span className="text-xs text-gray-600">Write code → Get AI score → {PASS_SCORE}+ to pass</span>
      <button onClick={()=>code.trim()&&setMode("prompt")} disabled={!code.trim()} className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-30 text-sm font-semibold flex items-center gap-1">Generate Prompt<ArrowRight size={14}/></button>
    </div>
  </div>);

  if(mode==="prompt")return(<div className="h-full flex flex-col">
    <div className="mb-2"><h2 className="text-base font-bold text-white flex items-center gap-2"><Clipboard size={16}/>Copy Evaluation Prompt</h2><p className="text-gray-500 text-xs">Paste into Claude, ChatGPT, Gemini, or any AI model</p></div>
    <div className="flex-1 min-h-0 bg-gray-900 border border-gray-700 rounded-xl p-3 overflow-auto"><pre className="text-xs text-gray-400 whitespace-pre-wrap font-mono">{prompt}</pre></div>
    <div className="flex justify-between mt-3 pt-3 border-t border-gray-800">
      <button onClick={()=>setMode("code")} className="px-3 py-2 rounded-lg bg-gray-800 text-gray-400 text-sm flex items-center gap-1"><ChevronLeft size={14}/>Edit Code</button>
      <div className="flex gap-2">
        <button onClick={cp} className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-1 ${copied?'bg-green-600 text-white':'bg-yellow-600 text-white hover:bg-yellow-500'}`}>{copied?<><CheckCircle size={14}/>Copied!</>:<><Copy size={14}/>Copy Prompt</>}</button>
        <button onClick={()=>setMode("paste")} className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold flex items-center gap-1">I Have Response<ArrowRight size={14}/></button>
      </div>
    </div>
  </div>);

  if(mode==="paste")return(<div className="h-full flex flex-col">
    <div className="mb-2"><h2 className="text-base font-bold text-white flex items-center gap-2"><FileText size={16}/>Paste AI Response</h2><p className="text-gray-500 text-xs">Paste the score and feedback from the AI</p></div>
    <textarea value={resp} onChange={e=>setResp(e.target.value)} placeholder={"Paste the AI's response here...\n\nExample format:\nSCORE: 88/100\nFEEDBACK: Great work! Your code...\nTIP: Consider adding..."} className="flex-1 min-h-0 bg-gray-900 border border-gray-700 rounded-xl p-3 text-gray-200 font-mono text-sm resize-none focus:outline-none focus:border-blue-500"/>
    <div className="flex justify-between mt-3 pt-3 border-t border-gray-800">
      <button onClick={()=>setMode("prompt")} className="px-3 py-2 rounded-lg bg-gray-800 text-gray-400 text-sm flex items-center gap-1"><ChevronLeft size={14}/>Back</button>
      <button onClick={submit} disabled={!resp.match(/SCORE:\s*\d+/i)} className="px-5 py-2 rounded-lg bg-green-600 text-white text-sm font-semibold disabled:opacity-30 flex items-center gap-1"><CheckCircle size={14}/>Submit</button>
    </div>
  </div>);

  return(<div className="h-full overflow-auto">
    {result.err?(<div className="bg-red-900/30 border border-red-600/50 rounded-xl p-5">
      <div className="flex items-center gap-2 text-red-400 font-semibold mb-2"><XCircle size={18}/>Parse Error</div>
      <p className="text-red-300 text-sm">{result.err}</p>
      <button onClick={()=>{setResult(null);setMode("paste");}} className="mt-3 px-4 py-1.5 rounded-lg bg-red-800 text-white text-sm">Try Again</button>
    </div>):(<>
      <div className={`rounded-xl p-5 mb-4 text-center ${result.sc>=PASS_SCORE?'bg-green-900/30 border border-green-600/40':'bg-yellow-900/30 border border-yellow-600/40'}`}>
        <div className="text-5xl font-black mb-2" style={{color:result.sc>=PASS_SCORE?'#10B981':result.sc>=60?'#F59E0B':'#EF4444'}}>{result.sc}/100</div>
        <div className="w-full max-w-xs mx-auto h-2 bg-gray-700 rounded-full mb-2"><div className="h-full rounded-full transition-all" style={{width:`${result.sc}%`,background:result.sc>=PASS_SCORE?'#10B981':result.sc>=60?'#F59E0B':'#EF4444'}}/></div>
        <div className="text-xs text-gray-500 mb-1">{result.sc>=96?'⭐ Excellent Solution':result.sc>=85?'🌟 Great Solution':result.sc>=70?'✅ Working Solution':result.sc>=40?'🔧 Partial Solution':'📝 Needs Work'}</div>
        <div className={`text-sm font-semibold ${result.sc>=PASS_SCORE?'text-green-400':result.sc>=50?'text-yellow-400':'text-red-400'}`}>{result.sc>=PASS_SCORE?'🎉 Passed! Great work!':result.sc>=50?`💪 Almost there! Need ${PASS_SCORE} to pass`:'📝 Keep practicing! Review the lesson and try again'}</div>
      </div>
      {result.feedback&&<div className="bg-gray-800/80 rounded-lg p-4 mb-3"><div className="text-xs font-semibold text-gray-300 mb-1.5">📋 Feedback</div><p className="text-sm text-gray-400">{result.feedback}</p></div>}
      {result.tip&&<div className="bg-blue-900/20 border border-blue-800/40 rounded-lg p-4 mb-3"><div className="text-xs font-semibold text-blue-300 mb-1.5">💡 Tip to Improve</div><p className="text-sm text-blue-200/70">{result.tip}</p></div>}
      {result.sc>=PASS_SCORE&&onNext&&<button onClick={onNext} className="w-full mt-3 px-4 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold flex items-center justify-center gap-2 hover:bg-blue-500"><ArrowRight size={14}/>Next Module</button>}
      {result.sc<PASS_SCORE&&<button onClick={()=>{setResult(null);setResp("");setMode("code");}} className="w-full mt-3 px-4 py-2.5 rounded-lg bg-yellow-600 text-white text-sm font-semibold flex items-center justify-center gap-2"><RefreshCw size={14}/>Try Again</button>}
    </>)}
  </div>);
}

// ═══════════════ CERTIFICATE ═══════════════
function Certificate({tier,name,date,modules,avgScore}){
  const tiers={
    "bronze":{icon:"🥉",title:"ML Foundations",color:"#CD7F32",req:"Phases 1-3"},
    "silver":{icon:"🥈",title:"ML Practitioner",color:"#C0C0C0",req:"Phase 4 (2+ projects)"},
    "gold":{icon:"🥇",title:"DL Engineer",color:"#FFD700",req:"Phases 5-6"},
    "diamond":{icon:"💎",title:"AI Engineer",color:"#B9F2FF",req:"All phases + capstone"}
  };
  const t=tiers[tier]||tiers.bronze;
  const certId=`NP-${tier.toUpperCase()}-${Date.now().toString(36).toUpperCase()}`;

  return(
    <div className="bg-gray-800/80 rounded-xl border border-gray-700/50 p-6 max-w-lg mx-auto">
      <svg viewBox="0 0 500 350" className="w-full">
        <defs>
          <linearGradient id="certBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1a1a2e"/><stop offset="100%" stopColor="#16213e"/>
          </linearGradient>
          <linearGradient id="certBorder" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={t.color} stopOpacity="0.3"/><stop offset="50%" stopColor={t.color} stopOpacity="0.8"/><stop offset="100%" stopColor={t.color} stopOpacity="0.3"/>
          </linearGradient>
        </defs>
        <rect x="5" y="5" width="490" height="340" rx="16" fill="url(#certBg)"/>
        <rect x="5" y="5" width="490" height="340" rx="16" fill="none" stroke="url(#certBorder)" strokeWidth="2"/>
        <rect x="15" y="15" width="470" height="320" rx="12" fill="none" stroke={t.color} strokeWidth="0.5" opacity="0.3"/>
        <text x="250" y="50" fill={t.color} fontSize="14" textAnchor="middle" fontWeight="bold" opacity="0.6">NEURAPATH</text>
        <text x="250" y="80" fill="white" fontSize="22" textAnchor="middle" fontWeight="bold">Certificate of Achievement</text>
        <text x="250" y="110" fill="#9CA3AF" fontSize="11" textAnchor="middle">This certifies that</text>
        <text x="250" y="140" fill="white" fontSize="20" textAnchor="middle" fontWeight="bold">{name||"Learner"}</text>
        <line x1="150" y1="150" x2="350" y2="150" stroke={t.color} strokeWidth="1" opacity="0.4"/>
        <text x="250" y="175" fill="#9CA3AF" fontSize="11" textAnchor="middle">has successfully completed the</text>
        <text x="250" y="200" fill={t.color} fontSize="18" textAnchor="middle" fontWeight="bold">{t.icon} {t.title}</text>
        <text x="250" y="225" fill="#6B7280" fontSize="10" textAnchor="middle">Requirement: {t.req}</text>
        <text x="130" y="265" fill="#9CA3AF" fontSize="9" textAnchor="middle">Modules: {modules||0}</text>
        <text x="250" y="265" fill="#9CA3AF" fontSize="9" textAnchor="middle">Avg Score: {avgScore||0}/100</text>
        <text x="370" y="265" fill="#9CA3AF" fontSize="9" textAnchor="middle">Date: {date||new Date().toLocaleDateString()}</text>
        <text x="250" y="310" fill="#4B5563" fontSize="8" textAnchor="middle">Certificate ID: {certId}</text>
        <text x="250" y="325" fill="#374151" fontSize="7" textAnchor="middle">Verified by NeuraPath Visual AI Learning Platform</text>
      </svg>
    </div>
  );
}

// ═══════════════ DASHBOARD ═══════════════
function Dashboard({p,onTest,onViewCert}){
  const lv=getLvl(p.xp);const nx=lv.nx?lv.nx.m:p.xp;const pct=lv.nx?((p.xp-lv.m)/(nx-lv.m))*100:100;
  const earned=ACHS.filter(a=>a.ck(p));const total=PHASES.reduce((s,ph)=>s+ph.modules.length,0);const done=(p.cm||[]).length;
  const challenges=["Write a NumPy one-liner to normalize an array to [0,1]","Explain overfitting to a 10-year-old","What does .reshape(-1,1) do?","Why can't a single perceptron learn XOR?","What's the difference between bagging and boosting?","Explain the attention mechanism in one paragraph","When would you use RAG vs fine-tuning?"];
  const today=challenges[new Date().getDay()%challenges.length];

  const certs=[
    {id:"bronze",t:"🥉 ML Foundations",r:"Complete Phases 1-3",d:(p.up||[]).includes(4)},
    {id:"silver",t:"🥈 ML Practitioner",r:"2+ Phase 4 projects",d:["4.1","4.2","4.3","4.4","4.5"].filter(m=>(p.cm||[]).includes(m)).length>=2},
    {id:"gold",t:"🥇 DL Engineer",r:"Complete Phases 5-6",d:(p.up||[]).includes(7)},
    {id:"diamond",t:"💎 AI Engineer",r:"All + capstone 85+",d:(p.cm||[]).includes("8.3")&&(p.sc||{})["8.3"]>=85}
  ];

  return(<div className="space-y-3 overflow-auto h-full pr-1">
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
      {[{l:"Level",v:`${lv.i} ${lv.n}`,c:"#8B5CF6"},{l:"XP",v:p.xp,c:"#3B82F6"},{l:"Streak",v:`🔥 ${p.st||1}d`,c:"#F59E0B"},{l:"Done",v:`${done}/${total}`,c:"#10B981"}].map((s,i)=>(
        <div key={i} className="bg-gray-800/80 rounded-xl p-3 border border-gray-700/50"><div className="text-xs text-gray-500">{s.l}</div><div className="text-lg font-bold mt-0.5" style={{color:s.c}}>{s.v}</div></div>
      ))}
    </div>
    <div className="bg-gray-800/80 rounded-xl p-3 border border-gray-700/50">
      <div className="flex justify-between text-xs mb-1.5"><span className="text-gray-400">→ {lv.nx?.n||"Max"}</span><span className="text-blue-400 font-semibold">{p.xp}/{nx} XP</span></div>
      <div className="w-full h-2.5 bg-gray-700 rounded-full overflow-hidden"><div className="h-full rounded-full bg-gradient-to-r from-blue-600 to-purple-500 transition-all duration-700" style={{width:`${pct}%`}}/></div>
    </div>
    <div className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 rounded-xl p-3 border border-yellow-800/30">
      <div className="flex items-center gap-2 mb-1"><Zap size={14} className="text-yellow-400"/><span className="text-xs font-semibold text-yellow-300">Daily Challenge (+30 XP)</span></div>
      <p className="text-sm text-gray-300">{today}</p>
    </div>
    <div className="bg-gray-800/80 rounded-xl p-3 border border-gray-700/50">
      <h3 className="text-xs font-semibold text-gray-300 mb-2 flex items-center gap-1.5"><Trophy size={14} className="text-yellow-400"/>Achievements ({earned.length}/{ACHS.length})</h3>
      <div className="grid grid-cols-7 gap-1.5">{ACHS.map(a=>{const has=earned.find(e=>e.id===a.id);return(<div key={a.id} title={`${a.nm}: ${a.ds}`} className={`aspect-square rounded-lg flex items-center justify-center text-base transition-all cursor-default ${has?'bg-gray-700 hover:scale-110':'bg-gray-900/80 opacity-25 grayscale'}`}>{a.ic}</div>);})}</div>
    </div>
    <div className="bg-gray-800/80 rounded-xl p-3 border border-gray-700/50">
      <h3 className="text-xs font-semibold text-gray-300 mb-2">Phase Progress</h3>
      {PHASES.map(ph=>{const d=ph.modules.filter(m=>(p.cm||[]).includes(m.id)).length;const pc=ph.modules.length?(d/ph.modules.length)*100:0;const ul=(p.up||[]).includes(ph.id);
        return(<div key={ph.id} className={`mb-1.5 ${!ul?'opacity-30':''}`}><div className="flex justify-between text-xs mb-0.5"><span className="text-gray-400">{ph.icon} P{ph.id}: {ph.title}</span><span className="text-gray-600">{d}/{ph.modules.length}</span></div><div className="w-full h-1 bg-gray-700 rounded-full"><div className="h-full rounded-full transition-all" style={{width:`${pc}%`,background:ph.color}}/></div></div>);
      })}
    </div>
    <div className="bg-gray-800/80 rounded-xl p-3 border border-gray-700/50">
      <h3 className="text-xs font-semibold text-gray-300 mb-2 flex items-center gap-1.5"><Award size={14} className="text-yellow-400"/>Certificates</h3>
      <div className="grid grid-cols-2 gap-2">
        {certs.map(c=>(<div key={c.id} className={`rounded-lg p-2.5 border cursor-pointer transition-all hover:scale-105 ${c.d?'bg-green-900/20 border-green-600/30':'bg-gray-900/50 border-gray-700/30'}`} onClick={()=>c.d&&onViewCert(c.id)}>
          <div className="text-sm font-semibold">{c.t}</div><div className="text-xs text-gray-500">{c.d?<span className="text-green-400">✓ Earned! Click to view</span>:c.r}</div>
        </div>))}
      </div>
    </div>
    <details className="bg-gray-800/80 rounded-xl border border-gray-700/50">
      <summary className="p-3 text-xs font-semibold text-gray-500 cursor-pointer flex items-center gap-1.5 select-none hover:text-gray-400"><Settings size={14}/>Dev Tools (click to expand)</summary>
      <div className="px-3 pb-3">
        <p className="text-xs text-gray-600 mb-2">Simulate progress to test the platform flow.</p>
        <div className="flex gap-2 flex-wrap">
          <button onClick={()=>onTest("module")} className="px-3 py-1.5 rounded-lg bg-blue-600/20 text-blue-400 text-xs font-medium hover:bg-blue-600/30 border border-blue-600/30">+1 Module</button>
          <button onClick={()=>onTest("phase")} className="px-3 py-1.5 rounded-lg bg-green-600/20 text-green-400 text-xs font-medium hover:bg-green-600/30 border border-green-600/30">+1 Phase</button>
          <button onClick={()=>onTest("xp")} className="px-3 py-1.5 rounded-lg bg-purple-600/20 text-purple-400 text-xs font-medium hover:bg-purple-600/30 border border-purple-600/30">+100 XP</button>
          <button onClick={()=>onTest("ach")} className="px-3 py-1.5 rounded-lg bg-yellow-600/20 text-yellow-400 text-xs font-medium hover:bg-yellow-600/30 border border-yellow-600/30">Achievement</button>
          <button onClick={()=>onTest("score95")} className="px-3 py-1.5 rounded-lg bg-pink-600/20 text-pink-400 text-xs font-medium hover:bg-pink-600/30 border border-pink-600/30">Score 95</button>
          <button onClick={()=>onTest("full")} className="px-3 py-1.5 rounded-lg bg-red-600/20 text-red-400 text-xs font-medium hover:bg-red-600/30 border border-red-600/30">Full Demo</button>
        </div>
      </div>
    </details>
  </div>);
}

// ═══════════════ MAIN APP ═══════════════
const allMods = PHASES.flatMap(ph=>ph.modules);

export default function App(){
  const[p,setP]=useState(defP);
  const[loaded,setLoaded]=useState(false);
  const[view,setView]=useState("dashboard");
  const[curMod,setCurMod]=useState(null);
  const[sidebar,setSidebar]=useState(true);
  const[expPhase,setExpPhase]=useState(1);
  const[lessonDone,setLessonDone]=useState(false);
  const[toast,setToast]=useState(null);
  const[certView,setCertView]=useState(null);

  useEffect(()=>{try{const raw=localStorage.getItem("np:progress");if(raw){const d=JSON.parse(raw);const today=new Date().toDateString();const yest=new Date(Date.now()-864e5).toDateString();if(d.ll!==today){d.st=d.ll===yest?(d.st||1)+1:1;d.ll=today;}const hr=new Date().getHours();if(hr>=23||hr<4)d.no=true;if(hr>=4&&hr<7)d.eb=true;setP(d);}}catch(e){}setLoaded(true);},[]);

  const save=useCallback((np: any)=>{setP(np);try{localStorage.setItem("np:progress",JSON.stringify(np));}catch(e){}},[]);

  const showToast=(msg)=>{setToast(msg);setTimeout(()=>setToast(null),3000);};

  const updP=(fn)=>{
    const np={...p};fn(np);
    const newA=ACHS.filter(a=>a.ck(np)&&!(np.ach||[]).includes(a.id));
    if(newA.length){np.ach=[...(np.ach||[]),...newA.map(a=>a.id)];showToast(`🏆 Achievement: ${newA[0].nm}!`);}
    save(np);
  };

  const completeModule=(id)=>updP(np=>{
    if(!(np.cm||[]).includes(id)){np.cm=[...(np.cm||[]),id];np.xp=(np.xp||0)+25;}
    PHASES.forEach(ph=>{if(ph.modules.every(m=>(np.cm||[]).includes(m.id))&&!(np.up||[]).includes(ph.id+1)&&ph.id<8){np.up=[...(np.up||[1]),ph.id+1];np.xp+=200;showToast(`🔓 Phase ${ph.id+1} Unlocked!`);}});
  });

  const handleScore=(mid,sc)=>updP(np=>{
    np.sc={...(np.sc||{}),[mid]:Math.max(sc,(np.sc||{})[mid]||0)};
    if(sc>=70&&!(np.cm||[]).includes(mid)){np.cm=[...(np.cm||[]),mid];np.xp=(np.xp||0)+50;}
    PHASES.forEach(ph=>{if(ph.modules.every(m=>(np.cm||[]).includes(m.id))&&!(np.up||[]).includes(ph.id+1)&&ph.id<8){np.up=[...(np.up||[1]),ph.id+1];np.xp+=200;}});
  });

  const testRun=(type)=>{
    if(type==="xp")updP(np=>{np.xp=(np.xp||0)+100;});
    if(type==="module"){const next=allMods.find(m=>!(p.cm||[]).includes(m.id)&&(p.up||[]).includes(PHASES.find(ph=>ph.modules.includes(m))?.id));if(next)completeModule(next.id);else showToast("All unlocked modules completed!");}
    if(type==="phase"){const nextP=PHASES.find(ph=>!(p.up||[]).includes(ph.id));if(nextP)updP(np=>{np.up=[...(np.up||[1]),nextP.id];np.xp+=200;});else showToast("All phases unlocked!");}
    if(type==="ach"){const notEarned=ACHS.find(a=>!(p.ach||[]).includes(a.id));if(notEarned)updP(np=>{np.ach=[...(np.ach||[]),notEarned.id];});else showToast("All achievements earned!");}
    if(type==="score95")updP(np=>{np.sc={...(np.sc||{}),"1.1":95};if(!(np.cm||[]).includes("1.1"))np.cm=[...(np.cm||[]),"1.1"];np.xp=(np.xp||0)+50;});
    if(type==="full"){updP(np=>{
      np.up=[1,2,3,4,5,6,7,8];np.xp=1850;np.st=7;
      np.cm=["1.1","1.2","1.3","1.4","1.5","1.6","1.7","1.8","1.9","2.1","2.2","2.3","2.4","2.5","2.6","2.7","2.8","2.9","3.1","3.2","3.3","3.4","3.5","3.6","3.7","3.8","3.9","3.10","3.11","3.12","3.13","3.14","4.1","4.2","5.1","5.2","5.3","6.4","6.5","7.4"];
      np.sc={"1.1":92,"1.2":88,"1.3":90,"2.5":85,"3.4":90,"3.6":87,"3.10":91,"5.1":88,"6.4":95,"7.4":82,"4.1":86,"4.2":84};
      np.ach=["first","sharp","data","math","streak7","desi","speed"];np.no=true;
      showToast("🚀 Demo loaded! Explore the full platform.");
    });}
  };

  const openMod=(mod,pid)=>{if(!(p.up||[]).includes(pid))return;setCurMod({...mod,pid});setLessonDone(false);setView("lesson");setExpPhase(pid);setCertView(null);};
  const isDone=id=>(p.cm||[]).includes(id);
  const lv=getLvl(p.xp);

  const avgScore=()=>{const scores=Object.values(p.sc||{});return scores.length?Math.round(scores.reduce((a,b)=>a+b,0)/scores.length):0;};

  if(!loaded)return<div className="min-h-screen bg-gray-950 flex items-center justify-center"><div className="text-center"><div className="text-4xl animate-pulse mb-2">🧠</div><div className="text-gray-500 text-sm">Loading NeuraPath...</div></div></div>;

  return(
    <div className="min-h-screen bg-gray-950 text-white flex flex-col" style={{height:"100vh"}}>
      {toast&&<div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-gray-800 border border-gray-600 rounded-xl px-5 py-3 shadow-2xl text-sm font-semibold text-yellow-300 animate-bounce">{toast}</div>}
      <header className="bg-gray-900/90 backdrop-blur border-b border-gray-800 px-3 py-2 flex items-center justify-between shrink-0 z-40">
        <div className="flex items-center gap-2">
          <button onClick={()=>setSidebar(!sidebar)} className="p-1.5 rounded-lg hover:bg-gray-800"><Menu size={16}/></button>
          <span className="text-lg">🧠</span><span className="font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">NeuraPath</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1.5 bg-gray-800 rounded-full px-2.5 py-1"><Flame size={12} className="text-orange-400"/><span className="text-xs font-semibold text-orange-300">{p.st||1}d</span></div>
          <div className="flex items-center gap-1.5 bg-gray-800 rounded-full px-2.5 py-1"><Zap size={12} className="text-yellow-400"/><span className="text-xs font-semibold text-yellow-300">{p.xp}</span></div>
          <div className="flex items-center gap-1 bg-gray-800 rounded-full px-2.5 py-1"><span className="text-sm">{lv.i}</span><span className="text-xs font-semibold text-purple-300">{lv.n}</span></div>
        </div>
      </header>
      <div className="flex flex-1 min-h-0">
        <aside className={`${sidebar?'w-56':'w-0'} transition-all duration-300 bg-gray-900/80 border-r border-gray-800 overflow-hidden shrink-0 flex flex-col z-30`}>
          <div className="w-56 flex flex-col h-full">
            <div className="p-2 border-b border-gray-800">
              <button onClick={()=>{setView("dashboard");setCurMod(null);setCertView(null);}} className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${view==='dashboard'&&!certView?'bg-blue-600/20 text-blue-400':'text-gray-400 hover:bg-gray-800'}`}><Home size={14}/>Dashboard</button>
            </div>
            <div className="flex-1 overflow-auto p-1.5 space-y-px text-xs">
              {PHASES.map(ph=>{const ul=(p.up||[]).includes(ph.id);const exp=expPhase===ph.id;
                return(<div key={ph.id}>
                  <button onClick={()=>ul&&setExpPhase(exp?null:ph.id)} className={`w-full flex items-center gap-1.5 px-2 py-1.5 rounded-lg ${!ul?'opacity-30 cursor-not-allowed':'hover:bg-gray-800'}`}>
                    {ul?(exp?<ChevronDown size={12}/>:<ChevronRight size={12}/>):<Lock size={10} className="text-gray-600"/>}
                    <span>{ph.icon}</span><span className={`flex-1 text-left truncate ${ul?'text-gray-300':'text-gray-600'}`}>P{ph.id}: {ph.title}</span>
                  </button>
                  {exp&&ul&&<div className="ml-3 space-y-px mb-1">{ph.modules.map(mod=>(
                    <button key={mod.id} onClick={()=>openMod(mod,ph.id)} className={`w-full flex items-center gap-1.5 px-2 py-1 rounded text-left ${curMod?.id===mod.id?'bg-blue-600/20 text-blue-400':'text-gray-500 hover:text-gray-300 hover:bg-gray-800/50'}`}>
                      {isDone(mod.id)?<CheckCircle size={10} className="text-green-500 shrink-0"/>:mod.type==="project"?<Database size={10} className="shrink-0 text-yellow-500"/>:<BookOpen size={10} className="shrink-0"/>}
                      <span className="truncate">{mod.title}</span>
                    </button>
                  ))}</div>}
                </div>);
              })}
            </div>
            <div className="p-2 border-t border-gray-800">
              <button onClick={()=>{if(confirm("Reset all progress?")){try{localStorage.removeItem("np:progress")}catch(e){}setP({...defP});setView("dashboard");setCurMod(null);setCertView(null);}}} className="w-full text-xs text-gray-600 hover:text-red-400 py-1">Reset Progress</button>
            </div>
          </div>
        </aside>
        <main className="flex-1 min-w-0 p-3 overflow-auto">
          {view==="dashboard"&&!certView&&<Dashboard p={p} onTest={testRun} onViewCert={(tier)=>{setCertView(tier);setView("dashboard");}}/>}
          {certView&&(
            <div className="h-full flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <button onClick={()=>setCertView(null)} className="px-3 py-1.5 rounded-lg bg-gray-800 text-gray-400 text-sm flex items-center gap-1"><ChevronLeft size={14}/>Back to Dashboard</button>
                <h2 className="text-lg font-bold text-white">Your Certificate</h2>
              </div>
              <div className="flex items-center gap-2 mb-4 max-w-lg mx-auto w-full">
                <label className="text-xs text-gray-400 shrink-0">Your Name:</label>
                <input value={p.name||""} onChange={e=>save({...p,name:e.target.value})} placeholder="Enter your name for the certificate" className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-blue-500"/>
              </div>
              <Certificate tier={certView} name={p.name||"NeuraPath Learner"} date={new Date().toLocaleDateString()} modules={(p.cm||[]).length} avgScore={avgScore()}/>
              <p className="text-center text-xs text-gray-500 mt-4">Right-click the certificate to save as image, or take a screenshot to share.</p>
            </div>
          )}
          {view==="lesson"&&curMod&&(
            <div className="h-full flex flex-col">
              <div className="flex items-center gap-2 mb-2 pb-2 border-b border-gray-800 flex-wrap">
                <span className="text-xs text-gray-600 bg-gray-800 px-2 py-0.5 rounded">{curMod.id}</span>
                <span className="text-sm font-semibold text-gray-200">{curMod.title}</span>
                {isDone(curMod.id)&&<span className="text-xs text-green-400 bg-green-900/30 px-2 py-0.5 rounded flex items-center gap-1"><CheckCircle size={10}/>Done</span>}
                {(p.sc||{})[curMod.id]&&<span className="text-xs text-blue-400 bg-blue-900/30 px-2 py-0.5 rounded">Best: {p.sc[curMod.id]}/100</span>}
              </div>
              {!lessonDone&&curMod.hasVisual?(
                <VisualLesson moduleId={curMod.id} onComplete={()=>{setLessonDone(true);updP(np=>{np.xp=(np.xp||0)+10;});showToast("+10 XP — Lesson complete!");}}/>
              ):!lessonDone?(
                <div className="flex-1 overflow-auto">
                  <div className="max-w-2xl mx-auto">
                    <div className="text-center mb-6">
                      <div className="text-5xl mb-3">{curMod.type==="project"?"📊":"📖"}</div>
                      <h2 className="text-xl font-bold text-gray-200 mb-2">{curMod.title}</h2>
                    </div>
                    {MODULE_INFO[curMod.id]&&(<>
                      <div className="bg-gray-800/60 rounded-xl p-4 mb-4">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2 flex items-center gap-1.5"><BookOpen size={14}/>What is this?</h3>
                        <p className="text-gray-300 text-sm leading-relaxed">{MODULE_INFO[curMod.id].d}</p>
                      </div>
                      <div className="bg-gray-800/60 rounded-xl p-4 mb-4">
                        <h3 className="text-sm font-semibold text-purple-400 mb-3 flex items-center gap-1.5"><ExternalLink size={14}/>Learn More</h3>
                        <div className="grid gap-2">
                          {MODULE_INFO[curMod.id].links.map((lk,i)=>(<a key={i} href={lk.u} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-900/60 hover:bg-gray-700/60 transition-colors text-sm text-gray-300 hover:text-white"><ExternalLink size={12} className="text-gray-500 shrink-0"/><span>{lk.n}</span></a>))}
                        </div>
                      </div>
                    </>)}
                    <div className="bg-gray-800/60 rounded-xl p-4 mb-4">
                      <h3 className="text-sm font-semibold text-green-400 mb-3 flex items-center gap-1.5"><Play size={14}/>Practice Environment</h3>
                      <p className="text-gray-500 text-xs mb-3">Test your code before submitting:</p>
                      <div className="flex gap-2 flex-wrap">
                        <a href="https://www.programiz.com/python-programming/online-compiler/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-green-900/30 border border-green-700/40 text-green-400 text-sm hover:bg-green-900/50 transition-colors"><Play size={14}/>Online Python Compiler</a>
                        <a href="https://colab.research.google.com/#create=true" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-yellow-900/30 border border-yellow-700/40 text-yellow-400 text-sm hover:bg-yellow-900/50 transition-colors"><ExternalLink size={14}/>Google Colab Notebook</a>
                      </div>
                    </div>
                    <div className="text-center pt-2">
                      {curMod.hasEx?<button onClick={()=>setLessonDone(true)} className="px-6 py-3 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-500 flex items-center gap-2 mx-auto shadow-lg shadow-blue-600/20">{curMod.type==="project"?<><Play size={16}/>Start Project</>:<><Code size={16}/>Start Exercise</>}</button>
                      :<button onClick={()=>{completeModule(curMod.id);showToast("+25 XP ✓");}} className="px-6 py-3 rounded-xl bg-green-600 text-white text-sm font-semibold hover:bg-green-500 flex items-center gap-2 mx-auto shadow-lg shadow-green-600/20"><CheckCircle size={16}/>Mark Complete</button>}
                    </div>
                  </div>
                </div>
              ):(
                <Evaluator mid={curMod.id} mname={curMod.title} onBack={()=>setLessonDone(false)} onNext={()=>{
                  const phase=PHASES.find(ph=>ph.modules.some(m=>m.id===curMod.id));
                  if(phase){const idx=phase.modules.findIndex(m=>m.id===curMod.id);
                    if(idx<phase.modules.length-1){openMod(phase.modules[idx+1],phase.id);}
                    else{const nextP=PHASES.find(ph=>ph.id===phase.id+1&&(p.up||[]).includes(ph.id));
                      if(nextP&&nextP.modules.length)openMod(nextP.modules[0],nextP.id);
                      else showToast("🎉 Phase complete! Unlock the next phase to continue.");}}
                }} onScore={sc=>{handleScore(curMod.id,sc);if(sc>=70)showToast(`✅ ${curMod.title} — ${sc}/100`);}}/>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

# Grocery-Genius
Grocery-Genius is an AI-powered solution designed for retail environments, including stores, malls, and marketplaces. It integrates advanced analytics, automation, conversational AI, and robust data processing to improve inventory management, enhance customer experience, and drive better sales. The platform utilizes Kestra for efficient data workflows, Chatbase.co for AI chat implementation, and includes features like billing, sales data tracking, AI-driven product suggestions, and an intelligent chat interface.

# Features
1. Billing System
   
  -> Seamless billing interface to process transactions quickly and efficiently.
  
  -> Real-time data recording for every purchase.
  
2.AI Chat (Powered by Chatbase.co)

  ->AI trained using a custom database created through Kestra data flows.
  
  ->Intelligent chat assistant to provide real-time help and recommendations.
  
  ->Enables users to query sales trends, stock suggestions, and system operations.
  
  ->Built using Chatbase.co for enhanced conversational capabilities.
  
3. Dynamic Data Processing with Kestra
   
  ->Advanced data workflows handled by Kestra for high efficiency and scalability.
  
  ->Integration of data pipelines for streamlined sales analysis and insights.
  
5. Interactive Dashboard
   
  ->Easy-to-navigate user interface.

  ->Dedicated sections for Billing, AI insights, and AI Chat.

7. Dynamic Data Management
   
  ->Add, edit, and delete market data easily using an intuitive modal table.
  
  ->Data saved securely in a SQLite database.
  
9. Graphical Analysis (Coming Soon)
    
  ->Visualize sales trends and predictions via dynamic graphs.
  
  ->Insights to make data-driven decisions.

# Installation:
Prerequisites
Python 3.8 or higher
Flask
SQLite
Kestra
Basic knowledge of HTML, CSS, and JavaScript

Steps
1.Clone the repository:

```git clone https://github.com/yourusername/grocery-genius.git```
 
2.Navigate to the project directory:

```cd grocery-genius```
 
3.Install the required Python packages:

```pip install -r requirements.txt```

4.Start the Flask server:

```python app.py```

Open your browser and go to http://localhost:5000.

Set up Kestra for data workflows. Refer to the official Kestra documentation for installation and configuration.

# Folder Structure
grocery-genius/  
├── backend/  
│   ├── app.py           # Flask backend  
│   ├── database.db      # SQLite database  
|  
├── frontend/  
│   ├── index.html # Main interface
      ├──ai chat bot  #chatbase.co
│   ├── analysis.html    # Analysis page       
│   ├── style.css        # Styling  
│   ├── script.js        # JavaScript functionalities  
├── README.md            # Project documentation  
└── assets/  
    ├── images/   


# Technologies Used

Frontend: HTML5, CSS3, JavaScript

Backend: Flask, Python

Database: SQLite

Data Processing: Kestra

AI Chat: Chatbase.co

AI Training: Custom database built with Kestra data flows

AI Insights: Trend analysis using Python libraries (pandas, scikit-learn,k-nearest neighbour)

# Future Enhancements

Advanced AI chat capabilities for voice interaction.

Real-time integration with external APIs for advanced seasonal trend analysis.

Multi-store management capabilities.

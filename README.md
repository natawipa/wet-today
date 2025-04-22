# Wet Today

## Team Members

- **Natawipa Poonyakariyakorn 6610545278**
- **Swischya Sunthonphusit 6610545952**  
  Department of Computer Engineering, Faculty of Engineering, Kasetsart University.

## Project Overview

This project focuses on analyzing past weather records—such as temperature, humidity, and rainfall—to help users understand historical trends. The website provides recorded data that allows users to determine things like: “How often did it rain last month?”, “Was humidity unusually high during a given period?”, or “Is there a correlation between temperature and humidity?” This is useful for analyzing past climate data.

### Features

- Real-time weather data display, including temperature, humidity, and wind speed.
- Comparison of humidity and rainfall data from multiple sources (KB and TMD).
- Interactive line graphs with dynamic point coloring based on rainfall.
- Alerts for high humidity levels to assist individuals with respiratory conditions.
- Responsive design for seamless use across devices.

## Required Libraries and Tools

### Backend

- **Python** (version 3.x)
- Required Python libraries:
  - Flask
  - Requests

### Frontend

- **Node.js** (version 14.x or higher)
- **npm** (Node Package Manager)
- Required npm libraries:
  - `react`
  - `react-chartjs-2`
  - `chart.js`
  - `chartjs-adapter-date-fns`

## How to Build and Run the Application

### Backend

1. Navigate to the backend directory:

   ```bash
   cd back
   ```

2. Start the backend server:
   ```bash
   python3 app.py
   ```

### Frontend

1. Navigate to the frontend directory:
   ```bash
   cd front
   ```
2. Install the required npm dependencies:
   ```bash
   npm install
   ```
3. Start the frontend application:
   ```bash
   npm start
   ```

### Notes

- Ensure the backend is running before starting the frontend.
- The frontend will run on `http://localhost:3000`, and the backend will run on a different port (e.g., `http://localhost:5000`).

## GitHub Repository

[GitHub Repository Link](https://github.com/natawipa/wet-today.git)

### Instructions for Building and Running

1. Clone the repository:
   ```bash
   git clone https://github.com/natawipa/wet-today.git
   ```
2. Follow the steps in the **How to Build and Run the Application** section to set up the backend and frontend.

## Troubleshooting

- If you encounter issues with missing dependencies, run `npm install` in the `front` directory or ensure all Python dependencies are installed for the backend.
- Check the console logs for detailed error messages and resolve them accordingly.

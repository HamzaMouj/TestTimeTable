# Interactive Schedule Table

## Overview

This project is an interactive schedule table application built with Vue.js (frontend) and Node.js (backend). It allows users to move and resize schedule blocks, create new blocks, and fetch/update data from a NoSQL database. The application is Dockerized for easy deployment.

## Features

- Movable and resizable schedule blocks.
- Popup for creating new blocks.
- Disabled weekends.
- Data management with a NoSQL database (MongoDB).
- Dockerized setup for both frontend and backend.

## Prerequisites

- Node.js and npm installed. (I am using 16.13.0)
- Docker and Docker Compose installed.
- MoongoDBCompass should be installed too.

## Setup

### 1. Clone the Repository


git clone https://github.com/HamzaMouj/TestTimeTable.git
cd TestTimeTable

### 2.A. Frontend Setup

cd frontend
npm install

### 2.B. Backend Setup

cd backend
npm install

### 3. Running the App 

docker-compose up --build 

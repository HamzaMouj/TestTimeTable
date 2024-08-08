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

- Node.js and npm installed.
- Docker and Docker Compose installed.

## Setup

### 1. Clone the Repository


git clone https://github.com/yourusername/schedule-app.git
cd schedule-app

### 2.A. Frontend Setup

cd frontend
npm install

### 2.B. Backend Setup

cd backend
npm install

### 3. Running the App 

docker-compose up --build
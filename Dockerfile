FROM python:3.9-slim

# Set working directory to /Game
WORKDIR /Game

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy your app code into container
COPY . .

# Set environment
ENV FLASK_APP=app

# Default command
CMD ["flask", "run", "--host=0.0.0.0", "--port=8000"]

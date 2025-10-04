FROM python:3.9-slim

# Set working directory to /Game
WORKDIR /Game

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Set environment (Flask will look for app.py in /Game)
ENV FLASK_APP=app.py

# Default command
CMD ["flask", "run", "--host=0.0.0.0", "--port=8000"]

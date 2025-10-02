FROM python:3.9-slim

# Set working directory
WORKDIR /app

# Copy requirements
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy your Flask app code (from mounted volume at runtime)
# Not copying here — handled by the volume in docker-compose.yml

# Set default command
CMD ["flask", "run", "--host=0.0.0.0", "--port=8000"]

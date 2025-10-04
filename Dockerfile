FROM python:3.9-slim
# Set working directory
WORKDIR /Game
# Copy necessary files
COPY requirements.txt .
COPY Game ./Game 
# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Set environment variables
ENV FLASK_APP=Game.app
ENV FLASK_RUN_HOST=0.0.0.0
ENV FLASK_RUN_PORT=8000
# Expose the port
EXPOSE 8000
# Start the app
CMD ["flask", "run"]
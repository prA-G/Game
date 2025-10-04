FROM python:3.9-slim
# Set working directory
RUN echo "Listing contents of /Game:" && ls -R /Game
WORKDIR /Game
# Copy necessary files
COPY requirements.txt .
COPY Game ./Game 
# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt
# Make Game a Python package
RUN touch Game/__init__.py
# Set environment variables
ENV FLASK_APP=Game.app
ENV FLASK_RUN_HOST=0.0.0.0
ENV FLASK_RUN_PORT=8000
# Expose the port
EXPOSE 8000
# Start the app
CMD ["flask", "run"]
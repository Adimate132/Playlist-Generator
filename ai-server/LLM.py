# START COMMAND FOR RAILWAY (PRODUCTION): python -m uvicorn LLM:app --host 0.0.0.0 --port $PORT
# START COMMAND FOR LOCAL (DEVELOPMENT): python llm.py
import mlflow  # Logging models and managing MLFlow experiments
from mlflow import pyfunc
from transformers import pipeline  # Loading Hugging Face model
import uvicorn
from fastapi import FastAPI, HTTPException  # FastAPI for building APIs
from fastapi.responses import JSONResponse  # Importing JSONResponse for custom responses
from pydantic import BaseModel  # Data validation using Pydantic
import os 

# Set MLflow tracking URI to a non-existent directory to avoid file creation
mlflow.set_tracking_uri('/non_existent_directory')

# The class encapsulates the function of the zero-shot classification model from HuggingFace.
class BartMNLIModel(pyfunc.PythonModel):
    def __init__(self):
        # Load the model only once during initialization
        self.model = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")  

    def predict(self, context, model_input):
        text = model_input['text']
        candidate_labels = model_input['candidate_labels']
        
        # Zero-shot classification for each text input
        results = [self.model(t, candidate_labels) for t in text]
        return results  # returns predictions as a list

# Create a single instance of the model at startup
model_instance = BartMNLIModel()

#********************************** API ENDPOINTS ***********************************
app = FastAPI()  # Creating FastAPI instance

# Define the request model for incoming API calls
class LyricsRequest(BaseModel):
    lyrics: list[str]  # Array of strings representing song lyrics
    candidate_labels: list[str]  # List of genres/moods

# Health check endpoint at the base URL
@app.get("/")
async def root():
    """
    Base endpoint to verify the server is up and running.
    
    Returns:
        JSONResponse: A response containing the status of the server.
    """
    return JSONResponse(content={"status": "success", "message": "AI Server is up and running!"})

@app.post("/api/generate_playlist")
async def generate_playlist(request: LyricsRequest):
    """
    API endpoint to generate a playlist based on the provided lyrics and candidate labels.

    Args:
        request (LyricsRequest): The request body containing lyrics and candidate labels.

    Returns:
        JSONResponse: A response containing total mood, total confidence, and playlist details.
    """
    # Validate input
    if not request.lyrics or not request.candidate_labels:
        raise HTTPException(status_code=400, detail="Invalid input: lyrics and candidate_labels are required.")

    try:
        # Use the pre-loaded model instance for predictions
        results = model_instance.predict(None, {'text': request.lyrics, 'candidate_labels': request.candidate_labels})

        total_mood = []
        total_confidence = []
        playlist = []

        for i, result in enumerate(results):
            if 'labels' in result and 'scores' in result:
                labels = result['labels']  # Mood labels for the current lyrics
                scores = result['scores']  # Confidence scores for the current lyrics

                # Append total mood and confidence
                total_mood.append(labels[0])  # Append the best label for this song
                total_confidence.append(scores[0])  # Append the confidence score for this song

                # Construct playlist entry
                playlist.append({
                    "labels": labels,
                    "scores": scores
                })
            else:
                # Handle unexpected result structure
                raise HTTPException(status_code=500, detail="Unexpected model output format")

        # Construct the response
        response_content = {
            "total_mood": total_mood,
            "total_confidence": total_confidence,
            "playlist": playlist
        }

        return JSONResponse(content=response_content)  # Return JSON response with status 200

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Run FastAPI app
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 3000))  # Use PORT from environment variable, default to 3000
    uvicorn.run(app, host="0.0.0.0", port=port)  # Specify host and port

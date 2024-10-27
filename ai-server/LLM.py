import mlflow  # Logging models and managing MLFlow experiments
from mlflow import pyfunc
from transformers import pipeline  # Loading Hugging Face model
import uvicorn
from fastapi import FastAPI, HTTPException  # FastAPI for building APIs
from fastapi.responses import JSONResponse  # Importing JSONResponse for custom responses
from pydantic import BaseModel  # Data validation using Pydantic
import logging

# The class encapsulates the function of the zero-shot classification model from HuggingFace.
class BartMNLIModel(pyfunc.PythonModel):
    def __init__(self):
        self.model = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")  # Load the model

    def predict(self, context, model_input):
        text = model_input['text']
        candidate_labels = model_input['candidate_labels']
        
        # Zero-shot classification for each text input
        results = [self.model(t, candidate_labels) for t in text]
        return results  # returns predictions as a list


#********************************** API ENDPOINTS ***********************************
app = FastAPI()  # Creating FastAPI instance

# Define the request model for incoming API calls
class LyricsRequest(BaseModel):
    lyrics: list[str]  # Array of strings representing song lyrics
    candidate_labels: list[str]  # List of genres/moods


@app.post("/api/generate_playlist")
async def generate_playlist(request: LyricsRequest):
    """
    API endpoint to generate a playlist based on the provided lyrics and candidate labels.

    Args:
        request (LyricsRequest): The request body containing lyrics and candidate labels.

    Returns:
        JSONResponse: A response containing total mood, total confidence, and playlist details.
    """
    try:
        model = BartMNLIModel()  # Creating instance of logged model
        results = model.predict(None, {'text': request.lyrics, 'candidate_labels': request.candidate_labels})

        total_mood = []
        total_confidence = []

        playlist = []

        for i, result in enumerate(results):
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

        # Construct the response
        response_content = {
            "total_mood": total_mood,
            "total_confidence": total_confidence,
            "playlist": playlist
        }

        return JSONResponse(content=response_content)  # Return JSON response with status 200

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# OPTIONAL: Add the code to log the model to MLFlow
if __name__ == "__main__":
    # Set experiment name
    mlflow.set_experiment("playlist-gen-experiment")
    # Start run to log model
    with mlflow.start_run():  # Log model under specified name
        pyfunc.log_model("bart-mnli-model", python_model=BartMNLIModel())
    # Run FastAPI app
    import uvicorn
    uvicorn.run(app, host="localhost", port=8000)  # Specify host and port
    logging.info("Running...")
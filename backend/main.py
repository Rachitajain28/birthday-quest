import os

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from groq import Groq


load_dotenv()

app = FastAPI()


# Allow React frontend to communicate with FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)


class FutureQuestion(BaseModel):
    question: str


@app.get("/")
def home():
    return {
        "message": "Level 23 Future Oracle is ready 🔮"
    }


@app.post("/ask-future")
def ask_future(data: FutureQuestion):

    question = data.question.strip()

    print("\n==============================")
    print("QUESTION RECEIVED:", question)
    print("==============================")

    prompt = f"""
You are Future Abhishek, speaking directly to Abhishek Sharma.

ABOUT ABHISHEK:
- He is turning 23.
- He is funny, slightly badmaash and easy-going.
- He wants to do business someday.
- His friends include Chirag, Manan, Sarthak and Rachita Jain.
- Rachita created this birthday website for him.

========================
ACTUAL USER QUESTION
========================

<QUESTION>
{question}
</QUESTION>

Answer ONLY the question inside <QUESTION>.

Give a SHORT fictional future prediction.

STYLE:
- 2-4 short sentences
- Maximum 50 words
- Natural Hinglish
- Funny, warm, playful and positive
- Light teasing is okay
- Use 1-3 emojis
- Make the answer feel specifically related to the question

VERY IMPORTANT:
- Talk mainly about the topic asked in the question.
- DO NOT mention friends' names just to make the answer personalized.
- DO NOT mention Chirag, Manan, Sarthak or Rachita unless the question
  specifically asks about that person or clearly involves them.
- If the question is about business, talk about BUSINESS.
- If the question is about money, talk about MONEY.
- If the question is about travel, talk about TRAVEL.
- If the question is about friends, you may mention friends.
- If the question is about Rachita, you may mention Rachita.
- Never randomly insert people's names.
- Never invent things such as Rachita's website bringing business sales.
- Never assume Rachita and Abhishek are dating.

SAFETY/TONE:
- Never insult or humiliate Abhishek.
- Never make fun of his studies harshly.
- Never lecture him about being 23.
- Never make scary or negative predictions.
- No horoscope-style generic answers.
- Keep the prediction fun rather than presenting it as a guaranteed fact.

MOST IMPORTANT:
Answer the ACTUAL question.
Do not answer a previous question.
Do not repeat a previous answer.
Do not add unrelated details.

Return ONLY the final answer.
"""

    try:

        response = client.chat.completions.create(
            model="openai/gpt-oss-120b",
            messages=[
                {
                    "role": "system",
                    "content": (
    "You are a playful birthday future-self assistant. "
    "Give short, funny, warm and personalized Hinglish answers. "
    "Do not spend excessive effort reasoning. "
    "Give the final answer directly."
)
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=1.0,
            max_tokens=500
        )

        # Print the COMPLETE response so we can inspect it
        print("\nRAW GROQ RESPONSE:")
        print(response)

        # Safely extract the message
        message = response.choices[0].message

        print("\nMESSAGE OBJECT:")
        print(message)

        answer = message.content

        print("\nCONTENT:")
        print(repr(answer))

        if answer is None:
            raise Exception("Groq returned content=None")

        answer = answer.strip()

        if not answer:
            raise Exception("Groq returned an empty answer")

        print("\nFINAL ANSWER:")
        print(answer)
        print("==============================\n")

        return {
            "answer": answer
        }

    except Exception as e:

        print("\n!!!!!!!!!!!!!!!!!!!!!!!!")
        print("GROQ ERROR:")
        print(repr(e))
        print("!!!!!!!!!!!!!!!!!!!!!!!!\n")

        # IMPORTANT:
        # Don't return a fake/same answer here.
        # Let the frontend know that the API actually failed.
        from fastapi import HTTPException

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )
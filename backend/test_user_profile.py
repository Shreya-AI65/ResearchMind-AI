from app.models.user_profile import UserProfile

user = UserProfile(
    name="Shreya",
    age=20,
    qualification="B.Tech",
    experience_level="Intermediate",
    explanation_style="balanced",
    research_interests="Agentic AI"
)

print(user.model_dump())
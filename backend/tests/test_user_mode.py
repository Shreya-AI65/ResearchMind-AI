from app.models.user_profile import UserProfile
from app.services.user_mode_service import UserModeService

users = [

    UserProfile(
        name="Student",
        age=16,
        qualification="High School",
        experience_level="Beginner"
    ),

    UserProfile(
        name="Shreya",
        age=20,
        qualification="B.Tech",
        experience_level="Intermediate"
    ),

    UserProfile(
        name="Researcher",
        age=30,
        qualification="PhD",
        experience_level="Researcher",
        existing_research="Agentic AI"
    )

]

for user in users:

    mode = UserModeService.detect_mode(user)

    print("-" * 40)
    print(f"Name : {user.name}")
    print(f"Mode : {mode}")
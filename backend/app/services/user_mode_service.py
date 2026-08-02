"""
User Mode Detection Service

Automatically determines the user's expertise level.
"""

from app.models.user_profile import UserProfile


class UserModeService:

    @staticmethod
    def detect_mode(profile: UserProfile) -> str:

        qualification = (
            profile.qualification.lower().strip()
            if profile.qualification
            else ""
        )

        experience = (
            profile.experience_level.lower().strip()
            if profile.experience_level
            else ""
        )

        # ----------------------------------------
        # Highest Priority: Explicit Experience Level
        # ----------------------------------------

        if experience == "beginner":
            return "Beginner"

        if experience == "intermediate":
            return "Intermediate"

        if experience in ["researcher", "advanced"]:
            return "Researcher"

        # ----------------------------------------
        # Existing Research Experience
        # ----------------------------------------

        if profile.existing_research:
            return "Researcher"

        # ----------------------------------------
        # Qualification-Based Fallback
        # ----------------------------------------

        if any(
            keyword in qualification
            for keyword in [
                "phd",
                "doctorate",
                "research"
            ]
        ):
            return "Researcher"

        if any(
            keyword in qualification
            for keyword in [
                "m.tech",
                "mtech",
                "master",
                "engineering",
                "b.tech",
                "btech"
            ]
        ):
            return "Intermediate"

        # ----------------------------------------
        # Default
        # ----------------------------------------

        return "Beginner"
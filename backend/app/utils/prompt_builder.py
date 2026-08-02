"""
Prompt Builder

Generates personalized prompts based on user mode.
"""


class PromptBuilder:

    @staticmethod
    def build_prompt(user_mode: str, topic: str) -> str:

        user_mode = user_mode.lower()

        # -------------------------------
        # Beginner Mode
        # -------------------------------

        if user_mode == "beginner":

            return f"""
You are an AI Research Assistant.

Topic:
{topic}

Instructions:

- Explain using very simple English.
- Avoid complex terminology.
- Explain every difficult word.
- Use real-life examples.
- Give step-by-step explanations.
- Keep sentences short.
"""

        # -------------------------------
        # Intermediate Mode
        # -------------------------------

        elif user_mode == "intermediate":

            return f"""
You are an AI Research Assistant.

Topic:
{topic}

Instructions:

- Assume the user has programming knowledge.
- Explain important concepts.
- Include technical terminology.
- Give practical examples.
- Explain algorithms where necessary.
- Keep the explanation balanced.
"""

        # -------------------------------
        # Researcher Mode
        # -------------------------------

        elif user_mode == "researcher":

            return f"""
You are an AI Research Assistant.

Topic:
{topic}

Instructions:

- Write in academic language.
- Compare existing methodologies.
- Discuss advantages and limitations.
- Mention current research trends.
- Suggest future research directions.
- Use formal writing style.
"""

        # -------------------------------
        # Default Mode
        # -------------------------------

        return f"""
Topic:

{topic}

Explain the topic clearly.
"""
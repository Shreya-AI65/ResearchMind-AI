from app.utils.prompt_builder import PromptBuilder

topic = "Agentic AI"

modes = [

    "Beginner",
    "Intermediate",
    "Researcher"

]

for mode in modes:

    print("=" * 70)
    print(mode)
    print("=" * 70)

    prompt = PromptBuilder.build_prompt(
        mode,
        topic
    )

    print(prompt)
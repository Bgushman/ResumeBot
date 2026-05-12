"""Unit tests for the prompts service."""

from backend.services.prompts import (
    SUPPORTED_MAJORS,
    MAJOR_SPECIFIC_CRITERIA,
    DEFAULT_MAJOR_CRITERIA,
    get_system_prompt,
)


class TestSupportedMajors:
    def test_contains_cs(self):
        assert "Computer Science" in SUPPORTED_MAJORS

    def test_contains_business(self):
        assert "Business" in SUPPORTED_MAJORS

    def test_has_ten_majors(self):
        assert len(SUPPORTED_MAJORS) == 10

    def test_no_duplicates(self):
        assert len(SUPPORTED_MAJORS) == len(set(SUPPORTED_MAJORS))


class TestGetSystemPrompt:
    SAMPLE_RESUME = "John Doe\nSoftware Engineer\nPython, Java"

    def test_includes_major(self):
        prompt = get_system_prompt("Computer Science", self.SAMPLE_RESUME)
        assert "Computer Science" in prompt

    def test_includes_resume_text(self):
        prompt = get_system_prompt("Business", self.SAMPLE_RESUME)
        assert "John Doe" in prompt
        assert "Software Engineer" in prompt

    def test_cs_specific_criteria(self):
        prompt = get_system_prompt("Computer Science", self.SAMPLE_RESUME)
        assert "programming languages" in prompt.lower()

    def test_business_specific_criteria(self):
        prompt = get_system_prompt("Business", self.SAMPLE_RESUME)
        assert "Leadership" in prompt

    def test_biology_specific_criteria(self):
        prompt = get_system_prompt("Biology", self.SAMPLE_RESUME)
        assert "Research Experience" in prompt

    def test_fallback_uses_default_criteria(self):
        prompt = get_system_prompt("Psychology", self.SAMPLE_RESUME)
        assert "Psychology" in prompt
        assert "Field-Relevant Experience" in prompt

    def test_prompt_structure(self):
        prompt = get_system_prompt("Economics", self.SAMPLE_RESUME)
        assert "ResumeBot" in prompt
        assert "Formatting & Structure" in prompt
        assert "Experience Bullets" in prompt

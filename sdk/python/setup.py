from setuptools import setup, find_packages

setup(
    name="shivanshu-sdk",
    version="1.0.0",
    packages=find_packages(),
    description="Official Python SDK for Shivanshu Tiwari Portfolio APIs, project intelligence, and autonomous agent evaluation",
    long_description=open("README.md", encoding="utf-8").read(),
    long_description_content_type="text/markdown",
    author="Shivanshu Tiwari",
    author_email="sht4bharat@gmail.com",
    url="https://github.com/SHT4BHARAT/NoIntroNeeded",
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
    python_requires=">=3.9",
)

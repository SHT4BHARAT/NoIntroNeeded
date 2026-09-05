from setuptools import setup, find_packages

setup(
    name="shivanshu-sdk",
    version="1.0.1",
    packages=find_packages(),
    description="Official Python SDK for Shivanshu Tiwari Portfolio APIs, project intelligence, and autonomous agent evaluation",
    long_description=open("README.md", encoding="utf-8").read(),
    long_description_content_type="text/markdown",
    author="Shivanshu Tiwari",
    author_email="sht4bharat@gmail.com",
    url="https://shivanshutiwari.in",
    project_urls={
        "Homepage": "https://shivanshutiwari.in",
        "Documentation": "https://shivanshutiwari.in/developers/sdk",
        "Source": "https://github.com/SHT4BHARAT/NoIntroNeeded/tree/main/sdk/python",
    },
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
    python_requires=">=3.9",
)

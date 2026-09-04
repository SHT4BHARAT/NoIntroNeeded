"""
Official Python Client for Shivanshu Tiwari Portfolio APIs
"""

import json
import time
import urllib.parse
import urllib.request
import urllib.error
from typing import Any, Dict, List, Optional, Union


class ShivanshuAPIError(Exception):
    """Exception raised for errors in the Shivanshu Tiwari API."""

    def __init__(self, message: str, status: int, body: Any = None):
        super().__init__(f"[{status}] {message}")
        self.status = status
        self.body = body


class ShivanshuClient:
    """Official Python Client for shivanshutiwari.in APIs and services."""

    def __init__(
        self,
        base_url: str = "https://shivanshutiwari.in",
        api_key: Optional[str] = None,
        timeout: float = 10.0,
    ):
        self.base_url = base_url.rstrip("/")
        self.api_key = api_key
        self.timeout = timeout

    def _request(
        self,
        endpoint: str,
        method: str = "GET",
        params: Optional[Dict[str, Any]] = None,
        data: Optional[Dict[str, Any]] = None,
        headers: Optional[Dict[str, str]] = None,
    ) -> Any:
        url = f"{self.base_url}/{endpoint.lstrip('/')}"
        if params:
            query = urllib.parse.urlencode({k: v for k, v in params.items() if v is not None})
            if query:
                url = f"{url}?{query}"

        req_headers = {
            "Accept": "application/json",
            "User-Agent": "shivanshu-python-sdk/1.0.0",
        }
        if self.api_key:
            req_headers["Authorization"] = f"Bearer {self.api_key}"
        if headers:
            req_headers.update(headers)

        body_bytes = None
        if data is not None:
            body_bytes = json.dumps(data).encode("utf-8")
            req_headers["Content-Type"] = "application/json"

        req = urllib.request.Request(url, data=body_bytes, headers=req_headers, method=method)

        try:
            with urllib.request.urlopen(req, timeout=self.timeout) as response:
                content = response.read().decode("utf-8")
                content_type = response.headers.get("Content-Type", "")
                if "application/json" in content_type:
                    return json.loads(content)
                return content
        except urllib.error.HTTPError as exc:
            err_content = exc.read().decode("utf-8")
            try:
                err_body = json.loads(err_content)
            except Exception:
                err_body = err_content
            raise ShivanshuAPIError(
                f"Request to {endpoint} failed", status=exc.code, body=err_body
            ) from exc
        except urllib.error.URLError as exc:
            raise ShivanshuAPIError(f"Connection failed to {url}: {exc.reason}", status=0) from exc

    # Projects
    def list_projects(
        self,
        limit: int = 20,
        cursor: Optional[str] = None,
        domain: Optional[str] = None,
    ) -> Dict[str, Any]:
        """List engineering projects with optional pagination and domain filtering."""
        return self._request(
            "/api/v1/projects",
            params={"limit": limit, "cursor": cursor, "domain": domain},
        )

    def get_project(self, slug: str) -> Dict[str, Any]:
        """Retrieve detailed architecture, decisions, and outcomes for a single project slug."""
        return self._request(f"/api/v1/projects/{urllib.parse.quote(slug)}")

    def compare_projects(self, slug_a: str, slug_b: str) -> Dict[str, Any]:
        """Compare two projects side-by-side."""
        proj_a = self.get_project(slug_a)
        proj_b = self.get_project(slug_b)
        return {"project_a": proj_a, "project_b": proj_b}

    # Keys & Sandbox
    def generate_key(self) -> Dict[str, Any]:
        """Generate an ephemeral self-serve test API key valid for 24 hours."""
        return self._request("/api/v1/keys", method="POST")

    def ping_sandbox(self) -> Dict[str, Any]:
        """Verify connectivity to the sandbox testing environment."""
        return self._request("/api/v1/sandbox/ping")

    def sandbox_contact(self, name: str, email: str, message: str) -> Dict[str, Any]:
        """Submit a sandbox test contact message without triggering live alerts."""
        return self._request(
            "/api/v1/sandbox/contact",
            method="POST",
            data={"name": name, "email": email, "message": message},
        )

    # Batch & Jobs
    def run_batch(self, operations: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Execute multiple API operations in an atomic batch."""
        return self._request(
            "/api/v1/batch",
            method="POST",
            data={"operations": operations},
        )

    def create_job(self, task: str, payload: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """Dispatch an asynchronous long-running task."""
        return self._request(
            "/api/v1/jobs",
            method="POST",
            data={"task": task, "payload": payload or {}},
        )

    def get_job(self, job_id: str) -> Dict[str, Any]:
        """Poll the status of an asynchronous background job."""
        return self._request(f"/api/v1/jobs/{urllib.parse.quote(job_id)}")

    def wait_for_job(
        self, job_id: str, poll_interval: float = 1.0, timeout: float = 30.0
    ) -> Dict[str, Any]:
        """Helper to poll a background job until completion or timeout."""
        start_time = time.time()
        while time.time() - start_time < timeout:
            job = self.get_job(job_id)
            if job.get("status") in ("completed", "failed"):
                return job
            time.sleep(poll_interval)
        raise TimeoutError(f"Job {job_id} exceeded timeout of {timeout} seconds")

    # Contact
    def submit_contact(
        self,
        name: str,
        email: str,
        message: str,
        idempotency_key: Optional[str] = None,
    ) -> Dict[str, Any]:
        """Submit an inquiry with idempotency protection."""
        headers = {}
        if idempotency_key:
            headers["Idempotency-Key"] = idempotency_key
        return self._request(
            "/api/v1/contact",
            method="POST",
            data={"name": name, "email": email, "message": message},
            headers=headers,
        )

    # Docs & MCP
    def get_docs(self, path: str = "llms.txt") -> str:
        """Fetch raw markdown twin or curated LLM index."""
        url = f"{self.base_url}/{path.lstrip('/')}"
        req = urllib.request.Request(url, headers={"Accept": "text/markdown, text/plain, */*"})
        with urllib.request.urlopen(req, timeout=self.timeout) as response:
            return response.read().decode("utf-8")

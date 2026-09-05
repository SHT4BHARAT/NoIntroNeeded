// Package shivanshu provides an official Go client for the Shivanshu Tiwari Portfolio API.
package shivanshu

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"strings"
	"time"
)

const (
	DefaultBaseURL = "https://shivanshutiwari.in"
	UserAgent      = "shivanshu-go-sdk/1.0.0"
)

// ProjectSummary represents summary project metadata.
type ProjectSummary struct {
	Slug        string   `json:"slug"`
	Title       string   `json:"title"`
	Description string   `json:"description"`
	Stack       []string `json:"stack"`
	RepoURL     string   `json:"repoUrl,omitempty"`
	DemoURL     string   `json:"demoUrl,omitempty"`
	Date        string   `json:"date"`
	Highlights  []string `json:"highlights"`
}

// ArchitectureDetails details internal architecture.
type ArchitectureDetails struct {
	Summary string `json:"summary,omitempty"`
	Diagram string `json:"diagram,omitempty"`
}

// ProjectDetails represents comprehensive project data.
type ProjectDetails struct {
	ProjectSummary
	Tagline      string              `json:"tagline,omitempty"`
	Domain       string              `json:"domain,omitempty"`
	Problem      string              `json:"problem,omitempty"`
	WhatIBuilt   string              `json:"whatIBuilt,omitempty"`
	Architecture ArchitectureDetails `json:"architecture,omitempty"`
	HonestPart   string              `json:"honestPart,omitempty"`
}

// ProjectListResponse represents the paginated projects response.
type ProjectListResponse struct {
	Data       []ProjectSummary `json:"data"`
	Pagination struct {
		NextCursor *string `json:"nextCursor"`
		HasMore    bool    `json:"hasMore"`
		Limit      int     `json:"limit"`
	} `json:"pagination"`
}

// EphemeralKeyResponse is returned when generating a test key.
type EphemeralKeyResponse struct {
	APIKey    string `json:"apiKey"`
	Tier      string `json:"tier"`
	RateLimit int    `json:"rateLimit"`
	ExpiresAt string `json:"expiresAt"`
}

// SandboxStatus represents the sandbox ping status.
type SandboxStatus struct {
	Pong      bool   `json:"pong"`
	Sandbox   bool   `json:"sandbox"`
	Timestamp string `json:"timestamp"`
}

// ContactRequest is the payload for contact submissions.
type ContactRequest struct {
	Name    string `json:"name"`
	Email   string `json:"email"`
	Message string `json:"message"`
}

// ContactResponse represents the result of contact submission.
type ContactResponse struct {
	Success    bool   `json:"success"`
	Message    string `json:"message"`
	Idempotent bool   `json:"idempotent,omitempty"`
}

// BatchOperation represents a single sub-request in a batch.
type BatchOperation struct {
	ID   string      `json:"id"`
	Op   string      `json:"op"`
	Args interface{} `json:"args,omitempty"`
}

// BatchRequest is sent to the batch endpoint.
type BatchRequest struct {
	Operations []BatchOperation `json:"operations"`
}

// BatchResponse wraps batch execution results.
type BatchResponse struct {
	Results []struct {
		ID     string          `json:"id"`
		Status int             `json:"status"`
		Data   json.RawMessage `json:"data"`
	} `json:"results"`
}

// Client interacts with the Shivanshu Tiwari Portfolio APIs.
type Client struct {
	BaseURL    string
	APIKey     string
	HTTPClient *http.Client
}

// Option configures a Client.
type Option func(*Client)

// WithBaseURL overrides the default API base URL.
func WithBaseURL(baseURL string) Option {
	return func(c *Client) {
		c.BaseURL = strings.TrimRight(baseURL, "/")
	}
}

// WithAPIKey sets the bearer authorization token.
func WithAPIKey(apiKey string) Option {
	return func(c *Client) {
		c.APIKey = apiKey
	}
}

// WithHTTPClient provides a custom HTTP client.
func WithHTTPClient(httpClient *http.Client) Option {
	return func(c *Client) {
		c.HTTPClient = httpClient
	}
}

// NewClient returns an initialized Shivanshu API Client.
func NewClient(opts ...Option) *Client {
	c := &Client{
		BaseURL: DefaultBaseURL,
		HTTPClient: &http.Client{
			Timeout: 10 * time.Second,
		},
	}
	for _, opt := range opts {
		opt(c)
	}
	return c
}

func (c *Client) doRequest(ctx context.Context, method, path string, body interface{}, out interface{}, customHeaders map[string]string) error {
	fullURL := fmt.Sprintf("%s/%s", c.BaseURL, strings.TrimLeft(path, "/"))

	var bodyReader io.Reader
	if body != nil {
		buf, err := json.Marshal(body)
		if err != nil {
			return fmt.Errorf("marshal request: %w", err)
		}
		bodyReader = bytes.NewReader(buf)
	}

	req, err := http.NewRequestWithContext(ctx, method, fullURL, bodyReader)
	if err != nil {
		return fmt.Errorf("create request: %w", err)
	}

	req.Header.Set("Accept", "application/json")
	req.Header.Set("User-Agent", UserAgent)
	if body != nil {
		req.Header.Set("Content-Type", "application/json")
	}
	if c.APIKey != "" {
		req.Header.Set("Authorization", "Bearer "+c.APIKey)
	}
	for k, v := range customHeaders {
		req.Header.Set(k, v)
	}

	res, err := c.HTTPClient.Do(req)
	if err != nil {
		return fmt.Errorf("execute request: %w", err)
	}
	defer res.Body.Close()

	if res.StatusCode < 200 || res.StatusCode >= 300 {
		respBody, _ := io.ReadAll(res.Body)
		return fmt.Errorf("api error: status %d: %s", res.StatusCode, string(respBody))
	}

	if out != nil {
		if err := json.NewDecoder(res.Body).Decode(out); err != nil {
			return fmt.Errorf("decode response: %w", err)
		}
	}
	return nil
}

// ListProjects queries portfolio projects with optional limit and cursor.
func (c *Client) ListProjects(ctx context.Context, domain string, limit int, cursor string) (*ProjectListResponse, error) {
	v := url.Values{}
	if domain != "" {
		v.Set("domain", domain)
	}
	if limit > 0 {
		v.Set("limit", fmt.Sprintf("%d", limit))
	}
	if cursor != "" {
		v.Set("cursor", cursor)
	}

	path := "/api/v1/projects"
	if qs := v.Encode(); qs != "" {
		path += "?" + qs
	}

	var resp ProjectListResponse
	if err := c.doRequest(ctx, http.MethodGet, path, nil, &resp, nil); err != nil {
		return nil, err
	}
	return &resp, nil
}

// GetProject returns detailed architecture and outcomes for a single project slug.
func (c *Client) GetProject(ctx context.Context, slug string) (*ProjectDetails, error) {
	path := fmt.Sprintf("/api/v1/projects/%s", url.PathEscape(slug))
	var resp ProjectDetails
	if err := c.doRequest(ctx, http.MethodGet, path, nil, &resp, nil); err != nil {
		return nil, err
	}
	return &resp, nil
}

// GenerateKey requests an ephemeral sandbox API key valid for 24 hours.
func (c *Client) GenerateKey(ctx context.Context) (*EphemeralKeyResponse, error) {
	var resp EphemeralKeyResponse
	if err := c.doRequest(ctx, http.MethodPost, "/api/v1/keys", nil, &resp, nil); err != nil {
		return nil, err
	}
	return &resp, nil
}

// PingSandbox verifies connectivity to the isolated sandbox test environment.
func (c *Client) PingSandbox(ctx context.Context) (*SandboxStatus, error) {
	var resp SandboxStatus
	if err := c.doRequest(ctx, http.MethodGet, "/api/v1/sandbox/ping", nil, &resp, nil); err != nil {
		return nil, err
	}
	return &resp, nil
}

// SubmitContact sends a message with an optional Idempotency-Key.
func (c *Client) SubmitContact(ctx context.Context, req ContactRequest, idempotencyKey string) (*ContactResponse, error) {
	headers := make(map[string]string)
	if idempotencyKey != "" {
		headers["Idempotency-Key"] = idempotencyKey
	}
	var resp ContactResponse
	if err := c.doRequest(ctx, http.MethodPost, "/api/v1/contact", req, &resp, headers); err != nil {
		return nil, err
	}
	return &resp, nil
}

// RunBatch executes a set of operations in a single atomic request.
func (c *Client) RunBatch(ctx context.Context, batch BatchRequest) (*BatchResponse, error) {
	var resp BatchResponse
	if err := c.doRequest(ctx, http.MethodPost, "/api/v1/batch", batch, &resp, nil); err != nil {
		return nil, err
	}
	return &resp, nil
}

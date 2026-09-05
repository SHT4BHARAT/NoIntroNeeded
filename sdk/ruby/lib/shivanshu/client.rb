# frozen_string_literal: true

require "json"
require "net/http"
require "uri"

module Shivanshu
  # Raised when the Portfolio API returns a non-2xx response.
  class APIError < StandardError; end

  # Official zero-dependency Ruby client for the Shivanshu Tiwari Portfolio API.
  #
  #   client = Shivanshu::Client.new
  #   projects = client.list_projects(domain: "ai-agents")
  #
  # Homepage: https://shivanshutiwari.in
  class Client
    DEFAULT_BASE_URL = "https://shivanshutiwari.in"

    attr_reader :base_url, :api_key

    def initialize(base_url: DEFAULT_BASE_URL, api_key: nil)
      @base_url = base_url
      @api_key = api_key
    end

    # GET /api/v1/projects — list projects with optional pagination and domain filter.
    def list_projects(limit: nil, cursor: nil, domain: nil)
      query = {}
      query["limit"] = limit if limit
      query["cursor"] = cursor if cursor
      query["domain"] = domain if domain
      get("/api/v1/projects", query)
    end

    # GET /api/v1/projects/{slug} — project details, architecture, and honest limitations.
    def get_project(slug)
      get("/api/v1/projects/#{URI.encode_www_form_component(slug)}")
    end

    # GET /api/v1/projects/{slug_a}/compare?slugB=... — side-by-side project comparison.
    def compare_projects(slug_a, slug_b)
      get("/api/v1/projects/#{URI.encode_www_form_component(slug_a)}/compare", { "slugB" => slug_b })
    end

    # POST /api/v1/keys — generate an ephemeral 24-hour sandbox API key.
    def generate_key
      post("/api/v1/keys", nil)
    end

    # GET /api/v1/sandbox/ping — verify connectivity to the isolated sandbox environment.
    def ping_sandbox
      get("/api/v1/sandbox/ping")
    end

    # POST /api/v1/sandbox/contact — safe contact-submission test against the sandbox.
    def sandbox_contact(name, email, message)
      post("/api/v1/sandbox/contact", { name: name, email: email, message: message })
    end

    # POST /api/v1/batch — execute multiple operations in a single atomic round-trip.
    def run_batch(operations)
      post("/api/v1/batch", { operations: operations })
    end

    # POST /api/v1/jobs — dispatch an asynchronous job.
    def create_job(task, payload: nil)
      body = { "task" => task }
      body["payload"] = payload if payload
      post("/api/v1/jobs", body)
    end

    # GET /api/v1/jobs/{job_id} — fetch the status and result of an async job.
    def get_job(job_id)
      get("/api/v1/jobs/#{URI.encode_www_form_component(job_id)}")
    end

    # POST /api/v1/contact — submit a message with optional Idempotency-Key.
    def submit_contact(name, email, message, idempotency_key: nil)
      headers = {}
      headers["Idempotency-Key"] = idempotency_key if idempotency_key
      post("/api/v1/contact", { name: name, email: email, message: message }, headers)
    end

    # Raw markdown documentation twins (llms.txt, about.md, developers.md, ...).
    def get_docs(path = "llms.txt")
      uri = build_uri("/#{path.sub(%r{\A/}, "")}")
      request(:get, uri, nil, { "Accept" => "text/markdown" }, raw: true)
    end

    private

    def get(path, query = {})
      request(:get, build_uri(path, query), nil, {})
    end

    def post(path, body, headers = {})
      request(:post, build_uri(path), body, headers)
    end

    def build_uri(path, query = {})
      uri = URI.join(base_url, path)
      uri.query = URI.encode_www_form(query) unless query.empty?
      uri
    end

    def request(method, uri, body, headers, raw: false)
      http = Net::HTTP.new(uri.host, uri.port)
      http.use_ssl = uri.scheme == "https"
      http.open_timeout = 10
      http.read_timeout = 30

      klass = method == :post ? Net::HTTP::Post : Net::HTTP::Get
      req = klass.new(uri)
      req["User-Agent"] = "shivanshu-ruby-sdk/#{Shivanshu::VERSION}"
      req["Accept"] = "application/json"
      req["Content-Type"] = "application/json" if body
      req["Authorization"] = "Bearer #{@api_key}" if @api_key
      headers.each { |k, v| req[k] = v }
      req.body = JSON.generate(body) if body

      res = http.request(req)
      unless res.is_a?(Net::HTTPSuccess)
        raise APIError, "api error: #{res.code} #{res.body.to_s[0, 500]}"
      end

      return res.body if raw

      JSON.parse(res.body || "{}")
    end
  end
end
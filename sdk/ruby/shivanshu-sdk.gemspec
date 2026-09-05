# frozen_string_literal: true

require_relative "lib/shivanshu/version"

Gem::Specification.new do |spec|
  spec.name          = "shivanshu-sdk"
  spec.version       = Shivanshu::VERSION
  spec.authors       = ["Shivanshu Tiwari"]
  spec.email         = ["sht4bharat@gmail.com"]

  spec.summary       = "Official Ruby SDK for Shivanshu Tiwari Portfolio APIs"
  spec.description   = "Zero-dependency Ruby client for the Shivanshu Tiwari Portfolio API — project intelligence, architecture details, sandbox testing, ephemeral test keys, batch operations, and async jobs."
  spec.homepage      = "https://shivanshutiwari.in"
  spec.license       = "MIT"
  spec.required_ruby_version = ">= 3.0"

  spec.metadata["homepage_uri"] = "https://shivanshutiwari.in"
  spec.metadata["source_code_uri"] = "https://github.com/SHT4BHARAT/NoIntroNeeded/tree/main/sdk/ruby"
  spec.metadata["documentation_uri"] = "https://shivanshutiwari.in/developers/sdk#ruby"

  spec.files         = Dir["lib/**/*.rb", "README.md"]
  spec.require_paths = ["lib"]
end
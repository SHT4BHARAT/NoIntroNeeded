# Publish the Go SDK to the public repo

The private repo (`NoIntroNeeded`) cannot serve Go modules — `proxy.golang.org` and
`pkg.go.dev` return 404 for private repos, and GitHub cannot expose a subdirectory of a
private repo. The fix is a small **public** repository containing exactly these files.

## One-time setup (manual, 2 minutes)

1. On GitHub: **New repository** → Name: `Portfolio-Go-SDK` → **Visibility: Public** (already created).

2. Push these files into it (from this `sdk/go-release/` folder):

```bash
# make sure go.mod declares: module github.com/SHT4BHARAT/Portfolio-Go-SDK
git init
git add client.go doc.go go.mod README.md
git commit -m "chore: publish official Go SDK v1.0.0"
git tag v1.0.0
git remote add origin https://github.com/SHT4BHARAT/Portfolio-Go-SDK.git
git push -u origin main
git push origin v1.0.0
```

## Verification

```bash
go list -m github.com/SHT4BHARAT/Portfolio-Go-SDK
curl -s https://proxy.golang.org/github.com/SHT4BHARAT/Portfolio-Go-SDK/@v/list   # -> v1.0.0
```

Then open https://pkg.go.dev/github.com/SHT4BHARAT/Portfolio-Go-SDK — it will index within ~a minute.

## Notes

- Tag format `v1.0.0` (module is at the repo root, so no `/vN` suffix needed).
- `doc.go` carries the homepage (`https://shivanshutiwari.in`) so pkg.go.dev and
  agent scanners can verify the package is official.
- Every website reference already points at `github.com/SHT4BHARAT/Portfolio-Go-SDK`.
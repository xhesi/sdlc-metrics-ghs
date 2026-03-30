# Quick Start Guide

Get CloudBees Unify metrics running in under 10 minutes. 

## Prerequisites Checklist

- [ ] CloudBees Unify account and instance URL
- [ ] GitHub repository with Actions enabled
- [ ] Admin access to both GitHub and CloudBees Unify

## Setup Steps

### 1. Configure CloudBees Unify (5 minutes)

```bash
# 1. Log into your CloudBees Unify instance
# 2. Create environments:
#    - development (non-production)
#    - staging (non-production)
#    - production (production)
#
# 3. Set up OIDC for GitHub:
#    Settings > Identity Providers > Add GitHub OIDC
#    Trust policy: repo:YOUR_ORG/sdlc-metrics-gha:*
#
# 4. Create API token (if not using OIDC):
#    Settings > API Tokens > New Token
#    Permissions: artifact:write, deployment:write, test-results:write
```

### 2. Fork/Clone This Repository (1 minute)

```bash
# Option A: Fork on GitHub, then clone
git clone https://github.com/YOUR_USERNAME/sdlc-metrics-gha.git
cd sdlc-metrics-gha

# Option B: Use this as a template
# Click "Use this template" on GitHub
```

### 3. Configure GitHub (2 minutes)

```bash
# 1. Create environments in GitHub:
#    Settings > Environments > New Environment
#    - development (no protection)
#    - staging (no protection)
#    - production (require reviewers)
#
# 2. If not using OIDC, add secrets:
#    Settings > Secrets > Actions > New Secret
#    Name: CLOUDBEES_API_TOKEN
#    Value: <your-token>
```

### 4. Initial Deployment (2 minutes)

```bash
# Create develop branch
git checkout -b develop
git push -u origin develop

# Make a test commit
echo "# Test" >> test.txt
git add test.txt
git commit -m "Test: Initial deployment"
git push

# Check GitHub Actions tab - workflow should be running!
```

### 5. Verify Metrics (2 minutes)

After the workflow completes:

1. **Test Results**: CloudBees Unify > Analytics > Test Results
   - Should see Jest test results

2. **Build Artifacts**: Components > sdlc-metrics-demo
   - Should see registered artifact with version number

3. **Deployments**: Environment Inventory > development
   - Should see deployed artifact version

4. **DORA Metrics**: Analytics > DORA Metrics
   - Deployment frequency should show 1 deployment
   - Lead time should be calculated

## Trigger Production Deployment

```bash
# Merge to main to deploy to staging and production
git checkout main
git merge develop
git push

# Go to GitHub Actions and approve production deployment
```


## Expected Results

After completing these steps, you should see in CloudBees Unify:

### Test Results
- ✅ 12 passing tests
- ✅ Coverage report
- ✅ Test duration metrics

### Artifacts
- ✅ 1 registered artifact
- ✅ Version: 1.0.X-XXXXXX
- ✅ Labels: develop, nodejs, express, automated

### Deployments
- ✅ Development: latest version
- ✅ Staging: latest version (after main merge)
- ✅ Production: latest version (after approval)

### DORA Metrics
- ✅ Deployment Frequency: tracked
- ✅ Lead Time: calculated from commit to deploy
- ✅ Change Failure Rate: 0% (no failures yet)
- ✅ MTTR: N/A (no incidents yet)

## Simulate Failure (Optional)

Test change failure rate tracking:

```bash
# Add a failing test
cat << 'EOF' >> tests/failure.test.js
describe('Intentional Failure', () => {
  test('should fail', () => {
    expect(true).toBe(false);
  });
});
EOF

git add tests/failure.test.js
git commit -m "Test: Simulate deployment failure"
git push

# Workflow will fail, CloudBees Unify will track the failure
# Fix it and redeploy to see MTTR
```

## Troubleshooting

### Workflow fails immediately
- Check OIDC configuration in CloudBees Unify
- Verify repository is in trust policy

### Tests fail
```bash
npm install
npm test
```

### No metrics in CloudBees Unify
- Verify environments exist in CloudBees Unify
- Check workflow logs for action errors
- Confirm component is created in CloudBees Unify

### Need help?
Check the full [README.md](README.md) for detailed documentation.

## Next Steps

1. ✅ Customize the application code
2. ✅ Modify deployment targets (replace simulated deployments)
3. ✅ Add more environments
4. ✅ Integrate with Jira
5. ✅ Set up notifications
6. ✅ Configure DORA metric targets

---

**Time to value**: ~10 minutes
**Difficulty**: Easy
**Prerequisites**: CloudBees Unify + GitHub access

# Contributing Guidelines

Welcome to our hackathon project! Please follow these rules to keep collaboration smooth:

## Workflow
1. **Branch naming**
   - Features → `feature/<short-name>`
   - Fixes → `fix/<short-name>`
   - Example: `feature/google-auth`, `fix/chat-bug`

2. **Pull Requests (PRs)**
   - Always create a PR into `main`
   - Keep PRs small (<200 lines if possible)
   - Link to related issue/task if any
   - Add screenshots if UI changes are made

3. **Code Style**
   - Run `npm run dev` to ensure no errors before PR
   - Use Prettier/ESLint (if configured)
   - No console logs in final code

4. **Reviews**
   - At least 1 teammate must review before merge
   - Resolve merge conflicts before requesting review

5. **Commits**
   - Use clear commit messages:
     - `feat: add Google login`
     - `fix: socket disconnect issue`
     - `chore: update README`

---

## Setup
1. Clone repo
2. Run `npm install`
3. Create `.env.local` based on `.env.example`
4. Run `npm run dev`

Thanks for contributing 🚀

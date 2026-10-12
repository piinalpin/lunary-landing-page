# Support Contact Environment and GitHub Pages Deployment

## Scope

Make the landing-page support contact details configurable at build time and replace the branch-based GitHub Pages deployment with the official artifact deployment workflow.

## Contact configuration

Add these public Vite variables:

- `VITE_SUPPORT_EMAIL`
- `VITE_SUPPORT_PHONE_NUMBER`
- `VITE_SUPPORT_ADDRESS`

The type-safe environment wrapper exposes the values to layout components. The footer renders a `mailto:` link for the email, a `tel:` link for the phone number, and a text value for the address. Empty optional contact values are not rendered. The phone value is stored in E.164 form (for example, `+6281234567890`) and formatted for display as `+62 812-3456-7890`; the `tel:` link uses the unformatted E.164 value.

The variables are documented in `.env.example` and the README, supplied to the Docker build, and populated in the GitHub Pages build from repository variables.

## GitHub Pages deployment

Replace the deployment that pushes the build to the `dist` branch with the official GitHub Pages artifact flow. The workflow builds the Vite app, uploads `dist` with `actions/upload-pages-artifact@v5`, and deploys it with `actions/deploy-pages@v5`; `actions/configure-pages@v6` provides Pages metadata. These versions use Node 24-compatible actions.

The repository owner must set **Settings -> Pages -> Build and deployment -> Source** to **GitHub Actions** after the workflow is merged. This removes the GitHub-managed branch build job that produced the `actions/upload-artifact@v4` Node 20 warning.

## Verification

Run `pnpm check` and `pnpm build`. Inspect the generated static output to confirm the configured email, formatted phone number, address, and contact links are present. Validate the workflow structure with a YAML parser where available.

# LaunchDarkly CSV Export

A web application that allows you to export LaunchDarkly feature flags to CSV format. Built with Cloudflare Workers and OAuth authentication.

## What it does

- **OAuth Authentication**: Securely authenticates with your LaunchDarkly account
- **Project & Environment Selection**: Browse and search through all your LaunchDarkly projects & environments
- **Customizable Export**: Select which fields to include in your CSV export
- **Live Preview**: See a preview of your data before exporting

## Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure OAuth**:
   - Copy `wrangler.toml.example` to `wrangler.toml`
   - Create an OAuth application in your LaunchDarkly dashboard. You can use https://durw4rd.github.io/ld-oauth-client-manager/ for this.
    - LaunchDarkly doesn't allow you to register OAuth clients with http URLs. For local development, you'll need to use a proxy like ngrok to create an HTTPS tunnel:
        ```bash
        # Start your app first
        npm run dev
        
        # In another terminal, create HTTPS tunnel
        ngrok http 8788
        ```
    - Use the ngrok HTTPS URL (e.g., `https://random-subdomain.ngrok-free.app/oauth/callback`) as your OAuth redirect URI
   - Add your OAuth credentials to `wrangler.toml`


## Usage

1. **Access the app** and click "Login" to authenticate with LaunchDarkly
2. **Select a project** from the searchable dropdown
3. **Choose an environment** for that project
4. **Customize fields** to include in your export (all selected by default)
5. **Click "Export to CSV"** to download your data

## Exported Fields

- **Key**: Feature flag key
- **Name**: Human-readable name
- **Description**: Flag description
- **Maintainer**: Email of the maintainer
- **Tags**: Associated tags
- **Archived**: Whether the flag is archived
- **Deprecated**: Whether the flag is deprecated
- **Creation Date**: When the flag was created
- **Environment Key**: Environment identifier
- **Environment Name**: Environment display name
- **Last Modified**: Last modification timestamp
- **Status**: Current flag status
- **Last Evaluated**: Last evaluation timestamp
- **Ready to Archive**: Archive readiness status
- **Ready for Code Removal**: Code removal readiness status

## Development

- **Run tests**: `npm test`
- **Deploy**: `npm run deploy`
- **Local development**: `npm run dev`

## Architecture

- **Frontend**: Vanilla JavaScript with modern CSS
- **Backend**: Cloudflare Workers
- **Authentication**: LaunchDarkly OAuth 2.0
- **Data**: LaunchDarkly REST API v2 
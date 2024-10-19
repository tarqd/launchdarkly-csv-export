export async function onRequest(context) {
    const env = context.env;
    const {LD_CLIENT_ID, LD_CLIENT_SECRET, LD_REDIRECT_URI} = env;
    const url = new URL(context.request.url);
    const code = url.searchParams.get('code');
    if (!code) {
        return new Response('Authorization code not found.', { status: 400 });
    }

    const tokenResponse = await fetch('https://app.launchdarkly.com/trust/oauth/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: LD_REDIRECT_URI,
            client_id: LD_CLIENT_ID,
            client_secret: LD_CLIENT_SECRET,
        }),
    });
    console.log(LD_CLIENT_ID, LD_CLIENT_SECRET, LD_REDIRECT_URI)
    console.log(tokenResponse)
    if (!tokenResponse.ok) {
        const resp = await tokenResponse.text();
        console.log("response text", resp);
        return new Response('Failed to exchange code for token.', { status: tokenResponse.status });
    }

    const tokenData = await tokenResponse.json();
    console.log('got', tokenData);
    const accessToken = tokenData.access_token;
    console.log(`Access Token: ${accessToken}`);
    const redirectUrl = new URL("/", url)
    redirectUrl.hash = `access_token=${accessToken}`;
    return Response.redirect(redirectUrl, 302);

}

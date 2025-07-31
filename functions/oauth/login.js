export function onRequest(context) {
    const { LD_CLIENT_ID, LD_REDIRECT_URI } = context.env;
    const loginUrl = new URL('https://app.launchdarkly.com/trust/oauth/authorize');
    loginUrl.searchParams.set('response_type', 'code');
    loginUrl.searchParams.set('client_id', LD_CLIENT_ID);
    loginUrl.searchParams.set('redirect_uri', LD_REDIRECT_URI);
    loginUrl.searchParams.set('scope', 'reader');
    return Response.redirect(loginUrl.toString(), 302);
}

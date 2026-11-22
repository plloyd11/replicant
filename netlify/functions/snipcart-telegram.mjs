// Snipcart → Telegram order notifications.
//
// Snipcart POSTs every webhook event here; only `order.completed` sends a message.
// Endpoint: https://replicant.band/.netlify/functions/snipcart-telegram
//
// Env vars (Netlify → Site configuration → Environment variables):
//   SNIPCART_SECRET_KEY       Live secret API key (used to verify the request really came from Snipcart)
//   SNIPCART_TEST_SECRET_KEY  Optional: test-mode secret key, so test orders also get through
//   TELEGRAM_BOT_TOKEN        Bot token from @BotFather
//   TELEGRAM_CHAT_ID          Group chat ID (negative number, e.g. -1001234567890)

const escapeHtml = (s) =>
    String(s ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

// Snipcart signs each webhook with a one-time token we confirm against their API.
async function isFromSnipcart(token) {
    if (!token) return false;
    const keys = [process.env.SNIPCART_SECRET_KEY, process.env.SNIPCART_TEST_SECRET_KEY].filter(Boolean);
    for (const key of keys) {
        const res = await fetch(`https://app.snipcart.com/api/requesttokens/${encodeURIComponent(token)}`, {
            headers: {
                Accept: 'application/json',
                Authorization: `Basic ${Buffer.from(`${key}:`).toString('base64')}`,
            },
        });
        if (res.ok) return true;
    }
    return false;
}

function formatOrder(order, mode) {
    const currency = (order.currency || 'usd').toUpperCase();
    const money = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(Number(n) || 0);

    const lines = [];
    if (mode && mode.toLowerCase() === 'test') lines.push('🧪 <b>TEST ORDER</b>');
    lines.push(`🤘 <b>New order${order.invoiceNumber ? ` ${escapeHtml(order.invoiceNumber)}` : ''}</b>`, '');

    for (const item of order.items ?? []) {
        const options = (item.customFields ?? [])
            .map((f) => f.value)
            .filter(Boolean)
            .join(', ');
        const total = item.totalPrice ?? item.price * item.quantity;
        lines.push(
            `• ${item.quantity}× ${escapeHtml(item.name)}${options ? ` (${escapeHtml(options)})` : ''} — ${money(total)}`,
        );
    }

    lines.push('');
    const shipping = order.shippingFees ?? order.shippingInformation?.fees;
    if (shipping) lines.push(`Shipping: ${money(shipping)}`);
    if (order.taxesTotal) lines.push(`Tax: ${money(order.taxesTotal)}`);
    lines.push(`<b>Total: ${money(order.finalGrandTotal ?? order.grandTotal)}</b>`);

    const addr = order.shippingAddress ?? {};
    const place = [
        addr.city ?? order.shippingAddressCity,
        addr.province ?? order.shippingAddressProvince,
        addr.country ?? order.shippingAddressCountry,
    ]
        .filter(Boolean)
        .join(', ');
    if (place) lines.push(`📦 Ships to: ${escapeHtml(place)}`);

    if (order.token) {
        lines.push('', `<a href="https://app.snipcart.com/dashboard/orders/${encodeURIComponent(order.token)}">View in Snipcart</a>`);
    }

    return lines.join('\n');
}

async function sendTelegram(text) {
    return fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: process.env.TELEGRAM_CHAT_ID,
            text,
            parse_mode: 'HTML',
            link_preview_options: { is_disabled: true },
        }),
    });
}

export default async (req) => {
    if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 });

    if (!(await isFromSnipcart(req.headers.get('x-snipcart-requesttoken')))) {
        return new Response('Unauthorized', { status: 401 });
    }

    const event = await req.json();
    if (event.eventName !== 'order.completed') return new Response('Ignored', { status: 200 });

    const res = await sendTelegram(formatOrder(event.content ?? {}, event.mode));
    if (!res.ok) {
        console.error('Telegram sendMessage failed', res.status, await res.text());
        return new Response('Telegram error', { status: 502 });
    }

    return new Response('OK', { status: 200 });
};
